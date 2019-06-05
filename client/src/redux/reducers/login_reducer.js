import LOGIN from '../actions/login_actions'

import { createReducer } from 'redux-starter-kit'


const initialState = {
  isAuthenticated: false
};

const loginReducer = createReducer(initialState,{
  [LOGIN.LOAD]: (state,action) => {
      return {
        ...state,
        isAuthenticated: action.payload
      }
    }
  })

export default loginReducer