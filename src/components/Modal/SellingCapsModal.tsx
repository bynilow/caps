import { Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import s from 'styled-components'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { sellCap, sellSomeCaps } from '../../store/action-creators/capsAC';
import { ICap, ICapToSell } from '../../types/capsTypes';
import Loader from '../common/Loader';
import SellingEndMessage from './SellingEndMessage';
import SellingOneCap from './SellingOneCap';
import SellingSomeCaps from './SellingSomeCaps';


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
    min-height: 10rem;

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
    top: 0%;
    transform: translate(-50%, 50%);
`

interface ISellingCapsModalProps {
    uid: string;
    id: string;
    cost: number;
    isSomeSelling: boolean;
    capsToSelling: ICapToSell[];
    closeModal: () => void;
}

function SellingCapsModal({uid, id, cost, isSomeSelling, capsToSelling, closeModal}:ISellingCapsModalProps) {

    const dispatch = useDispatch();

    const {isLoading} = useTypedSelector(state => state.user)
    const {error} = useTypedSelector(state => state.caps)

    const [isSelled, setIsSelled] = useState(false);

    const sell = () => {
        setIsSelled(true);
        if(isSomeSelling) {
            dispatch<any>(sellSomeCaps(capsToSelling, uid));
        }
        else{
            dispatch<any>(sellCap(id, uid, cost));
        }
    }

    const costSomeCaps = capsToSelling.reduce((sum,c) => sum + c.cost, 0);

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
                            ? <SellingSomeCaps
                                cost={costSomeCaps}
                                caps={capsToSelling}
                                sell={sell}
                                closeModal={closeModal} />
                            : <SellingOneCap
                                cost={cost}
                                sell={sell}
                                closeModal={closeModal} />
                }
            </BlockInfo>

        </>

    );
}

export default SellingCapsModal;