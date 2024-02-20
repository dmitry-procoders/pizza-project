const initialState = {
  cartItems: [{"pizzaSize":{"id":2,"value":"Medium","description":"Medium size pizza","status":true},"pizzaType":{"id":2,"value":"Pepperoni","description":"Pizza topped with pepperoni slices and mozzarella cheese.","image":"pepperoni.jpg","status":true},"pizzaExtraComponents":[{"id":4,"value":"Bell Peppers","description":"Add sliced bell peppers to your pizza.","image":"bell_peppers.jpg","status":true}]}],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
      case 'ADD_ORDER_ITEM':
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };

      default:
        return state;
    }
};

export default rootReducer;