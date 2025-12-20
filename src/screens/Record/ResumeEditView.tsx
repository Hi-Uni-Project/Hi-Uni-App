import React, { useEffect, useState } from 'react';

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
import useAiAboutMeMutation from '@/features/record/editResume/hooks/useAiAboutMeMutation';
import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import useResumeMutation from '@/features/record/editResume/hooks/useResumeMutation';
import useResumeNavigator from '@/features/record/editResume/hooks/useResumeNavigator';
import { useResumeQueries } from '@/features/record/editResume/hooks/useResumeQueries';
import useSkillSearch from '@/features/record/editResume/hooks/useSkillSearch';
import { Gender } from '@/features/record/editResume/types/domainType';
import { mapResumeToEditForm } from '@/features/record/editResume/utils/responseToDomainMapper';

const ResumeEditView = () => {
  const insets = useSafeAreaInsets();
  const [isCareerProjectSheetVisible, setIsCareerProjectSheetVisible] =
    useState(false);

  const { resumeData: serverResumeData } = useResumeQueries();

  const {
    resumeData,
    setResumeData,
    updateField,
    addSkill,
    deleteSkill,
    getRequestData,
    resetStore,
  } = useResumeEdit();

  // 서버 데이터로 편집 폼 초기화
  useEffect(() => {
    if (serverResumeData) {
      const editFormData = mapResumeToEditForm(serverResumeData);
      console.log('서버에서 받아온 이력서 데이터:', editFormData);
      setResumeData(editFormData);
    }
  }, [serverResumeData, setResumeData]);

  const { submitResume, isSubmitting } = useResumeMutation();

  const [isPostNotFoundError, setIsPostNotFoundError] = useState(false);

  const { generateAboutMe, isGenerating } = useAiAboutMeMutation({
    onSuccess: data => {
      updateField('aboutMe', data.aboutMe);
      updateField('aboutMeCnt', data.aboutMeCnt);
    },
    onError: (_error, statusCode) => {
      if (statusCode === 'POST_NOT_FOUND') {
        setIsPostNotFoundError(true);
      }
    },
  });

  const {
    goToCreateCareer,
    goToCreateEducation,
    goToCreateLanguage,
    goToCreateAchievement,
    goToCreateProject,
    goToCreateLink,
    goToEditCareer,
    goToEditProject,
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

  const handleCompletePress = () => {
    const requestData = getRequestData();

    submitResume({
      resumeData: requestData,
      photo: resumeData.photo,
    });
  };

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeEditHeader
        isCompleteDisabled={isSubmitting || !resumeData.title?.trim()}
        onCompletePress={handleCompletePress}
        onDeleteAll={resetStore}
      />

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
                gender={resumeData?.gender || Gender.OTHER}
                birthYear={resumeData?.birthYear || 0}
                onPhotoChange={photo => {
                  updateField('photo', photo);
                  updateField('updateImage', true);
                }}
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
                aboutMeCnt={resumeData?.aboutMeCnt ?? 5}
                isGenerating={isGenerating}
                isPostNotFoundError={isPostNotFoundError}
                onAboutMeChange={text => updateField('aboutMe', text)}
                onGeneratePress={generateAboutMe}
                onErrorModalClose={() => setIsPostNotFoundError(false)}
              />

              <CareerSection
                careers={resumeData.careers}
                projects={resumeData.projects}
                onAddPress={() => setIsCareerProjectSheetVisible(true)}
                onEditCareerPress={goToEditCareer}
                onEditProjectPress={goToEditProject}
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
