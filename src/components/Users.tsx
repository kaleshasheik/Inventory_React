
import * as React from 'react'

import  TableData  from '../core-libs/TableHeader'

import {dashboardData} from '../containers/DashboardContainer'
import Grid from '@material-ui/core/Grid';
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
import NewUserForm from '../forms/NewUserForm'
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/lightGreen'
import CustomizedSnackbars from '../core-libs/components/SnackBar'


export interface userProps {
   
    userArray: any
    classes: any
    newUserDetails?: any
 }

 export interface userState {
    dialogOpen: boolean
    userRowData: any
    action: string
    formSubmit?: boolean
 }

 const theme = createMuiTheme({
    overrides: {
        MuiTableHead: {
          root: {
            background: 'linear-gradient(45deg, #ffa64d 30%, #ffa64d 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          }
        }
      },
      palette: {
        primary: green,
        
         
      },
   
    typography: { useNextVariants: true },
  })
  
  
  const styles = (theme:Theme) => createStyles({
   
      submit: {
        marginTop: -17 ,
        backgroundColor: '#7e84a8',
        color: 'white',
       width: '13%',
        borderRadius: '10px',
       
        textTransform: 'none',
        bottom: '20px'
      },
      modal: {
        marginTop: theme.spacing.unit * 16,
    },
    close: {

        marginLeft: theme.spacing.unit * 56,
    },
    root: {
       
       marginTop: '10%' ,
        marginLeft: '25%',
        
        overflowX: 'visible',
        bottom: '20px',
       marginBottom: '50px',
       maxWidth: '65%'
      
      },
  })

 class Users extends React.Component<userProps, userState> {
    constructor(props: userProps) {
        super(props)
        this.state = {
          dialogOpen: false,
          userRowData: [],
          action: '',
          formSubmit: false

        }
    }
    
    addUser = () => {

        this.setState({dialogOpen: true})
        this.setState({action: 'Add'})
    }

    toggle = () => {

        this.setState({
            dialogOpen: !this.state.dialogOpen
          })
    }

    handleRequest = (input:any, action: string) => {
        console.log('user component: dataFromChild', input)
        this.props.newUserDetails(input, action)
        this.setState({
          dialogOpen: !this.state.dialogOpen
        })
       this.setState({formSubmit: true})
    }

    handleDelete = () => {
      console.log('user component: dataFromChild', this.state.userRowData)
      this.props.newUserDetails(this.state.userRowData, this.state.action)
      this.setState({
        dialogOpen: !this.state.dialogOpen
      })
  }
    

    render() {
       const {classes} = this.props
        console.log('user action ', this.state.action)

        
        return (
            <React.Fragment> 
             

              <div>
<div className={classes.root}>
       
       <nav className={classes.drawer}>
         
       </nav>
       <main className={classes.content}>
         <div className={classes.toolbar} />
         <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
>
        <Grid item xs={12}>
          
          <ButtonBox type='submit' class={this.props.classes.submit}   onClick={this.addUser.bind(this)} name='Add User' label='Add User' />

<MuiThemeProvider theme={theme}>
 <MaterialTable
 
          columns={[
            { title: 'User Name', field: 'name' , headerStyle: {color: 'white', fontSize: 15}  },
            { title: 'Email', field: 'email' , headerStyle: {color: 'white', fontSize: 15} },
            { title: 'Employee Id', field: 'employee_id' , headerStyle: {color: 'white', fontSize: 15}  },
            { title: 'Contact No', field: 'contact_number' , headerStyle: {color: 'white', fontSize: 15} },
            { title: 'Role', field: 'role' , headerStyle: {color: 'white', fontSize: 15} },
          
          ]}


          data={ this.props.userArray && this.props.userArray != undefined  && _.size(this.props.userArray)> 0 &&  this.props.userArray}
          title=" Available Users"

          options={{
           
            showEmptyDataSourceMessage: true,
            actionsColumnIndex: -1,
            exportButton : true,
           
          }}

          localization={{
            body: {
              emptyDataSourceMessage: 'No records to display',
            }
          }}
          actions={[
            { 
              icon: 'edit',
              tooltip: 'Edit User Details',
              iconProps: {
                style: {
                  fontSize: 20,
                  color: 'green',
                },
              },
              onClick: (event,rowData) => {
               this.setState({dialogOpen: true})
               this.setState({userRowData: rowData})
               this.setState({action: "Edit"})
              }
            },
            
            { 
                icon: 'delete',
                tooltip: 'Delete User',
                iconProps: {
                    style: {
                      fontSize: 20,
                      color: 'red',
                    },
                  },
                onClick: (event,rowData) => {
                 this.setState({dialogOpen: true})
                 this.setState({userRowData: rowData})
                 this.setState({action: "Delete"})
                }
              },

          ]}
        /></MuiThemeProvider>
           


        </Grid>
       
  </Grid>
        </main>
        </div>
        <Modal data-keyboard="true" toggle={this.toggle.bind(this)} className={this.props.classes.modal} isOpen={this.state.dialogOpen} >
          
                    <ModalBody>
                    <Tooltip title="Close" aria-label="Close">
                 <Close fontSize="default"  className={this.props.classes.close} onClick={this.toggle.bind(this)}  />
                   </Tooltip>
                  
                     


{this.state.action && this.state.action !== '' && this.state.action == 'Delete' ? (
   <div>
    <ModalHeader> Do you want to {this.state.action}  {this.state.userRowData.name.toUpperCase()} user ?  
    </ModalHeader>
          
    <ModalFooter>
      <Button variant="outlined" onClick={this.toggle.bind(this)} style={{borderRadius: '15px',}} color="secondary">No</Button>{' '}
      <Button onClick={this.handleDelete.bind(this)} style={{color: 'white', backgroundColor: 'green', borderRadius: '15px',}} >Yes</Button>
    </ModalFooter>
    </div>

  ) : 
(  <NewUserForm action={this.state.action} existingUser={this.state.userRowData} newUserDetails={this.handleRequest}/>  
)
}






                    </ModalBody>
                  
        </Modal>
</div>

            </React.Fragment>
        )
    }
}

export default (withStyles(styles)(Users))


