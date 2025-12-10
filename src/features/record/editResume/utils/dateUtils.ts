/**
 * 날짜 문자열("22.06.23" 형식)을 Date 객체로 변환합니다.
 *
 * @param dateString - "YY.MM.DD" 형식의 날짜 문자열
 * @returns Date 객체 또는 유효하지 않은 경우 null
 */
export const parseShortDate = (dateString: string): Date | null => {
  if (!dateString || dateString.trim() === '') {
    return null;
  }

  const parts = dateString.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [yearStr, monthStr, dayStr] = parts;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  // 2000년대로 가정 (00-99 -> 2000-2099)
  const fullYear = year < 100 ? 2000 + year : year;

  // month는 0-indexed이므로 -1
  const date = new Date(fullYear, month - 1, day);

  // 유효한 날짜인지 검증
  if (
    date.getFullYear() !== fullYear ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

/**
 * Date 객체를 "YY.MM.DD" 형식의 문자열로 변환합니다.
 *
 * @param date - Date 객체
 * @returns "YY.MM.DD" 형식의 문자열
 */
export const formatToShortDate = (date: Date | null): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear() % 100;
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const yearStr = year.toString().padStart(2, '0');
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');

  return `${yearStr}.${monthStr}.${dayStr}`;
};
