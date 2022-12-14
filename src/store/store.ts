import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import userSlice from './slices/userSlice';
import inventorySlice from './slices/inventorySlice';
import createSagaMiddleware from 'redux-saga';
import shopSlice from './slices/shopSlice';

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    inventory: inventorySlice.reducer,
    shop: shopSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']