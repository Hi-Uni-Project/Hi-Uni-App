import { CalendarScheduleResponse } from '../types';

const calendarScheduleMock: CalendarScheduleResponse = {
  localDateTime: '2025-09-30T12:00:00.000000',
  responseCode: 200,
  statusCode: 'SUCCESS',
  message: '스케줄 조회에 성공하였습니다.',
  data: [
    // 단일 일정들
    {
      startDate: '2025-09-30T09:00:00',
      endDate: '2025-09-30T10:00:00',
      category: '업무',
      detail: '팀 미팅',
      time: 'AM 09:00 - AM 10:00',
      color: '#4ECDC4',
      memo: '주간 업무 계획 공유',
    },
    {
      startDate: '2025-09-30T14:00:00',
      endDate: '2025-09-30T15:30:00',
      category: '스터디',
      detail: 'React 학습',
      time: 'PM 02:00 - PM 03:30',
      color: '#45B7D1',
      memo: 'Hooks 심화 공부',
    },
    // 같은 날짜에 겹치는 일정들 (2025-10-01)
    {
      startDate: '2025-10-01T10:00:00',
      endDate: '2025-10-01T12:00:00',
      category: '프로젝트',
      detail: '프론트엔드 개발',
      time: 'AM 10:00 - PM 12:00',
      color: '#96CEB4',
      memo: '메인 페이지 리팩토링',
    },
    {
      startDate: '2025-10-01T11:00:00', // 겹치는 시간
      endDate: '2025-10-01T13:00:00',
      category: '면접',
      detail: '기술 면접',
      time: 'AM 11:00 - PM 01:00',
      color: '#FF6B6B',
      memo: 'React Native 포지션',
    },
    {
      startDate: '2025-10-01T15:00:00',
      endDate: '2025-10-01T16:00:00',
      category: '개인',
      detail: '병원 진료',
      time: 'PM 03:00 - PM 04:00',
      color: '#556270',
      memo: '정기 건강 검진',
    },
    // 여러 날에 걸친 일정들
    {
      startDate: '2025-10-02T09:00:00',
      endDate: '2025-10-04T18:00:00', // 3일간
      category: '워크숍',
      detail: '팀 빌딩 워크숍',
      time: '3일간',
      color: '#C7F464',
      memo: '팀 협업 및 소통 워크숍',
    },
    {
      startDate: '2025-10-05T00:00:00',
      endDate: '2025-10-07T23:59:59', // 3일간 (연차)
      category: '휴가',
      detail: '연차 휴가',
      time: '종일',
      color: '#FF8C42',
      memo: '충전 시간',
    },
    {
      startDate: '2025-10-08T14:00:00',
      endDate: '2025-10-10T17:00:00', // 3일간
      category: '프로젝트',
      detail: '해커톤 참가',
      time: '3일간',
      color: '#6A0572',
      memo: '24시간 해커톤 대회',
    },
    // 같은 날짜에 더 많은 겹치는 일정들 (2025-10-15)
    {
      startDate: '2025-10-15T09:00:00',
      endDate: '2025-10-15T10:00:00',
      category: '업무',
      detail: '일일 스크럼',
      time: 'AM 09:00 - AM 10:00',
      color: '#4CAF50',
      memo: '아침 스크럼 미팅',
    },
    {
      startDate: '2025-10-15T09:30:00', // 겹침
      endDate: '2025-10-15T11:00:00',
      category: '교육',
      detail: '온라인 강의',
      time: 'AM 09:30 - AM 11:00',
      color: '#1E90FF',
      memo: 'UI/UX 디자인 원칙',
    },
    {
      startDate: '2025-10-15T14:00:00',
      endDate: '2025-10-15T15:00:00',
      category: '스터디',
      detail: '알고리즘 문제풀이',
      time: 'PM 02:00 - PM 03:00',
      color: '#FFD93D',
      memo: 'LeetCode 문제 풀이',
    },
    {
      startDate: '2025-10-15T14:30:00', // 겹침
      endDate: '2025-10-15T16:00:00',
      category: '네트워킹',
      detail: '개발자 밋업',
      time: 'PM 02:30 - PM 04:00',
      color: '#FF6B6B',
      memo: 'React 커뮤니티 이벤트',
    },
    // 긴 기간 일정
    {
      startDate: '2025-10-20T00:00:00',
      endDate: '2025-10-25T23:59:59', // 6일간
      category: '출장',
      detail: '서울 출장',
      time: '6일간',
      color: '#8B5CF6',
      memo: '고객사 미팅 및 워크숍',
    },
    // 9월-10월 경계 일정들
    {
      startDate: '2025-09-28T18:00:00',
      endDate: '2025-10-01T12:00:00', // 9월 말 ~ 10월 초
      category: '프로젝트',
      detail: '월간 프로젝트 마무리',
      time: '4일간',
      color: '#FF6B35',
      memo: '9월 말부터 10월 초까지 진행되는 프로젝트 완료 작업',
    },
    {
      startDate: '2025-09-29T09:00:00',
      endDate: '2025-10-02T18:00:00', // 9월 말 ~ 10월 초
      category: '교육',
      detail: '인턴십 프로그램',
      time: '4일간',
      color: '#00B894',
      memo: '신입 개발자 교육 프로그램',
    },
    {
      startDate: '2025-09-30T14:00:00',
      endDate: '2025-10-03T10:00:00', // 9월 말 ~ 10월 초
      category: '컨퍼런스',
      detail: 'React Conf 참가',
      time: '3.5일간',
      color: '#0984E3',
      memo: 'React 생태계 최신 트렌드 및 기술 공유',
    },
    {
      startDate: '2025-09-27T20:00:00',
      endDate: '2025-10-01T08:00:00', // 9월 말 ~ 10월 초
      category: '휴가',
      detail: '추석 연휴',
      time: '3.5일간',
      color: '#E84393',
      memo: '가족과 함께하는 명절 연휴',
    },
    {
      startDate: '2025-09-29T16:00:00',
      endDate: '2025-10-04T12:00:00', // 9월 말 ~ 10월 초
      category: '워크숍',
      detail: '팀 리트릿',
      time: '5일간',
      color: '#6C5CE7',
      memo: '팀 빌딩 및 전략 워크숍',
    },
    {
      startDate: '2025-09-30T00:00:00',
      endDate: '2025-10-02T23:59:59', // 9월 말 ~ 10월 초
      category: '개인',
      detail: '장기 여행',
      time: '3일간',
      color: '#FDCB6E',
      memo: '주말을 활용한 힐링 여행',
    },
  ],
};

export default calendarScheduleMock;
