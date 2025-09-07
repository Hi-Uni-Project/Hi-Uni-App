import { useState } from 'react';

interface UseMiniCalendarAnimationProps {
  selectedDate: Date;
}

const useMiniCalendarAnimation = ({
  selectedDate,
}: UseMiniCalendarAnimationProps) => {
  const selectedIndex = selectedDate.getDay();

  const [indexPositions, setIndexPositions] = useState(
    {} as { [key: number]: number },
  );

  const checkItemLayout = (
    index: number,
    event: {
      nativeEvent: { layout: { x: number } };
    },
  ) => {
    const x = event.nativeEvent.layout.x;

    setIndexPositions(prev => ({ ...prev, [index]: x }));
  };

  return {
    checkItemLayout,
    selectedPosition: indexPositions[selectedIndex] || 0,
  };
};

export default useMiniCalendarAnimation;
