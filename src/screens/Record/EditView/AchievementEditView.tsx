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
import useAchievementEdit from '@/features/record/editResume/hooks/useAchievementEdit';
import {
  AchievementTypeEnumToLabel,
  AchievementTypeLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import { useBackModal } from '@/shared/hooks/useBackModal';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const AchievementEditView = () => {
  const insets = useSafeAreaInsets();
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    isDirty,
    handleSubmit,
    handleDelete,
  } = useAchievementEdit();

  const {
    isBackModalVisible,
    handleBackPress,
    handleConfirmBack,
    handleCloseModal,
  } = useBackModal(isDirty);

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeHeader title="수상/자격증/교육" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-1">
              <View style={{ height: insets.top + 74 }} />
              {/* 타입 */}
              <View className="mt-[22px] px-5">
                <Text className="typo-body-17-semibold">
                  타입{' '}
                  <Text className="text-primary-purple typo-body-17-semibold">
                    *
                  </Text>
                </Text>

                <View className="mt-[9px] items-start">
                  <HUDropdown
                    categoryName={
                      fields.type
                        ? AchievementTypeEnumToLabel[fields.type]
                        : '선택'
                    }
                    dropdownItems={Object.values(AchievementTypeEnumToLabel)}
                    onSelectItem={item => {
                      setField('type', AchievementTypeLabelToEnum[item]);
                    }}
                  />
                </View>
              </View>

              {/* 활동명 */}
              <View className="mt-5 px-5">
                <Text className="typo-body-17-semibold">
                  활동명{' '}
                  <Text className="text-primary-purple typo-body-17-semibold">
                    *
                  </Text>
                </Text>
                <TextInput
                  className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="활동명을 입력해주세요"
                  placeholderTextColor={'#B7B7B7'}
                  value={fields.activityName}
                  onChangeText={value => setField('activityName', value)}
                />
              </View>

              {/* 시기 */}
              <View className="mt-5 px-5">
                <Text className="typo-body-17-semibold">
                  시기{' '}
                  <Text className="text-primary-purple typo-body-17-semibold">
                    *
                  </Text>
                </Text>
                <View className="mt-[9px]">
                  <DatePickerInput
                    value={fields.periodDateStr}
                    onSelectDate={value => setField('periodDateStr', value)}
                  />
                </View>
              </View>

              {/* 세부 내용 */}
              <View className="mt-5 px-5">
                <Text className="typo-body-17-semibold">세부 내용</Text>
                <TextInput
                  className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="세부 내용을 입력해주세요"
                  placeholderTextColor={'#B7B7B7'}
                  textAlignVertical="top"
                  multiline={true}
                  style={{ height: 98 }}
                  value={fields.achievementDescription}
                  onChangeText={value =>
                    setField('achievementDescription', value)
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
          text={
            isEditMode
              ? '수상/자격증/교육 수정하기'
              : '수상/자격증/교육 추가하기'
          }
          onPress={handleSubmit}
          disabled={!isFormValid}
          isFormValid={isFormValid}
        />
        <EditDeleteButton
          text="수상/자격증/교육 삭제하기"
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

export default AchievementEditView;
