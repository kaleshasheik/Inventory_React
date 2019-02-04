import { actionTypes } from '../common/constants/actionTypes'
import {login} from '../containers/LoginContainer'


interface Iaction{

    type: string
    paylod: login
}

export const userReducer = (state = {}, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_USER_SUCESS:
      return Object.assign({}, state, {
        users: action.paylod
      })


      case actionTypes.FETCH_ALL_USERS:
      return Object.assign({}, state, {
       
          users: action.paylod
      })

      case actionTypes.EDIT_USER_SUCESS:
      return Object.assign({}, state, {
       
          users: action.paylod
      })

      case actionTypes.DELETE_USER_SUCESS:
      return Object.assign({}, state, {
       
        users: action.paylod
      })


      }
  return state
}

