import React, { useState } from 'react';

import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import SortBottomSheet from '@/features/home/SearchBoard/components/BottomSheet/SortBottomSheet';
import RecentSearchList from '@/features/home/SearchBoard/components/RecentSearchList';
import { MAX_ITEMS } from '@/features/home/SearchBoard/constants/lines';
import { shadowStyleSheet } from '@/shared/components/AnimatedCardView';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import HUInput from '@/shared/ui/atoms/HUInput';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const HomeSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('최신순');

  const handleSearch = () => {
    const trimmedText = searchText.trim();
    if (trimmedText.length <= 1) {
      setModalVisible(true);
      return;
    }

    setRecentSearches(prev => {
      const updated = [
        trimmedText,
        ...prev.filter(item => item !== trimmedText),
      ];
      if (updated.length > MAX_ITEMS) {
        updated.pop();
      }
      return updated;
    });

    setSearchText('');
    Keyboard.dismiss();
  };

  const handleRemoveItem = (item: string) => {
    setRecentSearches(prev => prev.filter(i => i !== item));
  };

  const handleClearAll = () => setRecentSearches([]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="h-full w-full flex-1 bg-surface-50">
        {/* headers -> 주간 hot 페이지와 병합하여 하나의 컴포넌트로 정리 필요 */}
        <View
          className="h-[160px] justify-end bg-white"
          style={shadowStyleSheet.dropShadow}>
          <View className="mb-[10px] flex-row items-center justify-between px-5">
            <Pressable onPress={() => console.log('back')}>
              <ArrowIcons
                direction="left"
                width={24}
                height={20}
                color="#1E2128"
              />
            </Pressable>
            <View className="w-[315px]">
              <HUInput
                placeholder="글 제목 혹은 내용을 입력하세요"
                variant="find"
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                maxLength={15}
              />
            </View>
          </View>
        </View>

        {/* wrapper -> 공통 레이아웃으로 구성 가능한 코드 */}
        <View className="px-5 pt-6">
          {/* header */}
          <View className="mb-3 flex-row items-center justify-between">
            <Pressable onPress={() => setSortSheetVisible(true)}>
              <Text className="text-surface-500 typo-body-16-regular">
                {selectedSort}
              </Text>
            </Pressable>
            {recentSearches.length > 0 && (
              <Pressable onPress={handleClearAll}>
                <Text className="text-surface-500 typo-body-16-medium">
                  전체삭제
                </Text>
              </Pressable>
            )}
          </View>

          {/* 최근 검색어 리스트 */}
          <RecentSearchList
            handleRemoveItem={handleRemoveItem}
            recentSearches={recentSearches}
          />
        </View>

        {/* 두 글자 미만 모달 */}
        <ConfirmModal
          confirmText="네, 확인했어요"
          title="두 글자 이상 입력해주세요."
          visible={modalVisible}
          onConfirm={() => setModalVisible(false)}
        />

        {/* 정렬 기준 바텀시트 */}
        <SortBottomSheet
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          sortSheetVisible={sortSheetVisible}
          setSortSheetVisible={setSortSheetVisible}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeSearchScreen;
