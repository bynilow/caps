import { Box, Typography } from '@mui/material';
import s from 'styled-components';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IInvItem, IOpeningBundleModal } from '../../../types/invItemTypes';
import Loader from '../../common/Loader';
import EmptyItemBlock from '../../Main/Caps/EmptyItemBlock';
import ItemBlockOpening from '../../Main/Caps/ItemBlockOpening';


const BlockInfo = s.div`
    position: fixed;

    width: 100%;
    height: 100%;
    padding-top: 2rem;

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
}

function OpeningListItems({ id, uid, image, name, rare, bundle, itemsInBundle, onClickOpenBundle }: IOpeningBundleModal & IOpeningListItems) {

    const { isLoading } = useTypedSelector(state => state.inventory);    

    return (
        <BlockInfo>
            <Container>
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
                    <EmptyItemBlock />
                    <EmptyItemBlock />
                    <EmptyItemBlock />
                    <EmptyItemBlock />
                    <EmptyItemBlock />

                </ListCaps>
            </Container>

        </BlockInfo>
    );
}

export default OpeningListItems;