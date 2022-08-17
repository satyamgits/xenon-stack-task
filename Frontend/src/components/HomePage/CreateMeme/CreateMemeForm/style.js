import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    height: max-content;
    background-color: ${({theme}) => theme==='light' ? 'white' : '#212121'};
    box-shadow: 0 0 3px grey;
    border-radius: 5px;
    padding: 20px;

    @media (max-width: 600px) {
        width: 80%;
    }

    @media (max-width: 500px) {
        width: 90%;
        padding: 15px;
    }

    @media (max-width: 350px) {
        width: 95%;
        padding: 10px;
    }
`

export const Header = styled.div`
    display: flex;
    align-items: center;
`

export const H1 = styled.h1`
    font-size: 24px;
    flex: 1;
    margin-bottom: 0;
`

export const BodyWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    position: relative;
    width: 50%;

    @media (max-width: 800px) {
        width: 100%;
    }
`

export const MemePreview = styled.div`
    display: flex;
    position: relative;
    width: 50%;
    align-items: center;
    justify-content: center;

    @media (max-width: 800px) {
        display: none;
    }
`

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
`

export const Button = styled.button`
    display: flex;
    border-radius: 5px;
    padding: 7px 20px;
    cursor: pointer;
    margin-right: 10px;
    color: ${({theme, variant}) => variant==='contained'? 'white' : "rgb(102,189,136)" };
    border: ${({ variant }) => variant==='outlined' ? '1px solid rgb(102,189,136)' : 'none'};
    background-color: ${({ variant }) => variant==='contained' ? 'rgb(102,189,136)' : 'transparent'};
`

export const Container = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
    background-color: ${({ error }) => error ? 'red' : 'rgb(102,189,136)' };
    padding: 10px;
    border-radius: 5px;
`