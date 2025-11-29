import { create } from 'zustand';

import { ResumeEditForm } from '../types/domainType';

const initialState: ResumeEditForm = {
  photo: null,
  name: '',
  gender: null,
  birthYear: 0,
  title: '',
  aboutMe: '',
  careers: [],
  projects: [],
  educations: [],
  skills: [],
  languages: [],
  achievements: [],
  links: [],
};

interface ResumeEditStore {
  resumeData: ResumeEditForm;

  // 기본 setter
  setResumeData: (data: ResumeEditForm) => void;
  updateField: <K extends keyof ResumeEditForm>(
    field: K,
    value: ResumeEditForm[K],
  ) => void;
  resetStore: () => void;
}

export const useResumeEditStore = create<ResumeEditStore>(set => ({
  resumeData: initialState,

  setResumeData: data => set({ resumeData: data }),

  updateField: (field, value) =>
    set(state => ({
      resumeData: {
        ...state.resumeData,
        [field]: value,
      },
    })),

  resetStore: () => set({ resumeData: initialState }),
}));
