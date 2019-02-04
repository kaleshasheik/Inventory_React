import * as React from 'react'

import * as moment from 'moment'
import {
    MuiPickersUtilsProvider,
    InlineDatePicker,DatePicker
  } from 'material-ui-pickers'

  import DateFnsUtils from '@date-io/date-fns'
  import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
  import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

  import { createMuiTheme ,MuiThemeProvider} from '@material-ui/core/styles'
  import green from '@material-ui/core/colors/green'
  

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: { useNextVariants: true },
  })

  
export interface DateFieldProps 
  {
   
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    style?: any
    label: string
    dateValue: any
    value: any
    error?: string
    
   }
   export interface DateFieldState {
    selectedDate: Date
}

 
export class DateField extends React.Component<DateFieldProps, DateFieldState> {

  constructor(props: DateFieldProps) {
    super(props)
    this.state = {
       
      selectedDate: null
        
    }
}


    handleDateChange = (datevalue:any) => {
        
      console.log('datevalue', datevalue)
     
      this.props.dateValue(this.props.name, datevalue );

      }
    
   
    render() 

    {  
            return ( 

         

<MuiPickersUtilsProvider utils={DateFnsUtils}>
<MuiThemeProvider theme={theme}>

          <DatePicker  
            clearable={true} 
           
            error={this.props.error && this.props.error.length > 0}
            helperText={(this.props.error && this.props.error.length > 0) ? this.props.error : null}

            autoOk
            disablePast={true}
            variant='standard'
            margin='dense'
            name={this.props.name}
            value={this.props.value}
            label={this.props.label}
            onChange={this.handleDateChange}
            format='dd/MM/yyyy'
            leftArrowIcon={<KeyboardArrowLeft/>}
            rightArrowIcon={<KeyboardArrowRight/>}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
          <br/>
     
          </MuiThemeProvider>
       </MuiPickersUtilsProvider>
        
            
            )
        
    }
}
