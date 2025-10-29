import React from 'react';

import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

interface Props {
  modalVisible: boolean;
  onModalConfirm: () => void;
}

const SearchActionModal = ({ modalVisible, onModalConfirm }: Props) => {
  return (
    <>
      <ConfirmModal
        confirmText="네, 확인했어요"
        title="두 글자 이상 입력해주세요."
        visible={modalVisible}
        onConfirm={onModalConfirm}
      />
    </>
  );
};

export default SearchActionModal;
