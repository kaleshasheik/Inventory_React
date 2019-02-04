import * as React from 'react'

import  TableData  from '../core-libs/TableHeader'

import * as _ from 'lodash'
import {dashboardData} from '../containers/DashboardContainer'
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link, LinkProps } from 'react-router-dom'

import { withStyles, Theme, createStyles} from '@material-ui/core/styles'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Button from '@material-ui/core/Button';
import {Header} from '../core-libs/components/Header'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,  CardHeader} from 'reactstrap'
  import NotificationIcon from "@material-ui/icons/NotificationImportantRounded"
  import Label from "@material-ui/icons/TouchAppRounded"
  import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from '@material-ui/core/Tooltip';
import { TableRowColumn } from 'material-ui';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Hello.scss'
import '../assests/styles/scrolling.scss'
import green from '@material-ui/core/colors/lightGreen'

export interface DashBoardProps {
    dashBoardData: any
    classes?: any
    modifyRequest?: any
    userDetails?: any
 }

 export interface DashBoardState {
    dialogOpen: boolean
    userRowData: any
    action: string
 }

 const theme = createMuiTheme({
    overrides: {
        MuiTableHead: { 
           root: {
            background: 'linear-gradient(45deg, #ffa64d 30%, #ffa64d 90%)',
// 7e84a7 
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            width: '150%'
          }
        }
      },
      palette: {
        primary: green,
        
         
      },
   
    typography: { useNextVariants: true },
  })


  const styles = (theme:Theme) => createStyles({
   
    root: {
      display: 'flex',
      backgroundColor: '#F5F5F5'
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
    title:{
      marginTop: '4%',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '1.25rem',
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: 300,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      textAlign: 'center',
      marginBottom: '2%'
    
    },

    head:{
      marginTop: -50,
      color: 'grey',
      fontSize: '2.25rem',
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      marginBottom: '4%',
     
    },
    request:{
      borderRadius: 15,
           color: '#2F4F4F',
     
    },
    approve:{
      borderRadius: 15,
     
      color: '#2F4F4F',
  
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: 'green',
  },
  
modal:{
 
   marginTop: '15%'

},

cardCountersuccess: {

     boxShadow: '2px 2px 10px #DADADA',

     margin: '5px',
     padding: '20px 10px',
     height: '100px',
     borderRadius: '5px',
     transition: '.3s linear all',
     backgroundCcolor: '66bb6a',
     color: '#FFF',
},
success:{
 
}


})

  

 class DashBoardPage extends React.Component<DashBoardProps, DashBoardState> {
    constructor(props: DashBoardProps) {
        super(props)
        this.state = {
          dialogOpen: false,
          userRowData: [],
          action: ''
        }
    }
    
    toggle = () => {

        this.setState({
            dialogOpen: !this.state.dialogOpen
          });
    }

    handleRequest = () => {

     
  }

    updateRequest = () => {


      console.log('rowdate', this.state.userRowData)
      console.log('action', this.state.action)
      if(this.state.action === 'Surrender')
      {
      this.props.modifyRequest(this.state.userRowData, 'Surender Pending', this.state.action)
      }
      else if(this.state.action === 'Cancel')
      {
        this.props.modifyRequest(this.state.userRowData, 'User Cancelled', this.state.action)
      }


        this.setState({
            dialogOpen: !this.state.dialogOpen
          });
    }


    render() {
        const {dashBoardData, classes} = this.props
        
         
         let role = (this.props.userDetails.map((a:any) => a.role)).toString()
         console.log('role in Dashbaord ', role)
          var pending = 0
          var approved = 0
         if(dashBoardData && dashBoardData != undefined && dashBoardData.data!= undefined){
          pending = _.size(dashBoardData.data.pending)
          approved = _.size(dashBoardData.data.approved)
         }
       


        return (
            <React.Fragment> 
<div className={classes.root}>
       
       <nav className={classes.drawer}>
         
       </nav>
       <main className={classes.content}>
         <div className={classes.toolbar} />
         <div className={this.props.classes.head}></div>
     {role !=null && role !='' && role !='Employee'?
    

         <div className="container">
    <div className="row justify-content-center align-items-center">
    

    <div className="col-md-4">
      <div className="card-counter text-white bg-info">
      <Tooltip title="View Requests">
       <Link to ='/requests'> <i className="fa fa-bell" style={{color:'white'}}></i></Link>
        </Tooltip>
        <span className="count-numbers">{pending}</span>
        <span className="count-name">New Requests</span>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card-counter success">
        <i className="fa fa-check" style={{color:'white'}}></i>
        <span className="count-numbers">{approved}</span>
        <span className="count-name">Approved Requests</span>
      </div>
    </div>
  </div>
</div>

:''}


         <Grid container spacing={24}>

          <Grid item xs={12} sm={6}>
          <MuiThemeProvider theme={theme}>
          <div className={this.props.classes.title}>Laptop Request</div>
          
                <MaterialTable  
  columns={[
    { title: 'RequestID', field: 'request_id' , headerStyle: {color: 'white', fontSize: 15}  },
    { title: 'LaptopNo', field: 'laptopNO' , headerStyle: {color: 'white', fontSize: 15}},
      {
      title: 'Status',
      field: 'status',
      headerStyle: {color: 'white', fontSize: 15, }
      
    },
  ]}
 

  data={ (dashBoardData && dashBoardData != undefined  && _.size(dashBoardData.data.laptopRequest)> 0)? dashBoardData.data.laptopRequest: []}


  title="Laptop Request Details"
  options={{
    search: false,
    paging: false,
    sorting: false,
    actionsColumnIndex: -1,
    toolbar: false,
  }}

  actions={[
   
    rowData => ({
        icon: (pendingStatus.indexOf(rowData.status) > -1 ? 'cancel_presentation': 'assignment_return'),
        tooltip: (pendingStatus.indexOf(rowData.status) > -1 ? 'Cancel Request': 'Surrender Inventory'),
        iconProps: 
        { 
            style: {
              fontSize: 25,
              color: rowData.status == 'Assigned to User'? 'green': 'red',
            },
          },
          onClick: (event,rowData) => {
           this.setState({dialogOpen: true})
           this.setState({userRowData: rowData})
           this.setState({action: rowData.status == 'Assigned to User'? 'Surrender':'Cancel'})
          }
      }),
   
  ]}
  
  
  localization={{
   
    
    header: {
      actions: 'Action',  // Actions
      
    },
    
    body: {
      emptyDataSourceMessage: 'No records to display', // No records to display
      filterRow: {
        filterTooltip: 'Filtern', // Filter
      },
    },

    
  }}

/>  </MuiThemeProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
        <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.title}>DataCard Request</div>

      <MaterialTable  
 columns={[
    { title: 'RequestID', field: 'request_id' , headerStyle: {color: 'white', fontSize: 15}  },
    { title: 'DataCardNo', field: 'datacardNO' , headerStyle: {color: 'white', fontSize: 15}},
    
    {
      title: 'Status',
      field: 'status',
      headerStyle: {color: 'white', fontSize: 15}
      
    },
  ]}

  data={ (dashBoardData && dashBoardData != undefined  && _.size(dashBoardData.data.datacardRequest)> 0)? dashBoardData.data.datacardRequest: []}

  title="DataCard Request Details"
  options={{
    search: false,
    paging: false,
    sorting: false,
    actionsColumnIndex: -1,
    toolbar: false,
  }}
  actions={[
   
    rowData => ({
        icon: (pendingStatus.indexOf(rowData.status) > -1 ? 'cancel_presentation': 'assignment_return'),
        tooltip: (pendingStatus.indexOf(rowData.status) > -1 ? 'Cancel Request': 'Surrender Inventory'),
        iconProps: 
        { 
            style: {
              fontSize: 25,
              color: rowData.status == 'Assigned to User'? 'green': 'red',
            },
          },
          onClick: (event,rowData) => {
           this.setState({dialogOpen: true})
           this.setState({userRowData: rowData})
           this.setState({action: rowData.status == 'Assigned to User'? 'Surrender':'Cancel'})
          }
      }),
   
  ]}
  
  localization={{
   
    
    header: {
      actions: 'Action', // Actions
      
    },
    body: {
      emptyDataSourceMessage: 'No records to display', // No records to display
      filterRow: {
        filterTooltip: 'Filtern', // Filter
      },
    },
  }}

/> </MuiThemeProvider>
        </Grid>
  </Grid>



  <div>
  <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
>
        <Grid item xs={8}>
        <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.title}>Inventory History</div>

                <MaterialTable  
  columns={[
    { title: 'Request#', field: 'request_id' , headerStyle: {color: 'white', fontSize: 15, width: '1%'}  },
    {
      title: 'Name',
      field: 'name',
      headerStyle: {color: 'white', fontSize: 15, width: '1%'}
     
    },
    { title: 'LaptopNo', field: 'laptopNO' , headerStyle: {color: 'white', fontSize: 15, width: '1%'}},
    { title: 'DataCardNo', field: 'datacardNO' , headerStyle: {color: 'white', fontSize: 15, width: '1%'}},
    
   
    {
      title: 'Status',
      field: 'status',
      headerStyle: {color: 'white', fontSize: 15}
      
    },
  ]}
 

  data={ (dashBoardData && dashBoardData != undefined  && _.size(dashBoardData.data.history)> 0)? dashBoardData.data.history: []}


  title=""
  options={{
           
    showEmptyDataSourceMessage: true,
    actionsColumnIndex: -1,
    exportButton : true
  }}


  
  
  localization={{
       
    body: {
      emptyDataSourceMessage: 'No records to display', // No records to display
      filterRow: {
        filterTooltip: 'Filter', // Filter
      },
    },

    
  }}

/> </MuiThemeProvider>
        </Grid>
        </Grid>

        </div>
       </main>

       
       <div>

<Modal data-keyboard="true" toggle={this.toggle.bind(this)} className={this.props.classes.modal} isOpen={this.state.dialogOpen} >

<ModalBody>
<ModalHeader> Do you want to {this.state.action} the Inventory ?  
</ModalHeader>

<ModalFooter>
<Button variant="outlined" onClick={this.toggle.bind(this)} style={{borderRadius: '15px',}} color="secondary">No</Button>{' '}
<Button onClick={this.updateRequest.bind(this)} style={{color: 'white', backgroundColor: 'green', borderRadius: '15px',}} >Yes</Button>
</ModalFooter>
</ModalBody>
</Modal>
</div></div>
            </React.Fragment>
        )
    }
}

export default (withStyles(styles)(DashBoardPage))

const pendingStatus = ["Pending With L1","Pending With L2","Pending With Admin"]