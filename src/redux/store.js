import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import testReducer from "./slices/test";

export default configureStore({
  reducer: {
    app: appReducer,
  },
});

export const testStore = configureStore({
  reducer: {
    app: testReducer,
  },
});
