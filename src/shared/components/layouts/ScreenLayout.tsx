import React, { ReactNode } from 'react';

import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

interface Props extends SafeAreaViewProps {
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
