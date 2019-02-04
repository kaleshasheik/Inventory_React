import { actionTypes } from '../common/constants/actionTypes'
import { Dispatch } from 'redux'
import axios from 'axios'
import { Redirect } from 'react-router';


export let requestInventory = (dispatch: Dispatch, data: any, user:any ) => {
    const _requestInventoryURL = 'http://localhost:8000/api/requestInventory'

    console.log('request inv ', user)
    axios.post(_requestInventoryURL, {
        
        employee_id: user.employee_id, 
        name: user.name, 
        type: data.Inventory,
        startDate: data.StartDate,
        endDate: data.EndDate,
        reason: data.Reason,
        role: user.role
        
        }).then(({ data }) => {

            console.log('requestInventory data', data)
                
        dispatch({
            type: actionTypes.REQUEST_INVENTORY_SUCESS, paylod: {
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to Create Inventory Request with: ', error)
              
    })

}

