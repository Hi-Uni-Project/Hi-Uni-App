import { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

export const useBootSplash = (delay: number = 2000) => {
  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, delay));
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, [delay]);
};
