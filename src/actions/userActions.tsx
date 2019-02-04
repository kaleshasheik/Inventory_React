import { actionTypes } from '../common/constants/actionTypes'
import { Dispatch } from 'redux'
import axios from 'axios'
import { Redirect } from 'react-router';



export let loadUsers = (dispatch: Dispatch ) => {
    const _userURL = 'http://localhost:8000/api/user'

    console.log('geta all user ')
    axios.get(_userURL, {
        
            
        
        }).then(({ data }) => {

            console.log('addUserAction data', data)
        let {  users } = data
        
        dispatch({
            type: actionTypes.FETCH_ALL_USERS, paylod: {
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to Create user : ', error)
              
    })

}




export let addUserAction = (dispatch: Dispatch, data: any ) => {
    const _userURL = 'http://localhost:8000/api/user'

    console.log('new user ', data)
    axios.post(_userURL, {
        
        employee_id: data.UserId,
        name: data.Name, 
        email: data.MailId,
        contact_number: data.ContactNumber,
        role: data.Role,
        password: '0000' //setting dummy password
       
        
        }).then(({ data }) => {

            console.log('addUserAction data', data)
      
        
        dispatch({
            type: actionTypes.ADD_USER_SUCESS, paylod: {
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to Create user : ', error)
              
    })

}


export let editUser = (dispatch: Dispatch, data: any ) => {
    const _userURL = 'http://localhost:8000/api/user'

    console.log('edit user ', data)
    axios.put(_userURL, {
        
        employee_id: data.UserId,
        name: data.Name, 
        email: data.MailId,
        contact_number: data.ContactNumber,
        role: data.Role,
       
        
        }).then(({ data }) => {

        
        dispatch({
            type: actionTypes.EDIT_USER_SUCESS, paylod: {
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to update user : ', error)
              
    })

}


export let deleteUser = (dispatch: Dispatch, data: any ) => {
    const _userURL = 'http://localhost:8000/api/user'

    console.log('new user ', data)
    axios.delete(_userURL, {data:{email: data.email}}).then(({ data }) => {

            console.log('deleteUser data', data)
        let { token, user } = data
        
        dispatch({
            type: actionTypes.DELETE_USER_SUCESS, paylod: {
                data
            }
        })
       

    }).catch((error) => {
        console.warn('Failed to Create user : ', error)
              
    })

}





