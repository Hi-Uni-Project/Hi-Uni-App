const formatKoreanDate = (date: Date): string => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${dayNames[d.getDay()]})`;
};

export default formatKoreanDate;
