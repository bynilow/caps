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

const LoaderDiv = s.div`
    width: 2rem;
    height: 2rem;
    background: #2980B9;
    border-radius: 50%;
    animation: 1s ease ${anim} infinite;
`

function Loader() {
    return ( 
        <LoaderDiv />
    );
}

export default Loader;