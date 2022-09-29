import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInvItem, ISellCapAction } from "../../types/invItemTypes";


interface IInventoryState {
    items: IInvItem[] | null;
    sortedFilteredItems: IInvItem[] | null;
    isLoading: boolean;
    error: string;
}

const initialState: IInventoryState = {
    items: null,
    isLoading: false,
    sortedFilteredItems: null,
    error: ''
}

const inventorySlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setItems(state, action: PayloadAction<IInvItem[] | null>) {
            state.items = action.payload;
        },
        setSortedFilteredItems(state, action: PayloadAction<IInvItem[] | null>) {
            state.sortedFilteredItems = action.payload;
        },
        sellItem(state, action: PayloadAction<string>) {
            let newCaps: IInvItem[] | null = state.items
                ? state.items.filter(c => c.id !== action.payload)
                : null;
            if(!(newCaps?.length)) newCaps = null;
            state.items = newCaps;
            state.sortedFilteredItems = newCaps;
        },
        sellSomeItems(state, action: PayloadAction<string[]>) {
            let newCaps: IInvItem[] | null = state.items
                ? state.items.filter(c => action.payload.indexOf(c.id) === -1)
                : null
            if(!(newCaps?.length)) newCaps = null;
            state.items = newCaps;
            state.sortedFilteredItems = newCaps;
        },
        setError(state, action: PayloadAction<string> ) {
            state.error = action.payload;
        },
        
    }
})

export default inventorySlice;
