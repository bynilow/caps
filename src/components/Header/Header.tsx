import { Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import s from 'styled-components'
import { Context } from '../..';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/action-creators/userAC';
import styled from 'styled-components';

const ButtonHeader = s.button`
    background: none;
    border: none;
    border-radius: 5px;

    padding: 0.7rem;

    transition: 0.1s;

    font-size: 14px;

    &:hover{
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

const AvatarBlock = s.div`
    background: white;

    position: absolute;
    z-index: 9999;
    top: 3rem;
    right: -18%;

    transform: scale(0) translateY(10rem);
    transform-origin: top;

    border-radius: 5px;

    opacity: 0;

    box-shadow: 0 0 15px rgba(0,0,0,0.2);

    transition: 0.2s;

    &:before{
        content: '';
        width: 100%;
        height: 20%;
        top: -1rem;
        position: absolute;
    }
`

const AvatarButton = styled.div.attrs((props:any) => ({
    photoUrl: props.photoUrl
}))`
    background: red;
    background-image: url(${(props:any) => props.photoUrl});
    background-position: center;
    background-size: cover;

    height: 2.5rem;
    width: 2.5rem;

    z-index: 999999;
    position: relative;

    border-radius: 50%;

    line-height: 230%;
    display: flex;
    justify-content: center;
    alignItems: center;

    transform: scale(1);

    transition: 0.1s;
`

const AvatarOuter = s.div`
    &:hover ${AvatarBlock} {
        width: 50%;
        opacity: 1;
        transform: scale(1) translateY(0);
    }
`

function Header() {
    const { isAuth } = useTypedSelector(state => state.user);
    const { coins } = useTypedSelector(state => state.caps);
    const { photoURL, displayName } = useTypedSelector(state => state.user['user']);

    const dispatch = useDispatch();
    const logout = () => {
        dispatch<any>(signOut());
    }

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
                        ? <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

                            <ButtonHeader>
                                Инвентарь
                            </ButtonHeader>
                            <ButtonHeader>
                                Магазин
                            </ButtonHeader>
                            <ButtonHeader>
                                Аукцион
                            </ButtonHeader>
                            <AvatarOuter>
                                <AvatarButton photoUrl={photoURL}>
                                    {displayName && displayName[0]}
                                </AvatarButton>
                                <AvatarBlock>
                                    <Box sx={{ padding: '0.5rem' }}>
                                        <Typography>
                                            {displayName}
                                        </Typography>
                                        <Typography sx={{ fontSize: '12px' }}>
                                            {coins} c.
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <ButtonHeader>
                                            Настройки
                                        </ButtonHeader>
                                        <ButtonHeader onClick={logout}>
                                            Выход
                                        </ButtonHeader>
                                    </Box>
                                </AvatarBlock>
                            </AvatarOuter>





                            {/* <ButtonHeader onClick={logout}>
                                Выход
                            </ButtonHeader> */}
                        </Box>
                        : <ButtonHeader >Вход</ButtonHeader>
                }
            </ContainerHeader>


        </Box>
    );
}

export default Header;