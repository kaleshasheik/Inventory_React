import { actionTypes } from '../common/constants/actionTypes'


interface Iaction{

    type: string
    paylod: any
}

export const inventoryTypesReducer = (state = {}, action: Iaction) => {
  switch (action.type) {
    case actionTypes.LOAD_INVENTORY_TYPES:
      return Object.assign({}, state, {
          inventoryTypes: action.paylod
      })
  }
  return state
}

export const inventoryValuesReducer = (state = {}, action: Iaction) => {
    switch (action.type) {
      case actionTypes.LOAD_INVENTORY:
        return Object.assign({}, state, {
            invValues: action.paylod
        })

        case actionTypes.ADD_INVENTORY_SUCESS:
        return Object.assign({}, state, {
            invValues: action.paylod
        })

        case actionTypes.EDIT_INVENTORY_SUCESS:
        return Object.assign({}, state, {
            invValues: action.paylod
        })

        case actionTypes.DELETE_INVENTORY_SUCESS:
        return Object.assign({}, state, {
            invValues: action.paylod
        })
    }
    return state
  }


  export const inventoryByStatusReducer = (state = {}, action: Iaction) => {
    switch (action.type) {
      case actionTypes.LOAD_INVENTORY_BY_STATUS:
        return Object.assign({}, state, {
            inventories: action.paylod
        })
    }
    return state
  }