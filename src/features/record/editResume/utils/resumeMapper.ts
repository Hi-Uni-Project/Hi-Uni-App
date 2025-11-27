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

// ============================================
// Response → Domain 변환 (API 응답 → 앱 내부 사용)
// ============================================

export const mapCareerToDomain = (response: CareerResponse): Career => ({
  careerId: response.careerId,
  companyName: response.companyName,
  startDate: new Date(response.startDate),
  endDate: new Date(response.endDate),
  role: response.role,
  position: response.position,
  jobDescription: response.jobDescription,
});

export const mapProjectToDomain = (response: ProjectResponse): Project => ({
  projectId: response.projectId,
  projectName: response.projectName,
  startDate: new Date(response.startDate),
  endDate: new Date(response.endDate),
  role: response.role,
  experienceDescription: response.experienceDescription,
});

export const mapEducationToDomain = (
  response: EducationResponse,
): Education => ({
  educationId: response.educationId,
  universityName: response.universityName,
  startDate: new Date(response.startDate),
  endDate: new Date(response.endDate),
  graduationStatus: response.graduationStatus,
  major: response.major,
});

export const mapLanguageToDomain = (response: LanguageResponse): Language => ({
  languageId: response.languageId,
  language: response.language,
  level: response.level,
});

export const mapAchievementToDomain = (
  response: AchievementResponse,
): Achievement => ({
  achievementId: response.achievementId,
  activityName: response.activityName,
  periodDate: new Date(response.periodDate),
  type: response.type,
  achievementDescription: response.achievementDescription,
});

export const mapLinkToDomain = (response: LinkResponse): Link => ({
  linkId: response.linkId,
  linkName: response.linkName,
  linkUrl: response.linkUrl,
});

export const mapSkillToDomain = (response: SkillResponse): Skill => ({
  skillId: response.skillId,
  name: response.name,
});

export const mapResumeToDomain = (response: ResumeDataResponse): Resume => ({
  name: response.name,
  gender: response.gender,
  birthYear: response.birthYear,
  imageUrl: response.imageUrl,
  title: response.title,
  aboutMe: response.aboutMe,
  aboutMeCnt: response.aboutMeCnt,
  careers: response.careers.map(mapCareerToDomain),
  projects: response.projects.map(mapProjectToDomain),
  educations: response.educations.map(mapEducationToDomain),
  languages: response.languages.map(mapLanguageToDomain),
  achievements: response.achievements.map(mapAchievementToDomain),
  links: response.links.map(mapLinkToDomain),
  skills: response.skills.map(mapSkillToDomain),
  projectsSize: response.projectsSize,
  educationsSize: response.educationsSize,
  languagesSize: response.languagesSize,
  achievementsSize: response.achievementsSize,
  linksSize: response.linksSize,
  skillsSize: response.skillsSize,
  careersSize: response.careersSize,
});

// ============================================
// Domain → Response 변환 (앱 내부 → API 요청)
// ============================================

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
  graduationStatus: domain.graduationStatus,
  major: domain.major,
});

export const mapLanguageToResponse = (domain: Language): LanguageResponse => ({
  languageId: domain.languageId,
  language: domain.language,
  level: domain.level,
});

export const mapAchievementToResponse = (
  domain: Achievement,
): AchievementResponse => ({
  achievementId: domain.achievementId,
  activityName: domain.activityName,
  periodDate: domain.periodDate.toISOString(),
  type: domain.type,
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
  gender: domain.gender,
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
