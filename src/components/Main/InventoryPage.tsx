import { Box, Button, Checkbox, Divider, FormControlLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import s from 'styled-components';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterItems, findItems, getMyItems, sortItems } from "../../store/action-creators/inventoryAC";
import { IInvItem, IInvItemToSell, IOpeningBundleModal } from "../../types/invItemTypes";
import { FILTER_ALL_ITEMS, FILTER_ONLY_BUNDLES, FILTER_ONLY_CAPS, SORT_BY_BUNDLE, SORT_BY_NAME, SORT_CHEAP_FIRST, SORT_COMMON_FIRST, SORT_EXPENSIVE_FIRST, SORT_NEW_FIRST, SORT_OLD_FIRST, SORT_RARE_FIRST } from "../../utils/consts";
import Loader from "../common/Loader";
import SellingItemModal from "../Modal/SellingModal/SellingItemModal";
import ItemBlock from "./Caps/ItemBlock";
import EmptyItemBlock from "./Caps/EmptyItemBlock";
import OpeningBundleModal from "../Modal/OpeningBundle/OpeningBundleModal";


function getRandomInt(max: number) {
    return Math.floor(1 + Math.random() * max);
}

const Container = s.div`
    width: 70%;
    min-height: '100vh';
    height: 100%;
    margin: auto;
`

const ButtonSelling = styled.button.attrs((props:any) => ({
    isSelling: props.isSelling,
    isEnable: props.isEnable
}))`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px;
    padding: 0.6rem;
    color: white;
    background: ${(props: any) =>
        props.isEnable
            ? props.isSelling
                ? '#28B463'
                : '#CB4335'
            : '#797D7F'};
    margin-left: ${(props:any) => (props.isSelling) ? '0.5rem' : '0'};
    line-height: 0;

    transition: 0.1s;

    &:hover{
        filter: brightness(90%);
    }
`

const InputTextFind = styled.input.attrs((props:any) => ({
    type: 'text'
}))`
    width: 60%;

    margin-right: 1rem;
    padding: 0.5rem;

    border: 1px solid gray;
    border-radius: 5px;

    &:focus{
        outline: 1px solid blue;
        border: 1px solid blue;
    }
`

