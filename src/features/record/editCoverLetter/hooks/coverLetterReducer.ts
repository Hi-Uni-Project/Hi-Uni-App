import { CoverLetter } from '../types/CoverLetterType';

export type State = {
  coverLetters: CoverLetter[];
  currentIndex: number;
};

export type Action =
  | { type: 'INIT_FROM_SERVER'; payload: CoverLetter[] }
  | { type: 'UPDATE_QUESTION'; payload: { index: number; text: string } }
  | { type: 'UPDATE_ANSWER'; payload: { index: number; text: string } }
  | { type: 'ADD_ITEM'; payload: CoverLetter }
  | { type: 'DELETE_ITEM'; payload: { index: number } }
  | { type: 'SET_INDEX'; payload: { index: number } };

export const coverLetterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INIT_FROM_SERVER':
      return {
        coverLetters: action.payload,
        currentIndex: 0,
      };

    case 'UPDATE_QUESTION': {
      const { index, text } = action.payload;
      const updated = [...state.coverLetters];
      const item = updated[index];

      if (!item) {
        return state;
      }
      updated[index] = { ...item, question: text };

      return { ...state, coverLetters: updated };
    }

    case 'UPDATE_ANSWER': {
      const { index, text } = action.payload;
      const updated = [...state.coverLetters];
      const item = updated[index];

      if (!item) {
        return state;
      }
      updated[index] = { ...item, answer: text };

      return { ...state, coverLetters: updated };
    }

    case 'ADD_ITEM':
      return {
        coverLetters: [...state.coverLetters, action.payload],
        currentIndex: state.currentIndex + 1,
      };

    case 'DELETE_ITEM': {
      if (state.coverLetters.length <= 1) {
        return state;
      }

      const filtered = state.coverLetters.filter(
        (_, idx) => idx !== action.payload.index,
      );

      return {
        coverLetters: filtered,
        currentIndex: Math.max(0, state.currentIndex - 1),
      };
    }

    case 'SET_INDEX':
      return { ...state, currentIndex: action.payload.index };

    default:
      return state;
  }
};
