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

import ResumeHeader from '@/features/record/editResume/components/ResumeHeader';
import useLanguageEdit from '@/features/record/editResume/hooks/useLanguageEdit';
import {
  LanguageLevelEnumToLabel,
  LanguageLevelLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';
import TrashIcon from '@/static/icons/trash.svg';

const LanguageEditView = () => {
  const insets = useSafeAreaInsets();
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    handleSubmit,
    handleDelete,
  } = useLanguageEdit();

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
              {isEditMode ? '어학 수정하기' : '어학 추가하기'}
            </Text>
          </View>
        </Pressable>

        {isEditMode && (
          <Pressable
            className="mt-3 flex-row items-center"
            onPress={handleDelete}>
            <TrashIcon className="mt-[2px] text-surface-400" />
            <Text className="ml-2 text-surface-400 typo-body-15-medium">
              어학 삭제하기
            </Text>
          </Pressable>
        )}
      </View>

      <ResumeHeader title="어학" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default LanguageEditView;
