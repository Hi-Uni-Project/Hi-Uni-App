import React from 'react';

import { View, Text } from 'react-native';

import SvgIcon from '@/shared/ui/atoms/SvgIcon';

interface SuccessMessageProps {
  message?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message = '사용이 가능한 닉네임입니다.',
}) => (
  <View className="flex flex-row items-center">
    <SvgIcon shape="checkbox" />

    <Text className="text-[16px] text-[#6568EB]">{message}</Text>
  </View>
);

export default SuccessMessage;
