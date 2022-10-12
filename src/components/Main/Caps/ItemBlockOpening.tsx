import { default as s, default as styled, keyframes } from 'styled-components';


const Cap = styled.div.attrs((props:any) => ({
    image: props.image,
    rare: props.rare,
    type: props.type
}))`
    background-image: url(${(props:any) => props.image});
    background-position: center;
    background-size: cover;
    
    width: ${(props:any) => props.type === 'bundle' ? '70%' : '65%'};
    height: ${(props:any) => props.type === 'bundle' ? '70%' : '65%'};

    border-radius: ${(props:any) => props.type === 'bundle' ? '5px' : '50%'};

    ${
        (props:any) => props.type === 'bundle'
        ? 'border: solid 2px black;'
        : 'border: none;'
    }

    transition: 1s;
`

const receivedAnim = keyframes`
    0%{
        transform: scale(0) rotate(-560deg);
    }
    80%{
        transform: scale(1.05) rotate(15deg);
    }
    90%{
        transform: scale(1) rotate(-5deg);
    }
    100%{
        transform: scale(1) rotate(0deg);
    }
`

const Block = styled.div.attrs((props:any) => ({
    type: props.type,
    received: props.received,
    capReceivedPosition: props.capReceivedPosition
}))`
    width: ${(props:any) => props.type === 'bundle' ? '10rem' : '8rem'};
    height: ${(props:any) => props.type === 'bundle' ? '10rem' : '8rem'};
    background: white;
    
    outline: ${(props: any) =>
        props.isSellingMode
            ? props.isSelected
                ? '5px solid #212F3C'
                : '0px solid #212F3C'
            : '0px solid #5D6D7E'};
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);

    padding: 0.5rem;
    margin: 1rem;

    position: relative;

    display: flex;
    justify-content: center;

    transition: 0.1s;
    
    ${(props: any) => props.received ? 'transform: scale(0) rotate(-860deg);' : ''}
    animation: 2s ${(props: any) => props.received ? receivedAnim : ''} ease;
    animation-delay: ${(props: any) => props.capReceivedPosition/1.5}s;
    animation-fill-mode: forwards;
    

`

const BlockText = styled.div.attrs((props:any) => ({
    type: props.type,
    rare: props.rare,
}))`
    width: 100%;
    height: 2.5rem;
    background: ${
    (props: any) =>
        props.rare === 'Common' ? '#cfd3d4'
            : props.rare === 'Uncommon' ? '#27ae61'
                : props.rare === 'Rare' ? '#297fb8'
                    : props.rare === 'Epic' ? '#8E44AD'
                        : props.rare === 'Mythical' ? '#cf4137'
                            : '#f09d13'
    };

    border-radius: 0 0 5px 5px;

    position: absolute;
    bottom: 0;
    left: 0;

    color: white;
    text-shadow: 0 0 5px rgba(0,0,0,.3);
    padding: 0.3rem;
    line-height: 1;
        
`

interface IItemBlockOpening {
    id: string;
    uid?: string;
    name: string;
    image: string;
    rare: string;
    type: string;
    received?: boolean;
    capReceivedPosition?: number;
}


function ItemBlockOpening({ id, uid, name, image, rare, type, received = false, capReceivedPosition = 0 }: IItemBlockOpening) {
    return (
        <>
            <Block type={type} received={received} capReceivedPosition={capReceivedPosition} >
                <Cap image={image} rare={rare} type={type} />
                <BlockText rare={rare} type={type}> {name} </BlockText>
            </Block>
        </>
    );
}

export default ItemBlockOpening;