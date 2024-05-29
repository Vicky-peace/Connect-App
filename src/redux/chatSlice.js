import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: null,
    chatUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
  chatStart: (state) => {
      state.isFetching = true;
      // state.error = false;
    },
    chatSuccess: (state, action) => {
      state.chats = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    chatFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
     
    },
    createChatSuccess: (state, action) => {
      state.isFetching = false;
      state.chats.push(action.payload);
      state.error = false;
    },
    chatUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.chatUser = action.payload;
    },
    chatUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    saveUser: (state, action) => {
      state.userChats.push(action.payload);
    },
  },
});
export const {
  chatStart,
  chatSuccess,
  chatFailure,
  createChatSuccess,
  chatUserSuccess,
  chatUserFailure,
  saveUser,
} = chatSlice.actions;
export default chatSlice.reducer;
