import { useState, useMemo } from 'react';

import { useDepartmentListQuery } from '../querys/departmentQueries';
import { Department } from '../types';

const useSearchDepartment = (univName: string) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: departmentList, isLoading } = useDepartmentListQuery(univName);

  const allDepartments = (departmentList?.data ?? []) as Department[];

  const filteredDepts = useMemo(() => {
    if (inputValue.length === 0) {
      return allDepartments;
    }

    const searchTerm = inputValue.toLowerCase().trim();
    return allDepartments.filter(dept =>
      dept.majorName.toLowerCase().includes(searchTerm),
    );
  }, [allDepartments, inputValue]);

  const handleSelectDept = (majorName: string) => {
    if (selectedDepts.includes(majorName)) {
      // 이미 선택된 학과를 다시 클릭하면 제거
      setSelectedDepts(prev => prev.filter(item => item !== majorName));
    } else if (selectedDepts.length < 2) {
      // 2개 미만이면 그냥 추가
      setSelectedDepts(prev => [...prev, majorName]);
    } else {
      // 이미 2개가 선택된 경우, 마지막 요소 제거하고 새로운 학과 추가
      setSelectedDepts(prev => [prev[0], majorName]);
    }
    setInputValue('');
  };

  const handleRemoveDept = (majorName: string) => {
    setSelectedDepts(prev => prev.filter(item => item !== majorName));
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
    isLoading,
  };
};

export default useSearchDepartment;
