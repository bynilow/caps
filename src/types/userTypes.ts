export enum UserActionTypes {
    AUTH_USER = "AUTH_USER",
    LOGOUT_USER = "LOGOUT_USER",
    LOADING = "LOADING",
    SET_CAPS = "SET_CAPS",

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
    payload: any[] | null;
} 

export type UserAction =
    IUserLoginAction |
    IUserLogoutAction |
    ISetIsLoading |
    ISetCaps;