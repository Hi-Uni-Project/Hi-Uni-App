import { useNavigation } from '@react-navigation/native';

import {
  RecordNavigationProps,
  RecordStackNavigationProp,
} from '@/navigation/types/navigationTypes';

/**
 * 이력서 엔티티 편집 화면으로의 네비게이션을 담당하는 훅
 *
 * @example
 * const { goToEditCareer, goToCreateEducation } = useResumeNavigator();
 *
 * 서버 ID가 있으면 서버 ID로, 없으면 tempId로 네비게이션
 * goToEditCareer(career.careerId ?? career.tempId);
 *
 * 생성 화면으로 이동
 * goToCreateEducation();
 */
const useResumeNavigator = () => {
  const navigation = useNavigation<RecordStackNavigationProp>();

  const goToCreateCareer = () => navigation.navigate('CreateCareer');
  const goToCreateEducation = () => navigation.navigate('CreateEducation');
  const goToCreateLanguage = () => navigation.navigate('CreateLanguage');
  const goToCreateAchievement = () => navigation.navigate('CreateAchievement');
  const goToCreateProject = () => navigation.navigate('CreateProject');
  const goToCreateLink = () => navigation.navigate('CreateLink');

  const goToEditCareer = (id: number | string | undefined) => {
    if (id === undefined) {
      return;
    }
    const params: RecordNavigationProps['EditCareer'] =
      typeof id === 'number' ? { careerId: id } : { tempId: id };
    navigation.navigate('EditCareer', params);
  };

  const goToEditEducation = (id: number | string | undefined) => {
    if (id === undefined) {
      return;
    }
    const params: RecordNavigationProps['EditEducation'] =
      typeof id === 'number' ? { educationId: id } : { tempId: id };
    navigation.navigate('EditEducation', params);
  };

  const goToEditLanguage = (id: number | string | undefined) => {
    if (id === undefined) {
      return;
    }
    const params: RecordNavigationProps['EditLanguage'] =
      typeof id === 'number' ? { languageId: id } : { tempId: id };
    navigation.navigate('EditLanguage', params);
  };

  const goToEditAchievement = (id: number | string | undefined) => {
    if (id === undefined) {
      return;
    }
    const params: RecordNavigationProps['EditAchievement'] =
      typeof id === 'number' ? { achievementId: id } : { tempId: id };
    navigation.navigate('EditAchievement', params);
  };

  const goToEditProject = (id: number | string | undefined) => {
    if (id === undefined) {
      return;
    }
    const params: RecordNavigationProps['EditProject'] =
      typeof id === 'number' ? { projectId: id } : { tempId: id };
    navigation.navigate('EditProject', params);
  };

  const goToEditLink = (id: number | string | undefined) => {
    if (id === undefined) {
      return;
    }
    const params: RecordNavigationProps['EditLink'] =
      typeof id === 'number' ? { linkId: id } : { tempId: id };
    navigation.navigate('EditLink', params);
  };

  return {
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
    goToEditProject,
    goToEditLink,
  };
};

export default useResumeNavigator;
