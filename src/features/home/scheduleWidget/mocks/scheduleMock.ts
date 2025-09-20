export interface MockScheduleItem {
  category: string;
  detail: string;
  time: string;
}

export interface MockScheduleData {
  date: Date;
  schedule: MockScheduleItem[];
}

const generateMockSeptember2025Data = (): MockScheduleData[] => {
  const data: MockScheduleData[] = [];

  for (let day = 1; day <= 30; day++) {
    const date = new Date(2025, 8, day);
    const schedule: MockScheduleItem[] = [];

    if (day === 1) {
      schedule.push(
        { category: '회의', detail: '팀 미팅', time: '10:00' },
        { category: '스터디', detail: 'React Native 스터디', time: '14:00' },
      );
    } else if (day === 8) {
      schedule.push({
        category: '개인 일정',
        detail: '병원 예약',
        time: 'AM 11:30 - PM 02:00',
      });
    } else if (day === 10) {
      schedule.push(
        { category: '프로젝트', detail: '코드 리뷰', time: 'PM 03:00' },
        { category: '회의', detail: '클라이언트 미팅', time: 'PM 05:00' },
        { category: '스터디', detail: '프론트엔드 스터디', time: 'PM 07:00' },
        { category: '개인 일정', detail: '점심 약속', time: 'PM 12:00' },
        { category: '프로젝트', detail: '디자인 피드백', time: 'PM 04:30' },
      );
    } else if (day === 12) {
      schedule.push({
        category: '스터디',
        detail: '알고리즘 스터디',
        time: 'PM 07:00',
      });
    } else if (day === 20) {
      schedule.push(
        { category: '개인 일정', detail: '친구 생일', time: 'PM 06:00' },
        { category: '프로젝트', detail: '디자인 회의', time: 'PM 01:00' },
      );
    } else if (day === 25) {
      schedule.push({
        category: '회의',
        detail: '주간 회의',
        time: 'AM 09:00',
      });
    } else if (day === 30) {
      schedule.push(
        { category: '스터디', detail: '영어 회화', time: 'PM 08:00' },
        { category: '개인 일정', detail: '휴가 준비', time: 'PM 04:00' },
      );
    }

    data.push({ date, schedule });
  }

  return data;
};

export const mockSeptember2025ScheduleData = generateMockSeptember2025Data();
