import { actionTypes } from '../common/constants/actionTypes'
import {login} from '../containers/LoginContainer'
import SnackBar from '../core-libs/components/SnackBar'


interface Iaction{

    type: string
    paylod: login
}

export const loginReducer = (state = {}, action: Iaction) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_SUCESS:

              
      return Object.assign({}, state, {
        
          user: action.paylod
      })

      case actionTypes.USER_RESET_PASSWORD_SUCESS:

      return Object.assign({}, state, {
          user: action.paylod
      })

      case actionTypes.USER_LOGOUT:
        console.log('logout ')
      return Object.assign({}, state, {
          user: null

      })



      }

     
       
          
  return state
}

