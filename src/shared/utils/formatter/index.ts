/**
 * UTC 시간을 한국 시간(KST, UTC+9)으로 변환
 */
const convertToKST = (isoString: string): Date => {
  const date = new Date(isoString);

  if (
    !isoString.includes('Z') &&
    !isoString.includes('+') &&
    !isoString.match(/-\d{2}:\d{2}$/)
  ) {
    date.setHours(date.getHours() + 9);
  }

  return date;
};

/**
 * 날짜 / 시간 포맷 유틸 (한국 시간 기준, 24시간제)
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

  const date = convertToKST(isoString);
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

/**
 * 후기 날짜 포맷 유틸 (한국 시간 기준)
 * Date 객체를 YYYY-MM-DDT00:00:00 형식으로 변환
 * 시간은 항상 00:00:00으로 고정
 */
export const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00`;
};
