import { actionTypes } from '../common/constants/actionTypes'


export const requestReducer = (state = {}, action: any) => {
  switch (action.type) {
    case actionTypes.LOAD_Request_DATA:
      return Object.assign({}, state, {
          requestTable: action.paylod
      })

      case actionTypes.EDIT_REQUEST_DATA:
      return Object.assign({}, state, {
        requestTable: action.paylod
      })

  }
  return state
}

