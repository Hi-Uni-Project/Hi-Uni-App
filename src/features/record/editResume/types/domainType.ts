export type Gender = 'MALE' | 'FEMALE';

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
export type GraduationStatus =
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
export type LanguageLevel = 'BASIC' | 'BUSINESS' | 'PROFESSIONAL' | 'FLUENT';

/**
 * 수상 및 자격증 유형 응답 타입
 *
 * - AWARD(수상)
 * - CERTIFICATE(자격증)
 * - TRAINING(교육)
 * - OTHER(기타)
 */
export type AchievementType = 'AWARD' | 'CERTIFICATE' | 'TRAINING' | 'OTHER';

export interface Career {
  careerId: number;
  companyName: string;
  startDate: Date;
  endDate: Date;
  role: string;
  position: string;
  jobDescription: string;
}

export interface Project {
  projectId: number;
  projectName: string;
  startDate: Date;
  endDate: Date;
  role: string;
  experienceDescription: string;
}

export interface Education {
  educationId: number;
  universityName: string;
  startDate: Date;
  endDate: Date;
  graduationStatus: GraduationStatus;
  major: string;
}

export interface Language {
  languageId: number;
  language: string;
  level: LanguageLevel;
}

export interface Achievement {
  achievementId: number;
  activityName: string;
  periodDate: Date;
  type: AchievementType;
  achievementDescription: string;
}

export interface Link {
  linkId: number;
  linkName: string;
  linkUrl: string;
}

export interface Skill {
  skillId: number;
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
