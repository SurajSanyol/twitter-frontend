import { createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        userId:null,
        userName:null,
        followinguser: null,
        otherUser: null,
        profile:null
    },
    reducers: {
        getFollowingUser: (state, action) => {
            state.followinguser = action.payload;
        },
        getOtherUser: ( state,action) => {
            state.otherUser = action.payload;
        },
        setUserId :(state,action)=>{
            state.userId= action.payload;
        },
        setUserName :(state,action)=>{
            state.userName= action.payload;
        },
        addprofile:(state,action)=>{
            state.profile = action.payload;
        },
        followingUpdate:(state,action)=>{
             if(state.followinguser.includes(action.payload)){
                 // unfollow
                  state.followinguser=state.followinguser.filter((itemId)=>{ return itemId!==action.payload})
             }
             else{
                  // follow
                  state.followinguser.push(action.payload);
             }
        }
    }
})

export const{getFollowingUser,getOtherUser,setUserId,addprofile,followingUpdate,setUserName}=userSlice.actions;
export default userSlice.reducer;