import Main from "./components/Main/InventoryPage.tsx";
import LoginPage from "./components/Login/LoginPage.tsx";
import { LOGIN_ROUT, MAIN_ROUT } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUT,
        component: LoginPage
    }
]

export const privateRoutes = [
    {
        path: MAIN_ROUT,
        component: Main
    }
]