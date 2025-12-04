import { useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import {
  Education,
  GraduationStatus,
} from '@/features/record/editResume/types/domainType';
import {
  formatToShortDate,
  parseShortDate,
} from '@/features/record/editResume/utils/dateUtils';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditEducationRouteProp = RouteProp<RecordNavigationProps, 'EditEducation'>;

interface EducationFormFields {
  universityName: string;
  graduationStatus: GraduationStatus | null;
  startDateStr: string;
  endDateStr: string;
  major: string;
}

// 끝 날짜 입력이 비활성화되는 졸업 상태
const DISABLED_END_DATE_STATUSES: GraduationStatus[] = [
  GraduationStatus.ENROLLED,
  GraduationStatus.LEAVE,
];

// 졸업 상태에 따른 끝 날짜 표시 텍스트
const END_DATE_DISPLAY_TEXT: Partial<Record<GraduationStatus, string>> = {
  [GraduationStatus.ENROLLED]: '재학 중',
  [GraduationStatus.LEAVE]: '휴학 중',
};

export default function useEducationEdit() {
  const navigation = useNavigation();
  const route = useRoute<EditEducationRouteProp>();
  const { resumeData, addEducation, updateEducation, deleteEducation } =
    useResumeEdit();

  const { educationId, tempId } = route.params ?? {};
  const isEditMode = educationId !== undefined || tempId !== undefined;

  const editTarget: Education | undefined = isEditMode
    ? resumeData.educations.find(
        e =>
          (educationId !== undefined && e.educationId === educationId) ||
          (tempId !== undefined && e.tempId === tempId),
      )
    : undefined;

  const [universityName, setUniversityName] = useState(
    editTarget?.universityName || '',
  );
  const [graduationStatus, setGraduationStatus] =
    useState<GraduationStatus | null>(editTarget?.graduationStatus || null);
  const [startDateStr, setStartDateStr] = useState(
    editTarget?.startDate ? formatToShortDate(editTarget.startDate) : '',
  );
  const [endDateStr, setEndDateStr] = useState(
    editTarget?.endDate ? formatToShortDate(editTarget.endDate) : '',
  );
  const [major, setMajor] = useState(editTarget?.major || '');

  const fields: EducationFormFields = {
    universityName,
    graduationStatus,
    startDateStr,
    endDateStr,
    major,
  };

  const setField = <K extends keyof EducationFormFields>(
    key: K,
    value: EducationFormFields[K],
  ) => {
    switch (key) {
      case 'universityName':
        setUniversityName(value as string);
        break;
      case 'graduationStatus':
        setGraduationStatus(value as GraduationStatus | null);
        break;
      case 'startDateStr':
        setStartDateStr(value as string);
        break;
      case 'endDateStr':
        setEndDateStr(value as string);
        break;
      case 'major':
        setMajor(value as string);
        break;
    }
  };

  // Education 특화 로직: 끝 날짜 비활성화 여부
  const isEndDateDisabled =
    graduationStatus !== null &&
    DISABLED_END_DATE_STATUSES.includes(graduationStatus);

  // 끝 날짜 표시 텍스트 (비활성화 시)
  const endDateDisplayText =
    graduationStatus !== null ? END_DATE_DISPLAY_TEXT[graduationStatus] : null;

  const isFormValid =
    universityName.trim() !== '' &&
    graduationStatus !== null &&
    parseShortDate(startDateStr) !== null &&
    (isEndDateDisabled || parseShortDate(endDateStr) !== null) &&
    major.trim() !== '';

  const handleSubmit = () => {
    const startDate = parseShortDate(startDateStr);
    const endDate = parseShortDate(endDateStr);
    if (
      !isFormValid ||
      graduationStatus === null ||
      startDate === null ||
      (!isEndDateDisabled && endDate === null)
    ) {
      return;
    }

    const finalEndDate = isEndDateDisabled ? startDate : endDate!;

    if (isEditMode && editTarget) {
      updateEducation({
        educationId: editTarget.educationId,
        tempId: editTarget.tempId,
        universityName,
        graduationStatus,
        startDate,
        endDate: finalEndDate,
        major,
      });
    } else {
      addEducation({
        universityName,
        graduationStatus,
        startDate,
        endDate: finalEndDate,
        major,
      });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget) {
      deleteEducation(editTarget.educationId ?? editTarget.tempId);
      navigation.goBack();
    }
  };

  return {
    fields,
    setField,
    isEditMode,
    isFormValid,
    isEndDateDisabled,
    endDateDisplayText,
    handleSubmit,
    handleDelete,
  };
}
