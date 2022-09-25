import { getAuth, GoogleAuthProvider, signInWithPopup, UserInfo } from "firebase/auth";
import userSlice from "../slices/userSlice";
import { AppDispatch } from "../store";

export const authUser = (user: UserInfo) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.authUserReducer(user));
        } catch (e: any) {
            dispatch(userSlice.actions.setErrorReducer(e.message))
        }
    }
}

export const loginWithGoogle = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.setLoadingReducer(true))

            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const loginRes: any = await signInWithPopup(auth, provider);
            const token = loginRes.user.accessToken;
            document.cookie = `token=${token}`;
            
            const user = loginRes.user;
                
            dispatch(userSlice.actions.authUserReducer(user))

            dispatch(userSlice.actions.setLoadingReducer(false))
        } catch (e: any) {
            dispatch(userSlice.actions.setErrorReducer(e.message))
            dispatch(userSlice.actions.setLoadingReducer(false))
        }
    }
}

export const signOut = () => {
    return async (dispatch: AppDispatch) => {
        try {
            getAuth().signOut();
            dispatch(userSlice.actions.logoutUserReducer())
        } catch (e: any) {
            dispatch(userSlice.actions.setErrorReducer(e.message))
        }
    }
}
