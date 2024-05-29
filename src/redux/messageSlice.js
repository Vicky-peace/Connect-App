import {createSlice} from "@reduxjs/toolkit";
const messageSlice = createSlice({
    name: "messages",
    initialState:{
        messages: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        messageStart: (state) => {
            state.isFetching = true;
        },
        messageSuccess: (state,action) => {
            state.isFetching = false;
            state.error = false;
            state.messages = action.payload;
        },
        messageFailure: (state,action) =>{
            state.isFetching = false;
            state.error = action.payload;
        },
        createmessageSuccess: (state,action) =>{
            state.isFetching =false;
            state.messages.push(action.payload);
            state.error = false;
        },
    },
});
export const {
    messageStart,
    messageSuccess,
    messageFailure,
    createmessageSuccess,
  } = messageSlice.actions;
  export default messageSlice.reducer;