import Header from "./components/Header/Header";
import LoginPage from "./components/Login/LoginPage";
import s from 'styled-components'
import Main from "./components/Main/InventoryPage";
import { BrowserRouter, Routes } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from "react";
import { Context } from ".";
import { useDispatch } from "react-redux";
import { authUser } from "./store/action-creators/userAC";
import './App.css'
import { Box } from "@mui/material";
import Loader from "./components/common/Loader";
import userSlice from "./store/slices/userSlice";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { UserInfo } from "firebase/auth";
import inventorySlice from "./store/slices/inventorySlice";

const Root = s.div`
  padding-top: 150px
  width: 100vw;
`


function App() {

  const dispatch = useAppDispatch();

  const { auth } = useContext(Context);
  
  const [user] = useAuthState(auth);

  let userToDispatch: UserInfo = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    photoURL: user?.photoURL || '',
    providerId: user?.providerId || '',
    uid: user?.uid || ''
  }

  user && dispatch(authUser(userToDispatch));

  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ paddingTop: '50px' }}>
        <AppRouter />
      </Box>
    </BrowserRouter>
  )
}

export default App;
