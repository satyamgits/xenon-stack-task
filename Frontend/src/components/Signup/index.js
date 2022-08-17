import { Button } from '@material-ui/core';
import { Link } from '@reach/router';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { server_url } from '../../data';
import { Context } from '../../providers/AuthContext';
import { ThemeContext } from '../../providers/ThemeProvider';
import Input from '../common/Input';
import { Form, Heading, Wrapper } from './style';

const Signup = () => {
    const [ loading, setLoading ] = useState(false)
    const [ response, setResponse ] = useState('')
    const [ errorResponse, setErrorResponse ] = useState(false)
    const [ formValues, setFormValues ] = useState({name: '', username: '', email: '', password: ''})
    const [ error, setError ] = useState({ username: false, name: false, email: false, password: false })
    const { theme } = useContext(ThemeContext)

    const state= useContext(Context)

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
        if(formValues.username !== '' && formValues.password !== '' && formValues.email !== '' && formValues.name !== ''&& loading === false){
            setErrorResponse(false)
            setResponse('')
            setLoading(true)
            try{
                const response = await axios.post(`${server_url}/register`,{...formValues}, {headers: {'Authorization': `Bearer ${state.token}`}})
                console.log(response)
                setResponse(`User Created`)
                setLoading(false)
            }
            catch(err){
                setErrorResponse(true)
                console.log(err.response.data)
                setResponse(`${err.response.data.msg}`)
                setLoading(false)
            }
            
        }
    }

    return(
        <Wrapper>
            <div style={{ width: '100%', marginTop: '20px'}}>
                <h1>Sign Up for Meme Forum</h1>
            </div>
            <div>
                <Form>
                    {/* <Heading>
                        Login
                    </Heading> */}
                    <Input id='name' label='Name' theme={theme} error={error.name} required   type='text' name='name' value={formValues.name} onChange={(e) => handleValueChange(e)}/>
                    <Input id='username' label='Username' theme={theme} error={error.username} required   type='text' name='username' value={formValues.username} onChange={(e) => handleValueChange(e)}/>
                    <Input id='email' label='Email' theme={theme} error={error.email} required   type='text' name='email' value={formValues.email} onChange={(e) => handleValueChange(e)}/>
                    <Input id='password' label='Password' theme={theme} error={error.password} required   type='password' name='password' value={formValues.password} onChange={(e) => handleValueChange(e)}/>
                    <Button fullWidth variant='contained' color='primary' disabled={loading} onClick={handleFormSubmit} >Sign Up</Button>
                    <div style={{ marginTop: '20px'}}>
                        Already had account? <Link to='/' style={{ textDecoration: 'none', color: '#66bd88' }} >Login</Link>
                    </div>
                </Form>
            </div>
            {errorResponse && <div style={{ width: '100%', marginTop: '30px', backgroundColor: 'red', color: 'white', textAlign: 'certer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 10px', borderRadius: '5px'}}>
                {response}
            </div>}
            {response && !errorResponse && <div style={{ width: '100%', marginTop: '30px', backgroundColor: 'green', color: 'white', textAlign: 'certer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 10px', borderRadius: '5px'}}>
                {response} 
            </div>}
        </Wrapper>
    )
}

export default Signup