function InventoryPage() {
    const {displayName, uid } = useTypedSelector<any>(state => state.user['user']);
    const {items, sortedFilteredItems, isLoading} = useTypedSelector<any>(state => state.inventory);

    const dispatch = useDispatch();

    const db = getFirestore();

    interface ISellingModal {
        uid: string;
        id: string;
        cost: number;
    }
    const [isSellingMenuOpened, setIsSellingMenuOpened] = useState<boolean>(false);
    
    const [isSellingOne, setSellingOne] = useState<ISellingModal>({uid: '-1', id: '-1', cost: -1});

    const [sellingItems, setSellingItems] = useState<IInvItemToSell[]>([]);
    const [isSellingSomeMode, setIsSellingSomeMode] = useState<boolean>(false);

    const [isCommonSelected, setIsCommonSelected] = useState<boolean>(false);
    const [isUncommonSelected, setIsUncommonSelected] = useState<boolean>(false);
    const [isRareSelected, setIsRareSelected] = useState<boolean>(false);
    const [isEpicSelected, setIsEpicSelected] = useState<boolean>(false);
    const [isMythicalSelected, setIsMythicalSelected] = useState<boolean>(false);
    const [isLegendarySelected, setIsLegendarySelected] = useState<boolean>(false);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const [isCapsSelected, setIsCapsSelected] = useState<boolean>(true);
    const [isBundlesSelected, setIsBundlesSelected] = useState<boolean>(false);

    const [filter, setFilter] = useState(FILTER_ALL_ITEMS);
    const [sorting, setSorting] = useState(SORT_NEW_FIRST);

    const [findText, setFindText] = useState('');

    const [isOpeningBundle, setOpeningBundle] = useState<IOpeningBundleModal>({
        openedModal: false,
        id: '',
        image: '',
        name: '',
        rare: '',
        uid: '',
        bundle: ''
    });

    // const getAllCaps = async() => {
    //     const querySnapshot = await getDocs(collection(db, "caps_shrek_1"));
    //     let arr:any[] = [];
    //     querySnapshot.forEach(doc => {
    //         arr.push(doc.data());
    //     })
    // }

    // const getCaps = () => {
        
    // }
    
    const addItemToUser = async(isBundle: boolean) => {
        const capRef = await doc(db, "caps_pokemon_1", `${isBundle ? `b_pokemon_1` : `c_pokemon_${getRandomInt(12)}`}`);
        const capSnap = await getDoc(capRef);

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        const timestamp = await Date.parse(Timestamp.now().toDate().toISOString());

        if (docSnap.data()?.items) {
            let myCaps = docSnap.data()?.items;
            myCaps.push({
                ...capSnap.data(),
                date: timestamp,
                id: capSnap.data()?.id + `_${Date.now()}`
            });
            const updatedRes = await updateDoc(doc(db, "users", uid), {
                items: myCaps
            })
        }
        else {
            let myCaps = {
                ...capSnap.data(),
                date: timestamp,
                id: capSnap.data()?.id + `_${Date.now()}`
            };
            await setDoc(doc(db, "users", uid), {
                items: [myCaps]
            })
        }
    }
    

    useEffect(() => {
        console.log(uid)
        uid && dispatch<any>(getMyItems(uid));
    }, [uid])

    const addCap = async() => {
        await setDoc(doc(db,"caps_pokemon_1","b_pokemon_1"),{
            id: "b_pokemon_1",
            name: "Набор Покемоны",
            bundle: "caps_pokemon_1",
            image: "https://ns-on.ru/wp-content/uploads/2019/11/065e5e9239f7d492dc3d64e57e84d6ed.jpg",
            cost: 1435,
            price: 1100,
            // points: 4300,
            rare: "Common",
            type: "bundle"
        })
        /// 16, 33, 108, 309, 733, 1505
        /// 48, 99, 324, 927, 2199, 4515
    }

    // addCap()

    const openModalOpeningBundle = ({id, image, name, rare, uid, bundle}: IOpeningBundleModal) => {
        setOpeningBundle({openedModal: true, id, uid, image, name, rare, bundle});
    }

    const closeModalOpeningBundle = () => {
        setOpeningBundle({openedModal: false, id: '', uid: '', image: '', name: '', rare: '', bundle: ''})
    }

    const openModalSelling = (uid: string, id: string, cost: number) => {
        setSellingOne({id, uid, cost});
        setIsSellingMenuOpened(true);
    }

    const closeModalSelling = () => {
        setSellingOne({id: '', uid: '', cost: -1})
        setIsSellingMenuOpened(false);
    }

    const onFilterChange = (e: SelectChangeEvent) => { /////////при сортировке или фильтрации не учитывается
        dispatch<any>(filterItems(items, e.target.value));
        setFilter(e.target.value);
        setSorting(SORT_NEW_FIRST);
        setFindText('');
    }

    const onSortingChange = (e: SelectChangeEvent) => {
        dispatch<any>(sortItems(items, e.target.value));
        setSorting(e.target.value)
    }


    const addItemToSelling = (cap: IInvItemToSell) => {
        let newCaps = JSON.parse(JSON.stringify(sellingItems));
        newCaps.push(cap);
        console.log(newCaps);
        setSellingItems(newCaps);
    }

    const removeItemToSelling = (idCap: string) => {
        let newCaps = sellingItems.filter(c => c.id !== idCap);
        console.log(newCaps);
        setSellingItems(newCaps);
    }

    const cancelSomeSelling = () => {
        setSellingItems([]);
        setIsSellingSomeMode(false);

        setIsAllSelected(false);
        setIsCommonSelected(false);
        setIsUncommonSelected(false);
        setIsRareSelected(false);
        setIsEpicSelected(false);
        setIsMythicalSelected(false);
        setIsLegendarySelected(false);
        setIsCapsSelected(true);
        setIsBundlesSelected(false);

    }

    const onFindTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFindText(e.target.value);
    }

    const onFindTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13) dispatch<any>(findItems(findText, items))
    }

    const changeSomeSelection = (rare: string, isSelected: boolean) => {
        if (isSelected) {
            console.log(isBundlesSelected)
            let newItems = JSON.parse(JSON.stringify(sellingItems))
                .concat(items.filter((i: IInvItem) =>
                    i.rare === rare &&
                    !(sellingItems.find(ii => ii.id === i.id)) &&
                    (isBundlesSelected ? true : i.type !== 'bundle') && 
                    (isCapsSelected ? true : i.type !== 'caps')));
            setSellingItems(newItems);
        }
        else {
            let newItems = JSON.parse(JSON.stringify(sellingItems)).filter((i: IInvItem) => i.rare !== rare);
            setSellingItems(newItems);
        } 
    }

    const onClickCheckboxSelectRare = (rare: string) => {
        switch (rare) {
            case 'Common':
                setIsCommonSelected(!isCommonSelected);
                setIsAllSelected(
                    !isCommonSelected && 
                    isUncommonSelected && 
                    isRareSelected && 
                    isEpicSelected && 
                    isMythicalSelected && 
                    isLegendarySelected);
                changeSomeSelection('Common', !isCommonSelected);
                break;
                
            case 'Uncommon':
                setIsUncommonSelected(!isUncommonSelected);
                setIsAllSelected(
                    isCommonSelected && 
                    !isUncommonSelected && 
                    isRareSelected && 
                    isEpicSelected && 
                    isMythicalSelected && 
                    isLegendarySelected);
                changeSomeSelection('Uncommon', !isUncommonSelected);
                break;
            case 'Rare':
                setIsRareSelected(!isRareSelected);
                setIsAllSelected(
                    isCommonSelected && 
                    isUncommonSelected && 
                    !isRareSelected && 
                    isEpicSelected && 
                    isMythicalSelected && 
                    isLegendarySelected);
                changeSomeSelection('Rare', !isRareSelected);
                break;
            case 'Epic':
                setIsEpicSelected(!isEpicSelected);
                setIsAllSelected(
                    isCommonSelected && 
                    isUncommonSelected && 
                    isRareSelected && 
                    !isEpicSelected && 
                    isMythicalSelected && 
                    isLegendarySelected);
                changeSomeSelection('Epic', !isEpicSelected);
                break;
            case 'Mythical':
                setIsMythicalSelected(!isMythicalSelected);
                setIsAllSelected(
                    isCommonSelected && 
                    isUncommonSelected && 
                    isRareSelected && 
                    isEpicSelected && 
                    !isMythicalSelected && 
                    isLegendarySelected);
                changeSomeSelection('Mythical', !isMythicalSelected);
                break;
            case 'Legendary':
                setIsLegendarySelected(!isLegendarySelected);
                setIsAllSelected(
                    isCommonSelected && 
                    isUncommonSelected && 
                    isRareSelected && 
                    isEpicSelected && 
                    isMythicalSelected && 
                    !isLegendarySelected);
                changeSomeSelection('Legendary', !isLegendarySelected);
                break;
            case 'All':
                setIsAllSelected(!isAllSelected);
                setIsCommonSelected(!isAllSelected);
                setIsUncommonSelected(!isAllSelected);
                setIsRareSelected(!isAllSelected);
                setIsEpicSelected(!isAllSelected);
                setIsMythicalSelected(!isAllSelected);
                setIsLegendarySelected(!isAllSelected);
                setSellingItems(!isAllSelected
                    ? items.filter((i: IInvItem) =>
                        (isBundlesSelected ? true : i.type !== 'bundle') &&
                        (isCapsSelected ? true : i.type !== 'caps'))
                    : []);
                break;
            case 'Caps':
                setIsCapsSelected(!isCapsSelected);
                setIsAllSelected(false);
                setIsCommonSelected(false);
                setIsUncommonSelected(false);
                setIsRareSelected(false);
                setIsEpicSelected(false);
                setIsMythicalSelected(false);
                setIsLegendarySelected(false);
                setSellingItems([]);
                break;
            case 'Bundles':
                setIsBundlesSelected(!isBundlesSelected);
                setIsAllSelected(false);
                setIsCommonSelected(false);
                setIsUncommonSelected(false);
                setIsRareSelected(false);
                setIsEpicSelected(false);
                setIsMythicalSelected(false);
                setIsLegendarySelected(false);
                setSellingItems([]);
                break;
            default:
                break;
        }
    }

    return ( 
        <Box sx={{
            background: '#f4f4f5',
            minHeight: '100vh'
        }}>
            {
                isSellingMenuOpened 
                ? <SellingItemModal
                    cost={isSellingOne.cost}
                    uid={uid}
                    id={isSellingOne.id}
                    isSomeSelling={isSellingSomeMode}
                    itemsToSelling={sellingItems}
                    setSellingItems={() => setSellingItems([])}
                    closeModal={closeModalSelling} />
                : <></>
            }
            {
                isOpeningBundle.openedModal
                    ? <OpeningBundleModal
                        id={isOpeningBundle.id}
                        uid={uid}
                        image={isOpeningBundle.image}
                        name={isOpeningBundle.name}
                        rare={isOpeningBundle.rare}
                        bundle={isOpeningBundle.bundle}
                        closeModal={closeModalOpeningBundle} />
                    : <></>
            }
            <Container>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography sx={{ 
                        fontSize: '2rem', 
                        color: '#666', 
                        padding: '10px 0',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center' }}>
                        Инвентарь 
                        <Typography component="span" sx={{ fontSize: '1rem', marginLeft: '1rem' }}>
                            {items ? items.length : 0} / 100
                        </Typography>
                    </Typography>
                    <Button variant='contained' size='small'>
                        Добавить места +50
                    </Button>
                    <Button onClick={() => addItemToUser(false)}>
                        +Фишка
                    </Button>
                    <Button onClick={() => addItemToUser(true)}>
                        +Набор
                    </Button>
                </Box>
                <Box sx={{margin: 'auto', display: 'flex', justifyContent: 'space-between', height: '2rem' }}>
                    <InputTextFind 
                        value={findText}
                        onChange={onFindTextChanged}
                        onKeyDown={onFindTextKeyDown} />
                    <Select
                        size="small"
                        value={filter}
                        sx={{background: 'white',width: '20%',marginRight: '10px' }}
                        onChange={onFilterChange} >
                        <MenuItem value={FILTER_ALL_ITEMS} sx={{fontSize: '14px'}}>
                            Все предметы
                        </MenuItem>
                        <MenuItem value={FILTER_ONLY_CAPS} sx={{fontSize: '14px'}}>
                            Фишки
                        </MenuItem>
                        <MenuItem value={FILTER_ONLY_BUNDLES} sx={{fontSize: '14px'}}>
                            Наборы
                        </MenuItem>
                    </Select>
                    <Select 
                    value={sorting} 
                    sx={{ background: 'white', width: '20%' }} 
                    size="small"
                    onChange={onSortingChange}>
                        <MenuItem value={SORT_NEW_FIRST} sx={{ fontSize: '14px' }}>
                            Сначала новые
                        </MenuItem>
                        <MenuItem value={SORT_OLD_FIRST} sx={{ fontSize: '14px' }}>
                            Сначала старые
                        </MenuItem>
                        <Divider />
                        <MenuItem value={SORT_BY_NAME} sx={{fontSize: '14px'}}>
                            По названию
                        </MenuItem>
                        <Divider />
                        <MenuItem value={SORT_BY_BUNDLE} sx={{fontSize: '14px'}}>
                            По коллекции
                        </MenuItem>
                        <Divider />
                        <MenuItem value={SORT_COMMON_FIRST} sx={{fontSize: '14px'}}>
                            Сначала обычные
                        </MenuItem>
                        <MenuItem value={SORT_RARE_FIRST} sx={{ fontSize: '14px' }}>
                            Сначала редкие
                        </MenuItem>
                        <Divider />
                        <MenuItem value={SORT_EXPENSIVE_FIRST} sx={{ fontSize: '14px' }}>
                            Сначала дорогие
                        </MenuItem>
                        <MenuItem value={SORT_CHEAP_FIRST} sx={{ fontSize: '14px' }}>
                            Сначала дешевые
                        </MenuItem>
                    </Select>
                    <Box sx={{ minWidth: '15%', marginLeft: '1rem' }}>
                        {
                            isSellingSomeMode
                                ? <Box sx={{display: 'flex', height: '100%', justifyContent: 'space-between'}}>
                                    <ButtonSelling
                                        isSelling={false}
                                        onClick={() => setIsSellingMenuOpened(true)}
                                        disabled={!(sellingItems.length)}
                                        isEnable={sellingItems.length}>
                                        Продать
                                    </ButtonSelling>
                                    <ButtonSelling
                                        isSelling={true}
                                        onClick={cancelSomeSelling}
                                        isEnable={true}>
                                        Отменить
                                    </ButtonSelling>
                                </Box>
                                : <ButtonSelling
                                    isSelling={isSellingSomeMode}
                                    onClick={() => setIsSellingSomeMode(!isSellingSomeMode)}
                                    disabled={!items}
                                    isEnable={items}>
                                    Продать несколько
                                </ButtonSelling>
                        }

                    </Box>

                </Box>
                {
                    isLoading && !(isSellingMenuOpened)
                        ? <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Loader />
                        </Box>
                        : <></>
                    
                }
                {
                    isSellingSomeMode
                        ? <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '1rem 0'}}>
                            <Typography sx={{marginRight: '10%'}}>
                                Искать уровень редкости:
                            </Typography>
                            <Box>
                                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                                    <FormControlLabel
                                        control={<Checkbox 
                                            name="com"
                                            checked={isCommonSelected} 
                                            onChange={() => onClickCheckboxSelectRare('Common')} />}
                                        label="Обычные" />
                                    <FormControlLabel
                                        control={<Checkbox 
                                            name="unc"
                                            checked={isUncommonSelected} 
                                            onChange={() => onClickCheckboxSelectRare('Uncommon')} />}
                                        label="Необычные" />
                                    <FormControlLabel
                                        control={<Checkbox 
                                            checked={isRareSelected} 
                                            onChange={() => onClickCheckboxSelectRare('Rare')} />}
                                        label="Редкие" />
                                    <FormControlLabel
                                        control={<Checkbox 
                                            checked={isEpicSelected} 
                                            onChange={() => onClickCheckboxSelectRare('Epic')} />}
                                        label="Эпические" />
                                    <FormControlLabel
                                        control={<Checkbox 
                                            checked={isMythicalSelected} 
                                            onChange={() => onClickCheckboxSelectRare('Mythical')} />}
                                        label="Мифические" />
                                    <FormControlLabel
                                        control={<Checkbox 
                                            checked={isLegendarySelected} 
                                            onChange={() => onClickCheckboxSelectRare('Legendary')} />}
                                        label="Легендарные" />
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={isAllSelected}
                                            onChange={() => onClickCheckboxSelectRare('All')} />}
                                        label="Все" />
                                </Box>
                                <Box>
                                    <Typography>
                                        Выбрать тип выделяемых предметов:
                                    </Typography>
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={isCapsSelected}
                                            onChange={() => onClickCheckboxSelectRare('Caps')} />}
                                        label="Фишки" />
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={isBundlesSelected}
                                            onChange={() => onClickCheckboxSelectRare('Bundles')} />}
                                        label="Наборы" />
                                </Box>
                                <Typography sx={{marginRight: '10%'}}>
                                    Выберите предметы для продажи:
                                </Typography>

                            </Box>
                        </Box>
                        : <></>
                }
                
                
                {
                    !isLoading && sortedFilteredItems
                        ? <Box sx={{
                            display: 'flex',
                            background: 'white',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            height: '100%',
                            marginTop: '1rem'
                        }}>
                            {
                                sortedFilteredItems.map((c: any) => <ItemBlock
                                    key={c.id}
                                    id={c.id}
                                    type={c.type}
                                    name={c.name}
                                    bundle={c.bundle}
                                    image={c.image}
                                    date={c.date}
                                    points={c.points}
                                    cost={c.cost}
                                    uid={uid}
                                    rare={c.rare}
                                    isSelected={!!(sellingItems.find(i => i.id === c.id))}
                                    isSellingMode={isSellingSomeMode}
                                    addItemToSelling={(cap: IInvItemToSell) =>
                                        addItemToSelling(cap)}
                                    removeItemToSelling={(idCap: string) =>
                                        removeItemToSelling(idCap)}
                                    openModalSelling={(uid: string, id: string, cost: number) => 
                                        openModalSelling(uid, id, cost)}
                                    openOpeningBundleModal={(bundle: IOpeningBundleModal) => 
                                        openModalOpeningBundle(bundle)}
                                    closeOpeningBundleModal={closeModalOpeningBundle} />)
                            }
                            <EmptyItemBlock />
                            <EmptyItemBlock />
                            <EmptyItemBlock />
                            <EmptyItemBlock />
                            <EmptyItemBlock />
                        </Box>
                        : <Box sx={{
                            height: '50vh', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '1.25rem' }}>
                                Ваш инвентарь пуст.
                            </Typography>
                        </Box>
                }
                

            </Container>

        </Box>
    );
}

export default InventoryPage;