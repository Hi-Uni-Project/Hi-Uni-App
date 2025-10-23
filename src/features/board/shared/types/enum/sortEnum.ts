export enum SortType {
  LATEST = 'latest',
  LIKE = 'like',
  COMMENT = 'comment',
}

export const SORT_DISPLAY_NAME: Record<SortType, string> = {
  [SortType.LATEST]: '최신순',
  [SortType.LIKE]: '좋아요 순',
  [SortType.COMMENT]: '댓글 순',
};

export const SORT_OPTIONS = [
  { label: SORT_DISPLAY_NAME[SortType.LATEST], value: SortType.LATEST },
  { label: SORT_DISPLAY_NAME[SortType.LIKE], value: SortType.LIKE },
  { label: SORT_DISPLAY_NAME[SortType.COMMENT], value: SortType.COMMENT },
];

export const getSortTypeByLabel = (label: string): SortType => {
  const entry = Object.entries(SORT_DISPLAY_NAME).find(
    ([_, displayName]) => displayName === label,
  );
  return (entry?.[0] as SortType) ?? SortType.LATEST;
};
