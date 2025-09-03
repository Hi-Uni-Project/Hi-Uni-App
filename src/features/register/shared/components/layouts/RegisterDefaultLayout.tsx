import React, { ReactNode } from 'react';

import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  children: ReactNode;
}

const RegisterDefaultLayout = ({ children, ...rest }: Props) => {
  return (
    <View className="mt-[25px] flex-1" {...rest}>
      {children}
    </View>
  );
};

export default RegisterDefaultLayout;
