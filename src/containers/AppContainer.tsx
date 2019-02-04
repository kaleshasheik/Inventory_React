import * as React from 'react'
import { HeaderComponent } from '../components/HeaderComponent'
import * as _ from "lodash";

import LoginContainer from './LoginContainer'

import  RequestInventoryContainer  from './RequestInventoryContainer'
import DashboardContainer from './DashboardContainer'
import AddUserContainer from './AddUserContainer'
import RequestContainer from './RequestContainer'
import InventoryContainer from './InventoryContainer'
import { Switch, Route } from 'react-router-dom'
import { NotFound } from '../components/NotFound'
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
const language = navigator.language.split(/[-_]/)[0]


const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: "/",
  // Determine if the user is authenticated or not
  
  authenticatedSelector: state => {
    let _state: any = Object.assign({}, state)
    return _state!.login!.user; // _.size(state.login)>0; // state.user && state.user.userDetails ? state.user.userDetails.isLoggedIn : false;
  },
  // A nice display name for this check
  wrapperDisplayName: "UserIsAuthenticated"
});

const locationHelper = locationHelperBuilder({});
const userIsNotAuthenticated = connectedRouterRedirect({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state: any, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || "/",
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // This prevents us from adding the query parameter when we send the user away from the login page
  // Determine if the user is authenticated or not
  authenticatedSelector: state => {

    console.log(' userIsNotAuthenticated ' , state!.login!.user)
    var is_first_login = false
    if(state!.login!.user && state!.login!.user!= undefined && state!.login!.user.data!=undefined && state!.login!.user.data.user!= undefined) 
    {
      is_first_login = (state!.login!.user!.data!.user.map((a:any) => a.is_first_login)).toString()
      console.log("userIsNotAuthenticated return  ", is_first_login)
      return   is_first_login
 
    }
    console.log("userIsNotAuthenticated is_first_login ", is_first_login)
    console.log("userIsNotAuthenticated _.size(state.login.user) ", _.size(state.login.user))

     return _.size(state.login.user)===0 //state.user;
  },
  // A nice display name for this check
  wrapperDisplayName: "UserIsNotAuthenticated"
});
let _LoginContainer: any = LoginContainer
let _DashboardContainer: any = DashboardContainer
let _AddUserContainer: any = AddUserContainer
let _RequestInventoryContainer: any = RequestInventoryContainer
let _RequestContainer: any = RequestContainer
let _InventoryContainer: any =  InventoryContainer
const RedirectedLoginContainer = userIsNotAuthenticated(_LoginContainer)
const RedirectedDashboardContainer = userIsAuthenticated(_DashboardContainer)
const RedirectedRequestInventoryContainer = userIsAuthenticated(_RequestInventoryContainer)
const RedirectedAddUserContainer = userIsAuthenticated(_AddUserContainer)
const RedirectedRequestContainer = userIsAuthenticated(_RequestContainer)
const RedirectedInventoryContainer = userIsAuthenticated(_InventoryContainer)


export default class AppContainer extends React.Component<{}, {}> {
  render() {
  

    return (
      <React.Fragment>
        <HeaderComponent />
        <main>

          <Switch>
            <Route exact path='/' component={RedirectedLoginContainer} />
            <Route exact path='/userDashboard' component={RedirectedDashboardContainer} />
            <Route exact path='/requestInventory' component={RedirectedRequestInventoryContainer}  />
            <Route exact path='/user' component={RedirectedAddUserContainer}  />
            <Route exact path='/requests' component={RedirectedRequestContainer}  />
            <Route exact path='/inventory' component={RedirectedInventoryContainer}  />

            <Route component={NotFound} />
          </Switch>

        </main>
      </React.Fragment>
    )
  }
}


