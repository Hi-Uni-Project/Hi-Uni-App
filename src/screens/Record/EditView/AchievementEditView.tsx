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
import ResumeBackHeader from '@/features/record/editResume/components/ResumeBackHeader';
import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import { AchievementType } from '@/features/record/editResume/types/domainType';
import {
  formatToShortDate,
  parseShortDate,
} from '@/features/record/editResume/utils/dateUtils';
import {
  AchievementTypeEnumToLabel,
  AchievementTypeLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';

type AchievementRouteProp = RouteProp<RecordNavigationProps, 'EditAchievement'>;

const AchievementEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<AchievementRouteProp>();

  const { resumeData, addAchievement, updateAchievement, deleteAchievement } =
    useResumeEdit();

  // EditAchievement인 경우 achievementId가 params로 전달됨
  const editAchievementId = route.params?.achievementId;
  const isEditMode = editAchievementId !== undefined;
  const editTarget = isEditMode
    ? resumeData.achievements.find(a => a.achievementId === editAchievementId)
    : undefined;

  // 로컬 폼 상태
  const [type, setType] = useState<AchievementType | null>(
    editTarget?.type || null,
  );
  const [activityName, setActivityName] = useState(
    editTarget?.activityName || '',
  );
  const [periodDateStr, setPeriodDateStr] = useState(
    editTarget?.periodDate ? formatToShortDate(editTarget.periodDate) : '',
  );
  const [achievementDescription, setAchievementDescription] = useState(
    editTarget?.achievementDescription || '',
  );

  const isFormValid =
    type !== null &&
    activityName.trim() !== '' &&
    parseShortDate(periodDateStr) !== null;

  const handleSubmit = () => {
    const periodDate = parseShortDate(periodDateStr);
    if (!isFormValid || type === null || periodDate === null) {
      return;
    }

    if (isEditMode && editTarget) {
      updateAchievement({
        achievementId: editTarget.achievementId,
        type,
        activityName,
        periodDate,
        achievementDescription,
      });
    } else {
      addAchievement({
        type,
        activityName,
        periodDate,
        achievementDescription,
      });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget && editTarget.achievementId !== null) {
      deleteAchievement(editTarget.achievementId);
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
              {isEditMode
                ? '수상/자격증/교육 수정하기'
                : '수상/자격증/교육 추가하기'}
            </Text>
          </View>
        </Pressable>

        {isEditMode && (
          <Pressable className="mt-3" onPress={handleDelete}>
            <Text className="text-surface-400 typo-body-15-medium">
              수상/자격증/교육 삭제하기
            </Text>
          </Pressable>
        )}
      </View>

      <ResumeBackHeader title="수상/자격증/교육" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
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
                    type ? AchievementTypeEnumToLabel[type] : '선택'
                  }
                  dropdownItems={Object.values(AchievementTypeEnumToLabel)}
                  onSelectItem={item => {
                    setType(AchievementTypeLabelToEnum[item]);
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
                value={activityName}
                onChangeText={setActivityName}
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
                  value={periodDateStr}
                  onSelectDate={setPeriodDateStr}
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
                value={achievementDescription}
                onChangeText={setAchievementDescription}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AchievementEditView;
