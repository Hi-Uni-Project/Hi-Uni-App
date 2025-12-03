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

import DatePickerInput from '@/features/record/editResume/components/DatePickerInput';
import ResumeHeader from '@/features/record/editResume/components/ResumeHeader';
import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import { GraduationStatus } from '@/features/record/editResume/types/domainType';
import {
  formatToShortDate,
  parseShortDate,
} from '@/features/record/editResume/utils/dateUtils';
import {
  GraduationStatusEnumToLabel,
  GraduationStatusLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';

type EducationRouteProp = RouteProp<RecordNavigationProps, 'EditEducation'>;

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

const EducationEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<EducationRouteProp>();

  const { resumeData, addEducation, updateEducation, deleteEducation } =
    useResumeEdit();

  // EditEducation인 경우 educationId(서버 id) 또는 tempId(클라이언트 임시 id)가 params로 전달됩니다
  const { educationId, tempId } = route.params ?? {};
  const isEditMode = educationId !== undefined || tempId !== undefined;
  const editTarget = isEditMode
    ? resumeData.educations.find(
        e =>
          (educationId !== undefined && e.educationId === educationId) ||
          (tempId !== undefined && e.tempId === tempId),
      )
    : undefined;

  // 로컬 폼 상태
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

  // 끝 날짜 입력 비활성화 여부
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
      endDate === null
    ) {
      return;
    }

    if (isEditMode && editTarget) {
      updateEducation({
        educationId: editTarget.educationId,
        tempId: editTarget.tempId,
        universityName,
        graduationStatus,
        startDate,
        endDate,
        major,
      });
    } else {
      addEducation({
        universityName,
        graduationStatus,
        startDate,
        endDate,
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
              {isEditMode ? '학력 수정하기' : '학력 추가하기'}
            </Text>
          </View>
        </Pressable>

        {isEditMode && (
          <Pressable className="mt-3" onPress={handleDelete}>
            <Text className="text-surface-400 typo-body-15-medium">
              학력 삭제하기
            </Text>
          </Pressable>
        )}
      </View>

      <ResumeHeader title="학력" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {/* 학교명 */}
            <View className="mt-[22px] px-5">
              <Text className="typo-body-17-semibold">
                학교명{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] w-[185px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="학교명을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                value={universityName}
                onChangeText={setUniversityName}
              />
            </View>

            {/* 졸업 상태 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">
                졸업 상태{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>

              <View className="mt-[9px] items-start">
                <HUDropdown
                  categoryName={
                    graduationStatus
                      ? GraduationStatusEnumToLabel[graduationStatus]
                      : '선택'
                  }
                  dropdownItems={Object.values(GraduationStatusEnumToLabel)}
                  onSelectItem={item => {
                    setGraduationStatus(GraduationStatusLabelToEnum[item]);
                  }}
                />
              </View>
            </View>

            {/* 재학 기간 */}
            <View className="mt-5 items-start px-5">
              <Text className="typo-body-17-semibold">
                재학 기간{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <View className="mt-[9px] flex-row items-center">
                <DatePickerInput
                  value={startDateStr}
                  onSelectDate={setStartDateStr}
                  placeholder="22.03.02"
                />

                <View className="mx-[11px] w-[14px] border-y-[1px] border-surface-300" />

                {isEndDateDisabled ? (
                  <View className="w-[144px] rounded-[15px] border-[1px] border-gray-200">
                    <TextInput
                      className="pb-[11px] pl-[14px] pt-[12px] text-surface-500 typo-body-15-regular"
                      value={endDateDisplayText || ''}
                      editable={true}
                    />
                  </View>
                ) : (
                  <DatePickerInput
                    value={endDateStr}
                    onSelectDate={setEndDateStr}
                    placeholder="26.02.28"
                  />
                )}
              </View>
            </View>

            {/* 전공 및 학위 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">
                전공 및 학위{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="전공 및 학위를 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                value={major}
                onChangeText={setMajor}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EducationEditView;
