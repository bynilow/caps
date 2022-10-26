import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import s from 'styled-components'
import { IInvItem, IIsBuying } from "../../types/invItemTypes";

const ImageBox = s.div`    
    height: auto;
    width: 100%;
`

const Image = s.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
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

    &:disabled {
        cursor: default;
        background: #616A6B;
        color: white;
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


interface IShopItem {
    uid: string;
    coins: number;
    image: string;
    name: string;
    price: number;
    bundleName: string;
    bundleId: string;
    onClickBuyItem: (item: IIsBuying) => void;
}

function ShopItem({uid, coins, image, name, price, bundleName, bundleId, onClickBuyItem}: IShopItem) {
    
    const onClickBuy = () => {
        onClickBuyItem({uid, bundleId, image, name, price, bundleName})
    }

    return ( 
        <BlockItem>
            <ImageBox>
                <Image src={image} />
            </ImageBox>
                <Typography sx={{ marginTop: '1rem', textAlign: 'center' }}>
                    {name}
                </Typography>
                <ButtonBuy onClick={onClickBuy} disabled={coins < price}>
                    {
                        coins < price
                            ? `${price}c.`
                            : `Купить ${price}c.`
                    }
                </ButtonBuy>

        </BlockItem>
    );
}

export default ShopItem;