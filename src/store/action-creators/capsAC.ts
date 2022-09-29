import { doc, getDoc, getFirestore, increment, setDoc, Timestamp, updateDoc, orderBy } from "firebase/firestore";
import { IInvItem, IInvItemToSell } from "../../types/invItemTypes";
import { SORT_NEW_FIRST, SORT_OLD_FIRST, SORT_BY_NAME, SORT_BY_BUNDLE, SORT_COMMON_FIRST, SORT_RARE_FIRST, SORT_EXPENSIVE_FIRST, SORT_CHEAP_FIRST, FILTER_ALL_ITEMS, FILTER_ONLY_CAPS, FILTER_ONLY_BUNDLES } from "../../utils/consts";
import inventorySlice from "../slices/inventorySlice";
import userSlice from "../slices/userSlice";
import { AppDispatch } from "../store";


export const getMyItems = (uid: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(inventorySlice.actions.setLoading(true))

            const db = getFirestore();
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            const items: IInvItem[] = await docSnap.data()?.items;
            const coins: number = docSnap.data()?.coins;
            items.sort((a,b) => b.date - a.date)
            
            if (items.length) {                
                dispatch(inventorySlice.actions.setItems(items))
                dispatch(inventorySlice.actions.setSortedFilteredItems(items))
                dispatch(userSlice.actions.setCoins(coins || 0))
            }
            else {
                dispatch(inventorySlice.actions.setItems(null))
                dispatch(inventorySlice.actions.setSortedFilteredItems(null))
                dispatch(userSlice.actions.setCoins(coins || 0))
            }

            dispatch(inventorySlice.actions.setLoading(false))
        } catch (e: any) {
            console.log(e)
            dispatch(inventorySlice.actions.setError(e.message))
            dispatch(inventorySlice.actions.setLoading(false))
        }
    }
}

export const sellItem = (capId: string, uid: string, cost: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(inventorySlice.actions.setLoading(true))

            const db = getFirestore();

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.data()) {
                let myCaps = docSnap.data()?.items;
                let newCaps = myCaps.filter((c:any) => c?.id !== capId);
                if(docSnap.data()?.coins){
                    const updatedRes = await updateDoc(doc(db, "users", uid), {
                        items: newCaps,
                        coins: increment(cost)
                    })
                    dispatch(inventorySlice.actions.sellItem(capId));
                    dispatch(userSlice.actions.addCoins(cost));
                }
                else{
                    await setDoc(doc(db, "users", uid), {
                        items: newCaps,
                        coins: cost
                    })
                    dispatch(inventorySlice.actions.sellItem(capId));
                    dispatch(userSlice.actions.addCoins(cost));
                }
            }
            dispatch(inventorySlice.actions.setLoading(false))
        } catch (e) {
            dispatch(inventorySlice.actions.setError('Ошибка при продаже'))
            dispatch(inventorySlice.actions.setLoading(false))
        }
    }
}

export const sellSomeItems = (items: IInvItemToSell[], uid: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(inventorySlice.actions.setLoading(true))

            const cost = items.reduce((sum,c) => sum + c.cost, 0);
            const capsId = items.map(c => c.id);

            const db = getFirestore();

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            console.log(uid)
            if (docSnap.data()) {
                let myCaps:IInvItem[] = docSnap.data()?.items;
                console.log('selling in ac')
                let newCaps = myCaps.filter(c => capsId.indexOf(c.id) === -1);
                console.log(newCaps)
                if(docSnap.data()?.coins){
                    const updatedRes = await updateDoc(doc(db, "users", uid), {
                        items: newCaps,
                        coins: increment(cost)
                    })
                    dispatch(inventorySlice.actions.sellSomeItems(capsId));
                    dispatch(userSlice.actions.addCoins(cost));
                }
                else{
                    await setDoc(doc(db, "users", uid), {
                        items: newCaps,
                        coins: cost
                    })
                    dispatch(inventorySlice.actions.sellSomeItems(capsId));
                    dispatch(userSlice.actions.addCoins(cost));
                }
            }
            dispatch(inventorySlice.actions.setLoading(false))
        } catch (e) {
            console.log(e)
            dispatch(inventorySlice.actions.setError('Ошибка при продаже'))
            dispatch(inventorySlice.actions.setLoading(false))
        }
    }
}

