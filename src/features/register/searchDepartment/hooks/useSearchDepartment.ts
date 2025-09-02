import { useState } from 'react';

const DEPARTMENT = [
  { major: '가정관리학과 (폐지)', college: '자연과학대학' },
  { major: '간호학과', college: '간호대학' },
  { major: '건강뷰티행정학과', college: '미래융합대학' },
  { major: '건축공학과 (폐지)', college: '공과대학' },
  { major: '건축공학전공', college: '공과대학' },
  { major: '경영정보학과', college: '경상대학' },
  { major: '경영학과', college: '경상대학' },
  { major: '경제학과', college: '경상대학' },
  { major: '교육학과', college: '사범대학' },
  { major: '국어국문학과', college: '인문대학' },
  { major: '국제통상학과', college: '경상대학' },
  { major: '기계공학과', college: '공과대학' },
  { major: '데이터사이언스학과', college: 'AI융합대학' },
  { major: '도시계획학과', college: '공과대학' },
  { major: '디자인학과', college: '예술대학' },
  { major: '무용학과', college: '예술대학' },
  { major: '물리학과', college: '자연과학대학' },
  { major: '미디어커뮤니케이션학과', college: '사회과학대학' },
  { major: '바이오학과', college: '자연과학대학' },
  { major: '법학과', college: '법과대학' },
  { major: '불어불문학과', college: '인문대학' },
  { major: '사회복지학과', college: '사회과학대학' },
  { major: '산업공학과', college: '공과대학' },
  { major: '생명과학과', college: '자연과학대학' },
  { major: '소프트웨어학과', college: 'AI융합대학' },
  { major: '수학과', college: '자연과학대학' },
  { major: '스포츠과학과', college: '체육대학' },
  { major: '심리학과', college: '사회과학대학' },
  { major: '아동학과', college: '인문대학' },
  { major: '영어영문학과', college: '인문대학' },
];

const useSearchDepartment = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredDepts = DEPARTMENT.filter(d =>
    d.major.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelectDept = (major: string) => {
    if (selectedDepts.includes(major)) {
      setSelectedDepts(prev => prev.filter(item => item !== major));
    } else if (selectedDepts.length < 2) {
      setSelectedDepts(prev => [...prev, major]);
    }
    setInputValue('');
  };

  const handleRemoveDept = (major: string) => {
    setSelectedDepts(prev => prev.filter(item => item !== major));
  };

  return {
    inputValue,
    setInputValue,
    selectedDepts,
    setSelectedDepts,
    isModalVisible,
    setIsModalVisible,
    filteredDepts,
    handleSelectDept,
    handleRemoveDept,
  };
};

export default useSearchDepartment;
