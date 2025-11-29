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
import { Language } from '@/features/record/editResume/types/domainType';
import {
  LanguageLevelEnumToLabel,
  LanguageLevelLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';

type LanguageRouteProp = RouteProp<{
  EditLanguage: Language;
}>;

const LanguageEditView = () => {
  const insets = useSafeAreaInsets();

  const route = useRoute<LanguageRouteProp>();
  const existData = route.params;

  const languageLevelRef = React.useRef<View>(null);

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
            console.log('어학 추가 버튼 눌림');
          }}>
          <View className="flex-row items-center rounded-full bg-main-text px-[27px] py-[14px]">
            <Text className="text-surface-200 typo-body-16-medium">
              어학 추가하기
            </Text>
          </View>
        </Pressable>

        {!existData && (
          <View>
            <Text>어학 삭제하기</Text>
          </View>
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
                  ref={languageLevelRef}
                  categoryName="선택"
                  dropdownItems={Object.values(LanguageLevelEnumToLabel)}
                  onSelectItem={item => {
                    console.log('선택된 수준:', LanguageLevelLabelToEnum[item]);
                  }}
                  containerStyle={{}}
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
