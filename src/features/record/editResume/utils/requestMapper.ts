import {
  Achievement,
  Career,
  Education,
  Language,
  Link,
  Project,
  ResumeEditForm,
  Skill,
} from '../types/domainType';
import {
  AchievementRequest,
  CareerRequest,
  EducationRequest,
  LanguageRequest,
  LinkRequest,
  ProjectRequest,
  ResumeUpdateRequest,
  SkillRequest,
} from '../types/requestType';

const toISOString = (date: Date): string => date.toISOString();

export const mapCareerToRequest = (career: Career): CareerRequest => ({
  careerId: career.careerId,
  companyName: career.companyName,
  startDate: toISOString(career.startDate),
  endDate: toISOString(career.endDate),
  role: career.role,
  position: career.position,
  jobDescription: career.jobDescription,
});

export const mapProjectToRequest = (project: Project): ProjectRequest => ({
  projectId: project.projectId,
  projectName: project.projectName,
  startDate: toISOString(project.startDate),
  endDate: toISOString(project.endDate),
  role: project.role,
  experienceDescription: project.experienceDescription,
});

export const mapEducationToRequest = (
  education: Education,
): EducationRequest => ({
  educationId: education.educationId,
  universityName: education.universityName,
  startDate: toISOString(education.startDate),
  endDate: toISOString(education.endDate),
  graduationStatus: education.graduationStatus,
  major: education.major,
});

export const mapLanguageToRequest = (language: Language): LanguageRequest => ({
  languageId: language.languageId,
  language: language.language,
  level: language.level,
});

export const mapAchievementToRequest = (
  achievement: Achievement,
): AchievementRequest => ({
  achievementId: achievement.achievementId,
  activityName: achievement.activityName,
  periodDate: toISOString(achievement.periodDate),
  type: achievement.type,
  achievementDescription: achievement.achievementDescription,
});

export const mapLinkToRequest = (link: Link): LinkRequest => ({
  linkId: link.linkId,
  linkName: link.linkName,
  linkUrl: link.linkUrl,
});

export const mapSkillToRequest = (skill: Skill): SkillRequest => {
  if (skill.skillId === null) {
    throw new Error('mapSkillToRequest: expected skill.skillId to be non-null');
  }
  return { skillId: skill.skillId };
};

export const mapResumeEditFormToRequest = (
  form: ResumeEditForm,
): ResumeUpdateRequest => {
  const careersMapped =
    form.careers && form.careers.length > 0
      ? form.careers.map(mapCareerToRequest)
      : null;

  const projectsMapped =
    form.projects && form.projects.length > 0
      ? form.projects.map(mapProjectToRequest)
      : null;

  const educationsMapped =
    form.educations && form.educations.length > 0
      ? form.educations.map(mapEducationToRequest)
      : null;

  const languagesMapped =
    form.languages && form.languages.length > 0
      ? form.languages.map(mapLanguageToRequest)
      : null;

  const achievementsMapped =
    form.achievements && form.achievements.length > 0
      ? form.achievements.map(mapAchievementToRequest)
      : null;

  const linksMapped =
    form.links && form.links.length > 0
      ? form.links.map(mapLinkToRequest)
      : null;

  const skillsMapped = form.skills
    ? form.skills.filter(s => s.skillId !== null).map(mapSkillToRequest)
    : [];

  return {
    updateImage: form.updateImage,
    name: form.name,
    gender: form.gender,
    birthYear: form.birthYear,
    title: form.title,
    aboutMe: form.aboutMe,
    careers: careersMapped,
    projects: projectsMapped,
    educations: educationsMapped,
    languages: languagesMapped,
    achievements: achievementsMapped,
    links: linksMapped,
    skills: skillsMapped.length > 0 ? skillsMapped : null,
  };
};
