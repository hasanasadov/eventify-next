import authService, { getCurrentUser } from "@/services/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      // state.favorites = action.payload.favorites || [];
    });
    builder.addCase(getCurrentUserAsync.rejected, (state) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(logoutAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      // state.favorites = [];
      state.loading = false;
    });
    builder.addCase(logoutAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const getCurrentUserAsync = createAsyncThunk(
  "auth/getCurrentUserAsync",
  async () => {
    const { data } = await getCurrentUser();
    return data.user || null;
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const {} = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
