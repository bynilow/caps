import { Box, IconButton, Typography } from '@mui/material';
import s from 'styled-components';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IInvItem, IOpeningBundleModal } from '../../../types/invItemTypes';
import Loader from '../../common/Loader';
import EmptyItemBlock from '../../Main/Caps/EmptyItemBlock';
import ItemBlockOpening from '../../Main/Caps/ItemBlockOpening';
import CloseIcon from '@mui/icons-material/Close';


const BlockInfo = s.div`
    position: fixed;

    width: 65%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
`

const ListCaps = s.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-height: 20%;
`

const Container = s.div`
    max-width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonOpen = s.button`
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

interface IOpeningListItems {
    itemsInBundle: IInvItem[] | null;
    onClickOpenBundle: () => void;
    closeModal: () => void;
}

function OpeningListItems({ 
    id, uid, image, name, rare, bundle, itemsInBundle, 
    onClickOpenBundle, closeModal }: IOpeningBundleModal & IOpeningListItems) {

    const { isLoading } = useTypedSelector(state => state.inventory);    

    return (
        <BlockInfo>
            <Container>
                <IconButton 
                    sx={{position: 'absolute', top: '0', right: '0', padding: '1rem', color: 'white'}}
                    onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
                <ItemBlockOpening
                    id={id}
                    image={image}
                    name={name}
                    rare={rare}
                    type="bundle"
                    uid={uid} />
                <ButtonOpen onClick={onClickOpenBundle}>
                    {
                        isLoading
                            ? <Loader color="white" size={1} />
                            : 'Открыть'
                    }
                </ButtonOpen>
                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ color: 'white', fontSize: '1.3rem', marginLeft: '1rem' }}>
                        Содержимое этого набора:
                    </Typography>
                </Box>

                <ListCaps>
                    {
                        itemsInBundle
                            ? itemsInBundle.map(c => <ItemBlockOpening
                                key={c.id}
                                id={c.id}
                                image={c.image}
                                name={c.name}
                                rare={c.rare}
                                type="cap"
                                uid={uid} />)
                            : isLoading
                                ? <Box sx={{
                                    width: '100%', 
                                    height: '100%', 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'center'}}>
                                    <Loader />
                                </Box>
                                : <></>
                    }
                    <EmptyItemBlock size='small'/>
                    <EmptyItemBlock size='small'/>
                    <EmptyItemBlock size='small'/>
                    <EmptyItemBlock size='small'/>
                    <EmptyItemBlock size='small'/>


                </ListCaps>
            </Container>

        </BlockInfo>
    );
}

export default OpeningListItems;