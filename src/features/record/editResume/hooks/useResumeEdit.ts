import { useCallback, useEffect } from 'react';

import { useResumeEditStore } from '../stores/useResumeEditStore';
import {
  Achievement,
  Career,
  Education,
  Language,
  Link,
  Project,
  Skill,
} from '../types/domainType';

/**
 * 이력서를 등록, 수정하는 역할을 하는 hook 입니다.
 *
 * @description
 * - 이력서 데이터 관리 (초기 데이터 불러오기, 수정된 데이터 저장)
 * - 제출 가능 여부 판단
 * - api 요청을 통한 제출 처리
 * - 작성 중 행동에 대한 처리
 *
 * 기타 하위 hook 및 유틸 함수들을 포함할 수 있습니다.
 */
const useResumeEdit = () => {
  const { resumeData, setResumeData, updateField, resetStore } =
    useResumeEditStore();

  // ============================================
  // Link 관련 함수
  // ============================================
  const addLink = useCallback(
    (link: Omit<Link, 'linkId'>) => {
      const { links } = resumeData;
      updateField('links', [...links, { ...link, linkId: null }]);
    },
    [resumeData, updateField],
  );

  const updateLink = useCallback(
    (link: Link) => {
      const updatedLinks = resumeData.links.map(l =>
        l.linkId === link.linkId ? link : l,
      );
      updateField('links', updatedLinks);
    },
    [resumeData.links, updateField],
  );

  const deleteLink = useCallback(
    (linkId: number) => {
      const filteredLinks = resumeData.links.filter(l => l.linkId !== linkId);
      updateField('links', filteredLinks);
    },
    [resumeData.links, updateField],
  );

  // ============================================
  // Language 관련 함수
  // ============================================
  const addLanguage = useCallback(
    (language: Omit<Language, 'languageId'>) => {
      const { languages } = resumeData;
      updateField('languages', [
        ...languages,
        { ...language, languageId: null },
      ]);
    },
    [resumeData, updateField],
  );

  const updateLanguage = useCallback(
    (language: Language) => {
      const updatedLanguages = resumeData.languages.map(l =>
        l.languageId === language.languageId ? language : l,
      );
      updateField('languages', updatedLanguages);
    },
    [resumeData.languages, updateField],
  );

  const deleteLanguage = useCallback(
    (languageId: number) => {
      const filteredLanguages = resumeData.languages.filter(
        l => l.languageId !== languageId,
      );
      updateField('languages', filteredLanguages);
    },
    [resumeData.languages, updateField],
  );

  // ============================================
  // Achievement 관련 함수
  // ============================================
  const addAchievement = useCallback(
    (achievement: Omit<Achievement, 'achievementId'>) => {
      const { achievements } = resumeData;
      updateField('achievements', [
        ...achievements,
        { ...achievement, achievementId: null },
      ]);
    },
    [resumeData, updateField],
  );

  const updateAchievement = useCallback(
    (achievement: Achievement) => {
      const updatedAchievements = resumeData.achievements.map(a =>
        a.achievementId === achievement.achievementId ? achievement : a,
      );
      updateField('achievements', updatedAchievements);
    },
    [resumeData.achievements, updateField],
  );

  const deleteAchievement = useCallback(
    (achievementId: number) => {
      const filteredAchievements = resumeData.achievements.filter(
        a => a.achievementId !== achievementId,
      );
      updateField('achievements', filteredAchievements);
    },
    [resumeData.achievements, updateField],
  );

  // ============================================
  // Education 관련 함수
  // ============================================
  const addEducation = useCallback(
    (education: Omit<Education, 'educationId'>) => {
      const { educations } = resumeData;
      updateField('educations', [
        ...educations,
        { ...education, educationId: null },
      ]);
    },
    [resumeData, updateField],
  );

  const updateEducation = useCallback(
    (education: Education) => {
      const updatedEducations = resumeData.educations.map(e =>
        e.educationId === education.educationId ? education : e,
      );
      updateField('educations', updatedEducations);
    },
    [resumeData.educations, updateField],
  );

  const deleteEducation = useCallback(
    (educationId: number) => {
      const filteredEducations = resumeData.educations.filter(
        e => e.educationId !== educationId,
      );
      updateField('educations', filteredEducations);
    },
    [resumeData.educations, updateField],
  );

  // ============================================
  // Career 관련 함수
  // ============================================
  const addCareer = useCallback(
    (career: Omit<Career, 'careerId'>) => {
      const { careers } = resumeData;
      updateField('careers', [...careers, { ...career, careerId: null }]);
    },
    [resumeData, updateField],
  );

  const updateCareer = useCallback(
    (career: Career) => {
      const updatedCareers = resumeData.careers.map(c =>
        c.careerId === career.careerId ? career : c,
      );
      updateField('careers', updatedCareers);
    },
    [resumeData.careers, updateField],
  );

  const deleteCareer = useCallback(
    (careerId: number) => {
      const filteredCareers = resumeData.careers.filter(
        c => c.careerId !== careerId,
      );
      updateField('careers', filteredCareers);
    },
    [resumeData.careers, updateField],
  );

  // ============================================
  // Project 관련 함수
  // ============================================
  const addProject = useCallback(
    (project: Omit<Project, 'projectId'>) => {
      const { projects } = resumeData;
      updateField('projects', [...projects, { ...project, projectId: null }]);
    },
    [resumeData, updateField],
  );

  const updateProject = useCallback(
    (project: Project) => {
      const updatedProjects = resumeData.projects.map(p =>
        p.projectId === project.projectId ? project : p,
      );
      updateField('projects', updatedProjects);
    },
    [resumeData.projects, updateField],
  );

  const deleteProject = useCallback(
    (projectId: number) => {
      const filteredProjects = resumeData.projects.filter(
        p => p.projectId !== projectId,
      );
      updateField('projects', filteredProjects);
    },
    [resumeData.projects, updateField],
  );

  // ============================================
  // Skill 관련 함수
  // ============================================
  const addSkill = useCallback(
    (skill: Omit<Skill, 'skillId'> & { skillId?: number | null }) => {
      const { skills } = resumeData;
      const isAlreadyAdded = skills.some(s => s.name === skill.name);
      if (isAlreadyAdded) {
        return;
      }
      updateField('skills', [
        ...skills,
        { ...skill, skillId: skill.skillId ?? null },
      ]);
    },
    [resumeData, updateField],
  );

  const deleteSkill = useCallback(
    (skillName: string) => {
      const filteredSkills = resumeData.skills.filter(
        s => s.name !== skillName,
      );
      updateField('skills', filteredSkills);
    },
    [resumeData.skills, updateField],
  );

  useEffect(() => {
    console.log('resumeData updated:', resumeData);
  }, [resumeData]);

  return {
    resumeData,
    setResumeData,
    updateField,
    resetStore,
    // Link
    addLink,
    updateLink,
    deleteLink,
    // Language
    addLanguage,
    updateLanguage,
    deleteLanguage,
    // Achievement
    addAchievement,
    updateAchievement,
    deleteAchievement,
    // Education
    addEducation,
    updateEducation,
    deleteEducation,
    // Career
    addCareer,
    updateCareer,
    deleteCareer,
    // Project
    addProject,
    updateProject,
    deleteProject,
    // Skill
    addSkill,
    deleteSkill,
  };
};

export default useResumeEdit;
