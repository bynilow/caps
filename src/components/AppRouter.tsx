import { UserInfo } from "firebase/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { privateRoutes, publicRoutes } from "../routes";
import { LOGIN_ROUT, MAIN_ROUT } from "../utils/consts";
import LoginPage from "./Login/LoginPage";
import InventoryPage from "./Main/InventoryPage";
import ShopPage from "./Shop/ShopPage";

function AppRouter() {
    const {isAuth} = useTypedSelector(state => state.user);
    
    return isAuth ?
        (
            <Routes>
                <Route path='/inventory' element={<InventoryPage />} />
                <Route path='/shop' element={<ShopPage />} />
                {/* <Route path='*' element={<Navigate to='/inventory' />} /> */}
            </Routes>
        )
        :
        (
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                {/* <Route path='*' element={<Navigate to='/login' />} /> */}
            </Routes>
        );
}

export default AppRouter;