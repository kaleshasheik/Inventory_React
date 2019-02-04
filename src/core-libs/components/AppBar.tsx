import * as React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Link, LinkProps } from 'react-router-dom'
import {  TabProps } from '@material-ui/core/Tab'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import {Footer} from '../Footer'
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { State } from '../../reducers'
import { connect } from 'react-redux'
import * as _ from 'lodash'

const styles = (theme:Theme) => createStyles({
  indicator: {
      height: 2,
      backgroundColor: '#FF8C00',
     
    },
    appBar:{
      backgroundColor: '#23333D',
      height: '60px',
    },
    tab:{

      color: 'white',
     marginLeft: theme.spacing.unit * 20,
      position: 'absolute',
      
          
    },
    link:{
     // textTransform: 'none',
      "&:hover": {
        textDecoration: 'none',
        color:'white'
      }

    },
    mobileLink:{
      textTransform: 'none',
       "&:hover": {
         textDecoration: 'none',
         color:'darkorange',
         
       
       },
       color: '#23333D'
     },
    toolbarTitle:{
     MarginLeft: 0,
      height: '30px',
      width: '70%',
      
    },
    footer:{
    
      position: 'fixed',
      bottom: 0,
      backgroundColor: '#ccc',
      width: '100%',
      height: '30px',
    },
    bottomAppbar:{
     
        top: 'auto',
        bottom: 0,
        backgroundColor: '#ccc',
        height: '40px',
       
    },
    toolbar: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
      
    },
    account:{
      color: 'darkorange'
    },
    grow: {
      flexGrow: 1,
      
    },
    menu:{
       textTransform: 'none',
      color: 'black',
      "&:hover": {
        textDecoration: 'none',
     
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    
    },
  })

export interface AppBarProps extends RouteComponentProps<any>{ 
  classes?: any
  userDetails?: any
  requestData?: any
}

export interface AppBarState { 
    value: Number
    anchorEl: any
    mobileMoreAnchorEl: any
    token?: string
}

