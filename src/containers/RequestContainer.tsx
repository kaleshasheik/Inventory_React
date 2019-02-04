import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {loadRequestsData} from '../actions/requestActions'
import {modifyRequest} from '../actions/requestActions'
import Requests from '../components/Request'
import {loadInvByStatus} from '../actions/inventoryActions'
import { State } from '../reducers'
import CustomizedSnackbars from '../core-libs/components/SnackBar'

export interface RequestContainerProps {
    loadRequestsData: (empId:string) => void
    requestData: any
    userDetails: any
    modifyRequest: (data:any, status: string, name: string,empId: string, invValue:string, invType:string, reqEmpId:string, serialNo:string, SIMNo:string) => void
    loadInvByStatus:() => void
    availableinventories: any
 }

 export interface RequestContainerState {
  action: string
 }

 class RequestContainer extends React.Component<RequestContainerProps, RequestContainerState> {

  constructor(props: RequestContainerProps) {
    super(props)
    this.state = {
    
      action: ''
    }
}


    componentWillMount(){


      let empId = this.props.userDetails.map((a:any) => a.employee_id)
      console.log('componentWillMount loadRequestsData', empId, empId.toString())
       this.props.loadRequestsData(empId.toString())
       this.props.loadInvByStatus()
    }

    handleUpdateRequest = (requestId:string, status: string, action: string, inventoryValue:string, inventoryType: string) => {
      
        let name = this.props.userDetails.map((a:any) => a.name)
        let empId = this.props.userDetails.map((a:any) => a.employee_id)
        console.log('RequestContainer: dataFromChild', requestId)
        console.log('RequestContainer: dataFromChild', status)
        console.log('RequestContainer: name:empid ', name, empId)
        console.log('RequestContainer: inventoryValue ', inventoryValue)
        console.log('RequestContainer: inventoryType ', inventoryType)
        var requestedEmpId = ''    
        var serialNo = ''    
        var SIMNo = ''    

        
       this.props.modifyRequest(requestId, status,name.toString(),empId.toString(),inventoryValue, inventoryType,requestedEmpId, serialNo, SIMNo )
       this.props.loadInvByStatus()
       this.setState({action: action})
      
    }
  


    public render() {
      
        return  (
           <React.Fragment>

{ this.state.action === 'Approve' ? <CustomizedSnackbars type='success' message='Request was Approved'/>: ''}   
             { this.state.action === 'Reject'   ? <CustomizedSnackbars type='success' message= 'Request was Rejected'/>: ''}   

           <Requests requestData={this.props.requestData} modifyRequest={this.handleUpdateRequest} availableinventories={this.props.availableinventories}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: State) => {
  
   console.log('request container data', state)
   
    return {
      requestData: state!.requests!.requestTable,
      userDetails: state!.login!.user!.data!.user,
      availableinventories: state!.inventories!.inventories!.data
    }
  }
  ​
  const mapDispatchToProps = (dispatch: Dispatch) => {

    return {
        loadRequestsData: (empId:string) => {
            loadRequestsData(dispatch, empId)
      },

      
      modifyRequest: (requestId: string, status: string, name:string, empId:string, invValue:string, invType:string,reqEmpId:string, serialNo:string, SIMNo:string) => {
        modifyRequest(dispatch, requestId, status, name, empId, invValue, invType, reqEmpId, serialNo, SIMNo)
      },

      loadInvByStatus: () => {
        loadInvByStatus(dispatch)
      },

    }
  }

const Request = connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequestContainer)



  export default Request