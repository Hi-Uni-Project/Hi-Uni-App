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

/**
 * Date를 ISO 8601 문자열로 변환
 */
const toISOString = (date: Date): string => {
  return date.toISOString();
};

/**
 * Career → CareerRequest
 */
export const mapCareerToRequest = (career: Career): CareerRequest => ({
  careerId: career.careerId,
  companyName: career.companyName,
  startDate: toISOString(career.startDate),
  endDate: toISOString(career.endDate),
  role: career.role,
  position: career.position,
  jobDescription: career.jobDescription,
});

/**
 * Project → ProjectRequest
 */
export const mapProjectToRequest = (project: Project): ProjectRequest => ({
  projectId: project.projectId,
  projectName: project.projectName,
  startDate: toISOString(project.startDate),
  endDate: toISOString(project.endDate),
  role: project.role,
  experienceDescription: project.experienceDescription,
});

/**
 * Education → EducationRequest
 */
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

/**
 * Language → LanguageRequest
 */
export const mapLanguageToRequest = (language: Language): LanguageRequest => ({
  languageId: language.languageId,
  language: language.language,
  level: language.level,
});

/**
 * Achievement → AchievementRequest
 */
export const mapAchievementToRequest = (
  achievement: Achievement,
): AchievementRequest => ({
  achievementId: achievement.achievementId,
  activityName: achievement.activityName,
  periodDate: toISOString(achievement.periodDate),
  type: achievement.type,
  achievementDescription: achievement.achievementDescription,
});

/**
 * Link → LinkRequest
 */
export const mapLinkToRequest = (link: Link): LinkRequest => ({
  linkId: link.linkId,
  linkName: link.linkName,
  linkUrl: link.linkUrl,
});

/**
 * Skill → SkillRequest
 * skillId가 null인 경우 필터링해야 함 (서버에 등록된 스킬만 전송)
 */
export const mapSkillToRequest = (skill: Skill): SkillRequest | null => {
  if (skill.skillId === null) {
    return null;
  }
  return { skillId: skill.skillId };
};

/**
 * ResumeEditForm → ResumeUpdateRequest
 */
export const mapResumeEditFormToRequest = (
  form: ResumeEditForm,
): ResumeUpdateRequest => ({
  name: form.name,
  gender: form.gender,
  birthYear: form.birthYear,
  title: form.title,
  aboutMe: form.aboutMe,
  careers: form.careers.map(mapCareerToRequest),
  projects: form.projects.map(mapProjectToRequest),
  educations: form.educations.map(mapEducationToRequest),
  languages: form.languages.map(mapLanguageToRequest),
  achievements: form.achievements.map(mapAchievementToRequest),
  links: form.links.map(mapLinkToRequest),
  skills: form.skills
    .map(mapSkillToRequest)
    .filter((s): s is SkillRequest => s !== null),
});
