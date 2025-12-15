import {
  useReducer,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import { AxiosError } from 'axios';

import { getAiGenerateCount } from '../api/coverLetterApi';
import { AiCoverLetterResponse, CoverLetter } from '../types/CoverLetterType';

import { coverLetterReducer } from './coverLetterReducer';
import useCoverLetterMutation from './useCoverLetterMutation';
import { useCoverLetterQueries } from './useCoverLetterQueries';

import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditCoverLetterRouteProp = RouteProp<
  RecordNavigationProps,
  'EditCoverLetter'
>;

type AiErrorType = 'limitExceeded' | 'noReview' | null;

const useCoverLetterEdit = () => {
  const route = useRoute<EditCoverLetterRouteProp>();
  const coverLetterId = route.params?.coverLetterId;
  const isEditMode = coverLetterId !== undefined;
  const [deleteIdList, setDeleteIdList] = useState<number[]>([]);

  const [isAiModalVisible, setIsAiModalVisible] = useState(false);
  const [aiGenerateCount, setAiGenerateCount] = useState(5);
  const [aiErrorType, setAiErrorType] = useState<AiErrorType>(null);

  const { coverLetterData, coverLetterLoading } = useCoverLetterQueries();
  const {
    saveCoverLetter,
    isSaving,
    isSaveSuccess,
    deleteCoverLetter,
    generateAiCoverLetterAsync,
    isGenerating,
  } = useCoverLetterMutation();

  const [state, dispatch] = useReducer(coverLetterReducer, {
    coverLetters: [createNewCoverLetter()],
    currentIndex: 0,
  });

  const initialCoverLettersRef = useRef<CoverLetter[] | null>(null);

  // 서버 데이터로 초기화
  useEffect(() => {
    if (coverLetterData?.data.coverLetters) {
      dispatch({
        type: 'INIT_FROM_SERVER',
        payload: coverLetterData.data.coverLetters,
      });

      initialCoverLettersRef.current = coverLetterData.data.coverLetters.map(
        item => {
          if (item.coverLetterId !== null) {
            return {
              tempId: undefined,
              coverLetterId: item.coverLetterId,
              question: item.question,
              answer: item.answer,
            };
          } else {
            return {
              tempId: item.tempId,
              coverLetterId: null,
              question: item.question,
              answer: item.answer,
            };
          }
        },
      );
    }
  }, [coverLetterData]);

  useEffect(() => {
    getAiGenerateCount().then(data => {
      setAiGenerateCount(data.data.coverletterCnt);
    });
  }, []);

  const currentItem = state.coverLetters[state.currentIndex];

  const isDirty = useMemo(() => {
    if (!initialCoverLettersRef.current) {
      return false;
    }

    return (
      JSON.stringify(initialCoverLettersRef.current) !==
      JSON.stringify(state.coverLetters)
    );
  }, [state.coverLetters]);

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

  // AI 모달 열기
  const openAiModal = useCallback(() => {
    setIsAiModalVisible(true);
  }, []);

  // AI 모달 닫기
  const closeAiModal = useCallback(() => {
    setIsAiModalVisible(false);
  }, []);

  // 에러 모달 닫기
  const closeAiErrorModal = useCallback(() => {
    setAiErrorType(null);
  }, []);

  // AI 자기소개서 생성
  const handleGenerateAiCoverLetter = useCallback(
    async ({ role, question }: { role: string; question: string }) => {
      try {
        const result: AiCoverLetterResponse = await generateAiCoverLetterAsync({
          role,
          question,
        });

        if (result?.data?.answer) {
          handleQuestionChange(question);
          handleAnswerChange(result.data.answer);
        }
        if (result?.data?.coverletterCnt !== undefined) {
          setAiGenerateCount(result.data.coverletterCnt);
        }
        setIsAiModalVisible(false);

        return result;
      } catch (e) {
        console.error('AI generate error:', e);
        setIsAiModalVisible(false);

        if (e instanceof AxiosError && e.response) {
          const status = e.response.status;

          if (status === 403) {
            setAiErrorType('limitExceeded');
            return;
          }

          if (status === 404) {
            setAiErrorType('noReview');
            return;
          }
        }

        throw e;
      }
    },
    [generateAiCoverLetterAsync, handleAnswerChange],
  );

  return {
    coverLetters: state.coverLetters,
    currentIndex: state.currentIndex,
    currentItem,
    isEditMode,
    coverLetterId,
    isLoading: coverLetterLoading,
    isSaving,
    isSaveSuccess,
    isGenerating,

    isAiModalVisible,
    aiGenerateCount,
    aiErrorType,
    openAiModal,
    closeAiModal,
    closeAiErrorModal,
    handleGenerateAiCoverLetter,

    initializeFromServer,
    handleQuestionChange,
    handleAnswerChange,
    handleAddItem,
    handleDeleteItem,
    selectItem,
    getRequestData,
    handleSave,

    isDirty,
  };
};

export default useCoverLetterEdit;
