import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';
import tweetSlice from './tweetSlice';
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({
    user: userSlice,
    tweet: tweetSlice
  })
 const persistedReducer = persistReducer(persistConfig, rootReducer)


const appStore = configureStore({
    reducer: persistedReducer,
})

export default appStore;
