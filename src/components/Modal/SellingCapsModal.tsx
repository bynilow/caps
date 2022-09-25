import { Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import s from 'styled-components'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { sellCap } from '../../store/action-creators/capsAC';
import Loader from '../common/Loader';

interface ISellingCapsModalProps {
    uid: string;
    id: string;
    cost: number;
    closeModal: () => void;
}

function SellingCapsModal({uid, id, cost, closeModal}:ISellingCapsModalProps) {

    const dispatch = useDispatch();

    const {isLoading} = useTypedSelector(state => state.user)
    const {error} = useTypedSelector(state => state.caps)

    const [isSelled, setIsSelled] = useState(false);

    const sell = () => {
        setIsSelled(true);
        dispatch<any>(sellCap(id, uid, cost));
    }

    ////

    
    const Modal = s.div`
        width: 100vw;
        height: 100vh;
        
        position: fixed;
        top: 0;
        left: 0;

        z-index: 99999;

        backdrop-filter: blur(15px);

        display: flex;
        justify-content: center;
        align-items: center;
    `

    const Btn = s.button`
        background: none;
        border: none;
        border-radius: 5px;

        background: #E5E7E9;

        padding: 0.7rem;

        transition: 0.1s;

        font-size: 14px;

        &: hover{
            background: #BDC3C7;
        }
    `

    const SellButton = styled(Btn)`
        background: #E74C3C;
        color: white;

        margin-right: 1rem;

        &: hover{
            background: #922B21;
        }
    `

    const ButtonsBlock = s.div`
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 1rem;
    `

    const BlockInfo = s.div`
        width: 25rem;
        height: 10rem;

        padding: 1rem;
            
        background: white;

        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0,0,0,0.2); 

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        z-index: 999999;

        position: fixed;
        left: 50%;
        top: 25%;
        transform: translate(-50%, 50%);
    `


    return ( 
        <>
            <Modal onClick={closeModal} />



            <BlockInfo>
                {
                    isSelled
                        ? isLoading
                            ? <Loader />
                            : <>
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {error || 'Успешно продано!'}
                                </Typography>
                                <Btn onClick={closeModal}>Ок</Btn>
                            </>
                        : <>
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                Продать этот предмет?
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
                                Этот предмет пропадет, а вы получите <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
                                    {cost} c.
                                </Typography>
                            </Typography>
                            <ButtonsBlock>
                                <SellButton onClick={sell}>Продать</SellButton>
                                <Btn onClick={closeModal}>Отмена</Btn>
                            </ButtonsBlock>
                        </>
                }
            </BlockInfo>

        </>

    );
}

export default SellingCapsModal;