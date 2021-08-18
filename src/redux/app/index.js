import * as types from './types';

export const initialState = {
  flash: {
    show: false,
    type: '',
    text: 'aigiooo',
    isNoHead: false,
  },
};

const ACTION_HANDLERS = {
  [types.SET_FLASH]: (state, action) => {
    return {
      ...state,
      flash: action.payload,
    };
  },
  [types.RESET_FLASH]: (state) => {
    return {
      ...state,
      flash: initialState.flash,
    };
  },
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
