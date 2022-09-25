import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import s, { keyframes } from 'styled-components'
import { sellCap } from '../../../store/action-creators/capsAC';
import SellingCapsModal from '../../Modal/SellingCapsModal';



const capAnimIn = keyframes`
    0%{
        transform: scale(1);
        z-index: 99;
    }
    100%{
        transform: scale(1.5);
        z-index: 9999;
    }
`

const capAnimOut = keyframes`
    0%{
        transform: scale(1.5);
        z-index: 9999;
    }
    100%{
        transform: scale(1);
        z-index: 99;
    }
`

const Cap = styled.div.attrs((props:any) => ({
    frontImage: props.frontImage,
    rare: props.rare,
    isOpenedMenu: props.isOpenedMenu
}))`
    background-image: url(${(props:any) => props.frontImage});
    background-position: center;
    background-size: cover;
    
    width: 70%;
    height: 70%;

    border-radius: 50%;
    border: solid 0px ${
    (props: any) =>
        props.rare === 'Common' ? '#cfd3d4'
            : props.rare === 'Uncommon' ? '#27ae61'
                : props.rare === 'Rare' ? '#297fb8'
                    : props.rare === 'Epic' ? '#8E44AD'
                        : props.rare === 'Mythical' ? '#cf4137'
                            : '#f09d13'
    };
    box-shadow: 0 0 5px rgba(0,0,0,0.5);

    animation: ${props => props.isOpenedMenu ? capAnimIn : capAnimOut} 0.3s ease;
    animation-fill-mode: forwards;

    transition: 1s;

`

const Block = styled.div.attrs((props:any) => ({
    isOpenedMenu: props.isOpenedMenu
}))`
    width: 10rem;
    height: 10rem;

    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);

    padding: .5rem;
    margin: 1rem;

    position: relative;

    display: flex;
    justify-content: center;

    transition: 0.2s;

    cursor: pointer;

    &:hover {
        transform: ${(props:any) => !(props.isOpenedMenu) && 'scale(0.9);'}
    }

`

const BlockText = styled.div.attrs((props:any) => ({
    rare: props.rare,
    isOpenedMenu: props.isOpenedMenu
}))`
    width: 100%;
    height: 2.5rem;
    background: ${
    (props: any) =>
        props.rare === 'Common' ? '#cfd3d4'
            : props.rare === 'Uncommon' ? '#27ae61'
                : props.rare === 'Rare' ? '#297fb8'
                    : props.rare === 'Epic' ? '#8E44AD'
                        : props.rare === 'Mythical' ? '#cf4137'
                            : '#f09d13'
    };

    border-radius: 0 0 5px 5px;

    position: absolute;
    bottom: 0;
    left: 0;

    visibility: ${(props:any) => props.isOpenedMenu ? 'hidden' : 'visible'}; 

    color: white;
    text-shadow: 0 0 5px rgba(0,0,0,.3);
    padding: 0.3rem;
    line-height: 1;
    
`

const blockInfoAnimIn = keyframes`
    0%{
        top: 12rem;
        opacity: 0;
        visible: hidden;
    }
    100%{
        top: 10rem;
        opacity: 1;
        visible: visible;
    }
`

const BlockInner = styled.div.attrs((props:any) => ({
    isOpenedMenu: props.isOpenedMenu
}))`
    width: 15rem;
    height: 25rem;
    
    z-index: 999;

    position: absolute;
    top: 10rem;

    display: flex;
    flex-direction: column;

    animation: ${(props:any) => props.isOpenedMenu ? blockInfoAnimIn : 'none'} 1s ease;
    animation-fill-mode: forwards;

`

const bgFiltersAnimIn = keyframes`
    0%{
        backdrop-filter: blur(0);
        filter: brightness(100%);
        visibility: hidden;
    }
    100%{
        backdrop-filter: blur(15px);
        filter: brightness(70%);
        visibility: visible;
    }
`

const BlockInfoBackground = s.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;

    z-index: 999;

    position: fixed;
    top:0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    backdrop-filter: blur(0);
    filter: brightness(100%);
    visibility: hidden;

    animation: ${bgFiltersAnimIn} 0.3s ease;
    animation-fill-mode: forwards;

    
