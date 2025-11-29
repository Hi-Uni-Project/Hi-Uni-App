import { Asset } from 'react-native-image-picker';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

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
export enum GraduationStatus {
  GRADUATED = 'GRADUATED',
  EXPECTED = 'EXPECTED',
  ENROLLED = 'ENROLLED',
  DROPOUT = 'DROPOUT',
  COMPLETED = 'COMPLETED',
  LEAVE = 'LEAVE',
}

/**
 * 언어 능력 응답 타입
 *
 * - BASIC(일상 회화)
 * - BUSINESS(비즈니스 레벨)
 * - PROFESSIONAL(고급 비즈니스 레벨)
 * - FLUENT(유창함)
 */
export enum LanguageLevel {
  BASIC = 'BASIC',
  BUSINESS = 'BUSINESS',
  PROFESSIONAL = 'PROFESSIONAL',
  FLUENT = 'FLUENT',
}

/**
 * 수상 및 자격증 유형 응답 타입
 *
 * - AWARD(수상)
 * - CERTIFICATE(자격증)
 * - TRAINING(교육)
 * - OTHER(기타)
 */
export enum AchievementType {
  AWARD = 'AWARD',
  CERTIFICATE = 'CERTIFICATE',
  TRAINING = 'TRAINING',
  OTHER = 'OTHER',
}

export interface Career {
  careerId: number | null;
  companyName: string;
  startDate: Date;
  endDate: Date;
  role: string;
  position: string;
  jobDescription: string;
}

export interface Project {
  projectId: number | null;
  projectName: string;
  startDate: Date;
  endDate: Date;
  role: string;
  experienceDescription: string;
}

export interface Education {
  educationId: number | null;
  universityName: string;
  startDate: Date;
  endDate: Date;
  graduationStatus: GraduationStatus;
  major: string;
}

export interface Language {
  languageId: number | null;
  language: string;
  level: LanguageLevel;
}

export interface Achievement {
  achievementId: number | null;
  activityName: string;
  periodDate: Date;
  type: AchievementType;
  achievementDescription: string;
}

export interface Link {
  linkId: number | null;
  linkName: string;
  linkUrl: string;
}

export interface Skill {
  skillId: number | null;
  name: string;
}

export interface Resume {
  name: string;
  gender: Gender;
  birthYear: number;
  imageUrl: string;
  title: string;
  aboutMe: string;
  aboutMeCnt: number;
  careers: Career[];
  projects: Project[];
  educations: Education[];
  languages: Language[];
  achievements: Achievement[];
  links: Link[];
  skills: Skill[];
  projectsSize: number;
  educationsSize: number;
  languagesSize: number;
  achievementsSize: number;
  linksSize: number;
  skillsSize: number;
  careersSize: number;
}

export interface ResumeEditForm {
  photo: Asset | null;

  name: string;
  gender: Gender | null;
  birthYear: number;

  title: string;

  aboutMe: string;

  careers: Career[];
  projects: Project[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  achievements: Achievement[];
  links: Link[];
}
