import { actionTypes } from '../common/constants/actionTypes'
import { Dispatch } from 'redux'
import axios from 'axios'
import { Redirect } from 'react-router';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export let login = (dispatch: Dispatch, user: string, pass: string) => {
    const _loginURL = 'http://localhost:8000/api/login'
    return axios.post(_loginURL, {

        email: user,
        password: pass

    }).then(({ data }) => {

        console.log('login data', data)
        let { token, user } = data

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', user);

        

        return dispatch(
            {
            type: actionTypes.LOGIN_USER_SUCESS, paylod: {
                data
            }
        }
        
        )



    }).catch((error) => {
        console.warn('Login error', error)
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        let loginError = 'Login Failed'
        let token = null
        let user = null
        return  dispatch({
            type: actionTypes.LOGIN_USER_FAILED, paylod: {

                loginError,
                token,
                user
            }
        })

    })

}

export let logout = (dispatch: Dispatch) => {

    return dispatch({
        type: actionTypes.USER_LOGOUT, paylod: {
            users: null
        }
    })

    
}


export let resetPassword = (dispatch: Dispatch, user: string, pass: string) => {
    const _resetPasswordURL = 'http://localhost:8000/api/resetPassword'
    return axios.put(_resetPasswordURL, {

        email: user,
        password: pass,
        is_first_login: false

   
    }).then(({ data }) => {


        return dispatch({
            type: actionTypes.USER_RESET_PASSWORD_SUCESS, paylod: {
                data
            }
        })


    }).catch((error) => {
        console.warn('resetPassword error', error)

        return dispatch({
            type: actionTypes.USER_RESET_PASSWORD_FAILED, paylod: {


            }
        })

    })

}

