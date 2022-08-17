import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { server_url } from '../../../../data'
import { TimeDifference } from '../../../../utils/TimeCaculator'
import { Wrapper, ImageWrapper, ContentWrapper, CommentsWrapper, Comment, Input, Image, CloseButton, InputWrapper , PostButton, DetailsWrapper } from './style'
import { Header, CaptionWrapper } from '../MemeCard/style'
import PortalWrapper from '../../../../utils/Portal/PortalWrapper'
import { ThemeContext } from '../../../../providers/ThemeProvider'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const MemeViewer = ({ id, setDisplayPortal }) => {
    const [ loading, setLoading ] = useState(true)
    const [ meme, setMeme ] = useState({name: '', date: '', url: '', comments: [], caption: '', likes: ''})
    const [ commentValue, setCommentValue ] = useState('')

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try{
            const response = await axios.get(`${server_url}/memes/${id}`)
            console.log(response)
            setMeme({...response.data.data})
        }
        catch(err){
            console.log(err)
        }
        setLoading(false)
    }

    const postComment = async () => {
        if(commentValue !== ''){
            const response = await axios.patch(`${server_url}/memes/${id}/comment`, {
                body: commentValue
            })
            let newComments = meme.comments
            newComments.push({body: commentValue, date: new Date()})
            setMeme({...meme, comments: newComments })
            setCommentValue('')
        }
    }


    return(
        <PortalWrapper>
            {!loading && <Wrapper theme={theme}>
                <CloseButton theme={theme}>
                    <IconButton onClick={() => setDisplayPortal(false)}><Close /></IconButton>
                </CloseButton>
                <ImageWrapper theme={theme}>
                    <Image src={meme.url} alt={meme.caption} />
                </ImageWrapper>
                <ContentWrapper>
                    <Header theme={theme} style={{padding: '20px 10px 0px 20px'}} >
                        <span className='avatar'>{meme.name[0]}</span>
                        <span className="name">{meme.name}</span>
                        <div className='dot'></div>
                        <span className="time">{TimeDifference(new Date(meme.date))}</span>
                    </Header>
                    <CaptionWrapper theme={theme} style={{padding: '0px 20px'}} >
                        {meme.caption}
                    </CaptionWrapper>
                    <DetailsWrapper>
                        <span> <span style={{fontWeight: '600'}}>{meme.likes}</span> likes</span>
                        <div className='dot'></div>
                        <span><span style={{fontWeight: '600'}}>{meme.comments.length}</span> comments</span>
                    </DetailsWrapper>
                    <CommentsWrapper>
                        {meme.comments.length > 0 ? meme.comments.map((m, i) => (<Comment key={i}><span className='comment'>{m.body}</span>{` - `}<span className='time'>{TimeDifference(new Date(m.date))}</span></Comment>)): 'No Comments'}
                    </CommentsWrapper>
                    <InputWrapper>
                        <Input name='comment' theme={theme} rows='1' placeholder='Add a comment...' value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                        <PostButton theme={theme} onClick={postComment}>Post</PostButton>
                    </InputWrapper>
                </ContentWrapper>
            </Wrapper>}
        </PortalWrapper>
    )
}

export default MemeViewer