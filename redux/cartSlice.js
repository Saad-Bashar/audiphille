import { createSlice } from '@reduxjs/toolkit'
const initialState = []
export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const {payload} = action
        const {cartProduct} = payload
        const isItemInCart = state.find((item) => item.id === cartProduct.id);
        console.log({payload, state})

        if (isItemInCart) {
            return state.map((item) => item.id === cartProduct.id ? { ...item, ...cartProduct } : item);
        } else {
            return [...state, { ...cartProduct }];
        }
    },
    deleteItemFromCart: (state, action) => {
      const {payload} = action
      console.log("state --- ", state)
      return state.filter((item) => {
        console.log("item, id", item, payload.id)
        return item.id !== payload.id
      });
    },
    reset: () => initialState,
  }
})

export const { addToCart, deleteItemFromCart,  reset } = cartSlice.actions

export const selectCartLength = state => state.cart.length;
export const selectCart = state => state.cart;
export const selectTotalAmount = state => state.cart.reduce((ack, item) => ack + item.quantityPrice, 0)

export default cartSlice.reducer