import { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { getAiGenerateCount } from '../api/coverLetterApi';
import { AiCoverLetterResponse } from '../types/CoverLetterType';

import useCoverLetterMutation from './useCoverLetterMutation';

export type AiErrorType = 'limitExceeded' | 'noReview' | null;

type UseAiCoverLetterParams = {
  onSuccess: (question: string, answer: string) => void;
};

const useAiCoverLetter = ({ onSuccess }: UseAiCoverLetterParams) => {
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);
  const [aiGenerateCount, setAiGenerateCount] = useState(5);
  const [aiErrorType, setAiErrorType] = useState<AiErrorType>(null);

  const { generateAiCoverLetterAsync, isGenerating } = useCoverLetterMutation();

  useEffect(() => {
    getAiGenerateCount().then(data => {
      setAiGenerateCount(data.data.coverletterCnt);
    });
  }, []);

  const openAiModal = useCallback(() => {
    setIsAiModalVisible(true);
  }, []);

  const closeAiModal = useCallback(() => {
    setIsAiModalVisible(false);
  }, []);

  const closeAiErrorModal = useCallback(() => {
    setAiErrorType(null);
  }, []);

  const handleGenerateAiCoverLetter = useCallback(
    async ({ role, question }: { role: string; question: string }) => {
      try {
        const result: AiCoverLetterResponse = await generateAiCoverLetterAsync({
          role,
          question,
        });

        if (result?.data?.answer) {
          onSuccess(question, result.data.answer);
        }
        if (result?.data?.coverletterCnt !== undefined) {
          setAiGenerateCount(result.data.coverletterCnt);
        }
        setIsAiModalVisible(false);

        return result;
      } catch (e) {
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
      }
    },
    [generateAiCoverLetterAsync, onSuccess],
  );

  return {
    isAiModalVisible,
    aiGenerateCount,
    aiErrorType,
    isGenerating,
    openAiModal,
    closeAiModal,
    closeAiErrorModal,
    handleGenerateAiCoverLetter,
  };
};

export default useAiCoverLetter;
