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
import { Education } from '@/features/record/editResume/types/domainType';
import {
  GraduationStatusEnumToLabel,
  GraduationStatusLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';

type EducationRouteProp = RouteProp<{
  EditEducation: Education;
}>;

const EducationEditView = () => {
  const insets = useSafeAreaInsets();

  const route = useRoute<EducationRouteProp>();
  const existData = route.params;

  const graduationStatusRef = React.useRef<View>(null);

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
            console.log('학력 사항 추가 버튼 눌림');
          }}>
          <View className="flex-row items-center rounded-full bg-main-text px-[27px] py-[14px]">
            <Text className="text-surface-200 typo-body-16-medium">
              학력 추가하기
            </Text>
          </View>
        </Pressable>

        {!existData && (
          <View>
            <Text>학력 삭제하기</Text>
          </View>
        )}
      </View>

      <ResumeBackHeader title="학력" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
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
                  ref={graduationStatusRef}
                  categoryName="선택"
                  dropdownItems={Object.values(GraduationStatusEnumToLabel)}
                  onSelectItem={item => {
                    console.log(
                      '선택된 졸업 상태:',
                      GraduationStatusLabelToEnum[item],
                    );
                  }}
                  containerStyle={{}}
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
              {/*
                TODO: 기간 선택 드롭다운으로 구현 필요
                임시로 22.03.02 형태의 string 형식의 text를 date로 변환하여 구현
              */}
              <View className="mt-[9px] flex-row items-center">
                <TextInput
                  className="w-[144px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholderTextColor={'#B7B7B7'}
                />

                <View className="mx-[11px] w-[14px] border-y-[1px] border-surface-300" />

                <TextInput
                  className="w-[144px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholderTextColor={'#B7B7B7'}
                />
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
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EducationEditView;
