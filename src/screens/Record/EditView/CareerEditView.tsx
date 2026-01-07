import React, { useState } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DatePickerInput from '@/features/record/editResume/components/DatePickerInput';
import EditDeleteButton from '@/features/record/editResume/components/EditDeleteButton';
import EditSubmitButton from '@/features/record/editResume/components/EditSubmitButton';
import MyReviewBottomSheet from '@/features/record/editResume/components/MyReviewBottomSheet';
import ResumeHeader from '@/features/record/editResume/components/ResumeHeader';
import useCareerEdit from '@/features/record/editResume/hooks/useCareerEdit';
import { MyReviewData } from '@/features/record/editResume/types/responseType';
import { mapMyReviewToCareer } from '@/features/record/editResume/utils/responseToDomainMapper';
import { useBackModal } from '@/shared/hooks/useBackModal';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const CareerEditView = () => {
  const insets = useSafeAreaInsets();
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    isDirty,
    handleSubmit,
    handleDelete,
  } = useCareerEdit();

  const {
    isBackModalVisible,
    handleBackPress,
    handleConfirmBack,
    handleCloseModal,
  } = useBackModal(isDirty);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleBottomSheetPress = (review: MyReviewData) => {
    const career = mapMyReviewToCareer(review);

    setField('companyName', career.companyName);
    setField('role', career.role);
    setField('position', career.position);
    setField('jobDescription', career.jobDescription);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };

    setField('startDateStr', formatDate(career.startDate));
    setField('endDateStr', formatDate(career.endDate));
  };

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeHeader
        title="경력"
        rightButtonText="불러오기"
        onRightButtonPress={() => {
          setIsBottomSheetVisible(true);
        }}
        onBackPress={handleBackPress}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-1">
              <View style={{ height: insets.top + 74 }} />
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
                  value={fields.companyName}
                  onChangeText={value => setField('companyName', value)}
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
                      value={fields.startDateStr}
                      onSelectDate={value => setField('startDateStr', value)}
                    />
                  </View>

                  <View className="mx-[11px] mb-[18px] w-[14px] border-y-[1px] border-surface-300" />

                  <View>
                    <Text className="typo-body-12-regular mb-[4px] ml-[2px] text-surface-400">
                      종료일
                    </Text>
                    <DatePickerInput
                      value={fields.endDateStr}
                      onSelectDate={value => setField('endDateStr', value)}
                    />
                  </View>
                </View>
              </View>

              {/* 직무 */}
              <View className="mt-5 px-5">
                <Text className="typo-body-17-semibold">
                  직무{' '}
                  <Text className="text-primary-purple typo-body-17-semibold">
                    *
                  </Text>
                </Text>
                <TextInput
                  className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="직무를 입력해주세요"
                  placeholderTextColor={'#B7B7B7'}
                  value={fields.role}
                  onChangeText={value => setField('role', value)}
                />
              </View>

              {/* 직급/직책 */}
              <View className="mt-5 px-5">
                <Text className="typo-body-17-semibold">직급/직책</Text>
                <TextInput
                  className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="직급/직책을 입력해주세요"
                  placeholderTextColor={'#B7B7B7'}
                  value={fields.position}
                  onChangeText={value => setField('position', value)}
                />
              </View>

              {/* 담당 업무 및 성과 */}
              <View className="mt-5 px-5">
                <Text className="typo-body-17-semibold">담당 업무 및 성과</Text>
                <TextInput
                  className="mt-[9px] h-[98px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="담당 업무 및 성과를 입력해주세요"
                  placeholderTextColor={'#B7B7B7'}
                  textAlignVertical="top"
                  multiline={true}
                  value={fields.jobDescription}
                  onChangeText={value => setField('jobDescription', value)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 버튼 영역 */}
      <View
        className="items-center px-5"
        style={{ paddingTop: 16, paddingBottom: insets.bottom + 16 }}>
        <EditSubmitButton
          text={isEditMode ? '경력 수정하기' : '경력 추가하기'}
          onPress={handleSubmit}
          disabled={!(isFormValid && isDirty)}
        />
        <EditDeleteButton
          text="경력 삭제하기"
          onPress={handleDelete}
          isEditMode={isEditMode}
        />
      </View>

      <MyReviewBottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onPress={handleBottomSheetPress}
        title="내 후기 불러오기"
      />

      <ConfirmModal
        visible={isBackModalVisible}
        title={'작성 중인 내용이 있어요. \n나가시겠어요?'}
        confirmText="나가기"
        cancelText="계속 작성"
        onConfirm={handleConfirmBack}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default CareerEditView;
