import { useCallback, useState } from 'react';

import { CoverLetter } from '../types/CoverLetterType';

import useCoverLetterMutation from './useCoverLetterMutation';

type UseCoverLetterSaveParams = {
  coverLetters: CoverLetter[];
};

const useCoverLetterSave = ({ coverLetters }: UseCoverLetterSaveParams) => {
  const [deleteIdList, setDeleteIdList] = useState<number[]>([]);

  const { saveCoverLetter, isSaving, isSaveSuccess, deleteCoverLetter } =
    useCoverLetterMutation();

  const addToDeleteList = useCallback((id: number) => {
    setDeleteIdList(prev => [...prev, id]);
  }, []);

  const getRequestData = useCallback(() => {
    return coverLetters.map(item => ({
      coverLetterId: item.coverLetterId,
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));
  }, [coverLetters]);

  const handleSave = useCallback(() => {
    const requestData = getRequestData();
    saveCoverLetter(requestData as CoverLetter[]);
    deleteIdList.forEach(id => {
      deleteCoverLetter(id);
    });
  }, [getRequestData, saveCoverLetter, deleteCoverLetter, deleteIdList]);

  return {
    handleSave,
    addToDeleteList,
    isSaving,
    isSaveSuccess,
  };
};

export default useCoverLetterSave;
