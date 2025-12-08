import {
  Achievement,
  Career,
  Education,
  Language,
  Link,
  Project,
  Resume,
  ResumeEditForm,
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
  mapAchievementTypeToDomain,
  mapGenderToDomain,
  mapGraduationStatusToDomain,
  mapLanguageLevelToDomain,
} from './enumMapper';

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
  graduationStatus: mapGraduationStatusToDomain(response.graduationStatus),
  major: response.major,
});

export const mapLanguageToDomain = (response: LanguageResponse): Language => ({
  languageId: response.languageId,
  language: response.language,
  level: mapLanguageLevelToDomain(response.level),
});

export const mapAchievementToDomain = (
  response: AchievementResponse,
): Achievement => ({
  achievementId: response.achievementId,
  activityName: response.activityName,
  periodDate: new Date(response.periodDate),
  type: mapAchievementTypeToDomain(response.type),
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
  gender: mapGenderToDomain(response.gender),
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

/**
 * 서버 응답 데이터를 편집 폼 형태로 변환
 * - photo: 서버의 imageUrl 그대로 저장 (상대 경로)
 * - ImagePicker에서 서버/로컬 이미지 구분하여 렌더링
 */
export const mapResumeToEditForm = (
  response: ResumeDataResponse,
): ResumeEditForm => ({
  photo: response.imageUrl || null,
  name: response.name || '',
  gender: mapGenderToDomain(response.gender),
  birthYear: response.birthYear || 0,
  title: response.title || '',
  aboutMe: response.aboutMe || '',
  aboutMeCnt: response.aboutMeCnt ?? 5,
  careers: (response.careers || []).map(mapCareerToDomain),
  projects: (response.projects || []).map(mapProjectToDomain),
  educations: (response.educations || []).map(mapEducationToDomain),
  skills: (response.skills || []).map(mapSkillToDomain),
  languages: (response.languages || []).map(mapLanguageToDomain),
  achievements: (response.achievements || []).map(mapAchievementToDomain),
  links: (response.links || []).map(mapLinkToDomain),
});
