// Actions
const NAME_REQUEST = 'NAME_REQUEST';
const ROOM_REQUEST = 'ROOM_REQUEST';
const TIME_REQUEST = 'TIME_REQUEST';

// Action Creator
export const nameAction = (data) => {
  return {
    type: NAME_REQUEST,
    data,
  };
};
export const roomAction = (data) => {
  return {
    type: ROOM_REQUEST,
    data,
  };
};
export const timeAction = () => {
  return {
    type: TIME_REQUEST,
  };
};

// 초기값 설정
const initialState = {
  name: '',
  room: '',
  time: '',
};

// Reducer
export default function user(state = initialState, action) {
  switch (action.type) {
    case NAME_REQUEST:
      return {
        ...state,
        name: action.data,
      };
    case ROOM_REQUEST:
      return {
        ...state,
        room: action.data,
      };
    case TIME_REQUEST:
      return {
        ...state,
        time: action.data,
      };
    default:
      return state;
  }
}
