import { useState } from 'react';

import { Category } from '../types/categoryTypes';

import useCategoryQuery from './categoryQueries';

/**
 * 카테고리 선택 및 관리 훅
 *
 * @description
 * - 서버에서 카테고리 목록을 조회하고
 * - 현재 선택된 카테고리 상태를 관리합니다
 *
 * @returns {Object}
 * - categories: 전체 카테고리 목록
 * - isLoading: 카테고리 로딩 상태
 * - error: 카테고리 조회 에러
 * - currentCategory: 현재 선택된 카테고리
 * - setCurrentCategory: 카테고리 선택 함수
 */
const useCategorySelector = () => {
  // 서버에서 카테고리 목록 조회
  const { data, isLoading, error } = useCategoryQuery();

  // API 응답에서 카테고리 배열 추출 (없으면 빈 배열)
  const categories = data?.data || [];

  // 현재 선택된 카테고리 상태 관리 (초기값: null)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  return { categories, isLoading, error, currentCategory, setCurrentCategory };
};

export default useCategorySelector;
