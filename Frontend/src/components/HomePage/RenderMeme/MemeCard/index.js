import { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { server_url } from '../../../../data'
import { Wrapper, Header, CaptionWrapper, ImageWrapper, Footer, Button, SampleImageWrapper } from './style'
import { Favorite ,FavoriteBorder, ModeCommentOutlined, BookmarkBorder, Bookmark, Edit } from '@material-ui/icons'
import { ThemeContext } from '../../../../providers/ThemeProvider'
import { TimeDifference } from '../../../../utils/TimeCaculator'
import MemeViewer from '../MemeViewer'
import { IconButton } from '@material-ui/core'
import PortalWrapper from '../../../../utils/Portal/PortalWrapper'
import MemeForm from '../../CreateMeme/CreateMemeForm'

const MemeCard = ({name, caption, url, memeLikes, memeComments, type, id, time, refresh, setRefresh }) => {
    const [loading, setLoading] = useState(true) 
    const [ liked, setLiked ] = useState(false)
    const [likes, setLikes ] = useState(0)
    const [ comments, setComments ] = useState([])
    const [ displyaPortal, setDisplayPortal ] = useState(false)
    const [ displayEdit, setDisplayEdit ] = useState(false)
    const [ saved, setSaved ] = useState(false)

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if(loading){
            if(memeLikes)
                setLikes(likes + memeLikes)
            if(memeComments)
                setComments([...memeComments])
            setLoading(false)
        }
    }, [loading, memeLikes, memeComments])

    const onLikeClick = async () => {
        if(liked){
            setLiked(false);
            setLikes(likes -1);
            // console.log(id)
            try{
                const response = await axios.patch(`${server_url}/memes/${id}/dislike`)
            // console.log(response)
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            setLiked(true);
            setLikes(likes + 1);
            try{
                const response = await axios.patch(`${server_url}/memes/${id}/like`)
                // console.log(response)
            }
            catch(err){
                console.log(err)
            }
        }
    }

    return(
        <>
        {displyaPortal && <MemeViewer id={id} setDisplayPortal={setDisplayPortal} />}
        <Wrapper theme={theme}>
            <Header theme={theme} value={name}>
                <span className="avatar">{name[0]}</span>
                <span className='name'>{name}</span>
                {type === 'meme-render' && <><div className='dot'></div>
                <span className="time">{TimeDifference(new Date(time))}</span>
                <IconButton style={{ marginLeft: 'auto'}} onClick={() => setDisplayEdit(true)}><Edit /></IconButton>
                {displayEdit && <PortalWrapper togglePortal={setDisplayEdit}><MemeForm refresh={refresh} setRefresh={setRefresh} initialData={{ name: name, caption: caption, url: url, id: id}} type='edit' setDisplayPortal={setDisplayEdit} /></PortalWrapper>}
                </>}
            </Header>
            <CaptionWrapper theme={theme} value={caption}>
                {caption}
            </CaptionWrapper>
            {url === '' ? <SampleImageWrapper theme={theme}></SampleImageWrapper>  : <ImageWrapper onDoubleClick={onLikeClick} onClick={() => setDisplayPortal(true)} type={type} src={url} alt={caption} />}
            {type === 'meme-render' && <Footer>
                <Button theme={theme} onClick={onLikeClick}>{liked ? <Favorite style={{ marginRight: '7px', color: 'red'}} /> :<FavoriteBorder style={{ marginRight: '7px'}} />} {likes} like</Button>
                <Button theme={theme} onClick={() => setDisplayPortal(true)} ><ModeCommentOutlined style={{ marginRight: '7px'}} />{comments.length } Comment</Button>
                <Button onClick={() => setSaved(!saved)} theme={theme}>{saved ? <Bookmark style={{ marginRight: '7px'}} />  : <BookmarkBorder style={{ marginRight: '7px'}} />} Save </Button>
            </Footer>}
        </Wrapper>
        </>
    )
}

export default MemeCard