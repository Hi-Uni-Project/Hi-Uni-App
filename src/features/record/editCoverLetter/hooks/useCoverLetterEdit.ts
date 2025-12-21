import { useCallback, useEffect } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import useAiCoverLetter from './useAiCoverLetter';
import useCoverLetterForm from './useCoverLetterForm';
import useCoverLetterList from './useCoverLetterList';
import { useCoverLetterQueries } from './useCoverLetterQueries';
import useCoverLetterSave from './useCoverLetterSave';

import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditCoverLetterRouteProp = RouteProp<
  RecordNavigationProps,
  'EditCoverLetter'
>;

const useCoverLetterEdit = () => {
  const route = useRoute<EditCoverLetterRouteProp>();
  const coverLetterIdx = route.params?.coverLetterIdx;
  const isEditMode = coverLetterIdx !== undefined;

  const { coverLetterData, coverLetterLoading } = useCoverLetterQueries();

  const list = useCoverLetterList({
    initialData: coverLetterData?.data,
  });

  const form = useCoverLetterForm({
    dispatch: list.dispatch,
    currentIndex: list.currentIndex,
  });

  const save = useCoverLetterSave({
    coverLetters: list.coverLetters,
  });

  const aiCoverLetter = useAiCoverLetter({
    onSuccess: (question, answer) => {
      form.handleQuestionChange(question);
      form.handleAnswerChange(answer);
    },
  });

  const handleDeleteItem = useCallback(() => {
    const deletedId = list.handleDeleteItem();
    if (deletedId !== null) {
      save.addToDeleteList(deletedId);
    }
  }, [list, save]);

  useEffect(() => {
    list.selectItem(coverLetterIdx ?? 0);
  }, [coverLetterIdx, list.coverLetters.length]);

  return {
    coverLetters: list.coverLetters,
    currentIndex: list.currentIndex,
    currentItem: list.currentItem,
    isEditMode,
    coverLetterIdx,
    isLoading: coverLetterLoading,
    isSaving: save.isSaving,
    isSaveSuccess: save.isSaveSuccess,
    isDirty: list.isDirty,

    initializeFromServer: list.initializeFromServer,
    handleQuestionChange: form.handleQuestionChange,
    handleAnswerChange: form.handleAnswerChange,
    handleAddItem: list.handleAddItem,
    handleDeleteItem,
    selectItem: list.selectItem,
    handleSave: save.handleSave,

    ...aiCoverLetter,
  };
};

export default useCoverLetterEdit;
