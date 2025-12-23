import { useRef, useEffect, useCallback } from 'react';

import { View } from 'react-native';

interface UseCommentLayoutProps {
  id: string;
  isActive: boolean;
  scrollY: number;
  onLayout: (id: string, actionBoxY: number, actionBoxHeight: number) => void;
}

export const useCommentLayout = ({
  id,
  isActive,
  scrollY,
  onLayout,
}: UseCommentLayoutProps) => {
  const actionBoxRef = useRef<View>(null);

  const handleActionBoxLayout = useCallback(() => {
    if (actionBoxRef.current) {
      actionBoxRef.current.measureInWindow((y, height) => {
        onLayout(id, y, height);
      });
    }
  }, [id, onLayout]);

  useEffect(() => {
    if (isActive) {
      handleActionBoxLayout();
    }
  }, [scrollY, isActive, handleActionBoxLayout]);

  return {
    actionBoxRef,
    handleActionBoxLayout,
  };
};
