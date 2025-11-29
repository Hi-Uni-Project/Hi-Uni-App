export type ModalState =
  | { type: 'none' }
  | { type: 'exit' }
  | { type: 'changeToReview' }
  | { type: 'dropdown' }
  | { type: 'optionSheet' }
  | { type: 'optionChange' };
