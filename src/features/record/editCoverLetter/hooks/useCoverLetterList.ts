import { useReducer, useCallback, useEffect, useRef, useMemo } from 'react';

import { CoverLetter, CoverLetterDataResponse } from '../types/CoverLetterType';

import { coverLetterReducer, Action } from './coverLetterReducer';

function createNewCoverLetter(): CoverLetter {
  return {
    coverLetterId: null,
    tempId: new Date().toISOString(),
    question: '',
    answer: '',
  };
}

type UseCoverLetterListParams = {
  initialData?: CoverLetterDataResponse;
};

const useCoverLetterList = ({ initialData }: UseCoverLetterListParams) => {
  const defaultCoverLetters = useMemo(() => [createNewCoverLetter()], []);

  const [state, dispatch] = useReducer(coverLetterReducer, {
    coverLetters: defaultCoverLetters,
    currentIndex: 0,
  });

  const initialCoverLettersRef = useRef<CoverLetter[] | null>(null);

  useEffect(() => {
    if (initialData?.coverLetters) {
      dispatch({
        type: 'INIT_FROM_SERVER',
        payload: initialData.coverLetters,
      });

      initialCoverLettersRef.current = initialData.coverLetters.map(item => {
        if (item.coverLetterId !== null) {
          return {
            tempId: null,
            coverLetterId: item.coverLetterId,
            question: item.question,
            answer: item.answer,
          } as CoverLetter;
        } else {
          return {
            tempId: item.tempId,
            coverLetterId: null,
            question: item.question,
            answer: item.answer,
          } as CoverLetter;
        }
      });
    } else if (!initialCoverLettersRef.current) {
      initialCoverLettersRef.current = defaultCoverLetters;
    }
  }, [initialData, defaultCoverLetters]);

  const currentItem = state.coverLetters[state.currentIndex];

  const isDirty = useMemo(() => {
    const init = initialCoverLettersRef.current;
    if (!init) {
      return false;
    }

    if (init.length !== state.coverLetters.length) {
      return true;
    }

    return init.some((a, idx) => {
      const b = state.coverLetters[idx];
      const bTempId = b.coverLetterId === null ? b.tempId : null;

      return (
        a.tempId !== bTempId ||
        a.coverLetterId !== b.coverLetterId ||
        a.question !== b.question ||
        a.answer !== b.answer
      );
    });
  }, [state.coverLetters]);

  const selectItem = useCallback((index: number) => {
    dispatch({ type: 'SET_INDEX', payload: { index } });
  }, []);

  const handleAddItem = useCallback(() => {
    dispatch({ type: 'ADD_ITEM', payload: createNewCoverLetter() });
  }, []);

  const handleDeleteItem = useCallback((): number | null => {
    const target = state.coverLetters[state.currentIndex];
    const deletedId = target?.coverLetterId ?? null;

    dispatch({
      type: 'DELETE_ITEM',
      payload: { index: state.currentIndex },
    });

    return deletedId;
  }, [state.currentIndex, state.coverLetters]);

  const initializeFromServer = useCallback((data: CoverLetter[]) => {
    dispatch({ type: 'INIT_FROM_SERVER', payload: data });
  }, []);

  return {
    coverLetters: state.coverLetters,
    currentIndex: state.currentIndex,
    currentItem,
    isDirty,
    dispatch,
    selectItem,
    handleAddItem,
    handleDeleteItem,
    initializeFromServer,
  };
};

export type { Action };
export default useCoverLetterList;
