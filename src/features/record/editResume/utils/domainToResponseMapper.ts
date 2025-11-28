import {
  Achievement,
  Career,
  Education,
  Language,
  Link,
  Project,
  Resume,
  Skill,
} from '../types/domainType';
import {
  AchievementResponse,
  CareerResponse,
  EducationResponse,
  LanguageResponse,
  LinkResponse,
  ProjectResponse,
  ResumeDataResponse,
  SkillResponse,
} from '../types/responseType';

import {
  mapAchievementTypeToResponse,
  mapGenderToResponse,
  mapGraduationStatusToResponse,
  mapLanguageLevelToResponse,
} from './enumMapper';

export const mapCareerToResponse = (domain: Career): CareerResponse => ({
  careerId: domain.careerId,
  companyName: domain.companyName,
  startDate: domain.startDate.toISOString(),
  endDate: domain.endDate.toISOString(),
  role: domain.role,
  position: domain.position,
  jobDescription: domain.jobDescription,
});

export const mapProjectToResponse = (domain: Project): ProjectResponse => ({
  projectId: domain.projectId,
  projectName: domain.projectName,
  startDate: domain.startDate.toISOString(),
  endDate: domain.endDate.toISOString(),
  role: domain.role,
  experienceDescription: domain.experienceDescription,
});

export const mapEducationToResponse = (
  domain: Education,
): EducationResponse => ({
  educationId: domain.educationId,
  universityName: domain.universityName,
  startDate: domain.startDate.toISOString(),
  endDate: domain.endDate.toISOString(),
  graduationStatus: mapGraduationStatusToResponse(domain.graduationStatus),
  major: domain.major,
});

export const mapLanguageToResponse = (domain: Language): LanguageResponse => ({
  languageId: domain.languageId,
  language: domain.language,
  level: mapLanguageLevelToResponse(domain.level),
});

export const mapAchievementToResponse = (
  domain: Achievement,
): AchievementResponse => ({
  achievementId: domain.achievementId,
  activityName: domain.activityName,
  periodDate: domain.periodDate.toISOString(),
  type: mapAchievementTypeToResponse(domain.type),
  achievementDescription: domain.achievementDescription,
});

export const mapLinkToResponse = (domain: Link): LinkResponse => ({
  linkId: domain.linkId,
  linkName: domain.linkName,
  linkUrl: domain.linkUrl,
});

export const mapSkillToResponse = (domain: Skill): SkillResponse => ({
  skillId: domain.skillId,
  name: domain.name,
});

export const mapResumeToResponse = (domain: Resume): ResumeDataResponse => ({
  name: domain.name,
  gender: mapGenderToResponse(domain.gender),
  birthYear: domain.birthYear,
  imageUrl: domain.imageUrl,
  title: domain.title,
  aboutMe: domain.aboutMe,
  aboutMeCnt: domain.aboutMeCnt,
  careers: domain.careers.map(mapCareerToResponse),
  projects: domain.projects.map(mapProjectToResponse),
  educations: domain.educations.map(mapEducationToResponse),
  languages: domain.languages.map(mapLanguageToResponse),
  achievements: domain.achievements.map(mapAchievementToResponse),
  links: domain.links.map(mapLinkToResponse),
  skills: domain.skills.map(mapSkillToResponse),
  projectsSize: domain.projectsSize,
  educationsSize: domain.educationsSize,
  languagesSize: domain.languagesSize,
  achievementsSize: domain.achievementsSize,
  linksSize: domain.linksSize,
  skillsSize: domain.skillsSize,
  careersSize: domain.careersSize,
});
