import { create } from 'zustand';

import { ResumeEditForm } from '../types/domainType';

interface ResumeEditStore {
  resumeData: ResumeEditForm;
  initialResumeData: ResumeEditForm | null;

  setResumeData: (data: ResumeEditForm) => void;
  updateField: <K extends keyof ResumeEditForm>(
    field: K,
    value: ResumeEditForm[K],
  ) => void;
  resetStore: () => void;
  isDirty: () => boolean;
}

const initialState: ResumeEditForm = {
  photo: null,
  name: '',
  gender: null,
  birthYear: 0,
  title: '',
  aboutMe: '',
  aboutMeCnt: 5,
  careers: [],
  projects: [],
  educations: [],
  skills: [],
  languages: [],
  achievements: [],
  links: [],
  updateImage: false,
};

export const useResumeEditStore = create<ResumeEditStore>((set, get) => ({
  resumeData: initialState,
  initialResumeData: null,

  setResumeData: data =>
    set({ resumeData: data, initialResumeData: { ...data } }),

  updateField: (field, value) =>
    set(state => ({
      resumeData: {
        ...state.resumeData,
        [field]: value,
      },
    })),

  resetStore: () =>
    set({ resumeData: initialState, initialResumeData: { ...initialState } }),

  isDirty: () => {
    const state = get();
    if (!state.initialResumeData) {
      return false;
    }
    return (
      JSON.stringify(state.resumeData) !==
      JSON.stringify(state.initialResumeData)
    );
  },
}));
