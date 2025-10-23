import React, { Dispatch, SetStateAction } from 'react';

import SortBottomSheet from './SortBottomSheet';

import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

interface Props {
  modalVisible: boolean;
  onModalConfirm: () => void;
  selectedSort: string;
  setSelectedSort: (displayName: string) => void;
  sortSheetVisible: boolean;
  setSortSheetVisible: Dispatch<SetStateAction<boolean>>;
}

const SearchActionModal = ({
  modalVisible,
  onModalConfirm,
  selectedSort,
  setSelectedSort,
  sortSheetVisible,
  setSortSheetVisible,
}: Props) => {
  return (
    <>
      <ConfirmModal
        confirmText="네, 확인했어요"
        title="두 글자 이상 입력해주세요."
        visible={modalVisible}
        onConfirm={onModalConfirm}
      />

      <SortBottomSheet
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        sortSheetVisible={sortSheetVisible}
        setSortSheetVisible={setSortSheetVisible}
      />
    </>
  );
};

export default SearchActionModal;