`

const NameBlock = styled.div.attrs((props:any) => ({
    rare: props.rare,
}))`
    width: 100%;
    min-height: 4rem;
    background: ${
    (props: any) =>
        props.rare === 'Common' ? '#cfd3d4'
            : props.rare === 'Uncommon' ? '#27ae61'
                : props.rare === 'Rare' ? '#297fb8'
                    : props.rare === 'Epic' ? '#8E44AD'
                        : props.rare === 'Mythical' ? '#cf4137'
                            : '#f09d13'
    };

    padding: 0.6rem;

    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);

    color: white;
    text-shadow: 0 0 5px rgba(0,0,0,0.4);
`

const ButtonsBlock = s.div`
    width: 100%;
    min-height: 2rem;
    background: white;

    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);

    overflow: hidden;

    margin-top: 1rem;

    display: flex;
    flex-direction: column;

`

const CapButton = s.button`
    width: 100%;
    min-height: 2rem;
    background: white;

    border: none;

    padding: 0.6rem;

    text-align: left;
    color: #666;

    transition: 0.2s;

    &:hover{
        background: #E5E7E9;
    }

`
const BlockInfo = s.div`
    width: 100%;
    margin-top: 1rem;
    padding: 0.6rem;
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    color: #666;
`

interface ICapProps {
    id: string;
    name: string;
    bundle: string;
    frontImage: string;
    cost: number;
    points: number;
    rare: string;
    uid: string;
    date: number;
    openModal: (uid: string, id: string, cost: number) => void;
}
//обычный, необычный, редкий, эпический, мифический, легендарный,
//common, uncommon, rare, epic, mythical, legendary

function CapBlock({ id, name, frontImage, cost, points, rare, bundle, uid, date, openModal }: ICapProps) {

    const [isOpenedMenu, setOpenedMenu] = useState(false);
    
    const dispatch = useDispatch();
    
    const stringDate = new Date(date).toLocaleString();
    let stringRare = '';
    switch (rare) {
        case 'Common':
            stringRare = 'Обычный';
            break;
        case 'Uncommon':
            stringRare = 'Необычный';
            break;
        case 'Rare':
            stringRare = 'Редкий';
            break;
        case 'Epic':
            stringRare = 'Эпический';
            break;
        case 'Mythical':
            stringRare = 'Мифический';
            break;
        case 'Legendary':
            stringRare = 'Легендарный';
            break;
        default:
            break;
    }

    return (
        <>
        {isOpenedMenu && <BlockInfoBackground onClick={() => setOpenedMenu(false)} />}
       
        <Block isOpenedMenu={isOpenedMenu} onClick={() => setOpenedMenu(true)}>
            {
                isOpenedMenu
                    && <BlockInner isOpenedMenu={isOpenedMenu}>
                        <NameBlock rare={rare}>
                            <Typography>
                                «{name}»
                            </Typography>
                            <Typography sx={{ fontSize: '12px', color: '#E5E7E9' }}>
                                Фишка коллекции «{bundle}»
                            </Typography>
                        </NameBlock>
                        <BlockInfo>
                            <Typography sx={{ fontSize: '14px' }}>
                                Редкость: {stringRare}
                            </Typography>
                            <Typography sx={{ fontSize: '14px' }}>
                                Сила: {points}
                            </Typography>
                            <Typography sx={{ fontSize: '14px' }}>
                                Фишка получена: {stringDate}
                            </Typography>
                        </BlockInfo>
                        <ButtonsBlock>
                            <CapButton>Обменять</CapButton>
                            <Divider />
                            <CapButton onClick={() => openModal(uid, id, cost)}>Продать за
                                <Typography component="span" sx={{ fontWeight: '600', fontSize: 'inherit', lineHeight: '0' }}>
                                    {' ' + cost}c
                                </Typography>
                            </CapButton>
                            <Divider />
                            <CapButton>Выставить на аукцион</CapButton>
                        </ButtonsBlock>
                    </BlockInner>
                }

                <Cap frontImage={frontImage} rare={rare} isOpenedMenu={isOpenedMenu} />
                <BlockText rare={rare} isOpenedMenu={isOpenedMenu}> {name} </BlockText>
            </Block>
        </>
        
        

    );
}

export default CapBlock;