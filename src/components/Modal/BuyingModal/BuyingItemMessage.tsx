import { Typography } from "@mui/material";
import styled from "styled-components";
import s from 'styled-components'
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { buyItemAC } from "../../../store/action-creators/shopAC";
import Loader from "../../common/Loader";
import ItemBlockOpening from "../../Main/Caps/ItemBlockOpening";

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

const BuyButton = styled(Btn)`
    background: #16A085;
    color: white;

    margin-right: 1rem;

    &: hover{
        background: #117A65;
    }
`

const ButtonsBlock = s.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 1rem;
`

interface iBuyingItemMessageProps {
    id: string;
    price: number;
    image: string;
    name: string;
    rare: string;
    isLoading: boolean;
    buyItem: () => void;
    closeModal: () => void;
}

function BuyingItemMessage({id ,price, image, name, rare, isLoading, buyItem, closeModal}:iBuyingItemMessageProps) {

    return (
        <>
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Купить этот предмет?
            </Typography>
            <ItemBlockOpening 
                id={id}
                image={image}
                name={name}
                rare={rare}
                type={'bundle'} />
            <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
                Вы потратите <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
                    {price} c.
                </Typography>
            </Typography>
            <ButtonsBlock>
                <BuyButton onClick={buyItem}>
                    {
                        isLoading
                            ? <Loader color="white" size={1} />
                            : 'Купить'
                    }
                </BuyButton>
                <Btn onClick={closeModal}>Отмена</Btn>
            </ButtonsBlock>
        </>

    );
}

export default BuyingItemMessage;