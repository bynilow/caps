import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInvItem, ISellCapAction } from "../../types/invItemTypes";
import { FILTER_ALL_ITEMS, FILTER_ONLY_BUNDLES, FILTER_ONLY_CAPS, SORT_NEW_FIRST } from "../../utils/consts";


interface IInventoryState {
    items: IInvItem[] | null;
    sortedFilteredItems: IInvItem[] | null;
    itemsInBundle: IInvItem[] | null;
    recievedItems: IInvItem[] | null;
    sorting: string;
    filter: string;
    isLoading: boolean;
    error: string;
}

const initialState: IInventoryState = {
    items: null,
    isLoading: false,
    sortedFilteredItems: null,
    itemsInBundle: null,
    recievedItems: null,
    sorting: SORT_NEW_FIRST,
    filter: FILTER_ALL_ITEMS,
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
            state.recievedItems = null;
        },
        setSortedFilteredItems(state, action: PayloadAction<IInvItem[] | null>) {
            if(action.payload){
                switch (state.filter) {
                    case FILTER_ALL_ITEMS:
                        state.sortedFilteredItems = action.payload;
                        break;
                    case FILTER_ONLY_CAPS:
                        state.sortedFilteredItems = action.payload.filter(i => i.type === 'caps')
                        break;
                    case FILTER_ONLY_BUNDLES:
                        state.sortedFilteredItems = action.payload.filter(i => i.type === 'bundle')
                        break;
                    default:
                        break;
                }
            }
            
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
        setItemsInBundle(state, action: PayloadAction<IInvItem[]>) {
            state.itemsInBundle = action.payload;
        },
        setRecievedCaps(state, action: PayloadAction<IInvItem[]>) {
            state.recievedItems = action.payload;
        },
        setSorting(state, action: PayloadAction<string>) {
            state.sorting = action.payload;
        },
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        },
        
    }
})

export default inventorySlice;
