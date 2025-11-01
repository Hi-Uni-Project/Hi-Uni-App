import { CalendarScheduleResponse } from '../shared/types';

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }
  const minutesStr = minutes.toString().padStart(2, '0');
  const hoursStr = hours.toString().padStart(2, '0');
  return `${ampm} ${hoursStr}:${minutesStr}`;
}

const calendarScheduleMock: CalendarScheduleResponse = {
  localDateTime: '2025-09-30T12:00:00.000000',
  responseCode: 200,
  statusCode: 'SUCCESS',
  message: '스케줄 조회에 성공하였습니다.',
  data: [
    // 단일 일정들
    {
      startDate: '2025-09-01T09:00:00',
      endDate: '2025-12-30T10:00:00',
      category: '업무',
      detail: '긴 일정 테스트',
      time: `${formatTime('2025-09-30T09:00:00')} - ${formatTime('2025-09-30T10:00:00')}`,
      backgroundColor: '#4ECDC4',
      textColor: '#FFFFFF',
      memo: '주간 업무 계획 공유',
    },
    {
      startDate: '2025-09-30T09:00:00',
      endDate: '2025-09-30T10:00:00',
      category: '업무',
      detail: '팀 미팅',
      time: `${formatTime('2025-09-30T09:00:00')} - ${formatTime('2025-09-30T10:00:00')}`,
      backgroundColor: '#4ECDC4',
      textColor: '#FFFFFF',
      memo: '주간 업무 계획 공유',
    },
    {
      startDate: '2025-09-30T14:00:00',
      endDate: '2025-09-30T15:30:00',
      category: '스터디',
      detail: 'React 학습',
      time: `${formatTime('2025-09-30T14:00:00')} - ${formatTime('2025-09-30T15:30:00')}`,
      backgroundColor: '#45B7D1',
      textColor: '#FFFFFF',
      memo: 'Hooks 심화 공부',
    },
    // 같은 날짜에 겹치는 일정들 (2025-10-01)
    {
      startDate: '2025-10-01T10:00:00',
      endDate: '2025-10-01T12:00:00',
      category: '프로젝트',
      detail: '프론트엔드 개발',
      time: `${formatTime('2025-10-01T10:00:00')} - ${formatTime('2025-10-01T12:00:00')}`,
      backgroundColor: '#96CEB4',
      textColor: '#000000',
      memo: '메인 페이지 리팩토링',
    },
    {
      startDate: '2025-10-01T11:00:00', // 겹치는 시간
      endDate: '2025-10-01T13:00:00',
      category: '면접',
      detail: '기술 면접',
      time: `${formatTime('2025-10-01T11:00:00')} - ${formatTime('2025-10-01T13:00:00')}`,
      backgroundColor: '#D4D4D4',
      textColor: '#FFFFFF',
      memo: 'React Native 포지션',
    },
    {
      startDate: '2025-10-01T15:00:00',
      endDate: '2025-10-01T16:00:00',
      category: '개인',
      detail: '병원 진료',
      time: `${formatTime('2025-10-01T15:00:00')} - ${formatTime('2025-10-01T16:00:00')}`,
      backgroundColor: '#556270',
      textColor: '#FFFFFF',
      memo: '정기 건강 검진',
    },
    // 여러 날에 걸친 일정들
    {
      startDate: '2025-10-02T09:00:00',
      endDate: '2025-10-04T18:00:00', // 3일간
      category: '워크숍',
      detail: '팀 빌딩 워크숍',
      time: `${formatTime('2025-10-02T09:00:00')} - ${formatTime('2025-10-04T18:00:00')}`,
      backgroundColor: '#C7F464',
      textColor: '#000000',
      memo: '팀 협업 및 소통 워크숍',
    },
    {
      startDate: '2025-10-05T00:00:00',
      endDate: '2025-10-07T23:59:59', // 3일간 (연차)
      category: '휴가',
      detail: '연차 휴가',
      time: `${formatTime('2025-10-05T00:00:00')} - ${formatTime('2025-10-07T23:59:59')}`,
      backgroundColor: '#FF8C42',
      textColor: '#FFFFFF',
      memo: '충전 시간',
    },
    {
      startDate: '2025-10-08T14:00:00',
      endDate: '2025-10-10T17:00:00', // 3일간
      category: '프로젝트',
      detail: '해커톤 참가',
      time: `${formatTime('2025-10-08T14:00:00')} - ${formatTime('2025-10-10T17:00:00')}`,
      backgroundColor: '#6A0572',
      textColor: '#FFFFFF',
      memo: '24시간 해커톤 대회',
    },
    // 같은 날짜에 더 많은 겹치는 일정들 (2025-10-15)
    {
      startDate: '2025-10-15T09:00:00',
      endDate: '2025-10-15T10:00:00',
      category: '업무',
      detail: '일일 스크럼',
      time: `${formatTime('2025-10-15T09:00:00')} - ${formatTime('2025-10-15T10:00:00')}`,
      backgroundColor: '#4CAF50',
      textColor: '#FFFFFF',
      memo: '아침 스크럼 미팅',
    },
    {
      startDate: '2025-10-15T09:30:00', // 겹침
      endDate: '2025-10-15T11:00:00',
      category: '교육',
      detail: '온라인 강의',
      time: `${formatTime('2025-10-15T09:30:00')} - ${formatTime('2025-10-15T11:00:00')}`,
      backgroundColor: '#1E90FF',
      textColor: '#FFFFFF',
      memo: 'UI/UX 디자인 원칙',
    },
    {
      startDate: '2025-10-15T14:00:00',
      endDate: '2025-10-15T15:00:00',
      category: '스터디',
      detail: '알고리즘 문제풀이',
      time: `${formatTime('2025-10-15T14:00:00')} - ${formatTime('2025-10-15T15:00:00')}`,
      backgroundColor: '#FFD93D',
      textColor: '#000000',
      memo: 'LeetCode 문제 풀이',
    },
    {
      startDate: '2025-10-15T14:30:00', // 겹침
      endDate: '2025-10-15T16:00:00',
      category: '네트워킹',
      detail: '개발자 밋업',
      time: `${formatTime('2025-10-15T14:30:00')} - ${formatTime('2025-10-15T16:00:00')}`,
      backgroundColor: '#FF6B6B',
      textColor: '#FFFFFF',
      memo: 'React 커뮤니티 이벤트',
    },
    // 긴 기간 일정
    {
      startDate: '2025-10-20T00:00:00',
      endDate: '2025-10-25T23:59:59', // 6일간
      category: '출장',
      detail: '서울 출장',
      time: `${formatTime('2025-10-20T00:00:00')} - ${formatTime('2025-10-25T23:59:59')}`,
      backgroundColor: '#8B5CF6',
      textColor: '#FFFFFF',
      memo: '고객사 미팅 및 워크숍',
    },
    // 9월-10월 경계 일정들
    {
      startDate: '2025-09-28T18:00:00',
      endDate: '2025-10-01T12:00:00', // 9월 말 ~ 10월 초
      category: '프로젝트',
      detail: '월간 프로젝트 마무리',
      time: `${formatTime('2025-09-28T18:00:00')} - ${formatTime('2025-10-01T12:00:00')}`,
      backgroundColor: '#FF6B35',
      textColor: '#FFFFFF',
      memo: '9월 말부터 10월 초까지 진행되는 프로젝트 완료 작업',
    },
    {
      startDate: '2025-09-29T09:00:00',
      endDate: '2025-10-02T18:00:00', // 9월 말 ~ 10월 초
      category: '교육',
      detail: '인턴십 프로그램',
      time: `${formatTime('2025-09-29T09:00:00')} - ${formatTime('2025-10-02T18:00:00')}`,
      backgroundColor: '#00B894',
      textColor: '#FFFFFF',
      memo: '',
    },
    {
      startDate: '2025-09-30T14:00:00',
      endDate: '2025-10-03T10:00:00', // 9월 말 ~ 10월 초
      category: '컨퍼런스',
      detail: 'React Conf 참가',
      time: `${formatTime('2025-09-30T14:00:00')} - ${formatTime('2025-10-03T10:00:00')}`,
      backgroundColor: '#0984E3',
      textColor: '#FFFFFF',
      memo: '',
    },
    {
      startDate: '2025-09-27T20:00:00',
      endDate: '2025-10-01T08:00:00', // 9월 말 ~ 10월 초
      category: '휴가',
      detail: '추석 연휴',
      time: `${formatTime('2025-09-27T20:00:00')} - ${formatTime('2025-10-01T08:00:00')}`,
      backgroundColor: '#E84393',
      textColor: '#FFFFFF',
      memo: '',
    },
    {
      startDate: '2025-09-29T16:00:00',
      endDate: '2025-10-04T12:00:00', // 9월 말 ~ 10월 초
      category: '워크숍',
      detail: '팀 리트릿',
      time: `${formatTime('2025-09-29T16:00:00')} - ${formatTime('2025-10-04T12:00:00')}`,
      backgroundColor: '#6C5CE7',
      textColor: '#FFFFFF',
      memo: '팀 빌딩 및 전략 워크숍',
    },
    {
      startDate: '2025-09-30T00:00:00',
      endDate: '2025-10-02T23:59:59', // 9월 말 ~ 10월 초
      category: '개인',
      detail: '장기 여행',
      time: `${formatTime('2025-09-30T00:00:00')} - ${formatTime('2025-10-02T23:59:59')}`,
      backgroundColor: '#FDCB6E',
      textColor: '#000000',
      memo: '주말을 활용한 힐링 여행',
    },
  ],
};

export default calendarScheduleMock;
