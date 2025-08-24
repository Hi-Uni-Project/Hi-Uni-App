import { useReducer } from 'react';

import { TermsKey, TermsType } from '../types/termsTypes';

import TERMS_PROVIDER from '@/shared/constants/termsProvider';

type TermsState = Record<TermsKey, { type: TermsType; isAgreed: boolean }>;

type Action =
  | { type: 'TOGGLE_TERM'; key: TermsKey }
  | { type: 'SET_ALL_TERMS' };

const initialState = TERMS_PROVIDER.reduce((acc, term) => {
  acc[term.key] = { type: term.type, isAgreed: false };
  return acc;
}, {} as TermsState);

const checkAllAgreed = (state: TermsState): boolean => {
  return Object.keys(state)
    .filter(key => key !== 'all')
    .every(key => state[key as TermsKey].isAgreed);
};

const reducer = (state: TermsState, action: Action): TermsState => {
  switch (action.type) {
    case 'SET_ALL_TERMS': {
      const newObject: TermsState = {} as TermsState;
      Object.keys(initialState).forEach(key => {
        newObject[key as TermsKey] = {
          ...initialState[key as TermsKey],
          isAgreed: !state.all.isAgreed,
        };
      });
      return newObject;
    }

    case 'TOGGLE_TERM': {
      let newObject: TermsState = {} as TermsState;
      newObject = {
        ...state,
        [action.key]: {
          ...state[action.key],
          isAgreed: !state[action.key].isAgreed,
        },
      };

      newObject.all = {
        ...state.all,
        isAgreed: checkAllAgreed(newObject),
      };

      return newObject;
    }
  }
};

const useTerms = (initial: TermsState = initialState) => {
  const [state, dispatch] = useReducer(reducer, initial);

  return {
    state,
    isValid: Object.values(state)
      .filter(v => v.type === 'required')
      .every(v => v.isAgreed),
    toggle: (key: TermsKey) => dispatch({ type: 'TOGGLE_TERM', key }),
    agreeAll: () => dispatch({ type: 'SET_ALL_TERMS' }),
  };
};

export default useTerms;
