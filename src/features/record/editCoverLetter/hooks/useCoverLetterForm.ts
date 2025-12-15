import { useCallback, Dispatch } from 'react';

import { Action } from './coverLetterReducer';

type UseCoverLetterFormParams = {
  dispatch: Dispatch<Action>;
  currentIndex: number;
};

const useCoverLetterForm = ({
  dispatch,
  currentIndex,
}: UseCoverLetterFormParams) => {
  const handleQuestionChange = useCallback(
    (text: string) => {
      dispatch({
        type: 'UPDATE_QUESTION',
        payload: { index: currentIndex, text },
      });
    },
    [dispatch, currentIndex],
  );

  const handleAnswerChange = useCallback(
    (text: string) => {
      dispatch({
        type: 'UPDATE_ANSWER',
        payload: { index: currentIndex, text },
      });
    },
    [dispatch, currentIndex],
  );

  return {
    handleQuestionChange,
    handleAnswerChange,
  };
};

export default useCoverLetterForm;
