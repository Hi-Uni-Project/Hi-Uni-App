import calendarScheduleMock from '../../mocks/CalendarScheduleMock';
import { CalendarSchedule, CalendarScheduleRequest } from '../../types';

import dayjs from '@/shared/lib/dayjs';

const fetchCalendarSchedule = async ({
  startDate,
  endDate,
}: CalendarScheduleRequest): Promise<CalendarSchedule[]> => {
  // AI 사용
  // mock 데이터로 대체
  const mock = calendarScheduleMock;

  // 1초 딜레이 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));

  // startDate와 endDate 사이의 스케줄 필터링
  const filteredSchedules = mock.data.filter(schedule => {
    const scheduleStart = dayjs(schedule.startDate);
    const scheduleEnd = dayjs(schedule.endDate);
    const requestStart = dayjs(startDate);
    const requestEnd = dayjs(endDate);

    // 스케줄 기간이 요청 기간과 겹치는지 확인
    return (
      scheduleStart.isBefore(requestEnd) && scheduleEnd.isAfter(requestStart)
    );
  });

  return filteredSchedules;
};

export default fetchCalendarSchedule;
