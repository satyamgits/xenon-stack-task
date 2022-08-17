import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    padding: 10px 20px;
    overflow: hidden;
    box-sizing: border-box;
    align-items: center;
`

export const Logo = styled.div`
    display: flex;
    color: #66bd88;
    align-items: center;
    flex: 1;

    .large{
        font-size: 60px;
        opacity: .1;
        transform: translateX(50%);
    }

    .small{
        font-size: 20px;
        transform: translateX(-50%);
    }
`