import { actionTypes } from '../common/constants/actionTypes'
import {dashboardData} from '../containers/DashboardContainer'


interface Iaction{

    type: string
    paylod: dashboardData
}

export const dashboardReducer = (state = {}, action: any) => {
  switch (action.type) {
    case actionTypes.LOAD_DASHBOARD_TABLE:
      return Object.assign({}, state, {
          dashboardTable: action.paylod
      })
  }
  return state
}

