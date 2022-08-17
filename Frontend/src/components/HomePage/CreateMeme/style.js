import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    width: 70%;
    height: max-content;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme==='light' ? 'white' : '#0C0C0C'};
    padding: 20px;
    margin-top: 20px;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 5px;
    align-items: center;
    box-shadow: ${({ theme }) => theme==='light' ? '0 0 3px rgba(0, 0,0, 0.4)' : '0 0 3px rgba(256, 256, 256, 0.4)'};

    @media (max-width: 550px) {
        width: 90%;
    }
`

export const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    width: 100%;
`