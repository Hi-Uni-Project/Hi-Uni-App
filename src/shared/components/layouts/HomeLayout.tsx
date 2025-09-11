import React, { ReactNode } from 'react';

import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends ViewProps {
  children: ReactNode;
}

const HomeLayout = ({ children, ...rest }: Props) => {
  return (
    <SafeAreaView className="h-full w-full flex-1 bg-surface-50" {...rest}>
      <View style={{ marginBottom: 68 }}>{children}</View>
    </SafeAreaView>
  );
};

export default HomeLayout;
