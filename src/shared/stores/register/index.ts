import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { TosData, UnivData } from '../register/types';

interface RegisterStore {
  tos: TosData;
  univ: UnivData;

  setTos: (tos: Partial<TosData>) => void;
  setUniv: (univ: Partial<UnivData>) => void;
  setUnivName: (univName: string) => void;
  setFirstMajorName: (firstMajorName: string) => void;
  setSecondMajorName: (secondMajorName: string) => void;
  setUnivEmail: (univEmail: string) => void;

  resetAll: () => void;
}

const initialState = {
  tos: {
    serviceTosIsAgreed: false,
    personalInfoTosIsAgreed: false,
    marketingTosIsAgreed: false,
    serviceImprovementTosIsAgreed: false,
    inPersonTosIsAgreed: false,
  },
  univ: {
    univName: '',
    firstMajorName: '',
    secondMajorName: '',
    univEmail: '',
  },
};

export const useRegisterStore = create<RegisterStore>()(
  persist(
    set => ({
      ...initialState,

      setTos: tos =>
        set(state => ({
          tos: { ...state.tos, ...tos },
        })),

      setUniv: univ =>
        set(state => ({
          univ: { ...state.univ, ...univ },
        })),

      setUnivName: univName =>
        set(state => ({
          univ: { ...state.univ, univName },
        })),

      setFirstMajorName: firstMajorName =>
        set(state => ({
          univ: { ...state.univ, firstMajorName },
        })),

      setSecondMajorName: secondMajorName =>
        set(state => ({
          univ: { ...state.univ, secondMajorName },
        })),

      setUnivEmail: univEmail =>
        set(state => ({
          univ: { ...state.univ, univEmail },
        })),

      resetAll: () => set(initialState),
    }),
    {
      name: 'register-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
