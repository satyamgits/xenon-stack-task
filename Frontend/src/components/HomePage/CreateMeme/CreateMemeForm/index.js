import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { server_url } from '../../../../data'
import { Wrapper, Header, H1, Form, BodyWrapper, MemePreview, Footer, Button, Container } from './style'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { ThemeContext } from '../../../../providers/ThemeProvider'
import Input from '../../../common/Input'
import MemeCard from '../../RenderMeme/MemeCard'

const MemeForm = ({ setDisplayPortal, refresh , setRefresh, initialData, type }) => {
    const [ loading, setLoading ] = useState(false)
    const [ response, setResponse ] = useState('')
    const [ errorResponse, setErrorResponse ] = useState(false)
    const [ formValues, setFormValues ] = useState({name: '', caption: '', url: ''})
    const [ error, setError ] = useState({ name: false, caption: false, url: false })
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if(initialData){
            setFormValues({...initialData})
        }
    }, [])

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
        const{ name, caption, url } = formValues
        if(name !== '' && caption !== '' && url !=='' && loading === false){
            setErrorResponse(false)
            setResponse('')
            setLoading(true)
            if(type === 'edit'){
                try{
                    const response = await axios.patch(`${server_url}/memes/${initialData.id}`,{...formValues})
                    console.log(response)
                    setResponse(`Meme updated`)
                    setLoading(false)
                    if(!refresh) setRefresh(true)
                }
                catch(err){
                    setErrorResponse(true)
                    // console.log(err.response.data)
                    setResponse(`${err.response.data.msg}`)
                    setLoading(false)
                }
            }
            else{
                try{
                    const response = await axios.post(`${server_url}/memes`,{...formValues})
                    console.log(response)
                    setResponse(`Meme created with id: ${response.data.id}`)
                    setLoading(false)
                    if(!refresh) setRefresh(true)
                }
                catch(err){
                    setErrorResponse(true)
                    // console.log(err.response.data)
                    setResponse(`Meme already exist with meme id: ${err.response.data.id}`)
                    setLoading(false)
                }
            }
            
        }
    }

    return(
        <Wrapper theme={theme}>
            <Header>
                <H1>Create Meme</H1>
                <IconButton onClick={() => {if(!loading)setDisplayPortal(false);}}><Close style={theme==='light'? {color: 'black'}: {color: 'white'}} /> </IconButton>
            </Header>
            <BodyWrapper>
                <Form>
                    <Input id='name' label='Name' theme={theme} error={error.name} required   type='text' name='name' value={formValues.name} onChange={(e) => handleValueChange(e)}/>
                    <Input id='caption' label='Caption' theme={theme} error={error.caption} required type='text' name='caption' value={formValues.caption} onChange={(e) => handleValueChange(e)}/>
                    <Input id='url' label='URL' theme={theme} error={error.url} required type='text' name='url' value={formValues.url} onChange={(e) => handleValueChange(e)}/>
                    {loading && <Container>Loading...</Container>}
                    {response !== '' && <Container error={errorResponse}>{response}</Container>}
                </Form>
                <MemePreview>
                    <MemeCard name={formValues.name} caption={formValues.caption} url={formValues.url} type='meme-preview' />
                </MemePreview>
            </BodyWrapper>
            <Footer>
                <Button variant='outlined' onClick={() => {if(!loading)setDisplayPortal(false)}}>Cancel</Button>
                <Button variant='contained' onClick={handleFormSubmit}>{type === 'edit' ? 'Edit' : 'Create'}</Button>
            </Footer>
        </Wrapper>
    )
}

export default MemeForm