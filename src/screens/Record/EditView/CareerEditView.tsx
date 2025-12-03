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
import {
  formatToShortDate,
  parseShortDate,
} from '@/features/record/editResume/utils/dateUtils';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type CareerRouteProp = RouteProp<RecordNavigationProps, 'EditCareer'>;

const CareerEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<CareerRouteProp>();

  const { resumeData, addCareer, updateCareer, deleteCareer } = useResumeEdit();

  // EditCareer인 경우 careerId(서버 id) 또는 tempId(클라이언트 임시 id)가 params로 전달됩니다
  const { careerId, tempId } = route.params ?? {};
  const isEditMode = careerId !== undefined || tempId !== undefined;
  const editTarget = isEditMode
    ? resumeData.careers.find(c => {
        return (
          (careerId !== undefined && c.careerId === careerId) ||
          (tempId !== undefined && c.tempId === tempId)
        );
      })
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

  const isFormValid =
    companyName.trim() !== '' &&
    parseShortDate(startDateStr) !== null &&
    parseShortDate(endDateStr) !== null;

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
              {isEditMode ? '경력 수정하기' : '경력 추가하기'}
            </Text>
          </View>
        </Pressable>

        {isEditMode && (
          <Pressable className="mt-3" onPress={handleDelete}>
            <Text className="text-surface-400 typo-body-15-medium">
              경력 삭제하기
            </Text>
          </Pressable>
        )}
      </View>

      <ResumeHeader
        title="경력"
        rightButtonText="불러오기"
        onRightButtonPress={() => {}}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {/* 회사명 */}
            <View className="mt-[22px] px-5">
              <Text className="typo-body-17-semibold">
                회사명{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] w-[185px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="회사명을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                value={companyName}
                onChangeText={setCompanyName}
              />
            </View>

            {/* 재직 기간 */}
            <View className="mt-5 items-start px-5">
              <Text className="typo-body-17-semibold">
                재직 기간{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <View className="mt-[9px] flex-row items-end">
                <View>
                  <Text className="typo-body-12-regular mb-[4px] ml-[2px] text-surface-400">
                    시작일
                  </Text>
                  <DatePickerInput
                    value={startDateStr}
                    onSelectDate={setStartDateStr}
                  />
                </View>

                <View className="mx-[11px] mb-[18px] w-[14px] border-y-[1px] border-surface-300" />

                <View>
                  <Text className="typo-body-12-regular mb-[4px] ml-[2px] text-surface-400">
                    종료일
                  </Text>
                  <DatePickerInput
                    value={endDateStr}
                    onSelectDate={setEndDateStr}
                  />
                </View>
              </View>
            </View>

            {/* 직무 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">직무</Text>
              <TextInput
                className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="직무를 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                value={role}
                onChangeText={setRole}
              />
            </View>

            {/* 직급/직책 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">직급/직책</Text>
              <TextInput
                className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="직급/직책을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                value={position}
                onChangeText={setPosition}
              />
            </View>

            {/* 담당 업무 및 성과 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">담당 업무 및 성과</Text>
              <TextInput
                className="mt-[9px] h-[129px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="담당 업무 및 성과를 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                textAlignVertical="top"
                multiline={true}
                value={jobDescription}
                onChangeText={setJobDescription}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CareerEditView;
