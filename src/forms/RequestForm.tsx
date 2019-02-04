

import * as React from 'react'

import  TextBox  from '../core-libs/TextBox'
import {DateField} from '../core-libs/DateField'
import  SelectBox  from '../core-libs/SelectBox'
import { withStyles, Theme, createStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'

import {Header} from '../core-libs/components/Header'
import ButtonBox from '../core-libs/ButtonBox'
import Paper from '@material-ui/core/Paper'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button , CardHeader} from 'reactstrap';
import * as _ from 'lodash'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import {validateInput, validatePendingRequests} from '../validations/requestInventory'
import FormHelperText from '@material-ui/core/FormHelperText';
import CustomizedSnackbars from '../core-libs/components/SnackBar'

 export interface RequestFormProps extends RouteComponentProps<any> {
     classes: any
     requestDetails: any
     user: any
     dashBoardData?: any
     messageDetails?: any
    
 }

export interface RequestFormState {
    UserId: string
    Name: string 
    MailId: string
    Inventory: string
    StartDate: Date
    EndDate: Date
    Reason: string
    error: string
    errors: any
    isError: boolean
    formSubmit: boolean
   
}

const styles = (theme:Theme) => createStyles({
    main: {

        width: 'auto',
        display: 'block',
        alignItems: 'center',
        marginTop: theme.spacing.unit * 20 ,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginBottom: '50px',
        backgroundColor: '#F5F5F5',
       marginLeft: '90%'
    },
    paper: {
       
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      
    },
  
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing.unit * 1,
      margin: 0,
     background: 'white'
     
    },
    titile:
    {

        width:'100%',
        height:'1px',
       
    },
    formcontrol: {
        width: '100%',
       
       // marginBottom: theme.spacing.unit * 2,
       
          marginTop: '-15px',
      
            
      },
      dateformcontrol:{
        marginBottom: theme.spacing.unit ,
        marginTop: '-10px',
        width: '100%',
       
      },
      startdatecontrol:{
        marginTop: '-20px',
        width: '100%',
      },
      submit: {
        marginTop: -17 ,
        backgroundColor: '#ffa64d',
        color: 'white',
        marginLeft: theme.spacing.unit * 42,
        borderRadius: '12px',
        width: '30%',
        textTransform: 'none',
        bottom: '20px'
      },
      reset: {
        marginTop: 10,
        backgroundColor: '#C0C0C0',
        color: 'black',
        width: '30%',
        borderRadius: '12px',
        marginLeft: theme.spacing.unit * 3,
        textTransform: 'none',
    },
    card: {
        border: "10",
        color: 'red',
        background: 'white',

        
      },
      cardHeader: {
        borderRadius: "3px solid red !important",
        borderColor: 'red', 
        padding: "1rem 10px",
        marginLeft: "15px",
        marginRight: "15px",
        marginTop: "-30px",
        border: "0",
        marginBottom: "0",
        color: "grey",
  background: "#ffa64d",
  height: 60,
  boxShadow:
    "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)"

      },

  })

 class RequestForm extends React.Component<RequestFormProps,RequestFormState> {
    constructor(props: RequestFormProps) {
        super(props)
        this.state = {
            UserId: '',
            Name: '',
            MailId: '',
            Inventory: '',
            Reason: '',
            StartDate: null, 
            EndDate: null,
            error: '',
            errors: {},
            isError: false,
            formSubmit: false
           
            
        }
    }

    resetInput = () => {
        this.setState({ UserId: '', Name: '',Inventory: '' ,Reason: '', StartDate: null, EndDate: null , isError: false, errors:{} })
      
    }

    isValid() {
        console.log('request state', this.props.dashBoardData)
        const { errors, isValid } = validateInput(this.state, this.props.dashBoardData)
       console.log('request error', errors, isValid, errors.Pending)
       if (!isValid) {
        this.setState({ errors })
        this.setState({isError: true})
      }

      
        return isValid
      }

      isPending() {
      
      const { errors, isPending } = validatePendingRequests(this.props.dashBoardData, this.state.Inventory)
     
        return [isPending, errors.message]
      }

    onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        console.log('inv, ' , event.target.name)

        if (event!.target) {
            this.setState({ ...this.state, [event.target.name]: event.target.value })
        }

        console.log('requestform', this.state)
    }

    validateField = () => {
              
        if (!this.state.StartDate || !this.state.EndDate || !this.state.Inventory || !this.state.Reason) {
            this.setState({ error: 'is Required' })
        }

    }

    onDateChange = (event:any, date:any) => {
      
        console.log('date', date)
        console.log('event', event)

    }

    setDate = (field:string, value: any) => {
        
        this.setState({ ...this.state, [field]: value })
                 
    }
    
    

    handleSubmit = () => {
       
        this.validateField()
        
        this.setState({ ...this.state, UserId : this.props.user.employee_id , Name: this.props.user.name })
      if(this.isValid()){
        
        var [isPending, errormsg] = this.isPending()
         if(!isPending){
            this.setState({formSubmit: true})
            this.props.requestDetails(this.state)
            this.resetInput()
         }
         
      }
      else{
            
      }
      // this.props.history.push("/requestInventory")

    }

    render() {
        const { classes } = this.props
        const { errors } = this.state
        var [isPending, errormsg] = this.isPending()
      
       console.log('pending message ', isPending, errormsg, this.state.formSubmit)
        return (
            <React.Fragment>
           
           {this.state.formSubmit == true ? <CustomizedSnackbars type='success' message='Inventory Request Submitted successfully'/>: ''}   
             { isPending == true && errormsg!=null && errormsg!=''  ? <CustomizedSnackbars type='warning' message= {errormsg}/>: ''}   



             <div className={this.props.classes.main}>
             <div className="row justify-content-center align-items-center">

             
             <Grid
  container
 
>
     
      
               
       <Card className='card'>
                    <CardHeader className={classes.cardHeader}>
                      <h5 style={{textAlign:'center', color:'white'}}>Inventory Form</h5>
                   
                    </CardHeader>
                  
                    <CardBody>
                     <div style= {{marginTop: '2%'}}>
                    <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='UserId' label='Employee Id' type='text' variant='standard' disabled={true}   value= {this.props.user.employee_id} error ='' onChange={this.onTextChange.bind(this)} />           
          </FormControl>
          <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='Name' label='Employee Name' type='text' variant='standard' disabled={true} value= {this.props.user.name} error =''  onChange={this.onTextChange.bind(this)} />        
          </FormControl>
          <FormControl className={classes.dateformcontrol} fullWidth error={this.state.isError}>
          
            <SelectBox name='Inventory' label='InventoryType' id='requestInv' invTypes={invTypes} variant='standard' error='' value={this.state.Inventory}  onChange={this.onTextChange.bind(this)}/>        
           
            <FormHelperText>{this.state.errors.Inventory}</FormHelperText>

            </FormControl>
            <FormControl  className={classes.startdatecontrol} fullWidth >
            <DateField name='StartDate' label='Start Date' value={this.state.StartDate} error={this.state.errors.StartDate} onChange={this.onDateChange.bind(this)} dateValue={this.setDate}  />
            </FormControl>
            <FormControl className={classes.startdatecontrol} fullWidth error>
            <DateField name='EndDate' label='End Date' value={this.state.EndDate} error={this.state.errors.EndDate} onChange={this.onDateChange.bind(this)} dateValue={this.setDate}  />
            </FormControl>
            <FormControl className={classes.startdatecontrol} fullWidth >
          <TextBox name='Reason' label='Reason' type='text' variant='standard' error= {this.state.errors.Reason} disabled={false}  value= {this.state.Reason}  onChange={this.onTextChange.bind(this)} />        
          </FormControl>

        <FormControl   >
        <ButtonBox type='submit' name='Reset' class={classes.reset}  onClick={this.resetInput.bind(this)}/>

        <ButtonBox type='submit' name='Submit' class={classes.submit}  onClick={this.handleSubmit.bind(this)}/>
        </FormControl>

        </div>
                    </CardBody>
                
                </Card>
       </Grid>
    </div>
             </div>
               
            </React.Fragment>

        )
    }
}

export default withRouter(withStyles(styles)(RequestForm))



const invTypes= [ { name: 'Laptop' },
{ name: 'DataCard'},
{ name: 'Both' },
]

