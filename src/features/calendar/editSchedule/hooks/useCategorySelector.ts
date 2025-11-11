import useCategoryQuery from './categoryQueries';

const useCategorySelector = () => {
  const { data, isLoading, error } = useCategoryQuery();

  // API 응답에서 카테고리 배열 추출 (없으면 빈 배열)
  const categories = data?.data || [];

  return { categories, isLoading, error };
};

export default useCategorySelector;
