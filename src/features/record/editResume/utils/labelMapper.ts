// 기존 코드 호환성을 위한 re-export
// 새로운 코드에서는 ../types/enum/resumeEnum에서 직접 import 권장

import {
  Gender,
  GraduationStatus,
  LanguageLevel,
  AchievementType,
  GENDER_DISPLAY_NAME,
  GRADUATION_STATUS_DISPLAY_NAME,
  LANGUAGE_LEVEL_DISPLAY_NAME,
  ACHIEVEMENT_TYPE_DISPLAY_NAME,
} from '../types/enum/resumeEnum';

// ============================================
// Gender (성별) - Legacy 호환
// ============================================

export const GenderEnumToLabel = GENDER_DISPLAY_NAME;

export const GenderLabelToEnum: Record<string, Gender> = {
  남성: Gender.MALE,
  여성: Gender.FEMALE,
};

// ============================================
// GraduationStatus (졸업 상태) - Legacy 호환
// ============================================

export const GraduationStatusEnumToLabel = GRADUATION_STATUS_DISPLAY_NAME;

export const GraduationStatusLabelToEnum: Record<string, GraduationStatus> = {
  졸업: GraduationStatus.GRADUATED,
  '졸업 예정': GraduationStatus.EXPECTED,
  '재학 중': GraduationStatus.ENROLLED,
  중퇴: GraduationStatus.DROPOUT,
  수료: GraduationStatus.COMPLETED,
  '휴학 중': GraduationStatus.LEAVE,
};

// ============================================
// LanguageLevel (언어 능력) - Legacy 호환
// ============================================

export const LanguageLevelEnumToLabel = LANGUAGE_LEVEL_DISPLAY_NAME;

export const LanguageLevelLabelToEnum: Record<string, LanguageLevel> = {
  '일상 회화': LanguageLevel.BASIC,
  '비즈니스 레벨': LanguageLevel.BUSINESS,
  '고급 비즈니스 레벨': LanguageLevel.PROFESSIONAL,
  유창함: LanguageLevel.FLUENT,
};

// ============================================
// AchievementType (수상/자격증 유형) - Legacy 호환
// ============================================

export const AchievementTypeEnumToLabel = ACHIEVEMENT_TYPE_DISPLAY_NAME;

export const AchievementTypeLabelToEnum: Record<string, AchievementType> = {
  수상: AchievementType.AWARD,
  자격증: AchievementType.CERTIFICATE,
  교육: AchievementType.TRAINING,
  기타: AchievementType.OTHER,
};
