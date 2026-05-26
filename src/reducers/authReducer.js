export const initialState = {
  user: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      () => {
        return {
          ...state,
          loading: true,
        };
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
