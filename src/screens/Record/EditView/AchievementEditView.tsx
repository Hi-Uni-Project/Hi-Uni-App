import React from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
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
import { Achievement } from '@/features/record/editResume/types/domainType';
import {
  AchievementTypeEnumToLabel,
  AchievementTypeLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';

type AchievementRouteProp = RouteProp<{
  EditAchievement: Achievement;
}>;

const AchievementEditView = () => {
  const insets = useSafeAreaInsets();

  const route = useRoute<AchievementRouteProp>();
  const existData = route.params;

  const achievementTypeRef = React.useRef<View>(null);

  return (
    <View className="flex-1 bg-surface-50">
      <View
        className="absolute w-full items-center justify-center"
        style={{
          bottom:
            Platform.OS === 'ios' ? insets.bottom + 10 : insets.bottom + 20,
        }}>
        <Pressable
          onPress={() => {
            console.log('수상/자격증/교육 추가 버튼 눌림');
          }}>
          <View className="flex-row items-center rounded-full bg-main-text px-[27px] py-[14px]">
            <Text className="text-surface-200 typo-body-16-medium">
              수상/자격증/교육 추가하기
            </Text>
          </View>
        </Pressable>

        {existData && (
          <View className="mt-3">
            <Text className="text-surface-400 typo-body-15-medium">
              수상/자격증/교육 삭제하기
            </Text>
          </View>
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
                  ref={achievementTypeRef}
                  categoryName="선택"
                  dropdownItems={Object.values(AchievementTypeEnumToLabel)}
                  onSelectItem={item => {
                    console.log(
                      '선택된 타입:',
                      AchievementTypeLabelToEnum[item],
                    );
                  }}
                  containerStyle={{}}
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
              {/*
                TODO: 기간 선택 드롭다운으로 구현 필요
                임시로 22.06.23 형태의 string 형식의 text를 date로 변환하여 구현
              */}
              <TextInput
                className="mt-[9px] w-[144px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="22.06.23"
                placeholderTextColor={'#B7B7B7'}
              />
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
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AchievementEditView;
