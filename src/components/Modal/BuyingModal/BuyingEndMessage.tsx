import { Typography } from "@mui/material";
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

interface IBuyingEndMessageProps{
    text: string;
    closeModal: () => void;
}

function BuyingEndMessage({text, closeModal}:IBuyingEndMessageProps) {
    return (
        <>
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {text}
            </Typography>
            <Btn onClick={closeModal}>Ок</Btn>
        </>
    );
}

export default BuyingEndMessage;