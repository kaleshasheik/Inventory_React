import * as React from 'react'

import  RequestForm  from '../forms/RequestForm'
import { withRouter , RouteComponentProps} from 'react-router-dom'
import { State } from '../reducers'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {requestInventory} from '../actions/inventoryRequestActions'
import CustomizedSnackbars from '../core-libs/components/SnackBar'

export interface RequestInventoryContainerProps extends RouteComponentProps<any> { 

  requestInventory: (data:any, user:any) => void
    data: any
    userDetails: any
    dashBoardData: any

}

export interface RequestInventoryState{
  variant :string,
  message: string
}

 class RequestInventoryContainer extends React.Component<RequestInventoryContainerProps, RequestInventoryState> {
   

  constructor(props: RequestInventoryContainerProps) {
    super(props)
    this.state = {
        
      variant: '',
      message:''

    }
}


    handleRequest = (input:any) => {
        console.log('RequestInventoryContainer: dataFromChild', input)
        this.props.requestInventory(input, this.props.userDetails)
           
    }

  


    render() {

        console.log('request Inventory ', this.props.userDetails)
        return  <div>

            
     
             <RequestForm user={this.props.userDetails}  requestDetails={this.handleRequest} dashBoardData={this.props.dashBoardData} />
        </div>
    }
}


const mapStateToProps = (state: State) => {
  
   let array = state!.login!.user.data.user

    return {
      userDetails: Object.assign({}, ...array),
      dashBoardData: state!.dashboard!.dashboardTable,
    }
  }
  ​
  const mapDispatchToProps = (dispatch: Dispatch) => {


    return {
      requestInventory: (data:any, user:any) => {
        requestInventory(dispatch, data, user)
      }
    }
  }

const RequestInventory = connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequestInventoryContainer)


  export default withRouter((RequestInventory))

