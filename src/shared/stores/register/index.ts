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
  setMajorName: (majorName: string) => void;
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
    majorName: '',
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

      setMajorName: majorName =>
        set(state => ({
          univ: { ...state.univ, majorName },
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
