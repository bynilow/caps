import { Box, Button, Select, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Cap from "./Caps/CapFlipper";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { arrayUnion, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc } from "firebase/firestore";
import CapFlipper from "./Caps/CapFlipper";
import CapBlock from "./Caps/CapBlock";
import s from 'styled-components';
import Loader from "../common/Loader";
import { getMyCaps } from "../../store/action-creators/user";
import { useDispatch } from "react-redux";


function getRandomInt(max: number) {
    return Math.floor(1 + Math.random() * max);
}

function InventoryPage() {
    const {displayName, uid} = useTypedSelector<any>(state => state.user['user']);
    const {caps, isLoading} = useTypedSelector<any>(state => state.user);

    const dispatch = useDispatch();
    
    const db = getFirestore();

    const getAllCaps = async() => {
        const querySnapshot = await getDocs(collection(db, "caps_shrek_1"));
        let arr:any[] = [];
        querySnapshot.forEach(doc => {
            arr.push(doc.data());
        })
    }

    const getCaps = () => {
        
    }
    
    const addCapToUser = async() => {
            const capRef = doc(db, "caps_shrek_1", `c_shrek_${getRandomInt(12)}`);
            const capSnap = await getDoc(capRef);
    
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if(docSnap.data()){
                let myCaps = docSnap.data()?.caps;
                myCaps.push(capSnap.data());
                const updatedRes = await updateDoc(doc(db,"users", uid),{
                    caps: myCaps
                })
            }
            else{
                await setDoc(doc(db,"users", uid),{
                    caps: [capSnap.data()]
                })
            }
        getCaps();
    }
    

    useEffect(() => {
        // getCaps();
        dispatch<any>(getMyCaps(uid));
        console.log(uid)
    }, [])

    // if(caps !== null){
    //     
    //     console.log(uid)
    // }
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

    const Container = s.div`
        width: 70%;
        min-height: '100vh';
        height: 100%;
        margin: auto;
    `

    return ( 
        <Box sx={{
            background: '#f4f4f5',
            minHeight: '100vh'
        }}>
            <Container>
                <Typography sx={{fontSize: '2rem', color: '#666', padding: '10px 0'}}>
                    {displayName} {">"} Инвентарь
                </Typography>
                <Box sx={{margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <TextField sx={{ background: 'white', width: '60%', marginRight: '10px' }} size="small" />
                    <Select sx={{ background: 'white', width: '20%', marginRight: '10px' }} size="small" />
                    <Select sx={{ background: 'white', width: '20%'}} size="small" />
                    <Button onClick={addCapToUser}>add</Button>
                </Box>
                {
                    isLoading 
                        ? <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Loader />
                        </Box>
                        : <></>
                    
                }
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
                                    points={c.points}
                                    cost={c.cost}
                                    uid={uid}
                                    rare={c.rare} />)
                            }
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