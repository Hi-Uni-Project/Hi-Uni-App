import { ResponseTypes } from '@/shared/api/types';

// Response 타입은 서버 API 응답 기준 (원천 타입)
export type GenderResponse = 'MALE' | 'FEMALE';

export type GraduationStatusResponse =
  | 'GRADUATED'
  | 'EXPECTED'
  | 'ENROLLED'
  | 'DROPOUT'
  | 'COMPLETED'
  | 'LEAVE';

export type LanguageLevelResponse =
  | 'BASIC'
  | 'BUSINESS'
  | 'PROFESSIONAL'
  | 'FLUENT';

export type AchievementTypeResponse =
  | 'AWARD'
  | 'CERTIFICATE'
  | 'TRAINING'
  | 'OTHER';

export interface CareerResponse {
  careerId: number;
  companyName: string;
  startDate: string; // ISO DateTime string
  endDate: string; // ISO DateTime string
  role: string;
  position: string;
  jobDescription: string;
}

export interface ProjectResponse {
  projectId: number;
  projectName: string;
  startDate: string; // ISO DateTime string
  endDate: string; // ISO DateTime string
  role: string;
  experienceDescription: string;
}

export interface EducationResponse {
  educationId: number;
  universityName: string;
  startDate: string; // ISO DateTime string
  endDate: string; // ISO DateTime string
  graduationStatus: GraduationStatusResponse;
  major: string;
}

export interface LanguageResponse {
  languageId: number;
  language: string;
  level: LanguageLevelResponse;
}

export interface AchievementResponse {
  achievementId: number;
  activityName: string;
  periodDate: string; // ISO DateTime string
  type: AchievementTypeResponse;
  achievementDescription: string;
}

export interface LinkResponse {
  linkId: number;
  linkName: string;
  linkUrl: string;
}

export interface SkillResponse {
  skillId: number;
  name: string;
}

export interface ResumeDataResponse {
  name: string;
  gender: GenderResponse;
  birthYear: number;
  imageUrl: string;
  title: string;
  aboutMe: string;
  aboutMeCnt: number;
  careers: CareerResponse[];
  projects: ProjectResponse[];
  educations: EducationResponse[];
  languages: LanguageResponse[];
  achievements: AchievementResponse[];
  links: LinkResponse[];
  skills: SkillResponse[];
  projectsSize: number;
  educationsSize: number;
  languagesSize: number;
  achievementsSize: number;
  linksSize: number;
  skillsSize: number;
  careersSize: number;
}

export type ResumeResponse = ResponseTypes<ResumeDataResponse>;
