import { Typography } from "@mui/material";
import styled from "styled-components";
import s from 'styled-components'

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

interface ISellingOne {
    cost: number;
    sell: () => void;
    closeModal: () => void;
}

function SellingOneCap({cost, sell, closeModal}:ISellingOne) {
    return (
        <>
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

    );
}

export default SellingOneCap;