import styled from 'styled-components';
import s, { keyframes } from 'styled-components'

const anim = keyframes`
    0%{
        transform:scale(1);
    }
    50%{
        transform:scale(1.5);
    }
    100%{
        transform:scale(1);
    }
`

const LoaderDiv = styled.div.attrs((props:any) => ({
    color: props.color,
    size: props.size
}))`
    width: ${(props:any) => props.size}rem;
    height: ${(props:any) => props.size}rem;
    background: ${(props:any) => props.color};
    border-radius: 50%;
    animation: 1s ease ${anim} infinite;

`

interface ILoader {
    color?: string;
    size?: number;
}

function Loader({color = '#2980B9', size = 2}:ILoader) {
    return ( 
        <LoaderDiv color={color} size={size} />
    );
}

export default Loader;