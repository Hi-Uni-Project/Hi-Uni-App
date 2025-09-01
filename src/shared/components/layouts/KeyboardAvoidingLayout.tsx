import React, { ReactNode } from 'react';

import { KeyboardAvoidingView, Platform, ViewProps } from 'react-native';

interface Props extends ViewProps {
  children: ReactNode;
}

const KeyboardAvoidingLayout = ({ children }: Props) => {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface-50"
      keyboardVerticalOffset={17}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingLayout;
