import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ApplicationBar from '../core-libs/components/AppBar'
import App from '../common/Dashboard'

import { ToastContainer } from "react-toastify"
import '../assests/styles/ReactToastify.css'



export interface HeaderComponentProps {
 }

export interface HeaderComponentState {
    

}

export class HeaderComponent extends React.Component<HeaderComponentProps, HeaderComponentState> {
    
    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider>
                 <App />
                        
                </MuiThemeProvider>
            </React.Fragment>

        )
    }
}

