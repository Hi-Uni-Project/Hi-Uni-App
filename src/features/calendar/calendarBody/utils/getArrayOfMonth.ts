import { Dayjs } from 'dayjs';

import { CalendarDayUI } from '../../types';

const getArrayOfMonth = ({ date }: { date: Dayjs }): CalendarDayUI[] => {
  // 1. 이번 달 시작/끝
  const startOfMonth = date.startOf('month');
  const endOfMonth = date.endOf('month');

  // 2. 이번 달 시작 요일 (앞에 패딩 필요)
  const startDay = startOfMonth.day(); // 0: 일요일 ~ 6: 토요일

  // 3. 이번 달 일 수
  const daysInMonth = date.daysInMonth();

  // 4. 앞쪽: 이전 달에서 채워야 할 날짜들
  const prevMonth = date.subtract(1, 'month');
  const prevDaysInMonth = prevMonth.daysInMonth();
  const leadingDays = [...Array(startDay)].map((_, i) => {
    const d = prevMonth.clone().date(prevDaysInMonth - startDay + i + 1);
    return {
      date: d,
      isCurrentMonth: false,
      isSunday: d.day() === 0,
    };
  });

  // 5. 이번 달 날짜들
  const currentDays = [...Array(daysInMonth)].map((_, i) => {
    const d = startOfMonth.add(i, 'day');
    return {
      date: d,
      isCurrentMonth: true,
      isSunday: d.day() === 0,
    };
  });

  // 6. 뒤쪽: 다음 달에서 채워야 할 날짜들 (6주 = 42칸 기준)
  const totalCells = leadingDays.length + currentDays.length;
  const trailingDaysCount = 42 - totalCells;

  const trailingDays = [...Array(trailingDaysCount)].map((_, i) => {
    const d = endOfMonth.add(i + 1, 'day');
    return {
      date: d,
      isCurrentMonth: false,
      isSunday: d.day() === 0,
    };
  });

  return [...leadingDays, ...currentDays, ...trailingDays];
};

export default getArrayOfMonth;
