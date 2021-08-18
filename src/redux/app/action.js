import * as types from './types';

export const setFlash = (type, text, isNoHead) => ({
  type: types.SET_FLASH,
  payload: {
    show: true,
    type,
    text,
    isNoHead,
  },
});

export const resetFlash = () => ({
  type: types.RESET_FLASH,
});
