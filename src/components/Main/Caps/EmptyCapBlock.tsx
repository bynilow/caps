import s from 'styled-components'

const Empty = s.div`
    width: 10rem;
    height: 10rem;
    margin: 1rem;
`
function EmptyCapBlock() {
    return ( 
        <Empty />
    );
}

export default EmptyCapBlock;