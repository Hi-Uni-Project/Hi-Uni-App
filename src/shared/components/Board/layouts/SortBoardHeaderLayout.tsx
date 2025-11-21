import React from 'react';

import { View } from 'react-native';

import BoardHeaderColorGround from '@/features/home/shared/layouts/BoardHeaderColorGround';
import DetailBoardHeader from '@/shared/components/Board/layouts/DetailBoardHeader';

interface BoardHeaderLayoutProps {
  title: string;
  icon?: boolean;
  children: React.ReactNode;
}

const SortBoardHeaderLayout = ({
  title,
  icon = true,
  children,
}: BoardHeaderLayoutProps) => {
  return (
    <View className="flex-1">
      <BoardHeaderColorGround />
      <DetailBoardHeader title={title} icon={icon} />
      {children}
    </View>
  );
};

export default SortBoardHeaderLayout;
