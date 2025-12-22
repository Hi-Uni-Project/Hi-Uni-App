import { useMemo, useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import {
  Language,
  LanguageLevel,
} from '@/features/record/editResume/types/domainType';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditLanguageRouteProp = RouteProp<RecordNavigationProps, 'EditLanguage'>;

interface LanguageFormFields {
  language: string;
  level: LanguageLevel | null;
}

const useLanguageEdit = () => {
  const navigation = useNavigation();
  const route = useRoute<EditLanguageRouteProp>();
  const { resumeData, addLanguage, updateLanguage, deleteLanguage } =
    useResumeEdit();

  const { languageId, tempId } = route.params ?? {};
  const isEditMode = languageId !== undefined || tempId !== undefined;

  const editTarget: Language | undefined = isEditMode
    ? resumeData.languages.find(
        l =>
          (languageId !== undefined && l.languageId === languageId) ||
          (tempId !== undefined && l.tempId === tempId),
      )
    : undefined;

  const [language, setLanguage] = useState(editTarget?.language || '');
  const [level, setLevel] = useState<LanguageLevel | null>(
    editTarget?.level || null,
  );

  const fields: LanguageFormFields = { language, level };

  const initialFields = useMemo(
    () => ({
      language: editTarget?.language || '',
      level: editTarget?.level || null,
    }),
    [editTarget],
  );

  const isDirty = useMemo(
    () => JSON.stringify(fields) !== JSON.stringify(initialFields),
    [fields, initialFields],
  );

  const setField = <K extends keyof LanguageFormFields>(
    key: K,
    value: LanguageFormFields[K],
  ) => {
    if (key === 'language') {
      setLanguage(value as string);
    } else if (key === 'level') {
      setLevel(value as LanguageLevel | null);
    }
  };

  const isFormValid = language.trim() !== '' && level !== null;

  const handleSubmit = () => {
    if (!isFormValid || level === null) {
      return;
    }

    if (isEditMode && editTarget) {
      updateLanguage({
        languageId: editTarget.languageId,
        tempId: editTarget.tempId,
        language,
        level,
      });
    } else {
      addLanguage({ language, level });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget) {
      deleteLanguage(editTarget.languageId ?? editTarget.tempId);
      navigation.goBack();
    }
  };

  return {
    fields,
    setField,
    isEditMode,
    isFormValid,
    isDirty,
    handleSubmit,
    handleDelete,
  };
};

export default useLanguageEdit;
