import { doc, getDoc, getFirestore, increment, setDoc, Timestamp, updateDoc, orderBy, getDocs, collection } from "firebase/firestore";
import { IInvItem, IInvItemToSell } from "../../types/invItemTypes";
import { SORT_NEW_FIRST, SORT_OLD_FIRST, SORT_BY_NAME, SORT_BY_BUNDLE, SORT_COMMON_FIRST, SORT_RARE_FIRST, SORT_EXPENSIVE_FIRST, SORT_CHEAP_FIRST, FILTER_ALL_ITEMS, FILTER_ONLY_CAPS, FILTER_ONLY_BUNDLES } from "../../utils/consts";
import inventorySlice from "../slices/inventorySlice";
import userSlice from "../slices/userSlice";
import { AppDispatch } from "../store";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * (max))
}

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

export const sortItems = (items: IInvItem[], method:string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(inventorySlice.actions.setLoading(true))
            
            dispatch(inventorySlice.actions.setSorting(method))
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

            dispatch(inventorySlice.actions.setFilter(method))         
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

export const setItemsInBundle = (bundle: string, id: string) => {
    return async (dispatch: AppDispatch) => {
        try{
            dispatch(inventorySlice.actions.setLoading(true));

            const db = getFirestore();
            const q = await getDocs(collection(db, bundle));
            const capsInBundle: any[] = [];
            q.forEach(doc => doc.data().type !== 'bundle' ? capsInBundle.push(doc.data()) : null);
            const sortingArr = ['Common', 'Uncommon', 'Rare', 'Epic', 'Mythical', 'Legendary']
            const sortedArr = [...capsInBundle].sort((a, b) =>
            sortingArr.indexOf(a.rare) - sortingArr.indexOf(b.rare));
            dispatch(inventorySlice.actions.setItemsInBundle(sortedArr))

            dispatch(inventorySlice.actions.setLoading(false));

        }
        catch (e:any){
            console.log(e);
            dispatch(inventorySlice.actions.setError(e.message));
            dispatch(inventorySlice.actions.setLoading(false));
        }
    }
}

export const openBundle = (idBundle: string, uid: string, caps: IInvItem[]) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(inventorySlice.actions.setLoading(true));

            /// Common - 35%
            /// Uncommon - 30%
            /// Rare - 15% 
            /// Epic - 10% 
            /// Mythical - 7% 
            /// Legendary - 3% 
            
            let myCaps = [];

            for(let i = 0; i < 5; i++){
                const timestamp = await Date.parse(Timestamp.now().toDate().toISOString());
                let selectedRare = '';
                const randomNum = Math.round(Math.random()*100);
                if(randomNum >= 0 && randomNum <= 40) selectedRare = 'Common';
                if(randomNum > 40 && randomNum <= 65) selectedRare = 'Uncommon';
                if(randomNum > 65 && randomNum <= 80) selectedRare = 'Rare';
                if(randomNum > 80 && randomNum <= 90) selectedRare = 'Epic';
                if(randomNum > 90 && randomNum <= 97) selectedRare = 'Mythical';
                if(randomNum > 97 && randomNum <= 100) selectedRare = 'Legendary';

                const newCaps: IInvItem[] = JSON.parse(JSON.stringify(caps));
                
                const capsWithRare = newCaps.filter(c => c.rare === selectedRare) || caps[0];
                const randomItemInd = getRandomInt(capsWithRare.length);
                const recievedItem = capsWithRare[randomItemInd];
                myCaps.push({
                    ...recievedItem, 
                    date: timestamp,
                    id: recievedItem.id + `_${Date.now() + Math.floor(Math.random()*100)}`
                });
            }
            
            const db = getFirestore();

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.data()?.items) {
                let myCapsFromDb = (docSnap.data()?.items).filter((i:IInvItem) => i.id !== idBundle);
                console.log(myCapsFromDb)
                console.log(myCaps)
                const concatedCaps = myCapsFromDb.concat(myCaps);
                console.log(concatedCaps)

                const updatedRes = await updateDoc(doc(db, "users", uid), {
                    items: concatedCaps
                })
                dispatch(inventorySlice.actions.setItems(concatedCaps))
                dispatch(inventorySlice.actions.setSortedFilteredItems(concatedCaps))
            }
            else {
                await setDoc(doc(db, "users", uid), {
                    items: [myCaps]
                })
                dispatch(inventorySlice.actions.setItems(myCaps))
                dispatch(inventorySlice.actions.setSortedFilteredItems(myCaps))
            }
            dispatch(inventorySlice.actions.setRecievedCaps(myCaps));

            dispatch(inventorySlice.actions.setLoading(false));
        } catch (e:any) {
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