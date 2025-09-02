import React, { RefObject } from 'react';

import { View } from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';

import { styles } from '../styles';

import { CELL_COUNT } from '@/features/register/shared/constants/codeCell';

interface Props {
  codeFieldRef: RefObject<any>;
  value: string;
  onChangeText: (text: string) => void;
  props: any;
  getCellOnLayoutHandler: (index: number) => (event: any) => void;
}

interface RenderCellProps {
  index: number;
  symbol: string;
  isFocused: boolean;
}

const MailCodeField = ({
  codeFieldRef,
  value,
  onChangeText,
  props,
  getCellOnLayoutHandler,
}: Props) => {
  return (
    <View style={{ pointerEvents: 'none' }}>
      <CodeField
        ref={codeFieldRef}
        autoFocus
        {...props}
        value={value}
        onChangeText={onChangeText}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }: RenderCellProps) => {
          const hasValue = Boolean(symbol);
          return (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[
                styles.cellRoot,
                hasValue ? styles.filledCell : isFocused && styles.focusCell,
              ]}>
              {hasValue ? (
                <View style={styles.dot} />
              ) : isFocused ? (
                <Cursor />
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
};

export default MailCodeField;
