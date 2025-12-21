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
import useProjectEdit from '@/features/record/editResume/hooks/useProjectEdit';
import { useBackModal } from '@/shared/hooks/useBackModal';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const ProjectEditView = () => {
  const insets = useSafeAreaInsets();
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    isDirty,
    handleSubmit,
    handleDelete,
  } = useProjectEdit();

  const {
    isBackModalVisible,
    handleBackPress,
    handleConfirmBack,
    handleCloseModal,
  } = useBackModal(isDirty);

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeHeader title="프로젝트" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-1">
              <View style={{ height: insets.top + 74 }} />
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
                  value={fields.projectName}
                  onChangeText={value => setField('projectName', value)}
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

              {/* 역할 */}
              <View className="mt-5 px-5">
                <Text className="typo-body-17-semibold">역할</Text>
                <TextInput
                  className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="역할을 입력해주세요"
                  placeholderTextColor={'#B7B7B7'}
                  value={fields.role}
                  onChangeText={value => setField('role', value)}
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
                  value={fields.experienceDescription}
                  onChangeText={value =>
                    setField('experienceDescription', value)
                  }
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
          text={isEditMode ? '프로젝트 수정하기' : '프로젝트 추가하기'}
          onPress={handleSubmit}
          disabled={!isFormValid}
          isFormValid={isFormValid}
        />
        <EditDeleteButton
          text="프로젝트 삭제하기"
          onPress={handleDelete}
          isEditMode={isEditMode}
        />
      </View>

      <ConfirmModal
        visible={isBackModalVisible}
        title="작성 중인 내용이 있어요. 나가시겠어요?"
        confirmText="나가기"
        cancelText="계속 작성"
        onConfirm={handleConfirmBack}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default ProjectEditView;
