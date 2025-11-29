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
import { Career } from '@/features/record/editResume/types/domainType';

type CareerRouteProp = RouteProp<{
  EditCareer: Career;
}>;

const CareerEditView = () => {
  const insets = useSafeAreaInsets();

  const route = useRoute<CareerRouteProp>();
  const existData = route.params;

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
            console.log('경력 추가 버튼 눌림');
          }}>
          <View className="flex-row items-center rounded-full bg-main-text px-[27px] py-[14px]">
            <Text className="text-surface-200 typo-body-16-medium">
              경력 추가하기
            </Text>
          </View>
        </Pressable>

        {!existData && (
          <View>
            <Text>경력 삭제하기</Text>
          </View>
        )}
      </View>

      <ResumeBackHeader title="경력" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {/* 회사명 */}
            <View className="mt-[22px] px-5">
              <Text className="typo-body-17-semibold">
                회사명{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] w-[185px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="회사명을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
              />
            </View>

            {/* 재직 기간 */}
            <View className="mt-5 items-start px-5">
              <Text className="typo-body-17-semibold">
                재직 기간{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              {/*
                TODO: 기간 선택 드롭다운으로 구현 필요
                임시로 22.06.23 형태의 string 형식의 text를 date로 변환하여 구현
              */}
              <View className="mt-[9px] flex-row items-end">
                <View>
                  <Text className="typo-body-12-regular mb-[4px] ml-[2px] text-surface-400">
                    시작일
                  </Text>
                  <TextInput
                    className="w-[144px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                    placeholder="22.06.23"
                    placeholderTextColor={'#B7B7B7'}
                  />
                </View>

                <View className="mx-[11px] mb-[18px] w-[14px] border-y-[1px] border-surface-300" />

                <View>
                  <Text className="typo-body-12-regular mb-[4px] ml-[2px] text-surface-400">
                    종료일
                  </Text>
                  <TextInput
                    className="w-[144px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                    placeholder="22.06.23"
                    placeholderTextColor={'#B7B7B7'}
                  />
                </View>
              </View>
            </View>

            {/* 직무 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">직무</Text>
              <TextInput
                className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="직무를 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
              />
            </View>

            {/* 직급/직책 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">직급/직책</Text>
              <TextInput
                className="mt-[9px] w-[272px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="직급/직책을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
              />
            </View>

            {/* 담당 업무 및 성과 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">담당 업무 및 성과</Text>
              <TextInput
                className="mt-[9px] h-[129px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="담당 업무 및 성과를 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                textAlignVertical="top"
                multiline={true}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CareerEditView;
