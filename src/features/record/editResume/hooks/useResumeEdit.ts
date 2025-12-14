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

const useResumeEdit = () => {
  const { resumeData, setResumeData, updateField, resetStore } =
    useResumeEditStore();

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

    addLink,
    updateLink,
    deleteLink,

    addLanguage,
    updateLanguage,
    deleteLanguage,

    addAchievement,
    updateAchievement,
    deleteAchievement,

    addEducation,
    updateEducation,
    deleteEducation,

    addCareer,
    updateCareer,
    deleteCareer,

    addProject,
    updateProject,
    deleteProject,

    addSkill,
    deleteSkill,

    getRequestData,
  };
};

export default useResumeEdit;
