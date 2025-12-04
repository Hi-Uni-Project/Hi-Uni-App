import React, { useState } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ResumeEditHeader from '@/features/record/editResume/components/ResumeEditHeader';
import AboutMeSection from '@/features/record/editResume/components/section/AboutMeSection';
import AchievementSection from '@/features/record/editResume/components/section/AchievementSection';
import CareerSection from '@/features/record/editResume/components/section/CareerSection';
import EducationSection from '@/features/record/editResume/components/section/EducationSection';
import LanguageSection from '@/features/record/editResume/components/section/LanguageSection';
import LinkSection from '@/features/record/editResume/components/section/LinkSection';
import ProfileSection from '@/features/record/editResume/components/section/ProfileSection';
import SkillSection from '@/features/record/editResume/components/section/SkillSection';
import TitleSection from '@/features/record/editResume/components/section/TitleSection';
import SelectBottomSheet, {
  SelectOption,
} from '@/features/record/editResume/components/SelectBottomSheet';
import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import useResumeNavigator from '@/features/record/editResume/hooks/useResumeNavigator';
import useSkillSearch from '@/features/record/editResume/hooks/useSkillSearch';

const ResumeEditView = () => {
  const insets = useSafeAreaInsets();
  const [isCareerProjectSheetVisible, setIsCareerProjectSheetVisible] =
    useState(false);

  const { resumeData, updateField, addSkill, deleteSkill } = useResumeEdit();
  const {
    goToCreateCareer,
    goToCreateEducation,
    goToCreateLanguage,
    goToCreateAchievement,
    goToCreateProject,
    goToCreateLink,
    goToEditCareer,
    goToEditEducation,
    goToEditLanguage,
    goToEditAchievement,
    goToEditLink,
  } = useResumeNavigator();

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
      onPress: goToCreateCareer,
    },
    {
      label: '프로젝트 추가하기',
      value: 'project',
      onPress: goToCreateProject,
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
              <ProfileSection
                photo={resumeData?.photo || null}
                name={resumeData?.name || ''}
                onPhotoChange={photo => updateField('photo', photo)}
                onNameChange={text => updateField('name', text)}
                onGenderChange={gender => updateField('gender', gender)}
                onBirthYearChange={year => updateField('birthYear', year)}
              />

              <TitleSection
                title={resumeData?.title || ''}
                onTitleChange={text => updateField('title', text)}
              />

              <AboutMeSection
                aboutMe={resumeData?.aboutMe || ''}
                onAboutMeChange={text => updateField('aboutMe', text)}
              />

              <CareerSection
                careers={resumeData.careers}
                onAddPress={() => setIsCareerProjectSheetVisible(true)}
                onEditPress={goToEditCareer}
              />

              <EducationSection
                educations={resumeData.educations}
                onAddPress={goToCreateEducation}
                onEditPress={goToEditEducation}
              />

              <SkillSection
                skills={resumeData.skills}
                inputValue={inputValue}
                searchKeyword={searchKeyword}
                searchResults={searchResults}
                isLoading={isLoading}
                isSearchResultVisible={isSearchResultVisible}
                onInputChange={setInputValue}
                onSearch={handleSearch}
                onClearSearch={clearSearch}
                onSelectSkill={skill =>
                  addSkill({ skillId: skill.skillId, name: skill.name })
                }
                onRemoveSkill={deleteSkill}
              />

              <LanguageSection
                languages={resumeData.languages}
                onAddPress={goToCreateLanguage}
                onEditPress={goToEditLanguage}
              />

              <AchievementSection
                achievements={resumeData.achievements}
                onAddPress={goToCreateAchievement}
                onEditPress={goToEditAchievement}
              />

              <LinkSection
                links={resumeData.links}
                onAddPress={goToCreateLink}
                onEditPress={goToEditLink}
              />

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
