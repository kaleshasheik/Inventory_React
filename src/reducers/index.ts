import { combineReducers } from 'redux'
import { InventoryEntity } from '../model'
import {inventoryReducer} from './requestInventory'
import {dashboardReducer} from './dashboardReduce'
import {dashboardData} from '../containers/DashboardContainer'
import { loginReducer } from './loginReducer'
import { inventoryTypesReducer, inventoryValuesReducer , inventoryByStatusReducer} from './inventoryReduce'
import { userReducer } from  './userReducer'
import { requestReducer } from  './requestReducer'


export interface State {
  inventory: any
  dashboard: any
  login: any
  invTypes: any
  users: any
  requests: any
  invValues: any
  inventories: any
}

export const state = combineReducers<State>({
    inventory: inventoryReducer,
    dashboard: dashboardReducer,
    login: loginReducer,
    invTypes: inventoryTypesReducer,
    invValues: inventoryValuesReducer,
    users: userReducer,
    requests: requestReducer,
    inventories: inventoryByStatusReducer,
})