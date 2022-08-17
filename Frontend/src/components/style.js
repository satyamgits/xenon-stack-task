import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 70%;
    height: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    box-sizing: border-box;

    @media (max-width: 960px) {
        width: 80%;
    }

    @media (max-width: 800px) {
        width: 90%;
    }

    @media (max-width: 650px) {
        width: 95%;
    }
`