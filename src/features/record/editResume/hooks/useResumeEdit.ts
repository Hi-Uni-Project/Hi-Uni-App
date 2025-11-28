import { useCallback, useEffect, useState } from 'react';

import { ResumeEditForm } from '../types/domainType';

/**
 * 이력서를 등록, 수정하는 역할을 하는 hook 입니다.
 *
 * @description
 * - 이력서 데이터 관리 (초기 데이터 불러오기, 수정된 데이터 저장)
 * - 제출 가능 여부 판단
 * - api 요청을 통한 제출 처리
 * - 작성 중 행동에 대한 처리
 *
 * 기타 하위 hook 및 유틸 함수들을 포함할 수 있습니다.
 */
const useResumeEdit = () => {
  const [resumeData, setResumeData] = useState<ResumeEditForm>({
    photo: null,

    name: '',
    gender: null,
    birthYear: 0,

    title: '',

    aboutMe: '',

    careers: [],
    projects: [],
    educations: [],
    skills: [],
    languages: [],
    achievements: [],
    links: [],
  });

  const updateField = useCallback(
    <K extends keyof ResumeEditForm>(field: K, value: ResumeEditForm[K]) => {
      setResumeData(prevData => {
        return {
          ...prevData,
          [field]: value,
        };
      });
    },
    [],
  );

  useEffect(() => {
    console.log(resumeData);
  }, [resumeData]);

  return {
    resumeData,
    updateField,
  };
};

export default useResumeEdit;
