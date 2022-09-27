import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICap, ISellCapAction } from "../../types/capsTypes";


interface ICapsState {
    caps: ICap[] | null;
    isLoading: boolean;
    error: string;
}

const initialState: ICapsState = {
    caps: null,
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
        sellCap(state, action: PayloadAction<string>) {
            let newCaps: ICap[] | null = state.caps
                ? state.caps.filter(c => c.id !== action.payload)
                : null;
            if(!(newCaps?.length)) newCaps = null;
            state.caps = newCaps;
        },
        sellSomeCaps(state, action: PayloadAction<string[]>) {
            let newCaps: ICap[] | null = state.caps
                ? state.caps.filter(c => action.payload.indexOf(c.id) === -1)
                : null
            if(!(newCaps?.length)) newCaps = null;
            state.caps = newCaps;
        },
        setError(state, action: PayloadAction<string> ) {
            state.error = action.payload;
        },
        
    }
})

export default capsSlice;
