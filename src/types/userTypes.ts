export enum UserActionTypes {
    AUTH_USER = "AUTH_USER",
    LOGOUT_USER = "LOGOUT_USER",
    LOADING = "LOADING",
    SET_CAPS = "SET_CAPS",
    SELL_CAP = "SELL_CAP",

}

interface ISetIsLoading {
    type: UserActionTypes.LOADING;
    payload: boolean;
} 

interface IUserLoginAction {
    type: UserActionTypes.AUTH_USER;
    payload: {};
} 

interface IUserLogoutAction {
    type: UserActionTypes.LOGOUT_USER
} 

interface ISetCaps {
    type: UserActionTypes.SET_CAPS;
    payload: {
        caps: any[] | null;
        coins: number;
    } | null;
} 

interface ISellCap {
    type: UserActionTypes.SELL_CAP;
    payload: {
        capId: string;
        cost: number;
    };
} 

export type UserAction =
    IUserLoginAction |
    IUserLogoutAction |
    ISetIsLoading |
    ISetCaps |
    ISellCap;