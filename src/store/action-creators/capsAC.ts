import { doc, getDoc, getFirestore, increment, setDoc, Timestamp, updateDoc, orderBy } from "firebase/firestore";
import { ICap } from "../../types/capsTypes";
import { SORT_NEW_FIRST, SORT_OLD_FIRST, SORT_BY_NAME, SORT_BY_BUNDLE, SORT_COMMON_FIRST, SORT_RARE_FIRST, SORT_EXPENSIVE_FIRST, SORT_CHEAP_FIRST } from "../../utils/consts";
import capsSlice from "../slices/capsSlice";
import { AppDispatch } from "../store";


export const getMyCaps = (uid: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(capsSlice.actions.setLoading(true))

            const db = getFirestore();
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            const caps: ICap[] = await docSnap.data()?.caps;
            const coins: number = docSnap.data()?.coins;
            caps.sort((a,b) => b.date - a.date)
            
            if (caps) {                
                dispatch(capsSlice.actions.setCaps(caps))
                dispatch(capsSlice.actions.setCoins(coins || 0))
            }
            else {
                dispatch(capsSlice.actions.setCaps(null))
                dispatch(capsSlice.actions.setCoins(coins || 0))
            }

            dispatch(capsSlice.actions.setLoading(false))
        } catch (e: any) {
            console.log(e)
            dispatch(capsSlice.actions.setError(e.message))
            dispatch(capsSlice.actions.setLoading(false))
        }
    }
}

export const sellCap = (capId: string, uid: string, cost: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(capsSlice.actions.setLoading(true))

            const db = getFirestore();

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.data()) {
                let myCaps = docSnap.data()?.caps;
                let newCaps = myCaps.filter((c:any) => c?.id !== capId);
                if(docSnap.data()?.coins){
                    const updatedRes = await updateDoc(doc(db, "users", uid), {
                        caps: newCaps,
                        coins: increment(cost)
                    })
                    dispatch(capsSlice.actions.sellCap({capId, cost}));
                }
                else{
                    await setDoc(doc(db, "users", uid), {
                        caps: newCaps,
                        coins: cost
                    })
                    dispatch(capsSlice.actions.sellCap({capId, cost}));
                }
            }

            dispatch(capsSlice.actions.setLoading(false))
        } catch (e) {
            dispatch(capsSlice.actions.setError('Ошибка при продаже'))
            dispatch(capsSlice.actions.setLoading(false))
        }
    }
}

export const sortCaps = (caps: ICap[], method:string ) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(capsSlice.actions.setLoading(true))            
            switch (method) {
                case SORT_NEW_FIRST:{
                    const sortedArr = [...caps].sort((a,b) => b.date - a.date);
                    dispatch(capsSlice.actions.setCaps(sortedArr));
                    break;
                }
                case SORT_OLD_FIRST:{
                    const sortedArr = [...caps].sort((a,b) => a.date - b.date);
                    dispatch(capsSlice.actions.setCaps(sortedArr));
                    break;
                }
                case SORT_BY_NAME:{
                    const sortedArr = [...caps].sort((a,b) => a.name.localeCompare(b.name));
                    dispatch(capsSlice.actions.setCaps(sortedArr));
                    break;
                }
                case SORT_BY_BUNDLE:{
                    const sortedArr = [...caps].sort((a,b) => a.bundle.localeCompare(b.bundle));
                    dispatch(capsSlice.actions.setCaps(sortedArr));
                    break;
                }
                case SORT_COMMON_FIRST: {
                    const sortingArr = ['Common', 'Uncommon', 'Rare', 'Epic', 'Mythical', 'Legendary']
                    const sortedArr = [...caps].sort((a, b) =>
                        sortingArr.indexOf(a.rare) - sortingArr.indexOf(b.rare));
                    dispatch(capsSlice.actions.setCaps(sortedArr));
                    break;
                }
                case SORT_RARE_FIRST:{
                    const sortingArr = ['Common', 'Uncommon', 'Rare', 'Epic', 'Mythical', 'Legendary']
                    const sortedArr = [...caps].sort((a, b) =>
                        sortingArr.indexOf(a.rare) - sortingArr.indexOf(b.rare));
                    dispatch(capsSlice.actions.setCaps(sortedArr.reverse()));
                    break;
                }
                case SORT_EXPENSIVE_FIRST:{
                    const sortedArr = [...caps].sort((a,b) => b.cost - a.cost);
                    dispatch(capsSlice.actions.setCaps(sortedArr));
                    break;
                }
                case SORT_CHEAP_FIRST:{
                    const sortedArr = [...caps].sort((a,b) => a.cost - b.cost);
                    dispatch(capsSlice.actions.setCaps(sortedArr));
                    break;
                }
                default:
                    break;
            }
            console.log('after', caps)

            dispatch(capsSlice.actions.setLoading(false))
        } catch (e: any) {
            console.log(e)
            dispatch(capsSlice.actions.setError(e.message))
            dispatch(capsSlice.actions.setLoading(false))
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
//         let myCaps = docSnap.data()?.caps;
        // myCaps.push({capSnap.data(), });
//         const updatedRes = await updateDoc(doc(db,"users", uid),{
//             caps: myCaps
//         })
//     }
//     else{
//         await setDoc(doc(db,"users", uid),{
//             caps: [capSnap.data()]
//         })
//     }
// getCaps();
// }