import { useState } from 'react';

export const useReviewTemplate = () => {
  const [showCal, setShowCal] = useState(false);

  const formatDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const toggleCalendar = () => {
    setShowCal(prev => !prev);
  };

  return {
    showCal,
    startDate,
    endDate,
    formatDate,
    setStartDate,
    setEndDate,
    toggleCalendar,
  };
};
