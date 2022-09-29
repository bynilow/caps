import { default as s } from 'styled-components';

const Block = s.div`
    width: 5rem;
    height: 5rem;

    margin: 0.5rem;

`

function EmptyItemBlockSelling() {
    return (
        <Block />
    );
}

export default EmptyItemBlockSelling;