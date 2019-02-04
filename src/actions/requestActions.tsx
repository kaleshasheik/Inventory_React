import { actionTypes } from '../common/constants/actionTypes'
import { Dispatch } from 'redux'
import axios from 'axios'


export let loadRequestsData = (dispatch: Dispatch, empId: string) => {
    const _getRequestsURL = 'http://localhost:8000/api/requests'
    const _getInventoryStatusURL = 'http://localhost:8000/api/inventory'

     console.log('in loadRequestsData', empId)
     axios.all([
        axios.get(_getRequestsURL, {
            params: {
                employee_id: empId
            }
          }),
        axios.get(_getInventoryStatusURL, {
            params: {
                status: 'Available'
            }
          })
      ])
      .then(axios.spread((invData, avaiInv) => {
        
        dispatch({
            type: actionTypes.LOAD_Request_DATA, paylod: {
                 
                data: invData.data
            }
        })
    
        dispatch({
            type: actionTypes.LOAD_INVENTORY_BY_STATUS, paylod: {
               
                data: avaiInv.data
            }
        })
    
      }))
    .catch((error) => {
            console.warn('Failed to modify Request : ', error)
                  
        })
    
    }
    

export let modifyRequest = (dispatch: Dispatch, requestId: any, status: string ,name:string,
                    empId:string, invValue:string, invType:string, reqEmpId:string, serialNo:string, SIMNo:string) => {

    console.log('modify Request ', requestId, status, name,invValue,invType )

    const _modifyInventory = 'http://localhost:8000/api/requests'
  const _getInventoryStatusURL = 'http://localhost:8000/api/inventory'
 
  axios.put(_modifyInventory, {
        
    request_id: requestId, 
    status    : status,
    emp_id: empId,
    invValue: invValue,
    invType: invType,
    
    params: {
        emp_id: empId
    }
    
    
    })
  .then((invData) => {
   
    dispatch({
        type: actionTypes.EDIT_REQUEST_DATA, paylod: {
            
            data: invData.data
        }
    })

    return  axios.get(_getInventoryStatusURL, {
        params: {
            status: 'Available'
        }
      })
  })
  .then((avaiInv) => {
    dispatch({
        type: actionTypes.LOAD_INVENTORY_BY_STATUS, paylod: {
           
            data: avaiInv.data
        }
    })
  })
.catch((error) => {
        console.warn('Failed to modify Request : ', error)
              
    })

}

