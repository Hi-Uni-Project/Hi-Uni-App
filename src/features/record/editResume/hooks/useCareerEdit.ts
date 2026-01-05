import { useMemo, useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import { Career } from '@/features/record/editResume/types/domainType';
import {
  formatToShortDate,
  parseShortDate,
} from '@/features/record/editResume/utils/dateUtils';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditCareerRouteProp = RouteProp<RecordNavigationProps, 'EditCareer'>;

interface CareerFormFields {
  companyName: string;
  startDateStr: string;
  endDateStr: string;
  role: string;
  position: string;
  jobDescription: string;
}

const useCareerEdit = () => {
  const navigation = useNavigation();
  const route = useRoute<EditCareerRouteProp>();
  const { resumeData, addCareer, updateCareer, deleteCareer } = useResumeEdit();

  const { careerId, tempId } = route.params ?? {};
  const isEditMode = careerId !== undefined || tempId !== undefined;

  const editTarget: Career | undefined = isEditMode
    ? resumeData.careers.find(
        c =>
          (careerId !== undefined && c.careerId === careerId) ||
          (tempId !== undefined && c.tempId === tempId),
      )
    : undefined;

  const [companyName, setCompanyName] = useState(editTarget?.companyName || '');
  const [startDateStr, setStartDateStr] = useState(
    editTarget?.startDate ? formatToShortDate(editTarget.startDate) : '',
  );
  const [endDateStr, setEndDateStr] = useState(
    editTarget?.endDate ? formatToShortDate(editTarget.endDate) : '',
  );
  const [role, setRole] = useState(editTarget?.role || '');
  const [position, setPosition] = useState(editTarget?.position || '');
  const [jobDescription, setJobDescription] = useState(
    editTarget?.jobDescription || '',
  );

  const initialFields = useMemo(
    () => ({
      companyName: editTarget?.companyName || '',
      startDateStr: editTarget?.startDate
        ? formatToShortDate(editTarget.startDate)
        : '',
      endDateStr: editTarget?.endDate
        ? formatToShortDate(editTarget.endDate)
        : '',
      role: editTarget?.role || '',
      position: editTarget?.position || '',
      jobDescription: editTarget?.jobDescription || '',
    }),
    [editTarget],
  );

  const fields: CareerFormFields = {
    companyName,
    startDateStr,
    endDateStr,
    role,
    position,
    jobDescription,
  };

  const isDirty = useMemo(
    () => JSON.stringify(fields) !== JSON.stringify(initialFields),
    [fields, initialFields],
  );

  const setField = <K extends keyof CareerFormFields>(
    key: K,
    value: CareerFormFields[K],
  ) => {
    switch (key) {
      case 'companyName':
        setCompanyName(value as string);
        break;
      case 'startDateStr':
        setStartDateStr(value as string);
        break;
      case 'endDateStr':
        setEndDateStr(value as string);
        break;
      case 'role':
        setRole(value as string);
        break;
      case 'position':
        setPosition(value as string);
        break;
      case 'jobDescription':
        setJobDescription(value as string);
        break;
    }
  };

  const isFormValid =
    companyName.trim() !== '' &&
    parseShortDate(startDateStr) !== null &&
    parseShortDate(endDateStr) !== null &&
    role.trim() !== '';

  const handleSubmit = () => {
    const startDate = parseShortDate(startDateStr);
    const endDate = parseShortDate(endDateStr);
    if (!isFormValid || startDate === null || endDate === null) {
      return;
    }

    if (isEditMode && editTarget) {
      updateCareer({
        careerId: editTarget.careerId,
        tempId: editTarget.tempId,
        companyName,
        startDate,
        endDate,
        role,
        position,
        jobDescription,
      });
    } else {
      addCareer({
        companyName,
        startDate,
        endDate,
        role,
        position,
        jobDescription,
      });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget) {
      deleteCareer(editTarget.careerId ?? editTarget.tempId);
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

export default useCareerEdit;
