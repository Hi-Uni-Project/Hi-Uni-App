// ============================================
// Gender (성별)
// ============================================

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export const GENDER_DISPLAY_NAME: Record<Gender, string> = {
  [Gender.MALE]: '남성',
  [Gender.FEMALE]: '여성',
  [Gender.OTHER]: '선택안함',
};

export const GENDER_OPTIONS = [
  { label: GENDER_DISPLAY_NAME[Gender.MALE], value: Gender.MALE },
  { label: GENDER_DISPLAY_NAME[Gender.FEMALE], value: Gender.FEMALE },
  { label: GENDER_DISPLAY_NAME[Gender.OTHER], value: Gender.OTHER },
];

export const getGenderByLabel = (label: string): Gender | undefined => {
  const entry = Object.entries(GENDER_DISPLAY_NAME).find(
    ([_, displayName]) => displayName === label,
  );
  return entry?.[0] as Gender | undefined;
};

// ============================================
// GraduationStatus (졸업 상태)
// ============================================

/**
 * 졸업 상태
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

export const GRADUATION_STATUS_DISPLAY_NAME: Record<GraduationStatus, string> =
  {
    [GraduationStatus.GRADUATED]: '졸업',
    [GraduationStatus.EXPECTED]: '졸업 예정',
    [GraduationStatus.ENROLLED]: '재학 중',
    [GraduationStatus.DROPOUT]: '중퇴',
    [GraduationStatus.COMPLETED]: '수료',
    [GraduationStatus.LEAVE]: '휴학 중',
  };

export const GRADUATION_STATUS_OPTIONS = [
  {
    label: GRADUATION_STATUS_DISPLAY_NAME[GraduationStatus.GRADUATED],
    value: GraduationStatus.GRADUATED,
  },
  {
    label: GRADUATION_STATUS_DISPLAY_NAME[GraduationStatus.EXPECTED],
    value: GraduationStatus.EXPECTED,
  },
  {
    label: GRADUATION_STATUS_DISPLAY_NAME[GraduationStatus.ENROLLED],
    value: GraduationStatus.ENROLLED,
  },
  {
    label: GRADUATION_STATUS_DISPLAY_NAME[GraduationStatus.DROPOUT],
    value: GraduationStatus.DROPOUT,
  },
  {
    label: GRADUATION_STATUS_DISPLAY_NAME[GraduationStatus.COMPLETED],
    value: GraduationStatus.COMPLETED,
  },
  {
    label: GRADUATION_STATUS_DISPLAY_NAME[GraduationStatus.LEAVE],
    value: GraduationStatus.LEAVE,
  },
];

export const getGraduationStatusByLabel = (
  label: string,
): GraduationStatus | undefined => {
  const entry = Object.entries(GRADUATION_STATUS_DISPLAY_NAME).find(
    ([_, displayName]) => displayName === label,
  );
  return entry?.[0] as GraduationStatus | undefined;
};

// ============================================
// LanguageLevel (언어 능력)
// ============================================

/**
 * 언어 능력
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

export const LANGUAGE_LEVEL_DISPLAY_NAME: Record<LanguageLevel, string> = {
  [LanguageLevel.BASIC]: '일상 회화',
  [LanguageLevel.BUSINESS]: '비즈니스 레벨',
  [LanguageLevel.PROFESSIONAL]: '고급 비즈니스 레벨',
  [LanguageLevel.FLUENT]: '유창함',
};

export const LANGUAGE_LEVEL_OPTIONS = [
  {
    label: LANGUAGE_LEVEL_DISPLAY_NAME[LanguageLevel.BASIC],
    value: LanguageLevel.BASIC,
  },
  {
    label: LANGUAGE_LEVEL_DISPLAY_NAME[LanguageLevel.BUSINESS],
    value: LanguageLevel.BUSINESS,
  },
  {
    label: LANGUAGE_LEVEL_DISPLAY_NAME[LanguageLevel.PROFESSIONAL],
    value: LanguageLevel.PROFESSIONAL,
  },
  {
    label: LANGUAGE_LEVEL_DISPLAY_NAME[LanguageLevel.FLUENT],
    value: LanguageLevel.FLUENT,
  },
];

export const getLanguageLevelByLabel = (
  label: string,
): LanguageLevel | undefined => {
  const entry = Object.entries(LANGUAGE_LEVEL_DISPLAY_NAME).find(
    ([_, displayName]) => displayName === label,
  );
  return entry?.[0] as LanguageLevel | undefined;
};

// ============================================
// AchievementType (수상/자격증 유형)
// ============================================

/**
 * 수상 및 자격증 유형
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

export const ACHIEVEMENT_TYPE_DISPLAY_NAME: Record<AchievementType, string> = {
  [AchievementType.AWARD]: '수상',
  [AchievementType.CERTIFICATE]: '자격증',
  [AchievementType.TRAINING]: '교육',
  [AchievementType.OTHER]: '기타',
};

export const ACHIEVEMENT_TYPE_OPTIONS = [
  {
    label: ACHIEVEMENT_TYPE_DISPLAY_NAME[AchievementType.AWARD],
    value: AchievementType.AWARD,
  },
  {
    label: ACHIEVEMENT_TYPE_DISPLAY_NAME[AchievementType.CERTIFICATE],
    value: AchievementType.CERTIFICATE,
  },
  {
    label: ACHIEVEMENT_TYPE_DISPLAY_NAME[AchievementType.TRAINING],
    value: AchievementType.TRAINING,
  },
  {
    label: ACHIEVEMENT_TYPE_DISPLAY_NAME[AchievementType.OTHER],
    value: AchievementType.OTHER,
  },
];

export const getAchievementTypeByLabel = (
  label: string,
): AchievementType | undefined => {
  const entry = Object.entries(ACHIEVEMENT_TYPE_DISPLAY_NAME).find(
    ([_, displayName]) => displayName === label,
  );
  return entry?.[0] as AchievementType | undefined;
};
