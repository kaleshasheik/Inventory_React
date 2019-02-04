import { actionTypes } from '../common/constants/actionTypes'
import { Dispatch } from 'redux'
import axios from 'axios'


export let loadDashboardData = (dispatch: Dispatch, empId: string, role: string) => {
    const _getDashBoardURL = 'http://localhost:8000/api/requestInventory'
     console.log('in dashboard action', empId, role)
    axios.get(_getDashBoardURL, {
        params: {
            employee_id: empId,
            role: role

        }
      }).then(({ data }) => {
        let { headers, colummns } = data
        dispatch({
            type: actionTypes.LOAD_DASHBOARD_TABLE, paylod: {
                 
                data
            }
        })
    }).catch((error) => {
        console.warn('error', error)
    })

}


export let modifyInventory = (dispatch: Dispatch, requestId: any, status: string ,empId:string, role: string) => {
    const _modifyInventory = 'http://localhost:8000/api/requestInventory'

    console.log('modifyInventory ', requestId, status, empId, role)
    axios.put(_modifyInventory, {
        
        request_id: requestId, 
        status    : status,
        employee_id: empId, 
        role: role
        
        
        }).then(({ data }) => {

            console.log('Dashboardactions: modify data', data)
       
        dispatch({
            type: actionTypes.LOAD_DASHBOARD_TABLE, paylod: {
                 
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to modify Inventory Request : ', error)
              
    })

}
