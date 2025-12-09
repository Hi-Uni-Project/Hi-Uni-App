import {
  AchievementType,
  Gender,
  GraduationStatus,
  LanguageLevel,
} from './enum/resumeEnum';

// Request용 엔티티 타입 (tempId 제외, Date는 ISO string)

export interface CareerRequest {
  careerId: number | null;
  companyName: string;
  startDate: string;
  endDate: string;
  role: string;
  position: string;
  jobDescription: string;
}

export interface ProjectRequest {
  projectId: number | null;
  projectName: string;
  startDate: string;
  endDate: string;
  role: string;
  experienceDescription: string;
}

export interface EducationRequest {
  educationId: number | null;
  universityName: string;
  startDate: string;
  endDate: string;
  graduationStatus: GraduationStatus;
  major: string;
}

export interface LanguageRequest {
  languageId: number | null;
  language: string;
  level: LanguageLevel;
}

export interface AchievementRequest {
  achievementId: number | null;
  activityName: string;
  periodDate: string;
  type: AchievementType;
  achievementDescription: string;
}

export interface LinkRequest {
  linkId: number | null;
  linkName: string;
  linkUrl: string;
}

export interface SkillRequest {
  skillId: number;
}

export interface ResumeUpdateRequest {
  updateImage: boolean;
  name: string;
  gender: Gender;
  birthYear: number;
  title: string;
  aboutMe: string;
  careers: CareerRequest[] | null;
  projects: ProjectRequest[] | null;
  educations: EducationRequest[] | null;
  languages: LanguageRequest[] | null;
  achievements: AchievementRequest[] | null;
  links: LinkRequest[] | null;
  skills: SkillRequest[] | null;
}
