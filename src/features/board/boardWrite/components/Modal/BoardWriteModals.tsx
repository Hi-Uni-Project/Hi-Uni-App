import React, { Dispatch, SetStateAction } from 'react';

import { ModalState } from '../../types';

import OptionBottomSheet from '@/features/board/boardWrite/components/Modal/OptionBottomSheet';
import DropdownModal from '@/features/board/boardWrite/DropdownModal';
import { PostType } from '@/features/board/shared/types/enum/postEnum';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

interface Props {
  modalState: ModalState;
  dropdownOptions: any[];
  dropdownPosition: { top: number; left: number };
  onDropdownSelect: (value: string) => void;
  handleModalClose: () => void;
  onExitModalCancel: () => void;
  onChangeToReviewConfirm: () => void;
  onOptionSheetVisibleChange: Dispatch<SetStateAction<boolean>>;
  onOptionSelect: Dispatch<SetStateAction<PostType>>;
  handleConfirmPostTypeChange: () => void;
}

const BoardWriteModals = ({
  modalState,
  dropdownOptions,
  dropdownPosition,
  onDropdownSelect,
  handleModalClose,
  onExitModalCancel,
  onChangeToReviewConfirm,
  onOptionSheetVisibleChange,
  onOptionSelect,
  handleConfirmPostTypeChange,
}: Props) => {
  return (
    <>
      {/* 드롭다운 모달 */}
      <DropdownModal
        visible={modalState.type === 'dropdown'}
        options={dropdownOptions}
        onSelect={onDropdownSelect}
        position={dropdownPosition}
      />

      {/* 나가기 확인 모달 */}
      <ConfirmModal
        visible={modalState.type === 'exit'}
        onClose={handleModalClose}
        title={'작성 중인 내용이 있어요.\n이대로 나갈까요?'}
        confirmText="아니요, 계속 작성할래요."
        cancelText="네, 이대로 나갈래요."
        status="caution"
        onConfirm={handleModalClose}
        onCancel={onExitModalCancel}
      />

      {/* 후기 변경 확인 모달 */}
      <ConfirmModal
        visible={modalState.type === 'changeToReview'}
        onClose={handleModalClose}
        title={
          '후기글로 바꾸면\n지금 작성한 내용은 사라져요.\n계속 진행할까요?'
        }
        confirmText="네, 후기글로 바꿀래요."
        cancelText="아니요, 계속 작성할래요."
        status="caution"
        onConfirm={onChangeToReviewConfirm}
        onCancel={handleModalClose}
      />

      {/* 후기 글 작성이 있는 상태에서 말머리 변경 확인 모달 */}
      <ConfirmModal
        visible={modalState.type === 'optionChange'}
        onClose={handleModalClose}
        title={
          '말머리를 바꾸면\n지금 작성한 내용은 사라져요.\n계속 진행할까요?'
        }
        confirmText="네, 말머리를 바꿀래요."
        cancelText="아니요, 계속 작성할래요."
        status="caution"
        onConfirm={handleConfirmPostTypeChange}
        onCancel={handleModalClose}
      />

      {/* 옵션 바텀시트 */}
      <OptionBottomSheet
        optionSheetVisible={modalState.type === 'optionSheet'}
        setOptionSheetVisible={onOptionSheetVisibleChange}
        setSelectedOption={onOptionSelect}
      />
    </>
  );
};

export default BoardWriteModals;
