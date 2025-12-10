import { useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import {
  Achievement,
  AchievementType,
} from '@/features/record/editResume/types/domainType';
import {
  formatToShortDate,
  parseShortDate,
} from '@/features/record/editResume/utils/dateUtils';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditAchievementRouteProp = RouteProp<
  RecordNavigationProps,
  'EditAchievement'
>;

interface AchievementFormFields {
  type: AchievementType | null;
  activityName: string;
  periodDateStr: string;
  achievementDescription: string;
}

const useAchievementEdit = () => {
  const navigation = useNavigation();
  const route = useRoute<EditAchievementRouteProp>();
  const { resumeData, addAchievement, updateAchievement, deleteAchievement } =
    useResumeEdit();

  const { achievementId, tempId } = route.params ?? {};
  const isEditMode = achievementId !== undefined || tempId !== undefined;

  const editTarget: Achievement | undefined = isEditMode
    ? resumeData.achievements.find(
        a =>
          (achievementId !== undefined && a.achievementId === achievementId) ||
          (tempId !== undefined && a.tempId === tempId),
      )
    : undefined;

  const [type, setType] = useState<AchievementType | null>(
    editTarget?.type || null,
  );
  const [activityName, setActivityName] = useState(
    editTarget?.activityName || '',
  );
  const [periodDateStr, setPeriodDateStr] = useState(
    editTarget?.periodDate ? formatToShortDate(editTarget.periodDate) : '',
  );
  const [achievementDescription, setAchievementDescription] = useState(
    editTarget?.achievementDescription || '',
  );

  const fields: AchievementFormFields = {
    type,
    activityName,
    periodDateStr,
    achievementDescription,
  };

  const setField = <K extends keyof AchievementFormFields>(
    key: K,
    value: AchievementFormFields[K],
  ) => {
    if (key === 'type') {
      setType(value as AchievementType | null);
    } else if (key === 'activityName') {
      setActivityName(value as string);
    } else if (key === 'periodDateStr') {
      setPeriodDateStr(value as string);
    } else if (key === 'achievementDescription') {
      setAchievementDescription(value as string);
    }
  };

  const isFormValid =
    type !== null &&
    activityName.trim() !== '' &&
    parseShortDate(periodDateStr) !== null;

  const handleSubmit = () => {
    const periodDate = parseShortDate(periodDateStr);
    if (!isFormValid || type === null || periodDate === null) {
      return;
    }

    if (isEditMode && editTarget) {
      updateAchievement({
        achievementId: editTarget.achievementId,
        tempId: editTarget.tempId,
        type,
        activityName,
        periodDate,
        achievementDescription,
      });
    } else {
      addAchievement({
        type,
        activityName,
        periodDate,
        achievementDescription,
      });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget) {
      deleteAchievement(editTarget.achievementId ?? editTarget.tempId);
      navigation.goBack();
    }
  };

  return {
    fields,
    setField,
    isEditMode,
    isFormValid,
    handleSubmit,
    handleDelete,
  };
};

export default useAchievementEdit;
