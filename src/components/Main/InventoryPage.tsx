import { Box, Button, Divider, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import s from 'styled-components';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getMyCaps, sortCaps } from "../../store/action-creators/capsAC";
import { ICap, ICapToSell } from "../../types/capsTypes";
import { SORT_BY_BUNDLE, SORT_BY_NAME, SORT_CHEAP_FIRST, SORT_COMMON_FIRST, SORT_EXPENSIVE_FIRST, SORT_NEW_FIRST, SORT_OLD_FIRST, SORT_RARE_FIRST } from "../../utils/consts";
import Loader from "../common/Loader";
import SellingCapsModal from "../Modal/SellingCapsModal";
import CapBlock from "./Caps/CapBlock";
import EmptyCapBlock from "./Caps/EmptyCapBlock";


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
    margin: ${(props:any) => (props.isSelling) ? '5rem' : '0'}
    line-height: 0;

    transition: 0.1s;

    &:hover{
        filter: brightness(90%);
    }
`

function InventoryPage() {
    const {displayName, uid } = useTypedSelector<any>(state => state.user['user']);
    const {caps, isLoading} = useTypedSelector<any>(state => state.caps);

    const dispatch = useDispatch();

    const db = getFirestore();

    interface ISellingModal {
        uid: string;
        id: string;
        cost: number;
    }
    const [isSellingMenuOpened, setIsSellingMenuOpened] = useState<boolean>(false)
    
    const [isSellingOne, setSellingOne] = useState<ISellingModal>({uid: '-1', id: '-1', cost: -1})

    const [sellingCaps, setSellingCaps] = useState<ICapToSell[]>([])
    const [isSellingSomeMode, setIsSellingSomeMode] = useState<boolean>(false)

    const [filter, setFilter] = useState('0')
    const [sorting, setSorting] = useState(SORT_NEW_FIRST)

    // const getAllCaps = async() => {
    //     const querySnapshot = await getDocs(collection(db, "caps_shrek_1"));
    //     let arr:any[] = [];
    //     querySnapshot.forEach(doc => {
    //         arr.push(doc.data());
    //     })
    // }

    // const getCaps = () => {
        
    // }
    
    const addCapToUser = async() => {
            const capRef = await doc(db, "caps_shrek_1", `c_shrek_${getRandomInt(12)}`);
            const capSnap = await getDoc(capRef);
    
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            const timestamp = await Date.parse(Timestamp.now().toDate().toISOString());
            
            if(docSnap.data()?.caps){
                let myCaps = docSnap.data()?.caps;
                myCaps.push({
                    ...capSnap.data(), 
                    date: timestamp, 
                    id: capSnap.data()?.id + `_${Date.now()}`
                });
                const updatedRes = await updateDoc(doc(db,"users", uid),{
                    caps: myCaps
                })
            }
            else{
                let myCaps = {
                    ...capSnap.data(), 
                    date: timestamp, 
                    id: capSnap.data()?.id + `_${Date.now()}`
                };
                await setDoc(doc(db,"users", uid),{
                    caps: [myCaps]
                })
            }
    }
    

    useEffect(() => {
        console.log(uid)
        uid && dispatch<any>(getMyCaps(uid));
    }, [uid])

    const addCap = async() => {
        await setDoc(doc(db,"caps_shrek_1","c_shrek_12"),{
            id: "c_shrek_12",
            name: "Кот в сапогах",
            bundle: "Шрек",
            frontImage: "https://funart.pro/uploads/posts/2021-07/1626545290_6-funart-pro-p-kot-v-sapogakh-glaza-zhivotnie-krasivo-fot-12.jpg",
            backImage: "https://proprikol.ru/wp-content/uploads/2019/08/kartinki-na-zadnij-fon-38.jpg",
            cost: 430,
            points: 950,
            rare: "Epic"
        })
        //-200, -300, -700, -1000, -1500, -5000
        //10-50, -70, -300, -500, -1000, -3000
    }

    const openModalSelling = (uid: string, id: string, cost: number) => {
        setSellingOne({id, uid, cost});
        setIsSellingMenuOpened(true);
    }

    const closeModalSelling = () => {
        setSellingOne({id: '', uid: '', cost: -1})
        setIsSellingMenuOpened(false);
    }

    const onFilterChange = (e: SelectChangeEvent) => {
        setFilter(e.target.value)
    }

    const onSortingChange = (e: SelectChangeEvent) => {
        dispatch<any>(sortCaps(caps, e.target.value));
        setSorting(e.target.value)
    }


    const addCapToSelling = (cap: ICapToSell) => {
        let newCaps = JSON.parse(JSON.stringify(sellingCaps));
        newCaps.push(cap);
        console.log(newCaps);
        setSellingCaps(newCaps);
    }

    const removeCapToSelling = (idCap: string) => {
        let newCaps = sellingCaps.filter(c => c.id !== idCap);
        console.log(newCaps);
        setSellingCaps(newCaps);
    }

    const cancelSomeSelling = () => {
        setSellingCaps([]);
        setIsSellingSomeMode(false);
    }

    return ( 
        <Box sx={{
            background: '#f4f4f5',
            minHeight: '100vh'
        }}>
            {
                isSellingMenuOpened 
                ? <SellingCapsModal
                    cost={isSellingOne.cost}
                    uid={uid}
                    id={isSellingOne.id}
                    isSomeSelling={isSellingSomeMode}
                    capsToSelling={sellingCaps}
                    closeModal={closeModalSelling} />
                : <></>
            }
            <Container>
                <Typography sx={{fontSize: '2rem', color: '#666', padding: '10px 0'}}>
                    {
                        caps 
                        ? `${displayName} > Инвентарь (${caps.length})`
                        : <></>
                    }
                </Typography>
                <Box sx={{margin: 'auto', display: 'flex', justifyContent: 'space-between', height: '2rem' }}>
                    <TextField sx={{ background: 'white', width: '60%', marginRight: '10px' }} size="small" />
                    <Select
                        size="small"
                        value={filter}
                        sx={{background: 'white',width: '20%',marginRight: '10px' }}
                        onChange={onFilterChange} >
                        <MenuItem value={0} sx={{fontSize: '14px'}}>
                            Все предметы
                        </MenuItem>
                        <MenuItem value={1} sx={{fontSize: '14px'}}>
                            Фишки
                        </MenuItem>
                        <MenuItem value={2} sx={{fontSize: '14px'}}>
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
                    <Button onClick={addCapToUser}>add</Button>
                    <Box sx={{ minWidth: '15%' }}>
                        {
                            isSellingSomeMode
                                ? <Box sx={{display: 'flex', height: '100%', justifyContent: 'space-between'}}>
                                    <ButtonSelling
                                        isSelling={false}
                                        onClick={() => setIsSellingMenuOpened(true)}
                                        disabled={!(sellingCaps.length)}
                                        isEnable={sellingCaps.length}>
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
                                    disabled={!caps}
                                    isEnable={caps}>
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
                <Typography sx={{textAlign: 'center', marginTop: '1rem', fontWeight: 'bold'}}>
                    {
                        isSellingSomeMode && 'Выберите несколько для продажи'
                    }
                </Typography>
                
                {
                    caps
                        ? <Box sx={{
                            display: 'flex',
                            background: 'white',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap',
                            height: '100%',
                            margin: 'auto'
                        }}>
                            {
                                caps.map((c: any) => <CapBlock
                                    key={c.id}
                                    id={c.id}
                                    name={c.name}
                                    bundle={c.bundle}
                                    frontImage={c.frontImage}
                                    backImage={c.backImage}
                                    date={c.date}
                                    points={c.points}
                                    cost={c.cost}
                                    uid={uid}
                                    rare={c.rare}
                                    isSellingMode={isSellingSomeMode}
                                    addCapToSelling={(cap: ICapToSell) =>
                                        addCapToSelling(cap)}
                                    removeCapToSelling={(idCap: string) =>
                                        removeCapToSelling(idCap)}
                                    openModal={(uid: string, id: string, cost: number) => 
                                        openModalSelling(uid, id, cost)} />)
                            }
                            <EmptyCapBlock />
                            <EmptyCapBlock />
                            <EmptyCapBlock />
                            <EmptyCapBlock />
                            <EmptyCapBlock />
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