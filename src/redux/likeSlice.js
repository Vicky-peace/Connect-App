import {createSlice} from "@reduxjs/toolkit";


const likeSlice = createSlice({
    name:"likes",
    initialState:{
        likes:null,
        isFetching: false,
        error: false,
    },

    reducers: {
        likeStart : (state) => {
            state.isFetching = true;
        },
        likeSuccess: (state, action) =>{
            state.isFetching = false;
            state.error = false;
            state.likes = action.payload;
        },
        likeFailure: (state,action)  => {
            state.isFetching = false;
            state.error =action.payload;
        },
        createlikesSuccess: (state, action) => {
            state.isFetching = false;
            state.likes.push(action.payload);
            state.error = false;
        },
        dislikeSuccess : (state,action) =>{
            state.isFetching = false;
            state.likes.pop(action.payload);
            state.error = false;
        },
    },
});

export const {
    likeStart,
    likeSuccess,
    likeFailure,
    createlikesSuccess,
    dislikeSuccess
} = likeSlice.actions;
export default likeSlice.reducer;