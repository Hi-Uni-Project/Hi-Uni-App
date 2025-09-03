import React, { ReactNode } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';

import { HiUniNativeStackNavigationProp } from '@/navigation/navigationTypes';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import FlowTooltip from '@/shared/icons/FlowTooltip';

interface HeaderWithBackProps {
  centerComponent?: ReactNode;
  rightComponent?: ReactNode;
  flow?: boolean;
  screen?: '1' | '2' | '3';
}

const HeaderWithBack = ({
  centerComponent,
  rightComponent,
  flow = false,
  screen,
}: HeaderWithBackProps) => {
  const navigation = useNavigation<HiUniNativeStackNavigationProp>();

  return (
    <View className="mt-6 flex-row justify-between px-[22px]">
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowIcons direction="left" width={20} height={16} color="#1E2128" />
      </Pressable>

      {flow && <FlowTooltip flow={screen} />}

      {centerComponent && (
        <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
          {centerComponent}
        </View>
      )}

      {rightComponent && (
        <View className="absolute bottom-0 right-0 top-0 justify-center">
          {rightComponent}
        </View>
      )}
    </View>
  );
};

export default HeaderWithBack;
