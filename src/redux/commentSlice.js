import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comments",
    initialState:{
        comments: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        commentStart: (state) =>{
            state.isFetching = true;
        },
        commentSuccess: (state,action) => {
            state.isFetching = false;
            state.error = false;
            state.comments = action.payload;
        },
        commentFailure: (state,action) => {
            state.isFetching = false;
            state.error = action.payload;

        },
        createCommentSuccess: (state,action) =>{
            state.isFetching = false;
            state.comments.push(action.payload);
            state.error = false;
        }
    }
});
 export const {
    commentStart,
    commentSuccess,
    commentFailure,
    createCommentSuccess,
 } = commentSlice.actions;
 export default commentSlice.reducer;