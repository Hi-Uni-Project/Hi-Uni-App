import React, { useState } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
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
import SelectBottomSheet, {
  SelectOption,
} from '@/features/record/editResume/components/SelectBottomSheet';
import SelectedSkillsList from '@/features/record/editResume/components/SelectedSkillsList';
import SkillSearchInput from '@/features/record/editResume/components/SkillSearchInput';
import SkillSearchResultList from '@/features/record/editResume/components/SkillSearchResultList';
import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import useSkillSearch from '@/features/record/editResume/hooks/useSkillSearch';
import { AchievementType } from '@/features/record/editResume/types/domainType';
import { formatToShortDate } from '@/features/record/editResume/utils/dateUtils';
import {
  GenderEnumToLabel,
  GenderLabelToEnum,
  GraduationStatusEnumToLabel,
  LanguageLevelEnumToLabel,
  AchievementTypeEnumToLabel,
} from '@/features/record/editResume/utils/labelMapper';
import { RecordStackNavigationProp } from '@/navigation/types/navigationTypes';
import HUDropdown from '@/shared/ui/atoms/HUDropdown';
import InfoIcon from '@/static/icons/info.svg';

const ResumeEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RecordStackNavigationProp>();
  const [isCareerProjectSheetVisible, setIsCareerProjectSheetVisible] =
    useState(false);

  const { resumeData, updateField, addSkill, deleteSkill } = useResumeEdit();
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});

  const {
    inputValue,
    setInputValue,
    searchKeyword,
    searchResults,
    isLoading,
    isSearchResultVisible,
    handleSearch,
    clearSearch,
  } = useSkillSearch();

  const careerProjectOptions: SelectOption[] = [
    {
      label: '경력 추가하기',
      value: 'career',
      onPress: () => navigation.navigate('CreateCareer'),
    },
    {
      label: '프로젝트 추가하기',
      value: 'project',
      onPress: () => navigation.navigate('CreateProject'),
    },
  ];

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
                          length: 2008 - 1980 + 1,
                        },
                        (_, i) => `${2008 - i}년`,
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
                      onPress={() => setIsCareerProjectSheetVisible(true)}
                    />
                  </View>
                </View>
              </View>

              {resumeData.careers.length > 0 &&
                resumeData.careers.map((career, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        if (career.careerId != null) {
                          navigation.navigate('EditCareer', {
                            careerId: career.careerId,
                          });
                        } else {
                          navigation.navigate('EditCareer', {
                            tempId: career.tempId,
                          });
                        }
                      }}
                      className="mx-5 mt-3 justify-start rounded-[15px] bg-surface-200 p-[14px]"
                      key={index}>
                      <Text className="text-primary-purple typo-caption-14-regular">
                        경력
                      </Text>
                      <Text className="mt-1 text-main-text typo-body-16-semibold">
                        {career.companyName}
                      </Text>
                      <Text className="mt-[5px] typo-body-15-semibold">
                        {formatToShortDate(career.startDate)} -{' '}
                        {formatToShortDate(career.endDate)}
                      </Text>

                      {career.role && career.role.trim() !== '' && (
                        <Text className="mt-[7px] text-gray-800 typo-caption-14-regular">
                          {career.role}
                        </Text>
                      )}
                      {career.position && career.position.trim() !== '' && (
                        <Text className="mt-[3px] text-gray-800 typo-caption-14-regular">
                          {career.position}
                        </Text>
                      )}
                      {career.jobDescription &&
                        career.jobDescription.trim() !== '' && (
                          <Text className="mt-[3px] text-gray-800 typo-caption-14-regular">
                            {career.jobDescription}
                          </Text>
                        )}
                    </Pressable>
                  );
                })}

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

              {resumeData.educations.length > 0 &&
                resumeData.educations.map((education, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        if (education.educationId != null) {
                          navigation.navigate('EditEducation', {
                            educationId: education.educationId,
                          });
                        } else {
                          navigation.navigate('EditEducation', {
                            tempId: education.tempId,
                          });
                        }
                      }}
                      className="mx-5 mt-3 justify-start rounded-[15px] bg-surface-200 py-[15px] pl-[14px]"
                      key={index}>
                      <Text className="text-main-text typo-body-16-semibold">
                        {education.universityName}
                      </Text>
                      <Text className="mt-[5px] typo-body-15-semibold">
                        {formatToShortDate(education.startDate)} -{' '}
                        {formatToShortDate(education.endDate)}{' '}
                        <Text>
                          (
                          {
                            GraduationStatusEnumToLabel[
                              education.graduationStatus
                            ]
                          }
                          )
                        </Text>
                      </Text>

                      <Text className="mt-[7px] text-gray-800 typo-caption-14-regular">
                        {education.major}
                      </Text>
                    </Pressable>
                  );
                })}
              <View className="mx-5 mt-[34px] border-b-[1.5px] border-surface-200" />

              {/* 스킬 */}
              <View className="mt-[40px] px-5">
                <View className="mb-5 flex-row items-center justify-between">
                  <Text className="typo-body-17-semibold">스킬</Text>
                </View>

                <SkillSearchInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  onSubmit={handleSearch}
                  onClear={clearSearch}
                />

                {isSearchResultVisible && (
                  <SkillSearchResultList
                    results={searchResults}
                    searchKeyword={searchKeyword}
                    selectedSkillIds={resumeData.skills.map(s => s.skillId)}
                    onSelectSkill={skill =>
                      addSkill({ skillId: skill.skillId, name: skill.name })
                    }
                    isLoading={isLoading}
                  />
                )}

                <SelectedSkillsList
                  selectedSkills={resumeData.skills}
                  onRemoveSkill={skillName => deleteSkill(skillName)}
                />
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

              {resumeData.languages.length > 0 && (
                <View className="mt-3 flex-row flex-wrap px-5">
                  {resumeData.languages.map((lang, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => {
                        if (lang.languageId != null) {
                          navigation.navigate('EditLanguage', {
                            languageId: lang.languageId,
                          });
                        } else {
                          navigation.navigate('EditLanguage', {
                            tempId: lang.tempId,
                          });
                        }
                      }}
                      className={`w-[48%] ${idx % 2 === 0 ? 'mr-[4%]' : ''} mb-3 h-[103px] justify-start rounded-[15px] bg-surface-200 py-[15px] pl-[14px]`}>
                      <Text className="text-main-text typo-body-16-semibold">
                        {lang.language}
                      </Text>
                      <Text className="mt-[7px] text-surface-800 typo-caption-14-regular">
                        {LanguageLevelEnumToLabel[lang.level]}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}

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

              {/* 수상/자격증/교육 리스트 (수상 → 자격증 → 교육 순서) */}
              <View className="mt-3 px-5">
                {/* 수상 */}
                {resumeData.achievements
                  .filter(a => a.type === AchievementType.AWARD)
                  .map(a => (
                    <Pressable
                      key={a.achievementId ?? a.tempId}
                      onPress={() => {
                        if (a.achievementId != null) {
                          navigation.navigate('EditAchievement', {
                            achievementId: a.achievementId,
                          });
                        } else {
                          navigation.navigate('EditAchievement', {
                            tempId: a.tempId,
                          });
                        }
                      }}
                      className="mb-3 justify-start rounded-[15px] bg-surface-200 p-[14px]">
                      <Text className="text-primary-purple typo-caption-14-regular">
                        {AchievementTypeEnumToLabel[AchievementType.AWARD]}
                      </Text>
                      <Text className="mt-1 text-main-text typo-body-16-semibold">
                        {a.activityName}
                      </Text>
                      <Text className="mt-[5px] text-main-text typo-body-15-semibold">
                        {formatToShortDate(a.periodDate)}
                      </Text>
                      <Text className="mt-[7px] text-surface-800 typo-caption-14-regular">
                        {a.achievementDescription}
                      </Text>
                    </Pressable>
                  ))}

                {/* 자격증 */}
                {resumeData.achievements
                  .filter(a => a.type === AchievementType.CERTIFICATE)
                  .map(a => (
                    <Pressable
                      key={a.achievementId ?? a.tempId}
                      onPress={() => {
                        if (a.achievementId != null) {
                          navigation.navigate('EditAchievement', {
                            achievementId: a.achievementId,
                          });
                        } else {
                          navigation.navigate('EditAchievement', {
                            tempId: a.tempId,
                          });
                        }
                      }}
                      className="mb-3 justify-start rounded-[15px] bg-surface-200 p-[14px]">
                      <Text className="text-primary-purple typo-caption-14-regular">
                        {
                          AchievementTypeEnumToLabel[
                            AchievementType.CERTIFICATE
                          ]
                        }
                      </Text>
                      <Text className="mt-1 text-main-text typo-body-16-semibold">
                        {a.activityName}
                      </Text>
                      <Text className="mt-[3px] text-gray-800 typo-caption-14-regular">
                        {formatToShortDate(a.periodDate)}
                      </Text>
                    </Pressable>
                  ))}

                {/* 교육(연수) */}
                {resumeData.achievements
                  .filter(a => a.type === AchievementType.TRAINING)
                  .map(a => (
                    <Pressable
                      key={a.achievementId ?? a.tempId}
                      onPress={() => {
                        if (a.achievementId != null) {
                          navigation.navigate('EditAchievement', {
                            achievementId: a.achievementId,
                          });
                        } else {
                          navigation.navigate('EditAchievement', {
                            tempId: a.tempId,
                          });
                        }
                      }}
                      className="mb-3 justify-start rounded-[15px] bg-surface-200 p-[14px]">
                      <Text className="text-primary-purple typo-caption-14-regular">
                        {AchievementTypeEnumToLabel[AchievementType.TRAINING]}
                      </Text>
                      <Text className="mt-1 text-main-text typo-body-16-semibold">
                        {a.activityName}
                      </Text>
                      <Text className="mt-[3px] text-gray-800 typo-caption-14-regular">
                        {formatToShortDate(a.periodDate)}
                      </Text>
                    </Pressable>
                  ))}
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

              {/* 링크 리스트 */}
              {resumeData.links.length > 0 && (
                <View className="mt-3 px-5">
                  {resumeData.links.map(link => {
                    const key = link.linkId ?? link.tempId ?? link.linkUrl;
                    return (
                      <Pressable
                        key={key}
                        onPress={() => {
                          if (link.linkId != null) {
                            navigation.navigate('EditLink', {
                              linkId: link.linkId,
                            });
                          } else {
                            navigation.navigate('EditLink', {
                              tempId: link.tempId,
                            });
                          }
                        }}
                        className="rounded-[15px] border-[1px] border-surface-200 bg-transparent p-[14px]">
                        <View className="flex-row items-start justify-between">
                          <View className="flex-1 pr-3">
                            <Text className="text-main-text typo-body-16-semibold">
                              {link.linkName || link.linkUrl}
                            </Text>
                            <Text
                              numberOfLines={1}
                              className="mt-[3px] text-gray-800 typo-caption-14-regular">
                              {link.linkUrl}
                            </Text>
                          </View>

                          {/* 임시 복사 버튼 — 아이콘은 추후 교체 가능 */}
                          <Pressable
                            onPress={async () => {
                              try {
                                Clipboard.setString(link.linkUrl);
                              } catch (e) {
                                // fallback: log for now
                                console.log('copy fallback:', link.linkUrl);
                              }

                              setCopiedLinks(prev => ({
                                ...prev,
                                [key]: true,
                              }));
                              setTimeout(() => {
                                setCopiedLinks(prev => ({
                                  ...prev,
                                  [key]: false,
                                }));
                              }, 2000);
                            }}
                            className="ml-2 items-center justify-center rounded-full bg-surface-200 px-3 py-1">
                            <Text className="typo-caption-14-regular">
                              {copiedLinks[key] ? '복사됨' : '복사'}
                            </Text>
                          </Pressable>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}

              <View style={{ height: insets.bottom + 50 }} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>

      <SelectBottomSheet
        visible={isCareerProjectSheetVisible}
        onClose={() => setIsCareerProjectSheetVisible(false)}
        title="무엇을 추가하시겠어요?"
        options={careerProjectOptions}
      />
    </View>
  );
};

export default ResumeEditView;
