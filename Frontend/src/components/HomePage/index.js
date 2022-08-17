import { setRef } from '@material-ui/core'
import { useNavigate } from '@reach/router'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Context } from '../../providers/AuthContext'
import CreateMeme from './CreateMeme'
import RenderMeme from './RenderMeme'
import { Wrapper } from './style'

const HomePage = () => {
    const [ refresh, setRefresh ] = useState(false)

    const {state} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if(!state.isLoggedIn) navigate('/')
    }, [state])

    return(
        <Wrapper>
            <CreateMeme refresh={refresh} setRefresh={setRefresh} />
            <RenderMeme refresh={refresh} setRefresh={setRefresh} />
        </Wrapper>
    )
}

export default HomePage