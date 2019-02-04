/* eslint-disable */
import * as React from "react";
import * as  PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import Button from '@material-ui/core/Button';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components

import Sidebar from "../components/Sidebar"

import {dashboardRoutes, managerDashboardRoutes, adminDashboardRoutes, homeRoutes} from "../common/routes/dashboard"
import { Theme, createStyles} from '@material-ui/core/styles'
import {
  drawerWidth,
  transition,
  container
} from '../components/material-dashboard-react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { State } from '../reducers'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Dispatch } from 'redux'
import {logout} from '../actions/loginActions'

const appStyle = (theme: Theme) => createStyles({
 
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: 'white',
    height: 60,
  },
  title: {

    position: 'absolute',
       
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
        whiteSpace: 'nowrap',
        color: '#7e84a8',
        fontSize: '25px',
        marginLeft:'5%',
        fontWeight: 500
  }

})





export interface LoginFormProps extends RouteComponentProps<any> {
  classes?: any
  userDetails?: any
  logout?: () => any
}

export interface LoginFormState {
 
  mobileOpen:boolean
}

class ApplicationBar extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }


   switchRoutes =(routes:any) => (
    <Switch>
      {routes.map((prop:any, key:any) => {
  
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />
        return <Route path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
  
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e:any) {
    if (e.history.location.pathname !== e.location.pathname) {
     
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  handleLogout = () => {

    this.props.logout()
}


  render() {
    const { classes, ...rest } = this.props;
    var routes = homeRoutes
    var isLoggedin = false
    
    var name =''
    if(this.props.userDetails != undefined && this.props.userDetails.data != undefined && this.props.userDetails.data.user != undefined){
         
          
     var isFirstLogin = (this.props.userDetails.data.user.map((a:any) => a.is_first_login)).toString()
     var isSuperuser = (this.props.userDetails.data.user.map((a:any) => a.is_superuser)).toString()
     var role = (this.props.userDetails.data.user.map((a:any) => a.role)).toString()
      name = (this.props.userDetails.data.user.map((a:any) => a.name)).toString()
    
      if(isFirstLogin == 'false') {
      isLoggedin = true

     }
    
     if(isFirstLogin === 'true'){
       routes = homeRoutes
     }
     else if ((role === 'L1 Manager' || role === 'L2 Manager')){

      routes = managerDashboardRoutes
     }
    else if (isFirstLogin === 'false' && role === 'Employee'){

      routes = dashboardRoutes
    }

    else if (role == 'Inventory Manager'){

      routes = adminDashboardRoutes
     }
     else if (isSuperuser === 'true'){

      routes = managerDashboardRoutes
     }
   }
  
   
    return (
      <div className={classes.wrapper}>
  {isLoggedin ?
   <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
           
          <Typography color="inherit"  noWrap>
              
            </Typography>
            <div className={classes.title}>Welcome {name}</div>
            <Button onClick={this.handleLogout.bind(this)} style={{marginLeft:'90%', textTransform:'none', color:'white', background:'#ffa64d'}}>Logout</Button>
          </Toolbar>
          
        </AppBar>
     :''}

        <Sidebar
          routes={routes}
          logoText={"Aricent"}
          image={'src/images/aricent.png'}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="orange"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
        
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{this.switchRoutes(routes)}</div>
            </div>
          ) : (
            <div className={classes.map}>{this.switchRoutes(routes)}</div>
          )}
        
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state: State) => {

  console.log('application bar', state!.login!.user)
  return {
    userDetails: state!.login!.user,
    requestData: state!.requests!.requestTable,

  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: (): any => {
      return logout(dispatch)
    },


  }
}


const NavBar = connect(
  mapStateToProps,
  mapDispatchToProps
  
)(ApplicationBar)



export default withRouter(withStyles(appStyle)(NavBar))

