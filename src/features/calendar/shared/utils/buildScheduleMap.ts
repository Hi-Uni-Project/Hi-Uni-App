import { CalendarSchedule } from '../types';

import dayjs from '@/shared/lib/dayjs';

const buildScheduleMap = (items: CalendarSchedule[]) => {
  const map: Record<string, CalendarSchedule[]> = {};

  items.forEach(item => {
    const start = dayjs(item.startDate);
    const end = dayjs(item.endDate);

    if (!start.isValid() || !end.isValid()) {
      return;
    }

    let cursor = start.startOf('day');
    const last = end.startOf('day');

    while (cursor.isBefore(last) || cursor.isSame(last, 'day')) {
      const key = cursor.format('YYYY-MM-DD');
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(item);
      cursor = cursor.add(1, 'day');
    }
  });

  return map;
};

export default buildScheduleMap;
