
import { actionTypes } from '../common/constants/actionTypes'


interface Iaction{

    type: string
    paylod: any
}

export const inventoryReducer = (state = {}, action: Iaction) => {
  switch (action.type) {
    case actionTypes.REQUEST_INVENTORY_SUCESS:
      return Object.assign({}, state, {
        dashboardTable: action.paylod
      })

      }
  return state
}


