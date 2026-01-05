import { Schedule } from '../types';

import dayjs from '@/shared/lib/dayjs';

const buildScheduleMap = (items: Schedule[]) => {
  const map: Record<string, Schedule[]> = {};

  const sortedItems = [...items].sort((a, b) => {
    const startA = dayjs(a.startDate);
    const startB = dayjs(b.startDate);

    if (!startA.isValid()) {
      return 1;
    }

    if (!startB.isValid()) {
      return -1;
    }

    if (startA.isSame(startB)) {
      return -1;
    }

    return startA.diff(startB);
  });

  sortedItems.forEach(item => {
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
