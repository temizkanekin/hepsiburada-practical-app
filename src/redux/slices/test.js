import { createSlice } from "@reduxjs/toolkit";
import { products as mockProducts } from "../../mockData";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    products: mockProducts,
    cart: mockProducts.slice(0, 3),
    sortType: "createdDate-",
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
      if (state.sortType === action.payload) state.sortType = undefined;
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

export const selectCartItems = (state) => state.test.cart;
export const selectProducts = (state) => state.test.products;
export const selectSortType = (state) => state.test.sortType;
export const selectSearchText = (state) => state.test.searchText;

export const {
  setCart,
  setProducts,
  setSortType,
  addItemToCart,
  removeItemFromCart,
  setSearchText,
} = testSlice.actions;

export default testSlice.reducer;
