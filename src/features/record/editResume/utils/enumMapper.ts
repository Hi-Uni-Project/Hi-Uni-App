import {
  AchievementType,
  Gender,
  GraduationStatus,
  LanguageLevel,
} from '../types/domainType';
import {
  AchievementTypeResponse,
  GenderResponse,
  GraduationStatusResponse,
  LanguageLevelResponse,
} from '../types/responseType';

export const mapGenderToDomain = (response: GenderResponse): Gender => {
  const genderMap: Record<GenderResponse, Gender> = {
    MALE: Gender.MALE,
    FEMALE: Gender.FEMALE,
  };
  return genderMap[response];
};

export const mapGraduationStatusToDomain = (
  response: GraduationStatusResponse,
): GraduationStatus => {
  const statusMap: Record<GraduationStatusResponse, GraduationStatus> = {
    GRADUATED: GraduationStatus.GRADUATED,
    EXPECTED: GraduationStatus.EXPECTED,
    ENROLLED: GraduationStatus.ENROLLED,
    DROPOUT: GraduationStatus.DROPOUT,
    COMPLETED: GraduationStatus.COMPLETED,
    LEAVE: GraduationStatus.LEAVE,
  };
  return statusMap[response];
};

export const mapLanguageLevelToDomain = (
  response: LanguageLevelResponse,
): LanguageLevel => {
  const levelMap: Record<LanguageLevelResponse, LanguageLevel> = {
    BASIC: LanguageLevel.BASIC,
    BUSINESS: LanguageLevel.BUSINESS,
    PROFESSIONAL: LanguageLevel.PROFESSIONAL,
    FLUENT: LanguageLevel.FLUENT,
  };
  return levelMap[response];
};

export const mapAchievementTypeToDomain = (
  response: AchievementTypeResponse,
): AchievementType => {
  const typeMap: Record<AchievementTypeResponse, AchievementType> = {
    AWARD: AchievementType.AWARD,
    CERTIFICATE: AchievementType.CERTIFICATE,
    TRAINING: AchievementType.TRAINING,
    OTHER: AchievementType.OTHER,
  };
  return typeMap[response];
};

export const mapGenderToResponse = (domain: Gender): GenderResponse => {
  const genderMap: Record<Gender, GenderResponse> = {
    [Gender.MALE]: 'MALE',
    [Gender.FEMALE]: 'FEMALE',
  };
  return genderMap[domain];
};

export const mapGraduationStatusToResponse = (
  domain: GraduationStatus,
): GraduationStatusResponse => {
  const statusMap: Record<GraduationStatus, GraduationStatusResponse> = {
    [GraduationStatus.GRADUATED]: 'GRADUATED',
    [GraduationStatus.EXPECTED]: 'EXPECTED',
    [GraduationStatus.ENROLLED]: 'ENROLLED',
    [GraduationStatus.DROPOUT]: 'DROPOUT',
    [GraduationStatus.COMPLETED]: 'COMPLETED',
    [GraduationStatus.LEAVE]: 'LEAVE',
  };
  return statusMap[domain];
};

export const mapLanguageLevelToResponse = (
  domain: LanguageLevel,
): LanguageLevelResponse => {
  const levelMap: Record<LanguageLevel, LanguageLevelResponse> = {
    [LanguageLevel.BASIC]: 'BASIC',
    [LanguageLevel.BUSINESS]: 'BUSINESS',
    [LanguageLevel.PROFESSIONAL]: 'PROFESSIONAL',
    [LanguageLevel.FLUENT]: 'FLUENT',
  };
  return levelMap[domain];
};

export const mapAchievementTypeToResponse = (
  domain: AchievementType,
): AchievementTypeResponse => {
  const typeMap: Record<AchievementType, AchievementTypeResponse> = {
    [AchievementType.AWARD]: 'AWARD',
    [AchievementType.CERTIFICATE]: 'CERTIFICATE',
    [AchievementType.TRAINING]: 'TRAINING',
    [AchievementType.OTHER]: 'OTHER',
  };
  return typeMap[domain];
};
