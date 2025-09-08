interface UseMiniCalendarAnimationProps {
  selectedDate: Date;
  indexPositions: Record<number, number>;
}

const useMiniCalendarAnimation = ({
  selectedDate,
  indexPositions,
}: UseMiniCalendarAnimationProps) => {
  const selectedIndex = selectedDate.getDay();

  return {
    selectedPosition: indexPositions[selectedIndex] || 0,
  };
};

export default useMiniCalendarAnimation;
