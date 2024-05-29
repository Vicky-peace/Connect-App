import {createSlice} from "@reduxjs/toolkit";
const followSlice = createSlice ({
    name: "follow",
    initialState:{
        follow: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        followStart: (state) =>{
            state.isFetching = true;
        },
        followSuccess: (state,action) => {
            state.isFetching = false;
            state.error =false;
            state.follow = action.payload;
        },
        followFailure: (state,action) =>{
            state.isFetching = false;
            state.error = action.payload;

        },
        createFollowSuccess: (state, action) => {
            state.isFetching = false;
            state.follow.push(1);
            state.error = false;
        },
        unfollowSuccess: (state,action) => {
            state.isFetching = false;
            state.follow.pop();
            state.error = false;
        },
    },
});

export const{
    followStart,
    followSuccess,
    followFailure,
    createFollowSuccess,
    unfollowSuccess
} = followSlice.actions;
export default followSlice.reducer;