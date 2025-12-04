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
import { ResumeUpdateRequest } from '../types/requestType';
import { mapResumeEditFormToRequest } from '../utils/requestMapper';

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
    (link: Omit<Link, 'linkId' | 'tempId'>) => {
      const { links } = resumeData;
      updateField('links', [
        ...links,
        { ...link, linkId: null, tempId: Date.now().toString() },
      ]);
    },
    [resumeData, updateField],
  );

  const updateLink = useCallback(
    (link: Link) => {
      const updatedLinks = resumeData.links.map(l =>
        l.linkId === link.linkId || l.tempId === link.tempId ? link : l,
      );
      updateField('links', updatedLinks);
    },
    [resumeData.links, updateField],
  );

  const deleteLink = useCallback(
    (linkId: number | string) => {
      const filteredLinks = resumeData.links.filter(
        l => l.linkId !== linkId && l.tempId !== linkId,
      );
      updateField('links', filteredLinks);
    },
    [resumeData.links, updateField],
  );

  // ============================================
  // Language 관련 함수
  // ============================================
  const addLanguage = useCallback(
    (language: Omit<Language, 'languageId' | 'tempId'>) => {
      const { languages } = resumeData;
      updateField('languages', [
        ...languages,
        { ...language, languageId: null, tempId: Date.now().toString() },
      ]);
    },
    [resumeData, updateField],
  );

  const updateLanguage = useCallback(
    (language: Language) => {
      const updatedLanguages = resumeData.languages.map(l =>
        l.languageId === language.languageId || l.tempId === language.tempId
          ? language
          : l,
      );
      updateField('languages', updatedLanguages);
    },
    [resumeData.languages, updateField],
  );

  const deleteLanguage = useCallback(
    (languageId: number | string) => {
      const filteredLanguages = resumeData.languages.filter(
        l => l.languageId !== languageId && l.tempId !== languageId,
      );
      updateField('languages', filteredLanguages);
    },
    [resumeData.languages, updateField],
  );

  // ============================================
  // Achievement 관련 함수
  // ============================================
  const addAchievement = useCallback(
    (achievement: Omit<Achievement, 'achievementId' | 'tempId'>) => {
      const { achievements } = resumeData;
      updateField('achievements', [
        ...achievements,
        { ...achievement, achievementId: null, tempId: Date.now().toString() },
      ]);
    },
    [resumeData, updateField],
  );

  const updateAchievement = useCallback(
    (achievement: Achievement) => {
      const updatedAchievements = resumeData.achievements.map(a =>
        a.achievementId === achievement.achievementId ||
        a.tempId === achievement.tempId
          ? achievement
          : a,
      );
      updateField('achievements', updatedAchievements);
    },
    [resumeData.achievements, updateField],
  );

  const deleteAchievement = useCallback(
    (achievementId: number | string) => {
      const filteredAchievements = resumeData.achievements.filter(
        a => a.achievementId !== achievementId && a.tempId !== achievementId,
      );
      updateField('achievements', filteredAchievements);
    },
    [resumeData.achievements, updateField],
  );

  // ============================================
  // Education 관련 함수
  // ============================================
  const addEducation = useCallback(
    (education: Omit<Education, 'educationId' | 'tempId'>) => {
      const { educations } = resumeData;
      updateField('educations', [
        ...educations,
        { ...education, educationId: null, tempId: Date.now().toString() },
      ]);
    },
    [resumeData, updateField],
  );

  const updateEducation = useCallback(
    (education: Education) => {
      const updatedEducations = resumeData.educations.map(e =>
        e.educationId === education.educationId || e.tempId === education.tempId
          ? education
          : e,
      );
      updateField('educations', updatedEducations);
    },
    [resumeData.educations, updateField],
  );

  const deleteEducation = useCallback(
    (educationId: number | string) => {
      const filteredEducations = resumeData.educations.filter(
        e => e.educationId !== educationId && e.tempId !== educationId,
      );
      updateField('educations', filteredEducations);
    },
    [resumeData.educations, updateField],
  );

  // ============================================
  // Career 관련 함수
  // ============================================
  const addCareer = useCallback(
    (career: Omit<Career, 'careerId' | 'tempId'>) => {
      const { careers } = resumeData;
      updateField('careers', [
        ...careers,
        { ...career, careerId: null, tempId: Date.now().toString() },
      ]);
    },
    [resumeData, updateField],
  );

  const updateCareer = useCallback(
    (career: Career) => {
      const updatedCareers = resumeData.careers.map(c =>
        c.careerId === career.careerId || c.tempId === career.tempId
          ? career
          : c,
      );
      updateField('careers', updatedCareers);
    },
    [resumeData.careers, updateField],
  );

  const deleteCareer = useCallback(
    (careerId: number | string) => {
      const filteredCareers = resumeData.careers.filter(
        c => c.careerId !== careerId && c.tempId !== careerId,
      );
      updateField('careers', filteredCareers);
    },
    [resumeData.careers, updateField],
  );

  // ============================================
  // Project 관련 함수
  // ============================================
  const addProject = useCallback(
    (project: Omit<Project, 'projectId' | 'tempId'>) => {
      const { projects } = resumeData;
      updateField('projects', [
        ...projects,
        { ...project, projectId: null, tempId: Date.now().toString() },
      ]);
    },
    [resumeData, updateField],
  );

  const updateProject = useCallback(
    (project: Project) => {
      const updatedProjects = resumeData.projects.map(p =>
        p.projectId === project.projectId || p.tempId === project.tempId
          ? project
          : p,
      );
      updateField('projects', updatedProjects);
    },
    [resumeData.projects, updateField],
  );

  const deleteProject = useCallback(
    (projectId: number | string) => {
      const filteredProjects = resumeData.projects.filter(
        p => p.projectId !== projectId && p.tempId !== projectId,
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

  // ============================================
  // Request 데이터 변환
  // ============================================
  const getRequestData = useCallback((): ResumeUpdateRequest => {
    return mapResumeEditFormToRequest(resumeData);
  }, [resumeData]);

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
    // Request
    getRequestData,
  };
};

export default useResumeEdit;
