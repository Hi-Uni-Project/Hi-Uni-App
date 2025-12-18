import React from 'react';

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
import useCareerEdit from '@/features/record/editResume/hooks/useCareerEdit';
import TrashIcon from '@/static/icons/trash.svg';

const CareerEditView = () => {
  const insets = useSafeAreaInsets();
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    handleSubmit,
    handleDelete,
  } = useCareerEdit();

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
          <Pressable
            className="mt-3 flex-row items-center"
            onPress={handleDelete}>
            <TrashIcon className="mt-[2px] text-surface-400" />
            <Text className="ml-2 text-surface-400 typo-body-15-medium">
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
              <Text className="typo-body-17-semibold">직무</Text>
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
                className="mt-[9px] h-[129px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default CareerEditView;
