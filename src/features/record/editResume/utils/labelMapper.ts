import {
  AchievementType,
  Gender,
  GraduationStatus,
  LanguageLevel,
} from '../types/domainType';

// ============================================
// Gender (성별)
// ============================================

export const GenderEnumToLabel: Record<Gender, string> = {
  [Gender.MALE]: '남성',
  [Gender.FEMALE]: '여성',
};

export const GenderLabelToEnum: Record<string, Gender> = {
  남성: Gender.MALE,
  여성: Gender.FEMALE,
};

// ============================================
// GraduationStatus (졸업 상태)
// ============================================

export const GraduationStatusEnumToLabel: Record<GraduationStatus, string> = {
  [GraduationStatus.GRADUATED]: '졸업',
  [GraduationStatus.EXPECTED]: '졸업 예정',
  [GraduationStatus.ENROLLED]: '재학 중',
  [GraduationStatus.DROPOUT]: '중퇴',
  [GraduationStatus.COMPLETED]: '수료',
  [GraduationStatus.LEAVE]: '휴학 중',
};

export const GraduationStatusLabelToEnum: Record<string, GraduationStatus> = {
  졸업: GraduationStatus.GRADUATED,
  '졸업 예정': GraduationStatus.EXPECTED,
  '재학 중': GraduationStatus.ENROLLED,
  중퇴: GraduationStatus.DROPOUT,
  수료: GraduationStatus.COMPLETED,
  '휴학 중': GraduationStatus.LEAVE,
};

// ============================================
// LanguageLevel (언어 능력)
// ============================================

export const LanguageLevelEnumToLabel: Record<LanguageLevel, string> = {
  [LanguageLevel.BASIC]: '일상 회화',
  [LanguageLevel.BUSINESS]: '비즈니스 레벨',
  [LanguageLevel.PROFESSIONAL]: '고급 비즈니스 레벨',
  [LanguageLevel.FLUENT]: '유창함',
};

export const LanguageLevelLabelToEnum: Record<string, LanguageLevel> = {
  '일상 회화': LanguageLevel.BASIC,
  '비즈니스 레벨': LanguageLevel.BUSINESS,
  '고급 비즈니스 레벨': LanguageLevel.PROFESSIONAL,
  유창함: LanguageLevel.FLUENT,
};

// ============================================
// AchievementType (수상/자격증 유형)
// ============================================

export const AchievementTypeEnumToLabel: Record<AchievementType, string> = {
  [AchievementType.AWARD]: '수상',
  [AchievementType.CERTIFICATE]: '자격증',
  [AchievementType.TRAINING]: '교육',
  [AchievementType.OTHER]: '기타',
};

export const AchievementTypeLabelToEnum: Record<string, AchievementType> = {
  수상: AchievementType.AWARD,
  자격증: AchievementType.CERTIFICATE,
  교육: AchievementType.TRAINING,
  기타: AchievementType.OTHER,
};
