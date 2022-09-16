import s, { keyframes } from 'styled-components'

interface ICapProps {
    id: number;
    name: string;
    collection: string;
    frontImage: string;
    backImage: string;
    cost: number;
    points: number;
    rare: string;
}
//обычный, необычный, редкий, эпический, мифический, легендарный,
function CapFlipper({ id, frontImage, backImage, cost, points, rare }: ICapProps) {
    const CapFront = s.div`
        width: 100%;
        height: 100%;

        border-radius: 50%;
        border: solid 2px black;

        position: absolute;
        top: 0;
        left: 0;

        background-image: url(${frontImage});
        background-position: center;
        background-size: cover;


        transition: 1s;
        z-index: 10;

        transform-style: preserve-3d;
        backface-visibility: hidden;

        `

    const CapBack = s.div`
        width: 100%;
        height: 100%;

        border-radius: 50%;
        border: solid 2px black;

        position: absolute;
        top: 0;
        left: 0;

        background-image: url(${backImage});
        background-size: cover;
        background-position: center;

        display: flex;
        align-items: center;
        justify-content: center;

        transition: 1s;

        transform-style: preserve-3d;
        transform: rotateY(-180deg);
        `

    const CapCircle = s.div`
        width: 200px;
        height: 200px;
        transition: 1s;
        position: relative;

        -webkit-perspective: 1000;
        &:hover ${CapFront}{
            transform: rotateY(180deg);
        }
        &:hover ${CapBack}{
            transform: rotateY(0deg);
        }
    `

    const CapPoints = s.p`
        transform: translateZ(30px);
        font-size: 30px;
        color: white;
        text-shadow: 0 0 15px black;
    `
    return (
        <CapCircle>
            <CapFront />
            <CapBack>
                <CapPoints>{points}PTS</CapPoints>
            </CapBack>
        </CapCircle>
    );
}

export default CapFlipper;