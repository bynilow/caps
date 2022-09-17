import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { doc, getDoc, getFirestore, increment, setDoc, updateDoc } from "firebase/firestore";
import { Dispatch } from "redux"
import { UserAction, UserActionTypes } from "../../types/userTypes"

export const authUser = (user: any) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: UserActionTypes.AUTH_USER,
                payload: user
            })
        } catch (e) {

        }
    }
}

export const loginWithGoogle = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.LOADING, payload: true})

            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const loginRes: any = await signInWithPopup(auth, provider);
            const token = loginRes.user.accessToken;
            document.cookie = `token=${token}`;
            
            const user = loginRes.user;
                
            dispatch({
                type: UserActionTypes.AUTH_USER,
                payload: user
            })

            dispatch({type: UserActionTypes.LOADING, payload: false})
        } catch (e) {
            dispatch({type: UserActionTypes.LOADING, payload: false})
        }
    }
}

export const signOut = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            getAuth().signOut();
            
            dispatch({
                type: UserActionTypes.LOGOUT_USER
            })
        } catch (e) {

        }
    }
}

export const getMyCaps = (uid: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.LOADING, payload: true})

            const db = getFirestore();
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.data()?.caps) {
                console.log(docSnap.data()?.caps)
                dispatch({type: UserActionTypes.SET_CAPS, payload:{
                    caps: docSnap.data()?.caps,
                    coins: docSnap.data()?.coins || 0
                }})
            }
            else {
                dispatch({type: UserActionTypes.SET_CAPS, payload: null})
            }

            dispatch({type: UserActionTypes.LOADING, payload: false})
        } catch (e) {
            dispatch({type: UserActionTypes.LOADING, payload: false})
        }
    }
}

export const sellCap = (capId: string, uid: string, cost: number) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.LOADING, payload: true})

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
                    dispatch({type: UserActionTypes.SELL_CAP, payload: {capId, cost}});
                }
                else{
                    await setDoc(doc(db, "users", uid), {
                        caps: newCaps,
                        coins: cost
                    })
                    dispatch({type: UserActionTypes.SELL_CAP, payload: {capId, cost}});
                }
            }

            dispatch({type: UserActionTypes.LOADING, payload: false})
        } catch (e) {
            dispatch({type: UserActionTypes.LOADING, payload: false})
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
//         myCaps.push(capSnap.data());
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