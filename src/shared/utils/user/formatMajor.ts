export const formatMajor = (
  firstMajorName?: string | null,
  secondMajorName?: string | null,
): string => {
  // 1. 학과 정보가 모두 없는 경우
  if (!firstMajorName && !secondMajorName) {
    return '과 미지정';
  }

  // 2. 첫 번째 전공만 있는 경우
  if (firstMajorName && !secondMajorName) {
    return firstMajorName;
  }

  // 3. 두 번째 전공만 있는 경우 (혹시 서버에서 순서가 반대로 올 수도 있으니 예외처리)
  if (!firstMajorName && secondMajorName) {
    return secondMajorName;
  }

  // 4. 두 전공 모두 있는 경우
  return `${firstMajorName} 외 1`;
};
