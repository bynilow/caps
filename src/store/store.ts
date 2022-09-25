import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import userSlice from './slices/userSlice';
import capsSlice from './slices/capsSlice';
import createSagaMiddleware from 'redux-saga';

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    caps: capsSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']