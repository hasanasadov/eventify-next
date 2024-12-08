import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from "./loading/loadingSlice.js";
const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});

export default store;
