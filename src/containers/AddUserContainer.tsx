import * as React from 'react'

import  NewUserForm  from '../forms/NewUserForm'
import { withRouter , RouteComponentProps} from 'react-router-dom'
import { State } from '../reducers'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {addUserAction} from '../actions/userActions'
import {editUser} from '../actions/userActions'
import {loadUsers} from '../actions/userActions'
import {deleteUser} from '../actions/userActions'
import  TableData  from '../core-libs/TableHeader'
import * as _ from 'lodash'
import MaterialTable from 'material-table'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ButtonBox from '../core-libs/ButtonBox'
import { withStyles, Theme, createStyles} from '@material-ui/core/styles'
import CustomizedSnackbars from '../core-libs/components/SnackBar'
import Users from '../components/Users'

const userHeaders = [{"name":"User Name","prop":"name"},{"name":"Email","prop":"email"},{"name":"Employee Id","prop":"employee_id"},
                       {"name":"Contact No","prop":"contact_number"}, {"name":"Role","prop":"role"}]

export interface AddUserProps extends RouteComponentProps<any> { 

  addUser: (data:any) => void
  editUser: (data:any) => void
  deleteUser: (data:any) => void
  loadUsers: () => void
    data: any
    allusers: any
    classes? :any

}

export interface AddUserState { 

  dialogOpen: boolean
  action?: string

}





const styles = (theme:Theme) => createStyles({
 
    submit: {
      marginTop: -17 ,
      backgroundColor: 'darkorange',
      color: 'white',
     
      borderRadius: '12px',
     
      textTransform: 'none',
      bottom: '20px'
    },
   
})




 class AddUserContainer extends React.Component<AddUserProps, AddUserState> {

  constructor(props: AddUserProps) {
    super(props)
    this.state = {
      dialogOpen: false,
      action: ''
    }
}


  componentWillMount(){

    console.log('componentWillMount new user')

     this.props.loadUsers()

  }

    handleRequest = (input:any, action: string) => {
        console.log('AddNewUserContainer: dataFromChild', input, action )

        this.setState({action: action})
        if(action!=null && action === 'Add')
        {
        this.props.addUser(input)
        }
        else if(action!=null && action === 'Edit')
        {
        this.props.editUser(input)
        }
        else if(action!=null && action === 'Delete')
        {
          console.log('delete user ', input)
        this.props.deleteUser(input)
        }

    }

    



    render() {

        if(this.props.allusers && this.props.allusers != undefined  && _.size(this.props.allusers.data)> 0 ){
          var userArray = Object.keys(this.props.allusers.data).map(i => this.props.allusers.data[i])
          console.log('AddNewUserContainer all users ', userArray)
        }

        return  <div>
 
           { this.state.action === 'Add' ? <CustomizedSnackbars type='success' message='New User Creation was Sucessful'/>: ''}   
             { this.state.action === 'Edit'   ? <CustomizedSnackbars type='success' message= 'User details Updated Successfully'/>: ''}   
             { this.state.action === 'Delete'   ? <CustomizedSnackbars type='success' message= 'User Deleted Successfully'/>: ''}   

            <Users userArray= {userArray} newUserDetails={this.handleRequest}/>

        </div>
    }
}

const mapStateToProps = (state: State) => {
  
  console.log('all users', state!.users!.users)

    return {
      allusers: state!.users!.users
    }
  }
  
  const mapDispatchToProps = (dispatch: Dispatch) => {

    return {
      addUser: (data:any) => {
        addUserAction(dispatch, data)
      },
      loadUsers: () => {
        loadUsers(dispatch)
      },
      editUser: (data:any) => {
        editUser(dispatch, data)
      },
      deleteUser: (data:any) => {
        deleteUser(dispatch, data)
      },

    }
  }

const addUser = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddUserContainer)

  

  export default withRouter(withStyles(styles)(addUser))

