import { Button, ButtonGroup, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import s, { keyframes } from 'styled-components'
import { sellCap } from '../../../store/action-creators/user';

interface ICapProps {
    id: string;
    name: string;
    bundle: string;
    frontImage: string;
    backImage: string;
    cost: number;
    points: number;
    rare: string;
    uid: string;
}
//обычный, необычный, редкий, эпический, мифический, легендарный,
//common, uncommon, rare, epic, mythical, legendary
function CapBlock({ id, name, frontImage, backImage, cost, points, rare, bundle, uid }: ICapProps) {

    const [isOpenedMenu, setOpenedMenu] = useState(false)
    
    const dispatch = useDispatch();

    const sell = () => {
        dispatch<any>(sellCap(id, uid, cost))
    }

    ////////////////////
    
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

    const Cap = s.div`
        background-image: url(${frontImage});
        background-position: center;
        background-size: cover;
        
        width: 70%;
        height: 70%;

        border-radius: 50%;
        border: solid 0px ${
            rare === 'Common' ? 'white'
            : rare === 'Uncommon' ? 'green'
            : rare === 'Rare' ? 'Blue'
            : rare === 'Epic' ? 'Purple'
            : rare === 'Mythical' ? 'Violet'
            : 'Orange'
        };
        box-shadow: 0 0 5px rgba(0,0,0,0.5);

        animation: ${isOpenedMenu ? capAnimIn : capAnimOut} 0.3s ease;
        animation-fill-mode: forwards;

        transition: 1s;

    `

    const Block = s.div`
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
            transform: ${!isOpenedMenu && 'scale(0.9);'}
        }

    `

    const BlockText = s.div`
        width: 100%;
        height: 2.5rem;
        background: ${
            rare === 'Common' ? '#D0D3D4'
            : rare === 'Uncommon' ? '#27AE60'
            : rare === 'Rare' ? '#2980B9'
            : rare === 'Epic' ? '#8E44AD'
            : rare === 'Mythical' ? '#CB4335'
            : '#F39C12'
        };

        border-radius: 0 0 5px 5px;

        position: absolute;
        bottom: 0;
        left: 0;

        visibility: ${isOpenedMenu ? 'hidden' : 'visible'}; 

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

    const BlockInfo = s.div`
        width: 15rem;
        height: 25rem;
        
        z-index: 999;

        position: absolute;
        top: 10rem;

        display: flex;
        flex-direction: column;

        animation: ${isOpenedMenu ? blockInfoAnimIn : 'none'} 1s ease;
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

    const bgFiltersAnimOut = keyframes`
        0%{
            backdrop-filter: blur(15px);
            filter: brightness(70%);
            visibility: visible;
        }
        100%{
            backdrop-filter: blur(0);
            filter: brightness(100%);
            visibility: hidden;
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

        
        visibility: hidden;

        animation: ${isOpenedMenu ? bgFiltersAnimIn : bgFiltersAnimOut} 0.3s ease;
        animation-fill-mode: forwards;

        
    `

    const NameBlock = s.div`
        width: 100%;
        min-height: 4rem;
        background: ${
            rare === 'Common' ? '#BDC3C7'
            : rare === 'Uncommon' ? '#27AE60'
            : rare === 'Rare' ? '#2980B9'
            : rare === 'Epic' ? '#8E44AD'
            : rare === 'Mythical' ? '#CB4335'
            : '#F39C12'
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

    const ButtonMenu = s.button`
        width: 100%;
        min-height: 2rem;
        background: white;

        border: none;

        padding: 0.6rem;

        text-align: left;
        color: #666;

        transition: 0.2s;

        &: hover{
            background: #E5E7E9;
        }


    `

    
    return (
        <>
        {<BlockInfoBackground onClick={() => setOpenedMenu(false)} />}

        <Block onClick={() => setOpenedMenu(true)}>
            {
                isOpenedMenu
                && <BlockInfo>
                    <NameBlock>
                        <Typography>
                            «{name}»
                        </Typography>
                        <Typography sx={{fontSize: '12px', color: '#E5E7E9'}}>
                            Фишка коллекции «{bundle}»
                        </Typography>
                    </NameBlock>
                    <ButtonsBlock>
                        <ButtonMenu>Обменять</ButtonMenu>
                        <Divider />
                        <ButtonMenu onClick={sell}>Продать за 
                            <Typography component="span" sx={{fontWeight: '600', fontSize: 'inherit', lineHeight: '0'}}>
                                {' '+cost}c
                            </Typography>
                        </ButtonMenu>
                        <Divider />
                        <ButtonMenu>Выставить на аукцион</ButtonMenu>
                    </ButtonsBlock>
                </BlockInfo>
            }
            
            <Cap />
            <BlockText> {name} </BlockText>
        </Block>
        </>
        
        

    );
}

export default CapBlock;