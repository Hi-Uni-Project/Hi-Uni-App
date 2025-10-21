/**
 * 날짜 / 시간 포맷 유틸
 * - 오늘일 경우 → HH:mm
 * - 오늘이 아닐 경우 → MM/DD
 * - 내가 쓴 글(My post)일 경우 → MM/DD HH:mm
 */
export const formatDateOrTime = (
  isoString: string,
  isMyPost: boolean = false,
): string => {
  if (!isoString) {
    return '';
  }

  const date = new Date(isoString);
  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const pad = (n: number) => n.toString().padStart(2, '0');

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  if (isMyPost) {
    return `${month}/${day} ${hours}:${minutes}`;
  }
  if (isToday) {
    return `${hours}:${minutes}`;
  }
  return `${month}/${day}`;
};

/**
 * 학과 포맷 유틸
 * - 학과가 둘 다 없으면 → '과 미지정'
 * - 하나만 있으면 → 해당 학과명
 * - 두 개 다 있으면 → `${firstMajor} 외 1`
 */
export const formatMajor = (
  firstMajorName?: string | null,
  secondMajorName?: string | null,
): string => {
  const first = firstMajorName?.trim();
  const second = secondMajorName?.trim();

  if (!first && !second) {
    return '과 미지정';
  }
  if (first && !second) {
    return first;
  }
  if (!first && second) {
    return second;
  }
  return `${first} 외 1`;
};
