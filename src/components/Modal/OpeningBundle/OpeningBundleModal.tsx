import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import s from 'styled-components';
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { openBundle, setItemsInBundle } from "../../../store/action-creators/inventoryAC";
import { IInvItem, IOpeningBundleModal } from "../../../types/invItemTypes";
import EmptyItemBlock from "../../Main/Caps/EmptyItemBlock";
import InvItemBlock from "../../Main/Caps/ItemBlock";
import ItemBlockOpening from "../../Main/Caps/ItemBlockOpening";
import ItemBlockSelling from "../../Main/Caps/ItemBlockSelling";
import OpeningListItems from "./OpeningListItems";
import OpeningRecievedItems from "./OpeningRecievedItems";

const BackgroundModal = s.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(15px);
    z-index: 10000;
`



interface IModal {
    closeModal: () => void;
}

function OpeningBundleModal({ id, uid, image, name, rare, bundle, closeModal }: IOpeningBundleModal & IModal) {

    const { itemsInBundle, recievedItems } = useTypedSelector(state => state.inventory);    

    const [isOpenedBundle, setIsOpenedBundle] = useState(false);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setItemsInBundle(bundle, id))
    }, [])

    const onClickOpenBundle = async() => {
        itemsInBundle && await dispatch(openBundle(id, uid, itemsInBundle));
        setIsOpenedBundle(true);
    }

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <BackgroundModal onClick={closeModal} />
            {
                !isOpenedBundle 
                ? <OpeningListItems
                    bundle={bundle}
                    id={id}
                    image={image}
                    name={name}
                    rare={rare}
                    uid={uid}
                    itemsInBundle={itemsInBundle}
                    onClickOpenBundle={onClickOpenBundle} />
                : recievedItems 
                    ? <OpeningRecievedItems caps={recievedItems} closeModal={closeModal} />
                    : <></>
            }

        </Box>
    );
}

export default OpeningBundleModal;