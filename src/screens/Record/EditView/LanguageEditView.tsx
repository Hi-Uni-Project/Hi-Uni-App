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
import { LanguageLevel } from '@/features/record/editResume/types/domainType';
import {
  LanguageLevelEnumToLabel,
  LanguageLevelLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';

type LanguageRouteProp = RouteProp<RecordNavigationProps, 'EditLanguage'>;

const LanguageEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<LanguageRouteProp>();

  const { resumeData, addLanguage, updateLanguage, deleteLanguage } =
    useResumeEdit();

  // EditLanguage인 경우 languageId가 params로 전달됨
  const editLanguageId = route.params?.languageId;
  const isEditMode = editLanguageId !== undefined;
  const editTarget = isEditMode
    ? resumeData.languages.find(l => l.languageId === editLanguageId)
    : undefined;

  // 로컬 폼 상태
  const [language, setLanguage] = useState(editTarget?.language || '');
  const [level, setLevel] = useState<LanguageLevel | null>(
    editTarget?.level || null,
  );

  const isFormValid = language.trim() !== '' && level !== null;

  const handleSubmit = () => {
    if (!isFormValid || level === null) {
      return;
    }

    if (isEditMode && editTarget) {
      updateLanguage({
        languageId: editTarget.languageId,
        language,
        level,
      });
    } else {
      addLanguage({ language, level });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget && editTarget.languageId !== null) {
      deleteLanguage(editTarget.languageId);
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
              {isEditMode ? '어학 수정하기' : '어학 추가하기'}
            </Text>
          </View>
        </Pressable>

        {isEditMode && (
          <Pressable className="mt-3" onPress={handleDelete}>
            <Text className="text-surface-400 typo-body-15-medium">
              어학 삭제하기
            </Text>
          </Pressable>
        )}
      </View>

      <ResumeBackHeader title="어학" />
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
                value={language}
                onChangeText={setLanguage}
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
                    level ? LanguageLevelEnumToLabel[level] : '선택'
                  }
                  dropdownItems={Object.values(LanguageLevelEnumToLabel)}
                  onSelectItem={item => {
                    setLevel(LanguageLevelLabelToEnum[item]);
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
