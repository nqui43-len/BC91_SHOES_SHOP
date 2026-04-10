import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemClick = action.payload;
      const itemInCart = state.find(
        (item) => item.id === itemClick.id && item.size === itemClick.size,
      );
      if (itemInCart) {
        itemInCart.quantity += itemClick.quantity;
      } else {
        state.push(itemClick);
      }
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; size: string; amount: number }>,
    ) => {
      const { id, size, amount } = action.payload;
      const item = state.find((item) => item.id === id && item.size === size);
      if (item) {
        item.quantity += amount;
        if (item.quantity < 1) item.quantity = 1;
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; size: string }>,
    ) => {
      const { id, size } = action.payload;
      return state.filter((item) => !(item.id === id && item.size === size));
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, changeQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
