import styled from 'styled-components'

const Wrapper = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 30px;
    width: 100%;
    box-sizing: border-box;
`

const InputFeild = styled.input`
    position: relative;
    display: flex;
    border: 1px solid;
    border-color: ${({theme, error }) => error? 'red' : theme==='light' ? '#212121' : 'white'};
    background-color: ${({theme}) => theme==='light' ? 'white' : '#212121'};
    color: ${({theme}) => theme==='light' ? '#212121' : 'white'};
    padding: 10px;
    border-radius: 5px;
    width: 95%;
    outline: none;

    &:focus{
        border-color: ${({error}) => error ? 'red' : 'green'};;
    }

    &:valid{
        border-color: green;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`

const InputLabel = styled.label`
    position: absolute;
    color: ${({theme, error}) => error ? 'red' : theme==='light' ? '#212121' : 'white'};
    top: 5px;
    left: 5px; 
    z-index: 10;
    transition: .3s all ease;
    background-color: ${({theme}) => theme==='light' ? 'white': '#212121' };
    padding: 5px;

    ${InputFeild}:focus ~ & {
        top: -15px;
        left: 3px;
        transform: scale(0.8);
        // color: ${({error}) => error ? 'red': 'green' };
    }

    ${InputFeild}:valid ~ & {
        top: -15px;
        left: 3px;
        transform: scale(0.8);
        color: ${ 'green' };
    }
`
const Error = styled.span`
    display: flex;
    position: absolute;
    color: red;
    bottom: -15px;
    left: 2px;
    font-size: 12px;
`

const Input = ({id, label, theme, error, ...rest}) => {
    return(
        <Wrapper>
            <InputFeild id={id} theme={theme} error={error} {...rest}/>
            <InputLabel htmlFor={id} theme={theme} error={error}>{label}</InputLabel>
            {error && <Error>Required*</Error>}
        </Wrapper>
    )
}

export default Input