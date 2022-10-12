import { Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import s from 'styled-components'
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { sellItem, sellSomeItems } from '../../../store/action-creators/inventoryAC';
import { IInvItem, IInvItemToSell } from '../../../types/invItemTypes';
import Loader from '../../common/Loader';
import SellingEndMessage from './SellingEndMessage';
import SellingOneItem from './SellingOneItem';
import SellingSomeItems from './SellingSomeItems';


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

interface ISellingCapsModalProps {
    uid: string;
    id: string;
    cost: number;
    isSomeSelling: boolean;
    itemsToSelling: IInvItemToSell[];
    setSellingItems: () => void;
    closeModal: () => void;
}

function SellingItemsModal({uid, id, cost, isSomeSelling, itemsToSelling, setSellingItems, closeModal}:ISellingCapsModalProps) {

    const dispatch = useDispatch();

    const {isLoading} = useTypedSelector(state => state.user)
    const {error} = useTypedSelector(state => state.inventory)

    const [isSelled, setIsSelled] = useState(false);

    const sell = () => {
        setIsSelled(true);
        if(isSomeSelling) {
            dispatch<any>(sellSomeItems(itemsToSelling, uid));
            setSellingItems();
        }
        else{
            dispatch<any>(sellItem(id, uid, cost));
        }
    }

    const costSomeCaps = itemsToSelling.reduce((sum,c) => sum + c.cost, 0);

    return ( 
        <>
            <Modal onClick={closeModal} />
            <BlockInfo>
                {
                    isSelled
                        ? isLoading
                            ? <Loader />
                            : <SellingEndMessage
                                text={error || 'Успешно продано!'}
                                closeModal={closeModal} />
                        : isSomeSelling
                            ? <SellingSomeItems
                                cost={costSomeCaps}
                                items={itemsToSelling}
                                sell={sell}
                                closeModal={closeModal} />
                            : <SellingOneItem
                                cost={cost}
                                sell={sell}
                                closeModal={closeModal} />
                }
            </BlockInfo>

        </>

    );
}

export default SellingItemsModal;