import { useReducer, useCallback, useEffect, useState } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import { CoverLetter } from '../types/CoverLetterType';

import { coverLetterReducer } from './coverLetterReducer';
import useCoverLetterMutation from './useCoverLetterMutation';
import { useCoverLetterQueries } from './useCoverLetterQueries';

import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditCoverLetterRouteProp = RouteProp<
  RecordNavigationProps,
  'EditCoverLetter'
>;

const useCoverLetterEdit = () => {
  const route = useRoute<EditCoverLetterRouteProp>();
  const coverLetterId = route.params?.coverLetterId;
  const isEditMode = coverLetterId !== undefined;
  const [deleteIdList, setDeleteIdList] = useState<number[]>([]);

  const { coverLetterData, coverLetterLoading } = useCoverLetterQueries();
  const { saveCoverLetter, isSaving, isSaveSuccess, deleteCoverLetter } =
    useCoverLetterMutation();

  const [state, dispatch] = useReducer(coverLetterReducer, {
    coverLetters: [createNewCoverLetter()],
    currentIndex: 0,
  });

  // 서버 데이터로 초기화
  useEffect(() => {
    if (coverLetterData?.data.coverLetters) {
      dispatch({
        type: 'INIT_FROM_SERVER',
        payload: coverLetterData.data.coverLetters,
      });
    }
  }, [coverLetterData]);

  const currentItem = state.coverLetters[state.currentIndex];

  // 서버에서 불러온 CoverLetter로 초기화
  const initializeFromServer = useCallback((data: CoverLetter[]) => {
    dispatch({ type: 'INIT_FROM_SERVER', payload: data });
  }, []);

  function createNewCoverLetter(): CoverLetter {
    return {
      coverLetterId: null,
      tempId: new Date().toISOString(),
      question: '',
      answer: '',
    };
  }

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
    const targetId = state.coverLetters.find(
      (item, idx) => idx === state.currentIndex,
    )?.coverLetterId;

    if (targetId !== undefined) {
      setDeleteIdList(prev => [...prev, targetId]);
      console.log('Deleting cover letter with ID:', targetId);
    } else {
      console.log('No cover letter ID to delete.');
    }

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

  // 자기소개서 저장
  const handleSave = useCallback(() => {
    const requestData = getRequestData();

    console.log('Saving cover letters:', requestData);

    saveCoverLetter(requestData as CoverLetter[]);

    deleteIdList.forEach(id => {
      deleteCoverLetter(id);
    });
  }, [getRequestData, saveCoverLetter, deleteCoverLetter, deleteIdList]);

  return {
    coverLetters: state.coverLetters,
    currentIndex: state.currentIndex,
    currentItem,
    isEditMode,
    coverLetterId,
    isLoading: coverLetterLoading,
    isSaving,
    isSaveSuccess,

    initializeFromServer,
    handleQuestionChange,
    handleAnswerChange,
    handleAddItem,
    handleDeleteItem,
    selectItem,
    getRequestData,
    handleSave,
  };
};

export default useCoverLetterEdit;
