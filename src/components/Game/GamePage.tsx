import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import s from 'styled-components'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IInvItem } from "../../types/invItemTypes";
import ItemBlockOpening from "../Main/Caps/ItemBlockOpening";
import GameItem from "./GameItem";


const Container = s.div`
    width: 80%;
    min-height: '100vh';
    height: 100%;
    margin: auto;

    display: flex;
    flex-direction: column;

`

function GamePage() {

    const items = [
        {
            "image": "https://i.pinimg.com/originals/21/7b/64/217b64fac1822603c4ea771a5feb42eb.jpg",
            "rare": "Rare",
            "points": 320,
            "type": "caps",
            "cost": 108,
            "date": 1667060222178,
            "bundle": "Покемоны",
            "name": "Вульпикс",
            "id": "c_pokemon_7_1667060222197"
        },
        {
            "date": 1667060222178,
            "points": 99,
            "id": "c_pokemon_4_1667060222255",
            "name": "Мяют",
            "type": "caps",
            "cost": 33,
            "image": "https://avatars.dzeninfra.ru/get-zen_doc/1899990/pub_5e90991dd5e2ed0d669d3930_5e909932a254c7013634f7d8/scale_1200",
            "bundle": "Покемоны",
            "rare": "Uncommon"
        },
        {
            "image": "https://go-pokemon.ru/wp-content/uploads/2022/05/magikarp-cry.jpg",
            "bundle": "Покемоны",
            "date": 1667060222178,
            "id": "c_pokemon_6_1667060222242",
            "type": "caps",
            "rare": "Uncommon",
            "points": 99,
            "name": "Мэджикарп",
            "cost": 33
        },
        {
            "cost": 16,
            "bundle": "Покемоны",
            "rare": "Common",
            "type": "caps",
            "id": "c_pokemon_2_1667060222250",
            "points": 48,
            "image": "https://vignette1.wikia.nocookie.net/pokemon/images/9/93/Vladimir_Pidgeotto.png/revision/latest?cb=20150808180209",
            "date": 1667060222177,
            "name": "Пиджи"
        },
        {
            "date": 1667060222130,
            "name": "Электабаз",
            "bundle": "Покемоны",
            "type": "caps",
            "id": "c_pokemon_11_1667060222189",
            "rare": "Epic",
            "image": "https://i.pinimg.com/originals/f3/c2/20/f3c220dceaf4cbc0477bb96d490ec752.jpg",
            "cost": 309,
            "points": 927
        },
        {
            "rare": "Uncommon",
            "bundle": "Покемоны",
            "id": "c_pokemon_5_1667060218471",
            "date": 1667060218399,
            "type": "caps",
            "image": "https://go-pokemon.ru/wp-content/uploads/2022/06/screen_shot_2016-08-29_at_2.00.36_pm.0.0.jpg",
            "cost": 33,
            "name": "Иви",
            "points": 99
        },
        {
            "cost": 33,
            "rare": "Uncommon",
            "type": "caps",
            "date": 1667060218399,
            "id": "c_pokemon_6_1667060218425",
            "bundle": "Покемоны",
            "points": 99,
            "image": "https://go-pokemon.ru/wp-content/uploads/2022/05/magikarp-cry.jpg",
            "name": "Мэджикарп"
        },
        {
            "date": 1667060218399,
            "type": "caps",
            "image": "https://go-pokemon.ru/wp-content/uploads/2022/05/magikarp-cry.jpg",
            "points": 99,
            "cost": 33,
            "id": "c_pokemon_6_1667060218406",
            "bundle": "Покемоны",
            "name": "Мэджикарп",
            "rare": "Uncommon"
        },
        {
            "image": "https://i.pinimg.com/originals/21/7b/64/217b64fac1822603c4ea771a5feb42eb.jpg",
            "date": 1667060218398,
            "cost": 108,
            "points": 320,
            "bundle": "Покемоны",
            "type": "caps",
            "name": "Вульпикс",
            "rare": "Rare",
            "id": "c_pokemon_7_1667060218448"
        },
        {
            "image": "https://i1.sndcdn.com/avatars-0DAIzJEPdv6YJXto-wN0EZg-t500x500.jpg",
            "type": "caps",
            "rare": "Epic",
            "id": "c_pokemon_12_1667060218412",
            "bundle": "Покемоны",
            "cost": 309,
            "date": 1667060218354,
            "name": "Фарфетч'д",
            "points": 927
        }
    ]

    interface ISelected {
        id: string;
        isReceived: boolean;
        count: string[];
    }
    const [countSelected, setCountSelected] = useState<ISelected[]>(
        items.map(i => ({
            id: i.id,
            isReceived: false,
            count: []
        }))
    );
    const [countSteps, setCountSteps] = useState(0);
    const [myWinCaps, setMyWinCaps] = useState<any[]>([]);
    const [botWinCaps, setBotWinCaps] = useState<any[]>([]);

    useEffect(() => {
        if(countSteps % 2 !== 0 && countSelected.findIndex(i => !(i.isReceived)) !== -1){
            let botInd = countSelected.findIndex(i => !(i.isReceived) && i.count.length === 2);
            const rand = Math.trunc(Math.random()*10);
            if(botInd === -1) botInd = !(countSelected[rand].isReceived) ? rand : -1
            if(botInd === -1) botInd = countSelected.findIndex(i => !(i.isReceived))
            console.log(botInd)
            onClickGetCap(countSelected[botInd].id, botInd, 'b');
        } 
        else if(countSelected.findIndex(i => !(i.isReceived)) === -1){
            const myWinInd = countSelected.filter(i => i.count[i.count.length - 1] === 'p');
            const myWinCapsTemp = myWinInd.map(i => items.find(j => j.id === i.id));
            setMyWinCaps(myWinCapsTemp)
            console.log(myWinCapsTemp);
            const botWinInd = countSelected.filter(i => i.count[i.count.length - 1] === 'b');
            const botWinCapsTemp = botWinInd.map(i => items.find(j => j.id === i.id));
            setBotWinCaps(botWinCapsTemp)
            console.log(botWinCapsTemp);
        }
    },[countSteps])

    const onClickGetCap = (id: string, ind: number, player: string = 'p') => {
        if (!(countSelected[ind].isReceived)) {
            let newSelected = countSelected;
            const isReceived = newSelected[ind].isReceived || false;

            const count = newSelected[ind].count;
            if (!isReceived) {
                if (count.length === 2 || Math.random() > 0.5) {
                    newSelected[ind].count.push(player);
                    newSelected[ind].isReceived = true;
                }
                else {
                    newSelected[ind].count.push(player);
                }
            }
            setCountSelected(newSelected);
            setCountSteps(countSteps + 1);
        }

    }

    

    return ( 
        <Box>
            <Container>
                <Typography>
                    Игра
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    {
                        items 
                            ? items.map((i,ind) =>
                                <GameItem
                                    key={i.id}
                                    id={i.id}
                                    ind={ind}
                                    image={i.image}
                                    name={i.name}
                                    points={i.points || 0}
                                    rare={i.rare}
                                    countSelected={countSelected.find(c => c.id === i.id)?.count || []}
                                    isReceived={countSelected.find(c => c.id === i.id)?.isReceived || false}
                                    onClickGetCap={(id:string, ind: number) => onClickGetCap(id, ind)} />)
                            : <></>
                    }
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '7rem'}}>
                    <Box sx={{width: '40%', textAlign: 'center'}}>
                        Игрок
                        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                            {
                                myWinCaps.map(i =>
                                    <ItemBlockOpening
                                        id={i.id}
                                        image={i.image}
                                        name={i.name}
                                        rare={i.rare}
                                        type={i.type} />)
                            }
                        </Box>
                    </Box>
                    <Box sx={{width: '40%', textAlign: 'center'}}>
                        Бот
                        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                            {
                                botWinCaps.map(i =>
                                    <ItemBlockOpening
                                        id={i.id}
                                        image={i.image}
                                        name={i.name}
                                        rare={i.rare}
                                        type={i.type} />)
                            }
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
     );
}

export default GamePage;