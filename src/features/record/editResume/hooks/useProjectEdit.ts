import { useMemo, useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import { Project } from '@/features/record/editResume/types/domainType';
import {
  formatToShortDate,
  parseShortDate,
} from '@/features/record/editResume/utils/dateUtils';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditProjectRouteProp = RouteProp<RecordNavigationProps, 'EditProject'>;

interface ProjectFormFields {
  projectName: string;
  startDateStr: string;
  endDateStr: string;
  role: string;
  experienceDescription: string;
}

const useProjectEdit = () => {
  const navigation = useNavigation();
  const route = useRoute<EditProjectRouteProp>();
  const { resumeData, addProject, updateProject, deleteProject } =
    useResumeEdit();

  const { projectId, tempId } = route.params ?? {};
  const isEditMode = projectId !== undefined || tempId !== undefined;

  const editTarget: Project | undefined = isEditMode
    ? resumeData.projects.find(
        p =>
          (projectId !== undefined && p.projectId === projectId) ||
          (tempId !== undefined && p.tempId === tempId),
      )
    : undefined;

  const [projectName, setProjectName] = useState(editTarget?.projectName || '');
  const [startDateStr, setStartDateStr] = useState(
    editTarget?.startDate ? formatToShortDate(editTarget.startDate) : '',
  );
  const [endDateStr, setEndDateStr] = useState(
    editTarget?.endDate ? formatToShortDate(editTarget.endDate) : '',
  );
  const [role, setRole] = useState(editTarget?.role || '');
  const [experienceDescription, setExperienceDescription] = useState(
    editTarget?.experienceDescription || '',
  );

  const fields: ProjectFormFields = {
    projectName,
    startDateStr,
    endDateStr,
    role,
    experienceDescription,
  };

  const initialFields = useMemo(
    () => ({
      projectName: editTarget?.projectName || '',
      startDateStr: editTarget?.startDate
        ? formatToShortDate(editTarget.startDate)
        : '',
      endDateStr: editTarget?.endDate
        ? formatToShortDate(editTarget.endDate)
        : '',
      role: editTarget?.role || '',
      experienceDescription: editTarget?.experienceDescription || '',
    }),
    [editTarget],
  );

  const isDirty = useMemo(
    () => JSON.stringify(fields) !== JSON.stringify(initialFields),
    [fields, initialFields],
  );

  const setField = <K extends keyof ProjectFormFields>(
    key: K,
    value: ProjectFormFields[K],
  ) => {
    switch (key) {
      case 'projectName':
        setProjectName(value as string);
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
      case 'experienceDescription':
        setExperienceDescription(value as string);
        break;
    }
  };

  const isFormValid =
    projectName.trim() !== '' &&
    parseShortDate(startDateStr) !== null &&
    parseShortDate(endDateStr) !== null;

  const handleSubmit = () => {
    const startDate = parseShortDate(startDateStr);
    const endDate = parseShortDate(endDateStr);
    if (!isFormValid || startDate === null || endDate === null) {
      return;
    }

    if (isEditMode && editTarget) {
      updateProject({
        projectId: editTarget.projectId,
        tempId: editTarget.tempId,
        projectName,
        startDate,
        endDate,
        role,
        experienceDescription,
      });
    } else {
      addProject({
        projectName,
        startDate,
        endDate,
        role,
        experienceDescription,
      });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget) {
      deleteProject(editTarget.projectId ?? editTarget.tempId);
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

export default useProjectEdit;
