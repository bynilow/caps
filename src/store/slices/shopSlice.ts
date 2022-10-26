import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInvItem, ISellCapAction } from "../../types/invItemTypes";
import { FILTER_ALL_ITEMS, FILTER_ONLY_BUNDLES, FILTER_ONLY_CAPS, SORT_NEW_FIRST } from "../../utils/consts";


interface IInventoryState {
    bundles: IInvItem[] | null;
    isLoading: boolean;
    error: string;
}

const initialState: IInventoryState = {
    bundles: null,
    isLoading: false,
    error: ''
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string> ) {
            state.error = action.payload;
        },
        setBundles(state, action: PayloadAction<IInvItem[]> ) {
            state.bundles = action.payload;
        },
        
    }
})

export default shopSlice;
