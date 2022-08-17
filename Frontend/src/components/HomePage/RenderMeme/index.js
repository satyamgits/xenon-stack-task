import { useState, useEffect } from 'react'
import axios from 'axios'
import { server_url } from '../../../data'
import MemeCard from './MemeCard'
import { Wrapper } from './style'
import Loader from '../../../utils/Loader'

const RenderMeme = ({ refresh, setRefresh }) => {
    const [ loading, setLoading ] = useState(true)
    const [ memes, setMemes ] = useState([])

    useEffect(() => {
            getData()
    }, [])

    useEffect(() => {
        if(refresh)
            getData()
            setRefresh(false)
    }, [refresh])

    const getData = async () => {
        let data = [];
        try{
            const response = await axios.get(`${server_url}/memes`)
            data = response.data.data
            data.reverse()
            // console.log(data)
        }
        catch(err){
            console.log(err)
        }
        setMemes([...data])
        setLoading(false)
    }

    return(
        <Wrapper>
            {loading ? <Loader /> : memes.map((meme, index) => (
                <MemeCard key={index} refresh={refresh} setRefresh={setRefresh} type='meme-render' id={meme._id} time={meme.date} name={meme.name} caption={meme.caption} url={meme.url} memeLikes={meme.likes} memeComments={meme.comments} />
            ))}
        </Wrapper>
    )
}

export default RenderMeme