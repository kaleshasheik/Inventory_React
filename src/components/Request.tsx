
import * as React from 'react'

import  TableData  from '../core-libs/TableHeader'

import {dashboardData} from '../containers/DashboardContainer'
import Grid from '@material-ui/core/Grid'
import * as _ from 'lodash'
import MaterialTable from 'material-table'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import ButtonBox from '../core-libs/ButtonBox'
import { withStyles, Theme, createStyles} from '@material-ui/core/styles'
import NewUserForm from '../forms/NewUserForm'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/lightGreen'

import SelectBox from '../core-libs/SelectBox'
import {validateInput} from '../validations/requests'

export interface requestProps {
   
    requestData?: any
    classes: any
    modifyRequest?: any
    availableinventories:any

 }

 export interface requestState {
    dialogOpen: boolean
    userRowData: any
    action: string
    requestType: string
    inventoryType: string
    requestStatus?: string
    SerialNo?: string
    SIMNo: string
    errors: any
    isError?: boolean
 }

 const theme = createMuiTheme({
    overrides: {
        MuiTableHead: {
         // root: {
          //  backgroundColor: "#778899"
         // }
         root: {
          background: 'linear-gradient(45deg, #ffa64d 30%, #ffa64d 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
         
         
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
        backgroundColor: 'darkorange',
        color: 'white',
       
        borderRadius: '12px',
       
        textTransform: 'none',
        bottom: '20px'
      },
      modal: {
        marginTop: theme.spacing.unit * 16,
    },
    close: {

        marginLeft: theme.spacing.unit * 56,
    },
    main: {
       
    
      
       overflowX: 'visible',
   
     
      maxWidth: '65%'
     
     },

     root: {
      display: 'flex',
      marginTop: '5%',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 260,
        flexShrink: 0,
      },
    },
   
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 240,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
  })

 class Requests extends React.Component<requestProps, requestState> {
    constructor(props: requestProps) {
        super(props)
        this.state = {
          dialogOpen: false,
          userRowData: [],
          action: '',
          requestType:'',
          inventoryType:'',
          requestStatus: '',
          SerialNo:'',
          SIMNo: '',
          errors: {},
          isError: false
        }
    }
    
     toggle = () => {
      this.resetInput()
        this.setState({
            dialogOpen: !this.state.dialogOpen
          });
    }
    isValid(inventoryValue:string) {
      const { errors, isValid } = validateInput(inventoryValue)
     console.log('request error', errors, isValid)
     if (!isValid) {
      this.setState({ errors })
      this.setState({isError: true})
    }

    return isValid
  }

  resetInput = () => {
 console.log(' resetting the input')
   this.setState({errors: {}, isError: false, SerialNo: '', SIMNo:''})
  }

    handleRequest = () => {

       this.resetInput()
        console.log('rowdate', this.state.userRowData)
        console.log('action', this.state.action)
        var valid = true
        if(this.state.action === 'Reject')
      {
          if(this.state.userRowData.status === 'Pending With L1')
          {
            this.props.modifyRequest(this.state.userRowData.request_id, 'L1 Rejected', this.state.action,'', this.state.requestType)
          }
          else if(this.state.userRowData.status === 'Pending With L2')
          {
            this.props.modifyRequest(this.state.userRowData.request_id, 'L2 Rejected', this.state.action,'', this.state.requestType)
          }
          else if(this.state.userRowData.status === 'Pending With Admin')
          {
            this.props.modifyRequest(this.state.userRowData.request_id, 'Admin Rejected', this.state.action,'', this.state.requestType)
          }

      }
      if(this.state.action === 'Approve')
      {   
          if(this.state.userRowData.status === 'Pending With L1')
          {
            this.props.modifyRequest(this.state.userRowData.request_id, 'Pending With L2', this.state.action,'', this.state.requestType)
          }
          else if(this.state.userRowData.status === 'Pending With L2')
          {
            this.props.modifyRequest(this.state.userRowData.request_id, 'Pending With Admin', this.state.action,'',this.state.requestType)
          }
          else if(this.state.userRowData.status === 'Pending With Admin')
          { 
            
            var inventoryValue = ''
            if(this.state.requestType === 'Laptop'){
              inventoryValue =this.state.SerialNo
            }
            else if(this.state.requestType === 'DataCard'){
              inventoryValue =this.state.SIMNo
            }
             if(this.isValid(inventoryValue)){

              this.props.modifyRequest(this.state.userRowData.request_id, 'Assigned to User', this.state.action, inventoryValue,this.state.requestType)
              this.resetInput()
               
             }
             else{

              valid = false
             }
                        
          }
          else if(this.state.userRowData.status === 'Surender Pending')
          {
            this.props.modifyRequest(this.state.userRowData.request_id, 'Completed', this.state.action,'', this.state.requestType)
          }
      }

      console.log(' requests state ', this.state)
      if(this.state.action === 'Approve' && this.state.userRowData.status === 'Pending With Admin'){
          
        var inventoryValue = ''
        if(this.state.requestType === 'Laptop'){
          inventoryValue =this.state.SerialNo
        }
        else if(this.state.requestType === 'DataCard'){
          inventoryValue =this.state.SIMNo
        }
        if(this.isValid(inventoryValue)){
          this.setState({
            dialogOpen: !this.state.dialogOpen
            })
  
        }
          
      }
      else{
        this.setState({
          dialogOpen: !this.state.dialogOpen
          })

      }
      
       
      
       

      }
  
      onTextChange = (event: any) => {
        event.preventDefault()
     
      
       
       this.setState({ ...this.state, [event.target.name]: event.target.value })
     

        console.log('approval requests form', this.state.SerialNo)
    }

    

    render() {
        const {requestData, classes} = this.props

console.log('this.props.availableinventories', this.props.availableinventories)
        return (
            <React.Fragment> 

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
          
        <MuiThemeProvider theme={theme}>
 <MaterialTable
          

          columns={[
            {
              title: 'Name',
              field: 'name',
              headerStyle: {color: 'white', fontSize: 15}
             
            },
            { title: 'Request#', field: 'request_id' , headerStyle: {color: 'white', fontSize: 15}  },
            { title: 'Type', field: 'type' , headerStyle: {color: 'white', fontSize: 15}  },
             {
                title: 'From',
                field: 'startDate',
                headerStyle: {color: 'white', fontSize: 15}
               
              },
              {
                title: 'To',
                field: 'endDate',
                headerStyle: {color: 'white', fontSize: 15}
               
              },
              {
                title: 'Reason',
                field: 'reason',
                headerStyle: {color: 'white', fontSize: 15}
               
              },
              
              {
                title: 'Status',
                field: 'status',
                headerStyle: {color: 'white', fontSize: 15}
               
              },
          ]}
 
          

          data={ (requestData && requestData != undefined && requestData.data!=undefined && _.size(requestData.data)> 0)? requestData.data: []}
          title="Pending Requests"

          options={{
           
            showEmptyDataSourceMessage: true,
            actionsColumnIndex: -1,
            exportButton : true
          }}

          localization={{
            body: {
              emptyDataSourceMessage: 'No Requests to display',
            }
          }}
          actions={[
            { 
              icon: 'done',
              tooltip: 'Approve',
              iconProps: {
                style: {
                  fontSize: 25,
                  color: 'green',
                },
              },
              onClick: (event,rowData) => {
               this.setState({dialogOpen: true})
               this.setState({userRowData: rowData})
               this.setState({action: "Approve"})
               this.setState({requestType: rowData.type})
               this.setState({requestStatus: rowData.status})
              }
            },

                

              rowData => ({
                icon: rowData.status === 'Surender Pending' ? '': 'cancel',
                tooltip: rowData.status === 'Surender Pending' ? '': 'Reject',
                iconProps: 
                { 
                    style: {
                      fontSize: 25,
                      color: rowData.status == 'Surender Pending'? '': 'red',
                    },
                  },
                  onClick: (event,rowData) => {
                   rowData.status === 'Surender Pending' ? this.setState({dialogOpen: false}): this.setState({dialogOpen: true})
                   // this.setState({dialogOpen: true})
                   this.setState({userRowData: rowData})
                   this.setState({action: "Reject"})
                   this.setState({requestType: rowData.type})
                   this.setState({requestStatus: rowData.status})
                  }
              }),

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
                  
                   <ModalHeader> Do you want to {this.state.action} this Request ?  
         {this.state.requestStatus!=null && this.state.requestStatus === 'Pending With Admin' && this.state.action === 'Approve'?
                   <FormControl style={{marginTop: '5%'}} fullWidth error={this.state.isError}>
                   
          <SelectBox name= {this.state.requestType === 'Laptop'? 'SerialNo':
           'SIMNo'}
          
          label= {this.state.requestType === 'Laptop'?'Assign the Laptop Serial Number':
           'Assign the DataCard SIM Number'}
          id= 'availableInv' requestType={this.state.requestType}
           invTypes={this.state.requestType === 'Laptop' ? this.props.availableinventories.laptopDetails: this.props.availableinventories.datacardDetails}  
           variant='standard'
              value= {this.state.requestType === 'Laptop'? this.state.SerialNo:
              this.state.SIMNo}

          onChange={this.onTextChange.bind(this)}/>     
            <FormHelperText>{this.state.errors.Inventory}</FormHelperText>
   
          </FormControl> 
          :''}

{this.state.requestStatus === 'Pending With Admin' && this.state.action === 'Approve' && this.state.requestType === 'Laptop' && _.size(this.props.availableinventories.laptopDetails) == 0 ? 
      <div>
       <span style={{color:'red'}}> Inventories are not  Available to Assign</span>
      </div>  :
      ''
  }

  {this.state.requestStatus === 'Pending With Admin' && this.state.action === 'Approve' &&  this.state.requestType === 'DataCard' && _.size(this.props.availableinventories.datacardDetails) == 0 ? 
      <div>
       <span style={{color:'red'}}> Inventories are not  Available to Assign</span>

      </div>  :
      ''
  }


    </ModalHeader>
          
 
    

    <ModalFooter>
     {this.state.action === 'Approve' ? 
          <Button 
          
        

          onClick={this.handleRequest.bind(this)} style={{color: 'white', backgroundColor: 'green', borderRadius: '15px',}} >{this.state.action}</Button>
     :
     <Button variant="outlined" onClick={this.handleRequest.bind(this)} style={{borderRadius: '15px',}} color="secondary">{this.state.action}</Button>

    }
    </ModalFooter>
    </ModalBody>
    </Modal> 


            </React.Fragment>
        )
    }
}

export default (withStyles(styles)(Requests))


const invTypes= [ { name: 'Laptop' },
{ name: 'DataCard'},
]