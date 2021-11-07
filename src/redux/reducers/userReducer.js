import {GET_USERS_SUCCESS, ADD_USER, DELETE_USER, EDIT_USER} from 'constants/constants';

const initState = {
  lastRefKey: null,
  total: 0,
  items: [],
};

export default (
  state = {
    lastRefKey: null,
    total: 0,
    items: [],
    searchedUsers: initState,
  },
  action,
) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.users]
      };
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map(user => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload,
          };
        }
        return user;
      });
    case DELETE_USER:
      return state.filter(user => user.id !== action.payload);
    default:
      return state;
  }
};
