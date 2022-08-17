import { useState, useContext } from 'react'
import { Wrapper, Container } from './style'
import PortalWrapper from '../../../utils/Portal/PortalWrapper'
import { Create } from '@material-ui/icons'
import { ThemeContext } from '../../../providers/ThemeProvider'

import MemeForm from './CreateMemeForm'

const CreateMeme = ({ refresh, setRefresh }) => {
    const [ displayPortal, setDisplayPortal ] = useState(false)
    const { theme } = useContext(ThemeContext)

    return (
        <>
        {displayPortal && <PortalWrapper togglePortal={setDisplayPortal}><MemeForm refresh={refresh} setRefresh={setRefresh} setDisplayPortal={setDisplayPortal} type="create" /></PortalWrapper>}
        <Wrapper theme={theme} onClick={() => {setDisplayPortal(!displayPortal); console.log(displayPortal)}}>
            <Container>
                <Create  style={{marginRight: '10px'}} />
                Create Meme
            </Container>
        </Wrapper>
        </>
    )
}

export default CreateMeme