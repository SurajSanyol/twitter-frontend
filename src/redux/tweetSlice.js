import { createSlice } from "@reduxjs/toolkit";


const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        tweets: null,
        refresh: false,
        isActive:true,
    },
    reducers: {
        getAllTweets: (state, action) => {
            state.tweets = action.payload;
        },
        toggle:(state)=>{
            state.refresh = !state.refresh
        },
        isActiveHandler: (state, action) => {
            state.isActive = action.payload;
        },
    }

});

export const { getAllTweets ,toggle,isActiveHandler} = tweetSlice.actions;
export default tweetSlice.reducer;