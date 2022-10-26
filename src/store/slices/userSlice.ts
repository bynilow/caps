import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";


interface IUserState {
    user: UserInfo;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    coins: number;
}

const emptyUser: UserInfo = {
    uid: '',
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    providerId: ''
}

const initialState: IUserState = {
    user: emptyUser,
    isAuth: false,
    isLoading: false,
    error: '',
    coins: 0,
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authUserReducer(state, action: PayloadAction<UserInfo>) {
            state.user = action.payload;
            state.isAuth = true;
        },
        logoutUserReducer(state) {
            state.user = emptyUser;
            state.isAuth = false;
        },
        setLoadingReducer(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setErrorReducer(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setCoins(state, action: PayloadAction<number>) {
            state.coins = action.payload;
        },
        addCoins(state, action: PayloadAction<number> ){
            state.coins += action.payload;
        },
        decrementCoins(state, action: PayloadAction<number>){
            state.coins -= action.payload;
        }
        
    }
})

export default userSlice;
