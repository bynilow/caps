import styled from 'styled-components';
import s from 'styled-components'

const Empty = styled.div.attrs((props:any) => ({
    size: props.size
}))`
    width: ${(props:any) => props.size !== 'small' ? '10rem' : '8rem'};
    height: ${(props:any) => props.size !== 'small' ? '10rem' : '8rem'};
    margin: ${(props:any) => props.size !== 'small' ? '1rem' : '0.5rem'};
`

interface IEmptyItemBlock {
    size?: string;
}

function EmptyItemBlock({size = 'medium'}: IEmptyItemBlock) {
    return ( 
        <Empty size={size} />
    );
}

export default EmptyItemBlock;