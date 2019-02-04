import * as React from 'react'

import  NewUserForm  from '../forms/NewUserForm'
import { withRouter , RouteComponentProps} from 'react-router-dom'
import { State } from '../reducers'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

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
import Inventory from '../components/Inventory'

import {loadInventories} from '../actions/inventoryActions'
import {addInventory} from '../actions/inventoryActions'
import {editInventory} from '../actions/inventoryActions'
import {deleteInventory} from '../actions/inventoryActions'


const userHeaders = [{"name":"User Name","prop":"name"},{"name":"Email","prop":"email"},{"name":"Employee Id","prop":"employee_id"},
                       {"name":"Contact No","prop":"contact_number"}, {"name":"Role","prop":"role"}]

export interface InventoryProps extends RouteComponentProps<any> { 

    addInventory: (data:any) => void
    editInventory: (data:any) => void
    deleteInventory: (data:any) => void
   loadInventories: () => void
    data: any
    inventories: any
    classes? :any

}

export interface InventoryState { 

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




 class InventoryData extends React.Component<InventoryProps, InventoryState> {

  constructor(props: InventoryProps) {
    super(props)
    this.state = {
      dialogOpen: false,
      action: ''
    }
}


  componentWillMount(){

    console.log('componentWillMount InventoryData')

     this.props.loadInventories()

  }

    handleRequest = (input:any, action: string) => {
        console.log('InventoryData: dataFromChild', input, action )

        this.setState({action: action})
     if(action!=null && action === 'Add')
        {
        this.props.addInventory(input)
        }
        else if(action!=null && action === 'Edit')
        {
        this.props.editInventory(input)
        }
        else if(action!=null && action === 'Delete')
        {
        this.props.deleteInventory(input)
        }
        

    }

    



    render() {

       if(this.props.inventories && this.props.inventories != undefined  && _.size(this.props.inventories.data)> 0 ){
         var invArray = Object.keys(this.props.inventories.data).map(i => this.props.inventories.data[i])
       console.log('InventoryData  ', invArray)
     }
     

        return  <div>
 
           { this.state.action === 'Add' ? <CustomizedSnackbars type='success' message='New Inventory Creation was Sucessful'/>: ''}   
             { this.state.action === 'Edit'   ? <CustomizedSnackbars type='success' message= 'Inventory details Updated Successfully'/>: ''}   
             { this.state.action === 'Delete'   ? <CustomizedSnackbars type='success' message= 'Inventory Deleted Successfully'/>: ''}   

            <Inventory invArray= {invArray} newInventoryDetails={this.handleRequest}/>

        </div>
    }
}

const mapStateToProps = (state: State) => {
  
  console.log('all Inventories', state!.invValues!.invValues)

    return {
      inventories: state!.invValues!.invValues
    }
  }
  
  const mapDispatchToProps = (dispatch: Dispatch) => {

    return {
        addInventory: (data:any) => {
        addInventory(dispatch, data)
      },
      loadInventories: () => {
        loadInventories(dispatch)
      },
      editInventory: (data:any) => {
        editInventory(dispatch, data)
      },
      deleteInventory: (data:any) => {
        deleteInventory(dispatch, data)
      },

    }
  }

const InventoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(InventoryData)

  

  export default withRouter(withStyles(styles)(InventoryContainer))

