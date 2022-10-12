import { Box, Typography } from '@mui/material';
import s from 'styled-components';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IInvItem, IOpeningBundleModal } from '../../../types/invItemTypes';
import EmptyItemBlock from '../../Main/Caps/EmptyItemBlock';
import ItemBlockOpening from '../../Main/Caps/ItemBlockOpening';


const BlockInfo = s.div`
    position: fixed;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
`

const ListCaps = s.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`

const Container = s.div`
    max-width: 65%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonClose = s.button`
    background: #2E86C1;
    border: none;
    border-radius: 5px;

    padding: 0.7rem;

    transition: 0.1s;

    font-size: 14px;
    color: white;

    &:hover{
        background: #2874A6;
    }
`

interface IOpeningRecievedItems {
    caps: IInvItem[];
    closeModal: () => void;
}

function OpeningRecievedItems({caps, closeModal}: IOpeningRecievedItems) {
    
    return (
        <BlockInfo>
            <Container>
                <Typography sx={{color: 'white', fontSize: '2rem'}}>
                    Поздравляем!
                </Typography>
                <Typography sx={{color: 'white', fontSize: '1rem'}}>
                    Вы получили эти предметы:
                </Typography>
                <ListCaps>
                    {
                        caps
                            ? caps.map((c, ind) => <ItemBlockOpening
                                key={c.id}
                                id={c.id}
                                image={c.image}
                                name={c.name}
                                rare={c.rare}
                                received={true}
                                capReceivedPosition={ind}
                                type="cap" /> )
                            : <></>
                    }
                </ListCaps>
                <ButtonClose onClick={closeModal}>
                    Закрыть
                </ButtonClose>
            </Container>
        </BlockInfo>
    );
}

export default OpeningRecievedItems;