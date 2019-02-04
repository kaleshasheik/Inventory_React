import { actionTypes } from '../common/constants/actionTypes'
import { Dispatch } from 'redux'
import axios from 'axios'


export let loadInventoryTypes = (dispatch: Dispatch) => {
    const _getInventoryTypesURL = 'https://api.myjson.com/bins/f1sto'
    axios.get(_getInventoryTypesURL).then(({ data }) => {
        
        dispatch({
            type: actionTypes.LOAD_INVENTORY_TYPES, paylod: {
               
                data
            }
        })
    }).catch((error) => {
        console.warn('error', error)
    })

}



export let loadInventories = (dispatch: Dispatch) => {
    const _getInventoryTypesURL = 'http://localhost:8000/api/inventory'
    axios.get(_getInventoryTypesURL).then(({ data }) => {
        
        dispatch({
            type: actionTypes.LOAD_INVENTORY, paylod: {
               
                data
            }
        })
    }).catch((error) => {
        console.warn('error', error)
    })

}

export let loadInvByStatus = (dispatch: Dispatch) => {
    const _getInventoryStatusURL = 'http://localhost:8000/api/inventory'
    axios.get(_getInventoryStatusURL, {
        params: {
            status: 'Available'
        }
      })
    
    .then(({ data }) => {
        
        dispatch({
            type: actionTypes.LOAD_INVENTORY_BY_STATUS, paylod: {
               
                data
            }
        })
    }).catch((error) => {
        console.warn('error', error)
    })

}


export let addInventory = (dispatch: Dispatch, data: any ) => {
    const _getInventoryTypesURL = 'http://localhost:8000/api/inventory'

    console.log('addInventory ', data.SIM)
    var SIM = null
    if(data.InventoryType !=null && data.InventoryType === 'DataCard'){
        SIM = data.SIM
    }

    console.log('addInventory SIM', data.SIM)



    axios.post(_getInventoryTypesURL, {
        
        product_type: data.InventoryType,
        model:data.Model,
        serial_no: data.SerialNo,
        sim_no: SIM
 
        
        }).then(({ data }) => {

            console.log('addUserAction data', data)
      
        
        dispatch({
            type: actionTypes.ADD_INVENTORY_SUCESS, paylod: {
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to Create Inventory : ', error)
              
    })

}


export let editInventory = (dispatch: Dispatch, data: any ) => {
    const _getInventoryTypesURL = 'http://localhost:8000/api/inventory'

    console.log('editInventory ', data)

    var SIM = null
    if(data.InventoryType !=null && data.InventoryType === 'DataCard'){
        SIM = data.SIM
    }

    axios.put(_getInventoryTypesURL, {
        
        product_type: data.InventoryType,
        model:data.Model,
        serial_no: data.SerialNo,
        sim_no: data.SIM,
        
        }).then(({ data }) => {

        
        dispatch({
            type: actionTypes.EDIT_INVENTORY_SUCESS, paylod: {
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to update Inventory : ', error)
              
    })

}


export let deleteInventory = (dispatch: Dispatch, data: any ) => {
    const _getInventoryTypesURL = 'http://localhost:8000/api/inventory'

    console.log('deleteInventory ', data)
    axios.delete(_getInventoryTypesURL, {data:{serial_no: data.serial_no}}).then(({ data }) => {

            console.log('deleteInventory data', data)
        let { token, user } = data
        
        dispatch({
            type: actionTypes.DELETE_INVENTORY_SUCESS, paylod: {
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to delete Inventory : ', error)
              
    })

}