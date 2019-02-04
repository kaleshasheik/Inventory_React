import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {loadDashboardData, modifyInventory} from '../actions/dashboardActions'
import DashBoardPage from '../components/Dashboard'

import { State } from '../reducers'
import CustomizedSnackbars from '../core-libs/components/SnackBar'

 export interface dashboardData{

    headers: []
    colummns:[]
}

export interface DashBoardContainerProps {
    loadDashboardData: (empId:string, role: string) => void
    modifyInventory: (data:any, status: string, empId: string, role: string) => void
    dashBoardData: any
    userDetails: any
 }
 export interface DashBoardContainerState {
      action: string
 }

 class DashboardContainer extends React.Component<DashBoardContainerProps, DashBoardContainerState> {


  constructor(props: DashBoardContainerProps) {
    super(props)
    this.state = {
      action: ''
    }
}


    componentWillMount(){

      

      let empId = this.props.userDetails.map((a:any) => a.employee_id)
      let role = this.props.userDetails.map((a:any) => a.role)
      console.log('componentWillMount dashboard', empId, empId.toString())
       this.props.loadDashboardData(empId.toString(), role.toString())
    }


    handleUpdateRequest = (input:any, status: string, action: string) => {
      
      let empId = this.props.userDetails.map((a:any) => a.employee_id)
      let role = this.props.userDetails.map((a:any) => a.role)
      console.log('DashboardContainer: dataFromChild', input)
      console.log('DashboardContainer: dataFromChild', status)
      console.log('DashboardContainer: empId', empId)
      console.log('DashboardContainer: role', role)
      this.props.modifyInventory(input, status,empId.toString(), role.toString())

      this.setState({action: action})
  }



    public render() {
      
        return  (
           <React.Fragment>

{ this.state.action === 'Surrender' ? <CustomizedSnackbars type='success' message='Request Sent to Admin for Approval'/>: ''}   
             { this.state.action === 'Cancel'   ? <CustomizedSnackbars type='success' message= 'Request was Cancelled Successfully'/>: ''}   

            <DashBoardPage userDetails={this.props.userDetails} dashBoardData={this.props.dashBoardData} modifyRequest={this.handleUpdateRequest}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: State) => {
  
   console.log('dashbpard data', state!.dashboard!.dashboardTable)
   
    return {
      dashBoardData: state!.dashboard!.dashboardTable,
      userDetails: state!.login!.user!.data!.user
    }
  }
  ​
  const mapDispatchToProps = (dispatch: Dispatch) => {

    return {
      loadDashboardData: (empId:string, role: string) => {
        loadDashboardData(dispatch, empId, role)
      },

      modifyInventory: (data: any, status: string, empId:string, role: string) => {
        modifyInventory(dispatch, data.request_id, status, empId, role)
      },

    }
  }

const DashBoard = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashboardContainer)



  export default DashBoard