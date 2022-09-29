import { default as s, default as styled } from 'styled-components';
import { IInvItemToSell } from '../../../types/invItemTypes';

const Item = styled.div.attrs((props:any) => ({
    image: props.image,
    rare: props.rare,
    type: props.type
}))`
    background-image: url(${(props:any) => props.image});
    background-position: center;
    background-size: cover;
    
    width: 100%;
    height: 100%;

    border-radius: ${(props:any) => props.type === 'bundle' ? '5px' : '50%'};

    ${
        (props:any) => props.type === 'bundle'
        ? 'border: solid 2px black;'
        : 'border: none;'
    }
    
    box-shadow: 0 0 5px rgba(0,0,0,0.5);

    transition: 0.2s;

`

const Block = styled.div.attrs((props:any) => ({
    rare: props.rare
}))`
    width: 5rem;
    height: 5rem;
    
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);

    padding: 0.5rem;
    margin: 0.5rem;

    position: relative;

    display: flex;
    justify-content: center;

    transition: 0.1s;
    
    border: solid 3px ${
        (props: any) =>
            props.rare === 'Common' ? '#cfd3d4'
                : props.rare === 'Uncommon' ? '#27ae61'
                    : props.rare === 'Rare' ? '#297fb8'
                        : props.rare === 'Epic' ? '#8E44AD'
                            : props.rare === 'Mythical' ? '#cf4137'
                                : '#f09d13'
        };

    &:hover ${Item} {
        transform: scale(1.2);
    }

`

function ItemBlockSelling({cost, image, id, name, rare, type}: IInvItemToSell) {
    return (
        <>
            <Block rare={rare}>
                <Item image={image} rare={rare} type={type} />
            </Block>
        </>
    );
}

export default ItemBlockSelling;