import { AnyTxtRecord } from "dns"
import { User } from "firebase/auth";
import { UserAction, UserActionTypes } from "../../types/userTypes"

interface IUserState {
    user: User | {};
    caps: any[] | null;
    coins: number;
    isAuth: boolean;
    isLoading: boolean;
}

const defaultState: IUserState = {
    user: {},
    caps: [],
    coins: 0,
    isAuth: false,
    isLoading: false
}

export const userReducer = (state = defaultState, action: UserAction) => {
    switch(action.type){
        case UserActionTypes.AUTH_USER: {
            return {...state, user: action.payload, isAuth: true}
        }
        case UserActionTypes.LOGOUT_USER: {
            return {...state, user: {}, isAuth: false}
        }
        case UserActionTypes.LOADING: {
            return {...state, isLoading: action.payload}
        }
        case UserActionTypes.SET_CAPS: {
            return {...state, caps: action.payload}
        }

        default: return state
    }
}