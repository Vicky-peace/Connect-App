import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    uploadStart: (state) => {
      state.isFetching = true;
    },
    uploadSuccess: (state, action) => {
      state.posts = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    uploadFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    uploadPostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts.push(action.payload);
      state.error = false;
    },
    retrievingStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    retrievingSuccess: (state, action) => {
      state.posts = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    retrievingFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deletePostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePostSuccess: (state,action) => {
      state.isFetching = false;
      state.posts.splice(
        state.posts.findIndex((post) => post.id === action.payload),
        1
      );
    },
    deletePostFailure: (state) => {
      state.isFetching = false;
      state.error =true;
    }
  },
});
export const {
  uploadStart,
  uploadSuccess,
  uploadFail,
  uploadPostSuccess,
  retrievingStart,
  retrievingSuccess,
  retrievingFail,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure
} = postSlice.actions;

export default postSlice.reducer;
