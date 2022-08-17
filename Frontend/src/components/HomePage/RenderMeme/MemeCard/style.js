import styled from 'styled-components'

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 70%;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: ${({ theme }) => theme==='light' ? '0 0 3px rgba(0, 0,0, 0.4)' : '0 0 3px rgba(256, 256, 256, 0.4)'};
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme==='light' ? 'white' : '#0C0C0C'};

    @media (max-width: 550px) {
        width: 90%;
    }
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .avatar{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-weight: 600;
        box-sizing: border-box;
        background-color: ${({ theme }) => theme==='light' ? '#EAEAEA' : '#3F3F3F'};
        margin-right: 10px;
        text-transform: uppercase;

        @media (max-width: 600px) {
            width: 30px;
            height: 30px;
            font-size: 12px;
        }
    }

    .name{
        width: ${({ value }) => value==='' && '150px'};
        height: ${({ value }) => value==='' && '10px'};
        background-color: ${({ value, theme }) => value==='' ? theme==='light' ? '#EAEAEA' : '#3F3F3F' : "none"};
        margin-right: 10px;

        @media (max-width: 400px) {
            font-size: 13px;
        }
    }

    .dot{
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme === 'light'? '#7A7A7A' : '#ADADAD'};
    }

    .time{
        display: flex;
        margin-left: 10px;
        font-size: 12px;
        color: ${({ theme }) => theme === 'light'? '#7A7A7A' : '#ADADAD'};
        
        @media (max-width: 400px) {
            font-size: 10px;
        }

        @media (max-width: 350px) {
            font-size: 8px;
        }
    }
`

export const CaptionWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
    width: 100%;
    height: ${({ value }) => value==='' && '20px'};
    background-color: ${({ value, theme }) => value==='' ? theme==='light' ? '#EAEAEA' : '#3F3F3F': 'none' };

    @media (max-width: 400px) {
        font-size: 12px;
    }
`

export const SampleImageWrapper = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme==='light' ? '#EAEAEA' : '#3F3F3F'};
    width: 100%;
    height: 100px;
`

export const ImageWrapper = styled.img`
    object-fit: cover;
    object-position: center;
    width: 100%;
    border-radius: 5px;
    max-height: ${({ type }) => type==='meme-preview' ? "250px" : "none"};
    border: none;
`
export const Footer = styled.div`
    display: flex;
    justify-content: space-around;

`
export const Button = styled.button`
    display: flex;
    align-items: center;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme==='light' ? '#3F3F3F' : '#F2F2F2'};
    transition: 0.3s all ease;

    @media (max-width: 800px) {
        font-size: 13px;
    }

    @media (max-width: 600px) {
        font-size: 12px;
    }

    @media (max-width: 400px) {
        font-size: 10px;
    }
`