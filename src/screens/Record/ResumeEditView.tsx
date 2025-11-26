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

import ImagePicker from '@/features/record/editResume/components/ImagePicker';
import ResumeEditHeader from '@/features/record/editResume/components/ResumeEditHeader';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';
import HUInput from '@/shared/ui/atoms/HUInput';

const ResumeEditView = () => {
  const insets = useSafeAreaInsets();

  const sexRef = React.useRef<View>(null);
  const ageRef = React.useRef<View>(null);

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeEditHeader
        isCompleteDisabled={true}
        onCompletePress={() => {
          // Handle complete press
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView>
          <View style={{ height: insets.top + 74 }} />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <View className="mt-[23px] flex-row px-5">
                <ImagePicker />

                {/* 이름, 사진, 생년월일 */}
                <View className="ml-[25px] items-start justify-center">
                  <TextInput
                    className="w-[140px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                    placeholder="이름"
                    placeholderTextColor={'#B7B7B7'}
                  />

                  <View className="mt-[10px] flex-row">
                    <HUDropdown
                      ref={sexRef}
                      categoryName="성별"
                      dropdownItems={['남성', '여성', '선택안함']}
                      onSelectItem={item => {
                        console.log(item);
                      }}
                      containerStyle={{ marginRight: 8 }}
                    />

                    <HUDropdown
                      ref={ageRef}
                      categoryName="출생년도"
                      dropdownItems={[
                        '10대',
                        '20대',
                        '30대',
                        '40대',
                        '50대 이상',
                      ]}
                      onSelectItem={item => {
                        console.log(item);
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* 이력서 제목 */}
              <View className="mt-6 px-5">
                <Text className="typo-body-17-semibold">
                  이력서 제목{' '}
                  <Text className="text-primary-purple typo-body-17-semibold">
                    *
                  </Text>
                </Text>
                <TextInput
                  className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="이력서 제목을 입력해주세요"
                  placeholderTextColor={'#B7B7B7'}
                />
              </View>

              {/* 내 소개 */}
              <View className="mt-6 px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">내 소개</Text>
                  <View className="flex-row items-center">
                    <Text>아이콘</Text>
                    <Pressable>
                      <Text>ai 어쩌구</Text>
                    </Pressable>
                  </View>
                </View>
                <TextInput
                  className="mt-[9px] min-h-[120px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="나를 어필할 수 있는 소개를 작성해보세요! (최대 800자)"
                  placeholderTextColor={'#B7B7B7'}
                  textAlignVertical="top"
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              {/* 경력 사항 혹은 프로젝트 사항 */}
              <View className="mt-[40px] px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">
                    경력 사항 혹은 프로젝트 사항
                  </Text>
                  <View className="flex-row items-center">
                    <Pressable>
                      <Text>추가 어쩌구</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* 학력 사항 */}
              <View className="mt-[40px] px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">학력 사항</Text>
                  <View className="flex-row items-center">
                    <Pressable>
                      <Text>추가 어쩌구</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              <View className="mx-5 mt-[34px] border-b-[1.5px] border-surface-200" />

              {/* 스킬 */}
              <View className="mt-[40px] px-5">
                <View className="mb-5 flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">스킬</Text>
                </View>

                <HUInput placeholder="내 스킬을 입력하여 추가하세요" />
              </View>

              {/* 어학 */}
              <View className="mt-[41px] px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">어학</Text>
                  <View className="flex-row items-center">
                    <Pressable>
                      <Text>추가 어쩌구</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* 수상/자격증/교육 */}
              <View className="mt-[41px] px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">
                    수상/자격증/교육
                  </Text>
                  <View className="flex-row items-center">
                    <Pressable>
                      <Text>추가 어쩌구</Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* 링크 */}
              <View className="mt-[41px] px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">링크</Text>
                  <View className="flex-row items-center">
                    <Pressable>
                      <Text>추가 어쩌구</Text>
                    </Pressable>
                  </View>
                </View>

                <Text className="mt-[13px] text-surface-400 typo-body-15-regular">
                  포트폴리오 혹은 참고할만한 링크를 넣어주세요.
                </Text>
              </View>

              <View style={{ height: insets.bottom + 50 }} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResumeEditView;
