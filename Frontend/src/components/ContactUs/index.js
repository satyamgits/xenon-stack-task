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

const ContactUs = () => {
    const [ loading, setLoading ] = useState(false)
    const [ response, setResponse ] = useState('')
    const [ errorResponse, setErrorResponse ] = useState(false)
    const [ formValues, setFormValues ] = useState({name: '', email: '', heading: '', description: ''})
    const [ error, setError ] = useState({ name: false, email: false })
    const { theme } = useContext(ThemeContext)

    const navigate = useNavigate()

    const {state, login} = useContext(AuthContext)

    useEffect(() => {
        if(!state.isLoggedIn) navigate('/')
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
        if(formValues.name !== '' && formValues.email !== '' && loading === false){
            setErrorResponse(false)
            setResponse('')
            setLoading(true)
            try{
                const response = await axios.post(`${server_url}/contact`,{...formValues}, {headers: {'Authorization': `Bearer ${state.token}`}})
                console.log(response.data)
                setResponse(`Query Submitted`)
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

    // if(state.isLoggedIn){

    // }

    return(
        <Wrapper>
            <div style={{ width: '100%', marginTop: '20px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <h1>Contact Us</h1>
            </div>
            <div>
                <Form>
                    <Input id='name' label='Name' theme={theme} error={error.name} required   type='text' name='name' value={formValues.name} onChange={(e) => handleValueChange(e)}/>
                    <Input id='email' label='Email' theme={theme} error={error.email} required   type='text' name='email' value={formValues.email} onChange={(e) => handleValueChange(e)}/>
                    <Input id='heading' label='Heading' theme={theme} error={error.heading} required   type='text' name='heading' value={formValues.heading} onChange={(e) => handleValueChange(e)}/>
                    <Input id='desc' label='Description' theme={theme} error={error.description} required  multiline type='text' name='description' value={formValues.description} onChange={(e) => handleValueChange(e)}/>
                    <Button fullWidth variant='contained' color='primary' disabled={loading} onClick={handleFormSubmit} >Submit</Button>
                    <div style={{ marginTop: '20px', fontSize: '12px'}}>
                        *our team will contact you
                    </div>
                </Form>
            </div>
            {errorResponse && <div style={{ width: '100%', marginTop: '30px', backgroundColor: 'red', color: 'white', textAlign: 'certer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 10px', borderRadius: '5px'}}>
                {response}
            </div>}
            {response && !errorResponse && <div style={{ width: '100%', marginTop: '30px', backgroundColor: 'green', color: 'white', textAlign: 'certer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 10px', borderRadius: '5px'}}>
                {response}. Our Team will reach out to you soon.
            </div>}
        </Wrapper>
    )
}

export default ContactUs