import React from 'react';

import { View, Text, ColorValue } from 'react-native';
import { Dimensions } from 'react-native';

import ActionIcons from '@/shared/icons/ActionIcons';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import ChevronIcons from '@/shared/icons/ChevronIcons';
import StatusIcons from '@/shared/icons/StatusIcons';
import ToggleIcons from '@/shared/icons/ToggleIcons';

const { width, height } = Dimensions.get('window');

const IconTest = ({ color }: { color: ColorValue }) => (
  <View
    style={{
      height: height,
      width: width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      backgroundColor: '#bcc4d2',
    }}>
    <Text className="mb-1 text-base text-black">ChevronIcons</Text>
    <View className="mb-2 flex-row gap-2">
      <ChevronIcons direction="left" color={color} />
      <ChevronIcons direction="top" color={color} />
      <ChevronIcons direction="bottom" color={color} />
    </View>

    <Text className="mb-1 text-base text-black">ArrowIcons</Text>
    <View className="mb-2 flex-row gap-2">
      <ArrowIcons direction="left" color={color} />
    </View>

    <Text className="mb-1 text-base text-black">ToggleIcons</Text>
    <View className="mb-2 flex-row gap-2">
      <ToggleIcons type="eyeOpen" color={color} />
      <ToggleIcons type="eyeClose" color={color} />
      <ToggleIcons type="check" color={color} />
      <ToggleIcons type="nonCheck" color={color} />
      <ToggleIcons type="alert" color={color} />
      <ToggleIcons type="disableAlert" color={color} />
    </View>

    <Text className="mb-1 text-base text-black">StatusIcons</Text>
    <View className="mb-2 flex-row gap-2">
      <StatusIcons status="check" color={color} />
      <StatusIcons status="caution" color={color} />
    </View>

    <Text className="mb-1 text-base text-black">ActionIcons</Text>
    <View className="mb-2 flex-row gap-2">
      <ActionIcons type="search" color={color} />
      <ActionIcons type="close" color={color} />
      <ActionIcons type="erase" color={color} />
      <ActionIcons type="message" color={color} />
    </View>
  </View>
);

export { IconTest };
