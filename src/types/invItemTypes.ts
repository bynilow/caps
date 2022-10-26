import { Timestamp } from 'firebase/firestore';


export interface IInvItem {
    id: string;
    type: string;
    name: string;
    bundle: string;
    image: string;
    date: number;
    rare: string;
    cost: number;
    points?: number;
    price?: number;
}

export interface IInvItemToSell {
    id: string;
    name: string;
    cost: number;
    image: string;
    type: string;
    rare: string;
}

export interface ISetCapsAction {
    caps: IInvItem[] | null;
}

export interface ISetCoinsAction {
    coins: number;
}

export interface ISellCapAction {
    cost: number;
    capId: string;
}

export interface IOpeningBundleModal {
    openedModal?: boolean,
    id: string;
    uid: string;
    image: string;
    name: string;
    rare: string;
    bundle: string;
}

export interface IIsBuying {
    isOpened?: boolean;
    uid: string;
    bundleName: string;
    bundleId: string;
    image: string;
    name: string;
    price: number;
}