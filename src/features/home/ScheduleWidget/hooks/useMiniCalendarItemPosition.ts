import { useState } from 'react';

const useMiniCalendarItemPosition = () => {
  const [indexPositions, setIndexPositions] = useState(
    {} as Record<number, number>,
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
    indexPositions,
    checkItemLayout,
  };
};

export default useMiniCalendarItemPosition;
