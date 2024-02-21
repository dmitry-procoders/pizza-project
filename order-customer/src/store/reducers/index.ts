const initialState = {
  cartItems: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default rootReducer;