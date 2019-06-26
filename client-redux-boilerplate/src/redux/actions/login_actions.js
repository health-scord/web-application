import { createAction } from 'redux-starter-kit'


// actions
const load = createAction('login/load')

// saga triggers

// api actions

const LOGIN = {
  LOAD: load
}

export default LOGIN