import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    position: relative;
    width: 100%;
    border: 1px solid #66bd88;
    border-radius: 10px;
    padding: 30px 50px;

    @media (max-width: 800px) {
        width: 100%;
    }
`

export const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 20px;
    color: #66bd88;
`