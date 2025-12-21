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

import EditDeleteButton from '@/features/record/editResume/components/EditDeleteButton';
import EditSubmitButton from '@/features/record/editResume/components/EditSubmitButton';
import ResumeHeader from '@/features/record/editResume/components/ResumeHeader';
import useLanguageEdit from '@/features/record/editResume/hooks/useLanguageEdit';
import {
  LanguageLevelEnumToLabel,
  LanguageLevelLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import { useBackModal } from '@/shared/hooks/useBackModal';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const LanguageEditView = () => {
  const insets = useSafeAreaInsets();
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    isDirty,
    handleSubmit,
    handleDelete,
  } = useLanguageEdit();

  const {
    isBackModalVisible,
    handleBackPress,
    handleConfirmBack,
    handleCloseModal,
  } = useBackModal(isDirty);

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeHeader title="어학" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-1">
              <View style={{ height: insets.top + 74 }} />
              {/* 언어 */}
              <View className="mt-[22px] px-5">
                <Text className="typo-body-17-semibold">
                  언어{' '}
                  <Text className="text-primary-purple typo-body-17-semibold">
                    *
                  </Text>
                </Text>
                <TextInput
                  className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="언어를 입력해주세요"
                  placeholderTextColor={'#B7B7B7'}
                  value={fields.language}
                  onChangeText={value => setField('language', value)}
                />
              </View>

              {/* 수준 */}
              <View className="mt-5 px-5">
                <Text className="typo-body-17-semibold">
                  수준{' '}
                  <Text className="text-primary-purple typo-body-17-semibold">
                    *
                  </Text>
                </Text>

                <View className="mt-[9px] items-start">
                  <HUDropdown
                    categoryName={
                      fields.level
                        ? LanguageLevelEnumToLabel[fields.level]
                        : '선택'
                    }
                    dropdownItems={Object.values(LanguageLevelEnumToLabel)}
                    onSelectItem={item => {
                      setField('level', LanguageLevelLabelToEnum[item]);
                    }}
                    dropdownWidth={179}
                  />
                </View>
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
          text={isEditMode ? '어학 수정하기' : '어학 추가하기'}
          onPress={handleSubmit}
          disabled={!isFormValid}
          isFormValid={isFormValid}
        />
        <EditDeleteButton
          text="어학 삭제하기"
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

export default LanguageEditView;