const LinkTab: React.ComponentType<TabProps & LinkProps> = Tab as React.ComponentType<TabProps & LinkProps>

 class ApplicationBar extends React.Component<AppBarProps, AppBarState> {

    constructor(props: AppBarProps) {
        super(props)
        this.state = {
            value: 0,
            
            mobileMoreAnchorEl: null,
            anchorEl: null,
            token: null
            
        }
    }
    
 
    handleChange = (event:React.ChangeEvent<HTMLInputElement>, value: Number) => {
        this.setState({ value })
      }
    
      handleMenuItemClose = (event:any) => {
        this.setState({ mobileMoreAnchorEl: null });
      };
    
      handleMenuClose = () => {
        this.setState({ anchorEl: null});
        this.handleMobileMenuClose();
      };
    
      handleMobileMenuOpen = (event:any) => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
      };
    
      handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
        
      };
      handleProfileMenuOpen = (event:any) => {
        this.setState({ anchorEl: event.currentTarget });
      };
   
    render() {
      const { classes } = this.props
       var isFirstLogin = 'false'
       var isSuperuser = 'false'
       if(this.props.userDetails != undefined && this.props.userDetails.data != undefined && this.props.userDetails.data.user != undefined){
         
          
          isFirstLogin = (this.props.userDetails.data.user.map((a:any) => a.is_first_login)).toString()
          isSuperuser = (this.props.userDetails.data.user.map((a:any) => a.is_superuser)).toString()
         console.log('USER details in appbar ', isFirstLogin)

       }
      
       
      const { anchorEl, mobileMoreAnchorEl } = this.state;
      const isMenuOpen = Boolean(anchorEl);
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


      const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
       <MenuItem onClick={this.handleMenuClose} >
        <LinkTab className={classes.menu} label='My Account'  component={Link} to='/myAccount' />
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
        <LinkTab className={classes.menu} label='Logout'  component={Link} to='/logout' />
        </MenuItem>
        </Menu>
      )
  
      const renderMobileMenu = (
            
        this.props.userDetails !== null && this.props.userDetails !== undefined && this.props.userDetails.data != undefined  && this.props.userDetails.data.token!=null && isFirstLogin.toString() === 'false'  ? (
          <Menu 
          anchorEl={mobileMoreAnchorEl}
     
          open={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
        > 
          <MenuItem onClick={this.handleMenuItemClose} >
          <LinkTab  className={classes.mobileLink} label='DashBoard'  component={Link} to='/userDashboard' />
          </MenuItem>
          <MenuItem onClick={this.handleMenuItemClose}>
          <LinkTab className={classes.mobileLink}  label='Request Inventory' component={Link} to='/requestInventory' />
          </MenuItem>
          <MenuItem onClick={this.handleMenuItemClose}>
          <LinkTab className={classes.mobileLink}  label='Users' component={Link} to='/user' />
          </MenuItem>
          <MenuItem onClick={this.handleMenuItemClose}>
          <LinkTab className={classes.mobileLink}  label='Requests' component={Link} to='/requests' />
          </MenuItem>
          </Menu>
    ) : 
  ( ''
  )
  
        
      )
        if(this.props.requestData!=undefined && this.props.requestData.data!=undefined ){
           
          var size= this.props.requestData.data.length
          console.log('sizeeeeeeee ' , size)
        }
        return ( 
    <React.Fragment>
          <div >
           <CssBaseline />
                   <AppBar   className={classes.appBar}>
            <Toolbar>
            
            <Typography color="inherit"  noWrap>
              {<img className={classes.toolbarTitle} src='src/images/aricent.png'/>}
              </Typography>
                        
              
              

              {this.props.userDetails !== null && this.props.userDetails !== undefined && this.props.userDetails.data != undefined && this.props.userDetails.data.token!=null && isFirstLogin.toString() === 'false' ? (
                 <React.Fragment>
                <div className={classes.sectionDesktop}>
         <Tabs  classes={{ indicator: this.props.classes.indicator }} value={this.state.value} onChange={this.handleChange} >
    <LinkTab className={classes.link} label='DashBoard'  component={Link} to='/userDashboard' />
    <LinkTab className={classes.link}  label='Request Inventory' component={Link} to='/requestInventory' />

    
    <LinkTab className={classes.link}  label='Users' component={Link} to='/user' />
    <LinkTab className={classes.link}  label='Requests' component={Link} to='/requests' />
    

    </Tabs> 
    </div>
    <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
    </React.Fragment>
    ) : 
  ( ''
  )
  }
              
              
              <div className={classes.grow} />

              {this.props.userDetails !== null && this.props.userDetails !== undefined && this.props.userDetails.data != undefined && this.props.userDetails.data.token!=null && isFirstLogin.toString() === 'false'  ? (
                
                <MenuItem onClick={this.handleProfileMenuOpen}>
                <IconButton >
                  <AccountCircle fontSize="large"  className={classes.account} />
                  
                </IconButton>
               
              </MenuItem>
    ) : 
  ( ''
  )
  }

              
           
            </Toolbar>
          </AppBar>
     
          {renderMenu}
          {renderMobileMenu}


        </div>

          <AppBar position="fixed" color="primary" className={classes.bottomAppbar}>
        <Toolbar className={classes.toolbar}>
          
          <a href='https://www.aricent.com'>ww.aricent.com </a>
          <div>
           <p>© 2019 Aricent Inc. All rights reserved.</p>
          </div>
        </Toolbar>
      </AppBar>
      
        </React.Fragment>
        
        )

        
    }
}

const mapStateToProps = (state: State) => {

  console.log('application bar', state!.login!.user)
  console.log('application bar requestData', state!.requests!.requestTable)
  return {
    userDetails: state!.login!.user,
    requestData: state!.requests!.requestTable,

  }
}

const NavBar = connect(
  mapStateToProps
  
)(ApplicationBar)



export default withRouter(withStyles(styles)(NavBar))

  
