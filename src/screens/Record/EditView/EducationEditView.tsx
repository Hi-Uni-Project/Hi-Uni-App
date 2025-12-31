import React from 'react';

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
import ResumeHeader from '@/features/record/editResume/components/ResumeHeader';
import useEducationEdit from '@/features/record/editResume/hooks/useEducationEdit';
import {
  GraduationStatusEnumToLabel,
  GraduationStatusLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import { useBackModal } from '@/shared/hooks/useBackModal';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const EducationEditView = () => {
  const insets = useSafeAreaInsets();
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    isDirty,
    isEndDateDisabled,
    endDateDisplayText,
    handleSubmit,
    handleDelete,
  } = useEducationEdit();

  const {
    isBackModalVisible,
    handleBackPress,
    handleConfirmBack,
    handleCloseModal,
  } = useBackModal(isDirty);

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeHeader title="학력" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-1">
              <View style={{ height: insets.top + 74 }} />
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
                  value={fields.universityName}
                  onChangeText={value => setField('universityName', value)}
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
                      fields.graduationStatus
                        ? GraduationStatusEnumToLabel[fields.graduationStatus]
                        : '선택'
                    }
                    dropdownItems={Object.values(GraduationStatusEnumToLabel)}
                    onSelectItem={item => {
                      setField(
                        'graduationStatus',
                        GraduationStatusLabelToEnum[item],
                      );
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
                    value={fields.startDateStr}
                    onSelectDate={value => setField('startDateStr', value)}
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
                      value={fields.endDateStr}
                      onSelectDate={value => setField('endDateStr', value)}
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
                  value={fields.major}
                  onChangeText={value => setField('major', value)}
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
          text={isEditMode ? '학력 수정하기' : '학력 추가하기'}
          onPress={handleSubmit}
          disabled={!isFormValid}
          isFormValid={isFormValid}
        />
        <EditDeleteButton
          text="학력 삭제하기"
          onPress={handleDelete}
          isEditMode={isEditMode}
        />
      </View>

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

export default EducationEditView;
