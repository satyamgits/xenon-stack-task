import styled from 'styled-components'

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 90%;
    background-color: ${({ theme }) => theme === 'light'? 'white': 'black'};
    height: 90vh;

    @media (max-width: 800px) {
        flex-direction: column;
        overflow-y: scroll;
        padding: 20px;

        &::-webkit-scrollbar {
            display: none;
          }
    }
`

export const CloseButton = styled.div`
    position: absolute;
    top: -20px;
    right: -20px;
    display: flex;
    background-color: ${({ theme }) => theme === 'light'? '#E8E8E8': '#3D3D3D'};
    color: ${({ theme }) => theme ==='light' ? 'black' : 'white' };
    border-radius: 50%;

    @media (max-width: 800px) {
        top: 10px;
        right: 10px;
        // padding: 20px;
    }

    @media (max-width: 600px) {
        top: 0;
        right: 0;
    }
`

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65vw;
    height: 90vh;
    background-color: ${({ theme }) => theme === 'light'? '#E8E8E8': '#3D3D3D'};
    border-right: ${({ theme }) => theme === 'light'? '1px solid #E8E8E8': '1px solid #3D3D3D'};

    @media (max-width: 800px) {
        width: 100%;
        height: auto;
    }
`

export const Image = styled.img`
    object-fit: contain;
    object-position: center;
    min-width: 100%;
    height: 100%;
    margin-bottom: 0;

    @media (max-width: 800px) {
        width: 100%;
        // min-width: auto;
    }
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;

    @media (max-width: 800px) {
        width: 100%;
        // height: auto;
    }
`

export const DetailsWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 10px 10px 20px;
    font-size: 12px;

    .dot{
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme === 'light'? '#7A7A7A' : '#ADADAD'};
        margin-right: 5px;
        margin-left: 5px;
    }

    @media (max-width: 800px) {
        padding: 10px 0px;
    }
`

export const CommentsWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-top: ${({ theme }) => theme === 'light'? '1px solid #E8E8E8': '1px solid #3D3D3D'};
    border-bottom: ${({ theme }) => theme === 'light'? '1px solid #E8E8E8': '1px solid #3D3D3D'};
    padding: 20px;
    overflow-y: scroll;

    @media (max-width: 800px) {
        padding: 10px 0px;
    }

    &::-webkit-scrollbar {
        display: none;
      }
`

export const Comment = styled.div`
    display: inline;
    margin-bottom: 10px;
    align-items: center;

    .comment{
        font-size: 14px;

        @media (max-width: 800px) {
            font-size: 12px;
        }
    }

    .time{
        font-size: 10px;
        margin-left: 5px;
        color: ${({ theme }) => theme === 'light'? '#7A7A7A' : '#ADADAD'}
    }
`

export const Input = styled.textarea`
    border: none;
    flex: 1;
    margin-right: 10px;
    background-color: ${({theme}) => theme==='light' ? 'white' : 'black'};
    color: ${({theme}) => theme==='light' ? 'black' : 'white'};
    font-size: 14px;

    @media (max-width: 800px) {
        font-size: 12px;
    }
`

export const PostButton = styled.button`
    border: none;
    outline: none;
    background-color: transparent;
    color: #30709B;
    border-radius: 5px;
    transition: 0.3s all ease;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    padding: 5px;

    &:hover{
        background-color: ${({ theme }) => theme === 'light' ? '#C9E1F1' : '#001828'} ;
    }
`

export const InputWrapper = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;

    @media (max-width: 800px) {
        padding: 10px 0px;
    }
`