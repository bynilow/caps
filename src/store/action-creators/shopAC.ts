import { IInvItem } from './../../types/invItemTypes';
import { getAuth, GoogleAuthProvider, signInWithPopup, UserInfo } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, increment, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { BUNDLES_NAMES } from "../../utils/consts";
import shopSlice from "../slices/shopSlice";
import userSlice from "../slices/userSlice";
import { AppDispatch } from "../store";
import inventorySlice from '../slices/inventorySlice';

export const setBundles = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(shopSlice.actions.setLoading(true));

            const db = getFirestore();
            let bundles: IInvItem[] = [];

            for(let i = 0; i < BUNDLES_NAMES.length; i++){
                const q = await getDocs(collection(db, BUNDLES_NAMES[i]));
                q.forEach(doc => doc.data().type === 'bundle' ? bundles.push(doc.data() as IInvItem) : null);
            }    
            dispatch(shopSlice.actions.setBundles(bundles));

            dispatch(shopSlice.actions.setLoading(false));
        } catch (e: any) {
            console.log(e.message)
            dispatch(shopSlice.actions.setLoading(false));
            dispatch(shopSlice.actions.setError(e.message))
        }
    }
}

export const buyItemAC = (uid: string, bundleName: string, bundleId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(shopSlice.actions.setLoading(true));
            
            const timestamp = await Date.parse(Timestamp.now().toDate().toISOString());
            
            const db = getFirestore();

            const bundleRef = await doc(db, bundleName, bundleId);
            const bundleSnap = await getDoc(bundleRef);
            const bundle = bundleSnap.data() as IInvItem;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.data()?.items) {
                let myItems = docSnap.data()?.items;
                myItems.push({
                    ...bundle,
                    date: timestamp,
                    id: bundle?.id + `_${timestamp}`
                });
                const updatedRes = await updateDoc(doc(db, "users", uid), {
                    items: myItems,
                    coins: increment(-1 * (bundle?.price || 0))
                })
                dispatch(inventorySlice.actions.setItems(myItems));
                dispatch(inventorySlice.actions.setSortedFilteredItems(myItems));
            }
            else {
                await setDoc(doc(db, "users", uid), {
                    items: [bundle],
                    coins: increment(-1 * (bundle?.price || 0))
                })
                dispatch(inventorySlice.actions.setItems([bundle]));
                dispatch(inventorySlice.actions.setSortedFilteredItems([bundle]));
            }
            dispatch(userSlice.actions.decrementCoins(bundle?.price || 0));

            dispatch(shopSlice.actions.setLoading(false));
        } catch (e:any) {
            console.log(e);
            dispatch(shopSlice.actions.setError(e.message));
            dispatch(shopSlice.actions.setLoading(false));
        }
    }
}