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
import { Link } from '@/features/record/editResume/types/domainType';

type LinkRouteProp = RouteProp<{
  EditLink: Link;
}>;

const LinkEditView = () => {
  const insets = useSafeAreaInsets();

  const route = useRoute<LinkRouteProp>();
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
            console.log('링크 추가 버튼 눌림');
          }}>
          <View className="flex-row items-center rounded-full bg-main-text px-[27px] py-[14px]">
            <Text className="text-surface-200 typo-body-16-medium">
              링크 추가하기
            </Text>
          </View>
        </Pressable>

        {!existData && (
          <View className="mt-3">
            <Text className="text-surface-400 typo-body-15-medium">
              링크 삭제하기
            </Text>
          </View>
        )}
      </View>

      <ResumeBackHeader title="링크" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {/* 링크명 */}
            <View className="mt-[22px] px-5">
              <Text className="typo-body-17-semibold">
                링크명{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="링크명을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
              />
            </View>

            {/* 링크 주소 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">
                링크 주소{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="링크 주소를 입력해주세요"
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

export default LinkEditView;
