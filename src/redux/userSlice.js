import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    currentUser: null,
    suggestedUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
    },
    updateUserFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },

    getUserSuccess(state, action) {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    suggestedSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.suggestedUser = action.payload;
    },
    followSuggestedSuccess: (state, action) => {
      state.isFetching = false;
      state.suggestedUser.splice(
        state.suggestedUser.findIndex((user) => user.id === action.payload),
        1
      );
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserSuccess,
  suggestedSuccess,
  followSuggestedSuccess
} = userSlice.actions;

export default userSlice.reducer;
