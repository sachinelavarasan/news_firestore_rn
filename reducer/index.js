export const initialValues = {
  newsItems: [],
  favItems: [],
  isLoading: false,
  errorMessage: null,
  user: null,
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "error_login":
      return { ...state, errorMessage: payload };
    case "user":
      return { ...state, user: payload };
    case "all_items":
      return { ...state, newsItems: payload };
    case "all_fav_items":
      return { ...state, favItems: payload };
    case "remove_all_fav_items":
      return { ...state, favItems: payload };
    case "remove_one_fav_item":
      const favItems = state.favItems.filter((item) => item.id !== payload.id);
      return { ...state, favItems };

    default:
      return state;
  }
};
