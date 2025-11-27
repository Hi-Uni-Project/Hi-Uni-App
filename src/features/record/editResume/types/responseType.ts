import { ResponseTypes } from '@/shared/api/types';

export type GenderResponse = 'MALE' | 'FEMALE';

/**
 * 졸업 상태 응답 타입
 *
 * - GRADUATED(졸업)
 * - EXPECTED(졸업 예정)
 * - ENROLLED(재학 중)
 * - DROPOUT(중퇴)
 * - COMPLETED(수료)
 * - LEAVE(휴학 중)
 */
export type GraduationStatusResponse =
  | 'GRADUATED'
  | 'EXPECTED'
  | 'ENROLLED'
  | 'DROPOUT'
  | 'COMPLETED'
  | 'LEAVE';

/**
 * 언어 능력 응답 타입
 *
 * - BASIC(일상 회화)
 * - BUSINESS(비즈니스 레벨)
 * - PROFESSIONAL(고급 비즈니스 레벨)
 * - FLUENT(유창함)
 */
export type LanguageLevelResponse =
  | 'BASIC'
  | 'BUSINESS'
  | 'PROFESSIONAL'
  | 'FLUENT';

/**
 * 수상 및 자격증 유형 응답 타입
 *
 * - AWARD(수상)
 * - CERTIFICATE(자격증)
 * - TRAINING(교육)
 * - OTHER(기타)
 */
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
