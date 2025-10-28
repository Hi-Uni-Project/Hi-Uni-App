import { useLayoutEffect } from 'react';

import { useTabBarStore } from '@/shared/stores/tabBar';

export const useHideTabBar = () => {
  const { hideTabBar, showTabBar } = useTabBarStore();

  useLayoutEffect(() => {
    hideTabBar();

    return () => {
      showTabBar();
    };
  }, [hideTabBar, showTabBar]);
};
