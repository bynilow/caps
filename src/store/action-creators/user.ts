import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
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
                dispatch({type: UserActionTypes.SET_CAPS, payload: docSnap.data()?.caps})
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