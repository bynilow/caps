import { Box, Button, TextField } from '@mui/material';
import { useContext } from 'react';
import s from 'styled-components'
import { Context } from '../../index'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../../store/action-creators/user';

function LoginPage() {

    const {auth} = useContext(Context)
    
    const dispatch = useDispatch();

    const LoginWithGoogle = () => {
        dispatch<any>(loginWithGoogle());
    }
    return (
        <Box sx={{ width: '100vw', height: '100vh-50px', marginTop: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant='contained' onClick={LoginWithGoogle}>Войти с помощью Google</Button>
        </Box>
    );
}

export default LoginPage;