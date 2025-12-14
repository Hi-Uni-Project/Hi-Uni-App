import { useReducer, useCallback } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import { CoverLetter } from '../types/CoverLetterType';

import { coverLetterReducer } from './coverLetterReducer';

import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditCoverLetterRouteProp = RouteProp<
  RecordNavigationProps,
  'EditCoverLetter'
>;

const useCoverLetterEdit = () => {
  const route = useRoute<EditCoverLetterRouteProp>();
  const coverLetterId = route.params?.coverLetterId;
  const isEditMode = coverLetterId !== undefined;

  function createNewCoverLetter(): CoverLetter {
    return {
      coverLetterId: null,
      tempId: new Date().toISOString(),
      question: '',
      answer: '',
    };
  }

  const [state, dispatch] = useReducer(coverLetterReducer, {
    coverLetters: [createNewCoverLetter()],
    currentIndex: 0,
  });

  const currentItem = state.coverLetters[state.currentIndex];

  // 서버에서 불러온 CoverLetter로 초기화
  const initializeFromServer = useCallback((data: CoverLetter[]) => {
    dispatch({ type: 'INIT_FROM_SERVER', payload: data });
  }, []);

  // 질문 변경
  const handleQuestionChange = useCallback(
    (text: string) => {
      dispatch({
        type: 'UPDATE_QUESTION',
        payload: { index: state.currentIndex, text },
      });
    },
    [state.currentIndex],
  );

  // 답변 변경
  const handleAnswerChange = useCallback(
    (text: string) => {
      dispatch({
        type: 'UPDATE_ANSWER',
        payload: { index: state.currentIndex, text },
      });
    },
    [state.currentIndex],
  );

  // 새 문항 추가
  const handleAddItem = useCallback(() => {
    dispatch({ type: 'ADD_ITEM', payload: createNewCoverLetter() });
  }, []);

  // 현재 문항 삭제
  const handleDeleteItem = useCallback(() => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: { index: state.currentIndex },
    });
  }, [state.currentIndex]);

  // 특정 문항 선택
  const selectItem = useCallback((index: number) => {
    dispatch({ type: 'SET_INDEX', payload: { index } });
  }, []);

  // 요청 데이터로 변환 (서버 전송용)
  const getRequestData = useCallback(() => {
    return state.coverLetters.map(item => ({
      coverLetterId: item.coverLetterId,
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));
  }, [state.coverLetters]);

  return {
    // 상태
    coverLetters: state.coverLetters,
    currentIndex: state.currentIndex,
    currentItem,
    isEditMode,
    coverLetterId,

    // 액션
    initializeFromServer,
    handleQuestionChange,
    handleAnswerChange,
    handleAddItem,
    handleDeleteItem,
    selectItem,
    getRequestData,
  };
};

export default useCoverLetterEdit;
