import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';

import { HiUniNativeStackNavigationProp } from '@/navigation/navigationTypes';
import ArrowIcons from '@/shared/icons/ArrowIcons';

interface HeaderWithBackProps {
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const HeaderWithBack = ({
  centerComponent,
  rightComponent,
}: HeaderWithBackProps) => {
  const navigation = useNavigation<HiUniNativeStackNavigationProp>();

  return (
    <View className="relative h-16 items-start justify-center">
      <Pressable
        className="ml-2 p-3"
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowIcons direction="left" width={20} height={16} />
      </Pressable>

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
