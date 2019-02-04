
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
import InventoryForm from '../forms/InventoryForm'
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close'
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/lightGreen'
import CustomizedSnackbars from '../core-libs/components/SnackBar'


export interface Inventoryprops {
   
    invArray: any
    classes: any
    newInventoryDetails?: any
   

 }

 export interface InventoryState {
    dialogOpen: boolean
    invRowData: any
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

 class Inventory extends React.Component<Inventoryprops, InventoryState> {
    constructor(props: Inventoryprops) {
        super(props)
        this.state = {
          dialogOpen: false,
          invRowData: [],
          action: '',
          formSubmit: false

        }
    }
    
    addInventory = () => {

        this.setState({dialogOpen: true})
        this.setState({action: 'Add'})
    }

    toggle = () => {

        this.setState({
            dialogOpen: !this.state.dialogOpen
          })
    }

    handleRequest = (input:any, action: string) => {
        console.log('newInventoryDetails: dataFromChild', input)
        this.props.newInventoryDetails(input, action)
        this.setState({
          dialogOpen: !this.state.dialogOpen
        })
       this.setState({formSubmit: true})
    }

    handleDelete = () => {
      console.log('newInventoryDetails: dataFromChild', this.state.invRowData)
      this.props.newInventoryDetails(this.state.invRowData, this.state.action)
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
        <Grid item xs={'auto'}>
          
          <ButtonBox type='submit' class={this.props.classes.submit}   onClick={this.addInventory.bind(this)} name='Add Inventory' label='Add Inventory' />

<MuiThemeProvider theme={theme}>
 <MaterialTable
 
          columns={[
            { title: 'Inventory Type', field: 'product_type' , headerStyle: {color: 'white', fontSize: 15}  },
            { title: 'Model', field: 'model' , headerStyle: {color: 'white', fontSize: 15} },
            { title: 'Serial No', field: 'serial_no' , headerStyle: {color: 'white', fontSize: 15}  },
            { title: 'SIM No', field: 'sim_no' , headerStyle: {color: 'white', fontSize: 15} },
            { title: 'Status', field: 'status' , headerStyle: {color: 'white', fontSize: 15} },
            { title: 'AssignedTo', field: 'assignedTo' , headerStyle: {color: 'white', fontSize: 15} },
          
          ]}


          data={ (this.props.invArray && this.props.invArray != undefined  && _.size(this.props.invArray)> 0) ?   this.props.invArray: []}
        
          

        
          title="Inventories"

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
               this.setState({invRowData: rowData})
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
                 this.setState({invRowData: rowData})
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
    <ModalHeader> Do you want to {this.state.action}  {this.state.invRowData.product_type} with Serial Number '{this.state.invRowData.serial_no}' ?  
    </ModalHeader>
          
    <ModalFooter>
      <Button variant="outlined" onClick={this.toggle.bind(this)} style={{borderRadius: '15px',}} color="secondary">No</Button>{' '}
      <Button onClick={this.handleDelete.bind(this)} style={{color: 'white', backgroundColor: 'green', borderRadius: '15px',}} >Yes</Button>
    </ModalFooter>
    </div>

  ) : 
(  <InventoryForm action={this.state.action} existingInv={this.state.invRowData} newInvDetails={this.handleRequest}/>  
)
}






                    </ModalBody>
                  
        </Modal>
</div>

            </React.Fragment>
        )
    }
}

export default (withStyles(styles)(Inventory))


