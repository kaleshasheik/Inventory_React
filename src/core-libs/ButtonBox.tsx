import * as React from 'react'
import { withStyles, createStyles, Theme, createMuiTheme ,MuiThemeProvider} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Send from '@material-ui/icons/Send'
import Cancel from '@material-ui/icons/Cancel'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Devices from '@material-ui/icons/Devices'

import Edit from '@material-ui/icons/Edit'

interface Istyle{

    margin: string
    marginLeft: string
    backgroundColor: string
}


const styles = (theme:Theme) => createStyles({
    main: {
     
      width: 'auto',
      display: 'block', 
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      marginTop:  theme.spacing.unit * 20,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: 'orange',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit ,
      backgroundColor: 'orange',
      color: 'white',
      marginLeft: theme.spacing.unit * 25,
     
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    formcontrol: {
        width: '100%',
       // marginTop: 0,
        marginBottom: theme.spacing.unit * 2,
        margin: 0,

       
        marginTop: '-20px',
        // marginBottom: theme.spacing.unit * 2,
       
        
        
      },
  })

export interface ButtonProps { 
    type: string
    name?: string
    style?:Istyle
    disabled?: boolean
    // onClick?: (x?: any) => void
    onClick?:(event: React.ChangeEvent<HTMLInputElement>)  => void
    classes?: any
    class?: any
    value ?: string
    label?: string
}

  class ButtonBox extends React.Component<ButtonProps, {}> {


      
    public onSubmit(event:any) {
  
        this.props.onClick(event)
    }
    
    render() {
        const {classes}= this.props
       
        let icon = null; 
if (this.props.name === "Sign In") {
  icon = <ExitToApp className={classes.rightIcon} />
} else if (this.props.name === "Submit") {
  icon =  <Send className={classes.rightIcon}/>
}
else if (this.props.label === "Add User") {
  icon =  <PersonAdd className={classes.rightIcon}/>
}
else if (this.props.label === "Add Inventory") {
  icon =  <Devices className={classes.rightIcon}/>
}


else if (this.props.label === "Cancel") {
  icon =  <Cancel fontSize="large" color="secondary" className={classes.rightIcon}/>
}


        console.log('style', this.props.style)
        return ( 

            <Button 
            type={this.props.type}
            
          
            
            className={this.props.class} onClick={this.onSubmit.bind(this)}
          >
           {this.props.name} 

          {icon}

          </Button>

        )

        
    }
}

export default withStyles(styles)(ButtonBox)

