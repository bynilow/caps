import { Box, Typography, Select, MenuItem, SelectChangeEvent, Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import s from 'styled-components';
import { SORT_CHEAP_FIRST, SORT_EXPENSIVE_FIRST } from "../../utils/consts";
import ShopItem from "./ShopItem";

const Container = s.div`
    width: 70%;
    min-height: '100vh';
    height: 100%;
    margin: auto;
`

const ButtonBalance = s.button`
    background: #27AE60;
    color: white;
    font-size: 1rem;
    line-height: 0.5;

    width: 100%;

    border: none;
    border-radius: 5px;

    padding: 0.7rem;
    margin-top: 1rem;

    transition: 0.1s;
    

    &:hover{
        background: #196F3D;
    }
`

const ItemsList = s.div`
    background: white;

    height: 100%;
    width: 100%;
    
    display: flex;
    
    box-shadow: 0 0 10px rgba(0,0,0,0.051);
    border-radius: 5px;
`

const BalanceInfo = s.div`
    background: white;
    width: 100%;
    min-height: 20%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    box-shadow: 0 0 10px rgba(0,0,0,0.051);
    border-radius: 5px;
`

const InputTextFind = styled.input.attrs((props:any) => ({
    type: 'text'
}))`
    width: 100%;

    margin-right: 1rem;
    padding: 0.5rem;

    border: 1px solid gray;
    border-radius: 5px;

    &:focus{
        outline: 1px solid blue;
        border: 1px solid blue;
    }
`

const SortingBlock = s.div`
    width: 100%;
    height: 2rem;

    display: flex;
    margin: 1rem 0;
`

function ShopPage() {

    const [sorting, setSorting] = useState(SORT_CHEAP_FIRST);

    const onSortingChange = (e: SelectChangeEvent) => {
        // dispatch<any>(sortItems(caps, e.target.value));
        setSorting(e.target.value)
    }

    const onClick = () => {
        
    }

    return ( 
        <Box sx={{
            background: '#f4f4f5',
            minHeight: '100vh'}}>
            <Container>
                <Typography variant="h4" sx={{fontWeight: 'bold', paddingTop: '1rem'}}>Магазин</Typography>
                <SortingBlock>
                    <InputTextFind placeholder="Название предмета" />
                    <Select
                        value={sorting}
                        sx={{ background: 'white', width: '30%' }}
                        size="small"
                        onChange={onSortingChange}>
                        <MenuItem value={SORT_CHEAP_FIRST} sx={{ fontSize: '14px' }}>
                            Сначала дешевые
                        </MenuItem>
                        <MenuItem value={SORT_EXPENSIVE_FIRST} sx={{ fontSize: '14px' }}>
                            Сначала дорогие
                        </MenuItem>
                    </Select>
                    <Button onClick={onClick}>
                        работа
                    </Button>
                </SortingBlock>
                
                <Box sx={{display: 'flex', height: '100vh', width: '100%'}}>
                    <ItemsList>
                        <ShopItem />
                    </ItemsList>
                    <Box sx={{width: '30%', height: '100%', marginLeft: '1rem', position: 'relative'}}>
                        <BalanceInfo>
                            <Typography sx={{color: '#909497', textAlign: 'center'}}>
                                Ваш баланс
                            </Typography>
                            <Typography sx={{textAlign: 'center', fontSize: '2rem'}}>
                                250<Typography component="span" sx={{fontSize: '1.5rem', color: '#909497'}}>
                                    c.
                                </Typography>
                            </Typography>
                            <ButtonBalance>Управление балансом</ButtonBalance>
                        </BalanceInfo>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default ShopPage;