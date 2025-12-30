export const parseDateString = (dateString: string | undefined): Date => {
  if (!dateString) {
    return new Date();
  }

  // "2024.01.15" → "2024-01-15" 변환
  const normalizedDate = dateString.replace(/\./g, '-');

  const date = new Date(normalizedDate);

  // Invalid Date 체크
  if (isNaN(date.getTime())) {
    return new Date();
  }

  return date;
};
