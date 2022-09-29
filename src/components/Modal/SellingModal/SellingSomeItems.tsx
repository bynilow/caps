import { Typography } from "@mui/material";
import { useEffect } from "react";
import styled from "styled-components";
import s from 'styled-components'
import { NumberLiteralType } from "typescript";
import { IInvItem, IInvItemToSell } from "../../../types/invItemTypes";
import ItemBlock from "../../Main/Caps/ItemBlock";
import ItemBlockSelling from "../../Main/Caps/ItemBlockSelling";
import EmptyItemBlockSelling from "../../Main/Caps/EmptyItemBlockSelling";

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

const CapsList = s.div`
    width: 100%;
    max-height: 15rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    overflow-y: auto;
    
    &::-webkit-slider {
        display: none;
        width: 5px;
        border: 1px solid yellow;
    }

`

interface ISellingSome {
    items: IInvItemToSell[];
    cost: number;
    sell: () => void;
    closeModal: () => void;
}

function SellingSomeCaps({items, cost, sell, closeModal}:ISellingSome) {
    return (
        <>
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Продать эти предметы?
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: '12px' }}>
                Эти предметы пропадут, а вы получите <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'bold' }}>
                    {cost} c.
                </Typography>
            </Typography>
            <CapsList>
                {
                    items.map(c => <ItemBlockSelling 
                        key={c.id}
                        cost={c.cost}
                        image={c.image}
                        id={c.id}
                        type={c.type}
                        name={c.name}
                        rare={c.rare} />)
                }
                <EmptyItemBlockSelling />
                <EmptyItemBlockSelling />

            </CapsList>
            <ButtonsBlock>
                <SellButton onClick={sell}>Продать</SellButton>
                <Btn onClick={closeModal}>Отмена</Btn>
            </ButtonsBlock>
        </>

    );
}

export default SellingSomeCaps;