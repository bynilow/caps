import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICap, ISellCapAction } from "../../types/capsTypes";


interface ICapsState {
    caps: ICap[] | null;
    coins: number;
    isLoading: boolean;
    error: string;
}

const initialState: ICapsState = {
    caps: [],
    coins: 0,
    isLoading: false,
    error: ''
}

const capsSlice = createSlice({
    name: 'caps',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setCaps(state, action: PayloadAction<ICap[] | null>) {
            state.caps = action.payload;
        },
        setCoins(state, action: PayloadAction<number>) {
            state.coins = action.payload;
        },
        sellCap(state, action: PayloadAction<ISellCapAction>) {
            const newCaps: ICap[] | null = state.caps
                ? state.caps.filter(c => c.id !== action.payload.capId)
                : null;
            state.caps = newCaps;
            state.coins = state.coins + action.payload.cost; 
        },
        setError(state, action: PayloadAction<string> ) {
            state.error = action.payload;
        },
        addCoins(state, action: PayloadAction<number> ){
            state.coins += action.payload;
        }
    }
})

export default capsSlice;