export const sortItems = (items: IInvItem[], method:string ) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(inventorySlice.actions.setLoading(true))            
            switch (method) {
                case SORT_NEW_FIRST:{
                    const sortedArr = [...items].sort((a,b) => b.date - a.date);
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                case SORT_OLD_FIRST:{
                    const sortedArr = [...items].sort((a,b) => a.date - b.date);
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                case SORT_BY_NAME:{
                    const sortedArr = [...items].sort((a,b) => a.name.localeCompare(b.name));
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                case SORT_BY_BUNDLE:{
                    const sortedArr = [...items].sort((a,b) => a.bundle.localeCompare(b.bundle));
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                case SORT_COMMON_FIRST: {
                    const sortingArr = ['Common', 'Uncommon', 'Rare', 'Epic', 'Mythical', 'Legendary']
                    const sortedArr = [...items].sort((a, b) =>
                        sortingArr.indexOf(a.rare) - sortingArr.indexOf(b.rare));
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                case SORT_RARE_FIRST:{
                    const sortingArr = ['Common', 'Uncommon', 'Rare', 'Epic', 'Mythical', 'Legendary']
                    const sortedArr = [...items].sort((a, b) =>
                        sortingArr.indexOf(a.rare) - sortingArr.indexOf(b.rare));
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr.reverse()));
                    break;
                }
                case SORT_EXPENSIVE_FIRST:{
                    const sortedArr = [...items].sort((a,b) => b.cost - a.cost);
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                case SORT_CHEAP_FIRST:{
                    const sortedArr = [...items].sort((a,b) => a.cost - b.cost);
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                default:
                    break;
            }
            console.log('after', items)

            dispatch(inventorySlice.actions.setLoading(false))
        } catch (e: any) {
            console.log(e)
            dispatch(inventorySlice.actions.setError(e.message))
            dispatch(inventorySlice.actions.setLoading(false))
        }
    }
}

export const filterItems = (items: IInvItem[], method:string ) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(inventorySlice.actions.setLoading(true))            
            switch (method) {
                case FILTER_ALL_ITEMS:{
                    dispatch(inventorySlice.actions.setSortedFilteredItems(items));
                    break;
                }
                case FILTER_ONLY_CAPS:{
                    const sortedArr = [...items].filter(i => i.type === 'caps');
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                case FILTER_ONLY_BUNDLES:{
                    const sortedArr = [...items].filter(i => i.type === 'bundle');
                    dispatch(inventorySlice.actions.setSortedFilteredItems(sortedArr));
                    break;
                }
                
                default:
                    break;
            }
            console.log('after', items)

            dispatch(inventorySlice.actions.setLoading(false))
        } catch (e: any) {
            console.log(e)
            dispatch(inventorySlice.actions.setError(e.message))
            dispatch(inventorySlice.actions.setLoading(false))
        }
    }
}

export const findItems = (name: string, items: IInvItem[] ) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(inventorySlice.actions.setLoading(true))  ;          
            
            const newCaps = items.filter(c => c.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
            dispatch(inventorySlice.actions.setSortedFilteredItems(newCaps));

            dispatch(inventorySlice.actions.setLoading(false));
        } catch (e: any) {
            console.log(e);
            dispatch(inventorySlice.actions.setError(e.message));
            dispatch(inventorySlice.actions.setLoading(false));
        }
    }
}

// const addCapToUser = async() => {
//     const db = getFirestore();
//     const capRef = doc(db, "caps_shrek_1", `c_shrek_${getRandomInt(12)}`);
//     const capSnap = await getDoc(capRef);

//     const docRef = doc(db, "users", uid);
//     const docSnap = await getDoc(docRef);
    
//     if(docSnap.data()){
//         let myCaps = docSnap.data()?.items;
        // myCaps.push({capSnap.data(), });
//         const updatedRes = await updateDoc(doc(db,"users", uid),{
//             items: myCaps
//         })
//     }
//     else{
//         await setDoc(doc(db,"users", uid),{
//             items: [capSnap.data()]
//         })
//     }
// getCaps();
// }