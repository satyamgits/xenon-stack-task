import createContext from './createContext'

const authReducer = (state, action) => {
  switch(action.type){
    case 'login':
      window.localStorage.setItem('authToken', action.payload);
      return {...state, isLoggedIn: true, token: action.payload}
    case 'logout':
      window.localStorage.setItem('authToken', '');
      return {...state, isLoggedIn: false, token: ''}
    default:
      return state
  }
}

const login = dispatch => (data) => {
  dispatch({type: 'login', payload: data})
}

const logout = dispatch => () => {
  dispatch({type: 'logout', payload: {}})
}

const loadInitialData = dispatch => () => {
  const localToken = window.localStorage.getItem('authToken');
  if(localToken){
    dispatch({type: 'login', payload: localToken})
  }
}

export const { Provider, Context } = createContext(
  authReducer,
  { login, logout, loadInitialData},
  {
    isLoggedIn: false, token: ''
  }
)

