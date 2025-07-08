import React from 'react';

import { View, Text } from 'react-native';

import SvgIcon from '@/shared/ui/atoms/SvgIcon';

interface CautionMessageProps {
  message?: string;
}

const CautionMessage: React.FC<CautionMessageProps> = ({
  message = '이미 사용중인 닉네임입니다.',
}) => (
  <View className="flex flex-row items-center">
    <SvgIcon
      shape="Caution" /* size={16} fill="#F04438" style={{ marginRight: 6 }} */
    />
    <Text className="ml-1 text-[14px] text-[#F04438]">{message}</Text>
  </View>
);

export default CautionMessage;
