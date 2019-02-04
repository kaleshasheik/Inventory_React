import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { login, resetPassword } from '../actions/loginActions'
import { logout } from '../actions/loginActions'
import  DashBoardPage  from '../components/Dashboard'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { State } from '../reducers'
import LoginForm from '../forms/LoginForm'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextBox from '../core-libs/TextBox'
import IntegrationNotistack from '../core-libs/components/SnackBar'
import { ToastContainer } from "react-toastify"
import '../assests/styles/ReactToastify.css'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import CustomizedSnackbars from '../core-libs/components/SnackBar'


export interface login {

  token: string
  user: any
  loginError: string
}

export interface LoginContainerProps extends RouteComponentProps<any> {
  login: (data: any) => any
  resetPassword: (data: any) => any
  userDetails: login
}

export interface LoginContainerState {
  errorMessage: string,
  isModal: boolean,
  Email: string,
  Password: string,
  ConfirmPassword: string
  variant: string
  message: string
}

class LoginContainer extends React.Component<LoginContainerProps, LoginContainerState> {

  constructor(props: LoginContainerProps) {
    super(props)
    this.state = {
      errorMessage: '',
      isModal: false,
      Email: '',
      Password: '',
      ConfirmPassword:'',
      variant: '',
      message: ''

    }
  }

  onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event!.target) {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

}

  forgotPassword = () => {

    console.log('forgotpwd', this.state)

    // this.props.resetPassword(this.state)

    
    this.setState({
      isModal: !this.state.isModal
    })


    this.props.resetPassword(this.state).then((response: any) => {

      console.log('resetPassword response', response)
      if(response!=null && response.type!=null && response.type === 'USER_RESET_PASSWORD_SUCESS')

      {
        this.props.history.push("/userDashboard")
      }
     
      
    }).catch((error: any) => {
      console.log("Error", error)
    })


  



}

Cancel = () => {

    console.log('forgotpwd Cancel', this.state)

    this.setState({
      isModal: !this.state.isModal
    })
}


  doLogin = (input: any, onlyLogin: boolean) => {
    console.log('LoginContainer: dataFromChild', input)

    if (onlyLogin) {
      this.props.login(input).then((response: any) => {

        console.log('login response', response);
        
        if(response!=null && response.type === 'LOGIN_SUCESS')
        {
         let isFirstLogin = (response.paylod.data.user.map((a:any) => a.is_first_login)).toString()
         let email = (response.paylod.data.user.map((a:any) => a.email)).toString()
          console.log('isFirstLogin ', isFirstLogin)
          this.setState({variant: 'success',message: 'Sucessfully LoggedIn'})

          if(isFirstLogin.toString() === 'true'){
            this.setState({ isModal: true })
            this.setState({ Email: email })
          }
          else{

            this.props.history.push("/userDashboard")
          }

         
        }
        
       else {
        
        this.setState({variant: 'failure',message: 'Sucessfully LoggedIn'})
       }   
        
      }).catch((error: any) => {
        console.log("Error", error)
      })

    }
    else {

   

      this.props.resetPassword(input).then((response: any) => {

        console.log('resetPassword response', response);
        this.props.history.push("/userDashboard")
        
      }).catch((error: any) => {
        console.log("Error", error)
      })


    }

  }

  public render() {
    console.log('this.state.variant',this.state.variant)
    return <div>
     { this.state.variant === 'failure' ? <CustomizedSnackbars type='warning' message='Login Failed' open={true} />: ''}

    
      <LoginForm userDetails={this.props.userDetails} loginError={this.state.errorMessage} loginDetails={this.doLogin} />
    
      <Modal  style={{marginTop: '10%'}} isOpen={this.state.isModal} >
      <ModalHeader>Please reset your Password</ModalHeader>
                    <ModalBody>
                        <TextBox name='Email'  type='email' label='Email Address' variant='outlined' disabled={true} error={''} value={this.state.Email} onChange={this.onTextChange.bind(this)} />
                        <TextBox name='Password' type='password' label='Password' variant='outlined' disabled={false} error={''} value={this.state.Password} onChange={this.onTextChange.bind(this)} />
                        <TextBox name='ConfirmPassword' type='password' label='Confirm Password' variant='outlined' disabled={false} error={''} value={this.state.ConfirmPassword} onChange={this.onTextChange.bind(this)} />

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.forgotPassword.bind(this)} style={{color: 'orange',  borderRadius: '15px',textTransform: 'none'}}>Reset Password</Button>{' '}
                        <Button onClick={this.Cancel.bind(this)} style={{borderRadius: '15px',textTransform: 'none'}} color="secondary" >Cancel</Button>


                    </ModalFooter>
        </Modal>

    </div>
  }
}


const mapStateToProps = (state: State) => {

  console.log('LOGIN CONTAINER', state!.login!.user)

  return {
    userDetails: state!.login!.user

  }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    login: (data: any): any => {
      return login(dispatch, data.Email, data.Password)
    },

    resetPassword: (data: any) => {
     return resetPassword(dispatch, data.Email, data.Password)
    },

  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)


export default withRouter((Login))

