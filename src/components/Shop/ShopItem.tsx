import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import s from 'styled-components'

const ImageBox = s.div`    
    height: auto;
    width: 100%;
`

const Image = s.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`

const ButtonBuy = s.button`
    background: #27AE60;
    color: white;
    font-size: 1rem;
    line-height: 0.5;

    width: 100%;

    border: none;
    border-radius: 5px;

    padding: 0.5rem;
    
    transition: 0.1s;

    &:hover{
        background: #196F3D;
    }
`

const BlockItem = s.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 13rem;
    width: 10rem;
    padding: 1rem;
    margin: 1rem;

    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 5px;
`



function ShopItem() {
    return ( 
        <BlockItem>

            <ImageBox>
                <Image src={'https://m1.dogecdn.wtf/fields/brands/4_drinks/mirinda.svg'} />
            </ImageBox>
                <Typography sx={{ marginTop: '1rem', textAlign: 'center' }}>
                    Шрек с ослом и фиона жена
                </Typography>
                <ButtonBuy>
                    Купить 500c.
                </ButtonBuy>

        </BlockItem>
    );
}

export default ShopItem;