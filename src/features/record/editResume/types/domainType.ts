import { Asset } from 'react-native-image-picker';

import {
  Gender,
  GraduationStatus,
  LanguageLevel,
  AchievementType,
} from './enum/resumeEnum';

// enum은 ./enum/resumeEnum.ts에서 관리
export { Gender, GraduationStatus, LanguageLevel, AchievementType };

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
