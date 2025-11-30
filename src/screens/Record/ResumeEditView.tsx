import React from 'react';

import { useNavigation } from '@react-navigation/native';
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

import AddButton from '@/features/record/editResume/components/AddButton';
import ImagePicker from '@/features/record/editResume/components/ImagePicker';
import ResumeEditHeader from '@/features/record/editResume/components/ResumeEditHeader';
import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import {
  GenderEnumToLabel,
  GenderLabelToEnum,
} from '@/features/record/editResume/utils/labelMapper';
import { RecordStackNavigationProp } from '@/navigation/types/navigationTypes';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';
import HUInput from '@/shared/ui/atoms/HUInput';
import InfoIcon from '@/static/icons/info.svg';

const ResumeEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RecordStackNavigationProp>();

  const { resumeData, updateField } = useResumeEdit();

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeEditHeader isCompleteDisabled={true} onCompletePress={() => {}} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView>
          <View style={{ height: insets.top + 74 }} />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <View className="mt-[23px] flex-row px-5">
                <ImagePicker
                  photo={resumeData?.photo || null}
                  onPhotoChange={photo => updateField('photo', photo)}
                />

                {/* 이름, 사진, 생년월일 */}
                <View className="ml-[25px] items-start justify-center">
                  <TextInput
                    className="w-[140px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                    placeholder="이름"
                    value={resumeData?.name || ''}
                    onChangeText={text => updateField('name', text)}
                    placeholderTextColor={'#B7B7B7'}
                  />

                  <View className="mt-[10px] flex-row">
                    <HUDropdown
                      categoryName="성별"
                      dropdownItems={Object.values(GenderEnumToLabel)}
                      onSelectItem={item => {
                        updateField('gender', GenderLabelToEnum[item]);
                      }}
                      containerStyle={{ marginRight: 8 }}
                    />

                    <HUDropdown
                      categoryName="출생년도"
                      dropdownItems={Array.from(
                        {
                          length: 2005 - 1990 + 1,
                        },
                        (_, i) => `${2005 - i}년`,
                      )}
                      onSelectItem={item => {
                        updateField(
                          'birthYear',
                          Number(item.replace('년', '')),
                        );
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* 이력서 제목 */}
              <View className="mt-6 px-5">
                <Text className="typo-body-17-semibold">
                  이력서 제목
                  <Text className="text-primary-purple typo-body-17-semibold">
                    *
                  </Text>
                </Text>
                <TextInput
                  className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="이력서 제목을 입력해주세요"
                  onChangeText={text => updateField('title', text)}
                  value={resumeData?.title || ''}
                  placeholderTextColor={'#B7B7B7'}
                />
              </View>

              {/* 내 소개 */}
              <View className="mt-6 px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">내 소개</Text>
                  <View className="flex-row items-center">
                    <Pressable>
                      <InfoIcon color="#B7B7B7" width={26} height={26} />
                    </Pressable>
                    <Pressable className="ml-[5px]">
                      <View className="flex-row items-center rounded-full bg-primary-purple px-4 py-2">
                        <Text className="text-surface-200 typo-body-15-medium">
                          AI 내 소개 생성 (5/5)
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
                <TextInput
                  className="mt-[9px] min-h-[120px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                  placeholder="나를 어필할 수 있는 소개를 작성해보세요! (최대 800자)"
                  placeholderTextColor={'#B7B7B7'}
                  value={resumeData?.aboutMe || ''}
                  textAlignVertical="top"
                  onChangeText={text => updateField('aboutMe', text)}
                  maxLength={800}
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
                    <AddButton
                      onPress={() => {
                        navigation.navigate('CreateCareer');
                      }}
                    />
                  </View>
                  <View className="flex-row items-center">
                    <AddButton
                      onPress={() => {
                        navigation.navigate('CreateProject');
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* 학력 사항 */}
              <View className="mt-[40px] px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">학력 사항</Text>
                  <View className="flex-row items-center">
                    <AddButton
                      onPress={() => {
                        navigation.navigate('CreateEducation');
                      }}
                    />
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
                    <AddButton
                      onPress={() => {
                        navigation.navigate('CreateLanguage');
                      }}
                    />
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
                    <AddButton
                      onPress={() => {
                        navigation.navigate('CreateAchievement');
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* 링크 */}
              <View className="mt-[41px] px-5">
                <View className="flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">링크</Text>
                  <View className="flex-row items-center">
                    <AddButton
                      onPress={() => {
                        navigation.navigate('CreateLink');
                      }}
                    />
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
