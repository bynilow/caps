import { AnyTxtRecord } from "dns"
import { User } from "firebase/auth";
import { UserAction, UserActionTypes } from "../../types/userTypes"

interface IUserState {
    user: any;
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
            return {
                ...state,
                caps: action.payload?.caps,
                coins: action.payload?.coins
            }
        }
        case UserActionTypes.SELL_CAP: {
            const newCaps = state.caps?.filter(c => c?.id !== action.payload.capId);
            return {
                ...state,
                caps: newCaps,
                coins: state.coins + action.payload.cost 
            }
        }

        default: return state
    }
}