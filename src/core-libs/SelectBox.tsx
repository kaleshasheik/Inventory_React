import * as React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Input from '@material-ui/core/Input'

import { withStyles, createStyles, Theme , MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

interface inventoryTypes{

  name?: string
  serial_no?: string
  sim_no?: string
}
export interface SelectBoxProps 
  {
    
    onChange:(event: any) => void
    value: string
    style?: any
    name: string
    classes: any
    invTypes: inventoryTypes[]
    label: string
    error?: string
    variant?: string
    id?: string
    requestType?: string
   }
   export interface SelectState {
 
}



const styles = (theme:Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  standard: {
   
    // marginLeft: theme.spacing.unit * 1,
    marginTop: -7

  },

  outlined: {
   
     marginLeft: theme.spacing.unit * 2,
    marginTop: -7

  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  
})

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: { useNextVariants: true },
})



  class SelectBox extends React.Component<SelectBoxProps, SelectState> {

 
      public handleChange(event:React.FormEvent<EventTarget>) {
           this.props.onChange(event)
      }
   
    input= () => {
     <div>
      input={ 
        <OutlinedInput
          labelWidth={100}
          name={this.props.name}
          id='outlined'
                      
        /> 
      }</div>
    }
   
    render() {
      const { classes } = this.props
      console.log('selectBox', this.props.id, this.props.requestType)
            return ( <div >
  
  

           <MuiThemeProvider theme={theme}>
       {this.props.variant!=null && this.props.variant === 'standard' ?
          <InputLabel  className={classes.standard} >{this.props.label}</InputLabel>
          :  <InputLabel  className={classes.outlined} >{this.props.label}</InputLabel>}

          <Select  name={this.props.name} className={classes.select} margin='dense'
            value={this.props.value} fullWidth 
            onChange={ e => this.handleChange(e) }   
            
           
            input={ 
              this.props.variant!=null && this.props.variant === 'standard' ?
              <Input
                name={this.props.name}
                id='standard'
                            
              /> 
              :
              <OutlinedInput
              labelWidth={100}
              name={this.props.name}
              id='outlined'
                          
            /> 
            }


            inputProps={{
              name: this.props.name,
              id: this.props.name,
              
            }}
            
          >
           
           <MenuItem   value=''>Please Select One</MenuItem>
            {this.props.id!=null && this.props.id === 'newInv' && 
            this.props.invTypes.map((type:inventoryTypes, i: number) => { 
       return <MenuItem   key={i}  value={type.name}> {type.name}</MenuItem>
            }) }

     {this.props.id!=null && this.props.id === 'requestInv' && 
            this.props.invTypes.map((type:inventoryTypes, i: number) => { 
       return <MenuItem   key={i}  value={type.name}> {type.name}</MenuItem>
            }) }

{this.props.id!=null && this.props.id === 'userRole' && 
this.props.invTypes.map((type:inventoryTypes, i: number) => { 
return <MenuItem   key={i}  value={type.name}> {type.name}</MenuItem>
}) }


            {this.props.id!=null && this.props.id === 'availableInv' && this.props.requestType!=null && this.props.requestType === 'Laptop' && this.props.invTypes!= undefined && this.props.invTypes.length>0 &&
              this.props.invTypes.map((type:inventoryTypes, i: number) => {
       return <MenuItem   key={i}  value={type.serial_no}> {type.serial_no}</MenuItem>
            }) }

      {this.props.id!=null && this.props.id === 'availableInv' && this.props.requestType!=null && this.props.requestType === 'DataCard' && this.props.invTypes!= undefined && this.props.invTypes.length>0 &&
        this.props.invTypes.map((type:inventoryTypes, i: number) => {
       return <MenuItem   key={i}  value={type.sim_no}> {type.sim_no}</MenuItem>
            }) }

          </Select>
    
          </MuiThemeProvider>
  
            </div>
            )
        
    }
}


export default withStyles(styles)(SelectBox)


