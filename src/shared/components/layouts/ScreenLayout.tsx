import React, { ReactNode } from 'react';

import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  children: ReactNode;
}

const ScreenLayout = ({ children, ...rest }: Props) => {
  return (
    <SafeAreaView className="h-full w-full flex-1 bg-surface-50" {...rest}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
