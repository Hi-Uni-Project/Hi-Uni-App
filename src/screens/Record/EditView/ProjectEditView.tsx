import React, { useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ResumeBackHeader from '@/features/record/editResume/components/ResumeBackHeader';
import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import {
  formatToShortDate,
  parseShortDate,
} from '@/features/record/editResume/utils/dateUtils';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type ProjectRouteProp = RouteProp<RecordNavigationProps, 'EditProject'>;

const ProjectEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<ProjectRouteProp>();

  const { resumeData, addProject, updateProject, deleteProject } =
    useResumeEdit();

  // EditProject인 경우 projectId가 params로 전달됨
  const editProjectId = route.params?.projectId;
  const isEditMode = editProjectId !== undefined;
  const editTarget = isEditMode
    ? resumeData.projects.find(p => p.projectId === editProjectId)
    : undefined;

  // 로컬 폼 상태
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
    if (isEditMode && editTarget && editTarget.projectId !== null) {
      deleteProject(editTarget.projectId);
      navigation.goBack();
    }
  };

  return (
    <View className="flex-1 bg-surface-50">
      <View
        className="absolute w-full items-center justify-center"
        style={{
          bottom:
            Platform.OS === 'ios' ? insets.bottom + 10 : insets.bottom + 20,
        }}>
        <Pressable onPress={handleSubmit} disabled={!isFormValid}>
          <View
            className={`flex-row items-center rounded-full px-[27px] py-[14px] ${
              isFormValid ? 'bg-main-text' : 'bg-surface-300'
            }`}>
            <Text className="text-surface-200 typo-body-16-medium">
              {isEditMode ? '프로젝트 수정하기' : '프로젝트 추가하기'}
            </Text>
          </View>
        </Pressable>

        {isEditMode && (
          <Pressable className="mt-3" onPress={handleDelete}>
            <Text className="text-surface-400 typo-body-15-medium">
              프로젝트 삭제하기
            </Text>
          </Pressable>
        )}
      </View>

      <ResumeBackHeader title="프로젝트" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {/* 프로젝트명 */}
            <View className="mt-[22px] px-5">
              <Text className="typo-body-17-semibold">
                프로젝트명{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] w-[185px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="프로젝트명을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                value={projectName}
                onChangeText={setProjectName}
              />
            </View>

            {/* 활동 기간 */}
            <View className="mt-5 items-start px-5">
              <Text className="typo-body-17-semibold">
                활동 기간{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <View className="mt-[9px] flex-row items-end">
                <View>
                  <Text className="typo-body-12-regular mb-[4px] ml-[2px] text-surface-400">
                    시작일
                  </Text>
                  <TextInput
                    className="w-[144px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                    placeholder="22.06.23"
                    placeholderTextColor={'#B7B7B7'}
                    value={startDateStr}
                    onChangeText={setStartDateStr}
                  />
                </View>

                <View className="mx-[11px] mb-[18px] w-[14px] border-y-[1px] border-surface-300" />

                <View>
                  <Text className="typo-body-12-regular mb-[4px] ml-[2px] text-surface-400">
                    종료일
                  </Text>
                  <TextInput
                    className="w-[144px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                    placeholder="22.06.23"
                    placeholderTextColor={'#B7B7B7'}
                    value={endDateStr}
                    onChangeText={setEndDateStr}
                  />
                </View>
              </View>
            </View>

            {/* 역할 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">역할</Text>
              <TextInput
                className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="역할을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                value={role}
                onChangeText={setRole}
              />
            </View>

            {/* 경험 및 성과 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">경험 및 성과</Text>
              <TextInput
                className="mt-[9px] h-[98px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="경험 및 성과를 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                textAlignVertical="top"
                multiline={true}
                value={experienceDescription}
                onChangeText={setExperienceDescription}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProjectEditView;
