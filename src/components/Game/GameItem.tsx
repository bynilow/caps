import { Typography } from '@mui/material';
import { useState } from 'react';
import { default as s, default as styled } from 'styled-components';

const Item = styled.button.attrs((props:any) => ({
    image: props.image,
    rare: props.rare
}))`
    background-image: url(${(props:any) => props.image});
    background-position: center;
    background-size: cover;
    
    width: 100%;
    height: 100%;

    border-radius: 50%;
    
    transition: 0.2s;
    cursor: pointer;

`

const Block = styled.div.attrs((props:any) => ({
    rare: props.rare,
    isReceived: props.isReceived
}))`
    width: 5rem;
    height: 5rem;
    
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);

    padding: 0.2rem;
    margin: 0.3rem;

    position: relative;

    display: flex;
    justify-content: center;

    transition: 0.1s;
    
    border: solid 3px ${
        (props: any) =>
            props.rare === 'Common' ? '#cfd3d4'
                : props.rare === 'Uncommon' ? '#27ae61'
                    : props.rare === 'Rare' ? '#297fb8'
                        : props.rare === 'Epic' ? '#8E44AD'
                            : props.rare === 'Mythical' ? '#cf4137'
                                : '#f09d13'
        };

    &:hover ${Item} {
        ${
            (props: any) => props.isReceived 
                ? ''
                : 'transform: scale(1.5);'
        }
        
    }

`

const Counter = s.div`
    display: flex;
    flex-direction: column;
`

const Container = s.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

interface IGameItem {
    id: string;
    ind: number;
    image: string;
    name: string;
    rare: string;
    points: number;
    countSelected: string[];
    isReceived: boolean;
    onClickGetCap: (id: string, ind: number) => void; 
}

function GameItem({id, ind, image, name, rare, points, countSelected, isReceived, onClickGetCap}: IGameItem) {

    const onClick = () => {
        onClickGetCap(id, ind);
        
    }

    return (
        <Container>
        <Block 
            rare={rare} 
            isReceived={isReceived} >
                {
                    isReceived
                        ? countSelected[countSelected.length-1] === 'p'
                            ? <Typography sx={{ position: 'absolute', fontSize: '3rem', zIndex: '999999', color: 'blue' }}>
                                X
                            </Typography>
                            : <Typography sx={{ position: 'absolute', fontSize: '3rem', zIndex: '999999', color: 'red' }}>
                                X
                            </Typography>
                        : <></>
                }
            <Item 
                onClick={onClick}
                image={image} 
                rare={rare} />
        </Block>
        <Counter>
                {
                    countSelected.length
                }
                {
                    countSelected.map(i =>
                        i === 'p'
                            ? <Typography sx={{ fontSize: '2rem', lineHeight: '1', color: 'blue' }}>
                                X
                            </Typography>
                            : <Typography sx={{ fontSize: '2rem', lineHeight: '1', color: 'red' }}>
                                X
                            </Typography>)
            }
        </Counter>
        </Container>
        
    );
}

export default GameItem;