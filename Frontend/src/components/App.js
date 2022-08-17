import React from 'react'
import { Layout } from './Layout'
import { Router } from '@reach/router'
import ThemeProvider from '../providers/ThemeProvider'
import { Provider as AuthProvider } from '../providers/AuthContext'
import { Wrapper } from './style'


import Header from './header'
import HomePage from './HomePage'
import Login from './Login'
import Signup from './Signup'
import ContactUs from './ContactUs'

const NotFound = () => (
  <div>Sorry, nothing here.</div>
)

const App = () => {
  return (
    <>
    <ThemeProvider>
      <AuthProvider>
      <Layout />
      <Wrapper>
        <Header />
        <Router>
          <Login path='/' />
          <Signup path='/signup' />
          <HomePage path='/home' />
          <ContactUs path='/contactus' />
          <NotFound default />
        </Router>
      </Wrapper>
      </AuthProvider>
    </ThemeProvider>
    </>
  );
}

export default App;
