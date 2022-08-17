import { Button } from '@material-ui/core';
import { Link, useNavigate } from '@reach/router';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { server_url } from '../../data';
import { ThemeContext } from '../../providers/ThemeProvider';
import Input from '../common/Input';
import { Form, Heading, Wrapper } from './style';
import { Context as AuthContext } from '../../providers/AuthContext'
import { useEffect } from 'react';
// import { useNavigate } from "@reach/router"
// import { navigate } from '@reach/router';

const Login = () => {
    const [ loading, setLoading ] = useState(false)
    const [ response, setResponse ] = useState('')
    const [ errorResponse, setErrorResponse ] = useState(false)
    const [ formValues, setFormValues ] = useState({username: '', password: ''})
    const [ error, setError ] = useState({ username: false, password: false })
    const { theme } = useContext(ThemeContext)

    const navigate = useNavigate()

    const {state, login} = useContext(AuthContext)

    useEffect(() => {
        if(state.isLoggedIn) navigate('/home')
    }, [state])

    // console.log(state)
    
    const handleValueChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if(value === ''){
            setError({...error, [name]: true})
        }else{
            setError({...error, [name]: false})
        }
        
        setFormValues({...formValues, [name]: value})
    }

    const handleFormSubmit = async () => {
        if(formValues.username !== '' && formValues.password !== '' && loading === false){
            setErrorResponse(false)
            setResponse('')
            setLoading(true)
            try{
                const response = await axios.post(`${server_url}/login`,{...formValues})
                console.log(response.data)
                setResponse(`Logged In`)
                login(response.data.token)
                setLoading(false)
                navigate('/home')
            }
            catch(err){
                setErrorResponse(true)
                console.log(err.response.data)
                setResponse(`${err.response.data.msg}`)
                setLoading(false)
            }
            
        }
    }

    // if(state.isLoggedIn){

    // }

    return(
        <Wrapper>
            <div style={{ width: '100%', marginTop: '20px'}}>
                <h1>Welcome to Meme Forum</h1>
            </div>
            <div>
                <Form>
                    <Heading>
                        Login
                    </Heading>
                    <Input id='username' label='Username' theme={theme} error={error.username} required   type='text' name='username' value={formValues.username} onChange={(e) => handleValueChange(e)}/>
                    <Input id='password' label='Password' theme={theme} error={error.password} required   type='password' name='password' value={formValues.password} onChange={(e) => handleValueChange(e)}/>
                    <Button variant='contained' color='primary' disabled={loading} onClick={handleFormSubmit} >Login</Button>
                    <div style={{ marginTop: '20px'}}>
                        Don't have account? <Link to='/signup' style={{ textDecoration: 'none', color: '#66bd88' }} >sign up</Link>
                    </div>
                </Form>
            </div>
            {errorResponse && <div style={{ width: '100%', marginTop: '30px', backgroundColor: 'red', color: 'white', textAlign: 'certer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 10px', borderRadius: '5px'}}>
                {response}
            </div>}
        </Wrapper>
    )
}

export default Login