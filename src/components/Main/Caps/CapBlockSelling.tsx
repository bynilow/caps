import { default as s, default as styled } from 'styled-components';
import { ICapToSell } from '../../../types/capsTypes';

const Cap = styled.div.attrs((props:any) => ({
    frontImage: props.frontImage,
    rare: props.rare
}))`
    background-image: url(${(props:any) => props.frontImage});
    background-position: center;
    background-size: cover;
    
    width: 100%;
    height: 100%;

    border-radius: 50%;
    
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

    &:hover ${Cap} {
        transform: scale(1.2);
    }

`

function CapBlockSelling({cost, frontImage, id, name, rare}: ICapToSell) {
    return (
        <>
            <Block rare={rare}>
                <Cap frontImage={frontImage} rare={rare} />
            </Block>
        </>
    );
}

export default CapBlockSelling;