import { Timestamp } from 'firebase/firestore';


export interface ICap {
    id: string;
    name: string;
    bundle: string;
    rare: string;
    points: number;
    cost: number;
    frontImage: string;
    backImage: string;
    date: number;
}

export interface ICapToSell {
    id: string;
    name: string;
    rare: string;
    cost: number;
    frontImage: string;
}

export interface ISetCapsAction {
    caps: ICap[] | null;
}

export interface ISetCoinsAction {
    coins: number;
}

export interface ISellCapAction {
    cost: number;
    capId: string;
}
