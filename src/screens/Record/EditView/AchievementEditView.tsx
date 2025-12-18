import React from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DatePickerInput from '@/features/record/editResume/components/DatePickerInput';
import ResumeHeader from '@/features/record/editResume/components/ResumeHeader';
import useAchievementEdit from '@/features/record/editResume/hooks/useAchievementEdit';
import {
  AchievementTypeEnumToLabel,
  AchievementTypeLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';
import TrashIcon from '@/static/icons/trash.svg';

const AchievementEditView = () => {
  const insets = useSafeAreaInsets();
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    handleSubmit,
    handleDelete,
  } = useAchievementEdit();

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeHeader title="수상/자격증/교육" />
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
        <Pressable onPress={handleSubmit} disabled={!isFormValid}>
          <View
            className={`flex-row items-center rounded-full px-[27px] py-[14px] ${
              isFormValid ? 'bg-main-text' : 'bg-surface-300'
            }`}>
            <Text className="text-surface-200 typo-body-16-medium">
              {isEditMode
                ? '수상/자격증/교육 수정하기'
                : '수상/자격증/교육 추가하기'}
            </Text>
          </View>
        </Pressable>

        {isEditMode && (
          <Pressable
            className="mt-3 flex-row items-center"
            onPress={handleDelete}>
            <TrashIcon className="mt-[2px] text-surface-400" />
            <Text className="ml-2 text-surface-400 typo-body-15-medium">
              수상/자격증/교육 삭제하기
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default AchievementEditView;
