import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Wrapper, Logo } from './style'
import ToggleTheme from './ToggleTheme'
import { Context as AuthContext } from '../../providers/AuthContext'
import { IconButton } from '@material-ui/core'
import { Help, Power, PowerSettingsNew } from '@material-ui/icons'
import { Link, navigate } from '@reach/router'

const Header = () => {
    const {loadInitialData, logout, state} = useContext(AuthContext)

    useEffect(() => {
        loadInitialData()
    }, [])
    return(
        <Wrapper>
            <Link to='/home' style={{ flex: 1, display: 'flex'}}>
            <Logo>
                <span className="large">X</span>
                <span className="small">meme</span>
            </Logo>
            </Link>
            <ToggleTheme />
            {state.isLoggedIn && <IconButton onClick={() => navigate('contactus')} aria-label='help' title='help' >
                <Help style={{ color: 'rgb(145,145,145)'}} />
            </IconButton>}
            {state.isLoggedIn && <IconButton onClick={() => logout()} aria-label='logout' title='logout' >
                <PowerSettingsNew style={{ color: 'rgb(145,145,145)'}} />
            </IconButton>}
        </Wrapper>
    )
}

export default Header;