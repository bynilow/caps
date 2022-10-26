import { Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import s from 'styled-components'
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { sellItem, sellSomeItems } from '../../../store/action-creators/inventoryAC';
import { buyItemAC } from '../../../store/action-creators/shopAC';
import { IInvItem, IInvItemToSell, IIsBuying } from '../../../types/invItemTypes';
import Loader from '../../common/Loader';
import BuyingEndMessage from './BuyingEndMessage';
import BuyingItemMessage from './BuyingItemMessage';


const Modal = s.div`
    width: 100vw;
    height: 100vh;
    
    position: fixed;
    top: 0;
    left: 0;

    z-index: 99999;

    backdrop-filter: blur(15px);

    display: flex;
    justify-content: center;
    align-items: center;
`

const BlockInfo = s.div`
    width: 25rem;
    min-height: 15%;

    padding: 1rem;
        
    background: white;

    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2); 

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    z-index: 999999;

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

interface IBuyingItemModalProps {
    closeModal: () => void;
    rare: string;
}

function BuyingItemModal({uid, bundleId, bundleName, image, name, rare, price, closeModal}:IIsBuying & IBuyingItemModalProps) {

    const dispatch = useAppDispatch();

    const {isLoading} = useTypedSelector(state => state.shop)
    const {error} = useTypedSelector(state => state.shop)

    console.log(bundleId, bundleName)

    const [isBought, setIsBought] = useState(false);

    const buyItem = async() => {
        console.log(bundleName, bundleName)
        await dispatch(buyItemAC(uid, bundleName, bundleId));
        setIsBought(true);
    }

    return ( 
        <>
            <Modal onClick={closeModal} />
            <BlockInfo>
                {
                    isBought
                        ? isLoading
                            ? <Loader />
                            : <BuyingEndMessage
                                text={error || 'Успешно купленно!'}
                                closeModal={closeModal} />
                        : <BuyingItemMessage
                            price={price}
                            id={bundleId}
                            image={image}
                            name={name}
                            rare={rare}
                            isLoading={isLoading}
                            buyItem={buyItem}
                            closeModal={closeModal} />
                }
            </BlockInfo>

        </>

    );
}

export default BuyingItemModal;