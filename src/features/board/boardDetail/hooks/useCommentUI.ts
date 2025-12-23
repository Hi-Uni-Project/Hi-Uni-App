import { useState } from 'react';

export const useCommentUI = () => {
  const [activeCommentOption, setActiveCommentOption] = useState<string | null>(
    null,
  );
  const [scrollY, setScrollY] = useState(0);
  const [commentLayouts, setCommentLayouts] = useState<{
    [key: string]: { actionBoxY: number; actionBoxHeight: number };
  }>({});

  const handleCommentLayout = (
    id: string,
    actionBoxY: number,
    actionBoxHeight: number,
  ) => {
    setCommentLayouts(prev => ({
      ...prev,
      [id]: { actionBoxY, actionBoxHeight },
    }));
  };

  const handleToggleCommentOption = (id: string) => {
    setActiveCommentOption(activeCommentOption === id ? null : id);
  };

  const handleCloseCommentOption = () => {
    setActiveCommentOption(null);
  };

  return {
    // State
    activeCommentOption,
    scrollY,
    commentLayouts,

    // Handlers
    setScrollY,
    handleCommentLayout,
    handleToggleCommentOption,
    handleCloseCommentOption,
  };
};
