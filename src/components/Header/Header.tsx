import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import s from 'styled-components'
import { Context } from '../..';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/action-creators/user';

function Header() {
    const { isAuth } = useTypedSelector(state => state.user)

    const dispatch = useDispatch();

    const logout = () => {
        dispatch<any>(signOut());
    }

    const ButtonHeader = s.button`
        background: none;
        border: none;
        border-radius: 5px;

        padding: 0.7rem;

        transition: 0.1s;

        font-size: 14px;

        &: hover{
            background: #E5E7E9;
        }
    `


    const ContainerHeader = s.div`
        max-width: 70%;
        height: 100%;
        margin: auto;

        display: flex;
        align-items: center;
        justify-content: space-between;
    `
    return (
        <Box sx={{
            position: 'fixed',
            background: 'white',
            width: '100vw',
            height: '50px',
            zIndex: '99999'
        }}>
            <ContainerHeader>
                <Typography sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#7B7D7D' }}>CAPS</Typography>
                {
                    isAuth
                        ? <Box>
                            
                            <ButtonHeader>
                                Инвентарь
                            </ButtonHeader>
                            <ButtonHeader>
                                Магазин
                            </ButtonHeader>
                            <ButtonHeader>
                                Аукцион
                            </ButtonHeader>
                            <ButtonHeader onClick={logout}>
                                Выход
                            </ButtonHeader>
                        </Box>
                        : <ButtonHeader >Вход</ButtonHeader>
                }
            </ContainerHeader>


        </Box>
    );
}

export default Header;