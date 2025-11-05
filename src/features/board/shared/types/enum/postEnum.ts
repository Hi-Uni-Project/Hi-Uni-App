// (나중에 대외활동에 대한 속성명이 추가될 예정입니다.)

export enum PostType {
  JOB = 'JOB',
  INTERNSHIP = 'INTERNSHIP',
  INTERVIEW = 'INTERVIEW',
  EXPERIENCE = 'EXPERIENCE',
  LICENSE = 'LICENSE',
}

export enum PostCategory {
  EXTERNAL_ACTIVITIES = 'EXTERNALACTIVITIES',
  JOB_INFORMATION = 'JOBINFORMATION',
}

export const POST_TYPE_DISPLAY_NAME: Record<PostType, string> = {
  [PostType.JOB]: '취업',
  [PostType.INTERNSHIP]: '인턴십',
  [PostType.INTERVIEW]: '면접',
  [PostType.EXPERIENCE]: '실무이야기',
  [PostType.LICENSE]: '자격증',
};

export const JOB_CATEGORY_CHIPS = [
  '전체',
  POST_TYPE_DISPLAY_NAME[PostType.JOB],
  POST_TYPE_DISPLAY_NAME[PostType.INTERNSHIP],
  POST_TYPE_DISPLAY_NAME[PostType.INTERVIEW],
  POST_TYPE_DISPLAY_NAME[PostType.EXPERIENCE],
  POST_TYPE_DISPLAY_NAME[PostType.LICENSE],
] as const;

export const POST_CATEGORY_DISPLAY_NAME: Record<PostCategory, string> = {
  [PostCategory.EXTERNAL_ACTIVITIES]: '대외활동',
  [PostCategory.JOB_INFORMATION]: '취업정보',
};

export const POST_TYPE_OPTIONS = [
  { label: POST_TYPE_DISPLAY_NAME[PostType.JOB], value: PostType.JOB },
  {
    label: POST_TYPE_DISPLAY_NAME[PostType.INTERNSHIP],
    value: PostType.INTERNSHIP,
  },
  {
    label: POST_TYPE_DISPLAY_NAME[PostType.INTERVIEW],
    value: PostType.INTERVIEW,
  },
  {
    label: POST_TYPE_DISPLAY_NAME[PostType.EXPERIENCE],
    value: PostType.EXPERIENCE,
  },
  { label: POST_TYPE_DISPLAY_NAME[PostType.LICENSE], value: PostType.LICENSE },
];

export const POST_CATEGORY_OPTIONS = [
  {
    label: POST_CATEGORY_DISPLAY_NAME[PostCategory.EXTERNAL_ACTIVITIES],
    value: PostCategory.EXTERNAL_ACTIVITIES,
  },
  {
    label: POST_CATEGORY_DISPLAY_NAME[PostCategory.JOB_INFORMATION],
    value: PostCategory.JOB_INFORMATION,
  },
];

export const getPostTypeByLabel = (label: string): PostType | undefined => {
  const entry = Object.entries(POST_TYPE_DISPLAY_NAME).find(
    ([_, displayName]) => displayName === label,
  );
  return entry?.[0] as PostType | undefined;
};

export const getPostCategoryByLabel = (
  label: string,
): PostCategory | undefined => {
  const entry = Object.entries(POST_CATEGORY_DISPLAY_NAME).find(
    ([_, displayName]) => displayName === label,
  );
  return entry?.[0] as PostCategory | undefined;
};

export const getPostTypeByDisplayName = (
  displayName: string,
): PostType | null => {
  if (displayName === '전체') {
    return null;
  }

  const entry = Object.entries(POST_TYPE_DISPLAY_NAME).find(
    ([_, name]) => name === displayName,
  );

  return entry?.[0] as PostType | null;
};
