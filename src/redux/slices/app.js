import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    products: [],
    cart: [],
    sortType: undefined,
    searchText: "iphone",
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setSortType: (state, action) => {
      if (state.sortType === action.payload) state.sortType = "";
      else state.sortType = action.payload;
    },
    addItemToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const selectCartItems = (state) => state.app.cart;
export const selectProducts = (state) => state.app.products;
export const selectSortType = (state) => state.app.sortType;
export const selectSearchText = (state) => state.app.searchText;

export const {
  setCart,
  setProducts,
  setSortType,
  addItemToCart,
  removeItemFromCart,
  setSearchText,
} = appSlice.actions;

export default appSlice.reducer;
