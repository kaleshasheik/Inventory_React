import * as React from 'react'

import  TextBox  from '../core-libs/TextBox'
import {DateField} from '../core-libs/DateField'
import  SelectBox  from '../core-libs/SelectBox'
import { withStyles, Theme, createStyles} from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'

import {Header} from '../core-libs/components/Header'
import ButtonBox from '../core-libs/ButtonBox'
import Paper from '@material-ui/core/Paper'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as _ from 'lodash'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { NodeStringDecoder } from 'string_decoder';

import Avatar from '@material-ui/core/Avatar'
import PersonAdd from '@material-ui/icons/Person'
import Edit from '@material-ui/icons/Edit'

import Typography from '@material-ui/core/Typography'
import { LARGE } from 'material-ui/utils/withWidth';
 import {validateInput} from '../validations/user'
 import FormHelperText from '@material-ui/core/FormHelperText';


const styles = (theme: Theme) => createStyles({
    main: {
       
        width: 'auto',
        display: 'block',
        alignItems: 'center',
       marginTop: -20,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,

    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: '#FF8C00',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {

        backgroundColor: 'darkorange',
        color: 'white',
       
        borderRadius: '12px',
        width: theme.spacing.unit * 34,

        textTransform: 'none',
        "&:hover": {
            textDecoration: 'none',
            backgroundColor: 'orange'
        }

    },
    reset: {
        marginTop: -30,
        color: 'darkorange',
        marginRight: theme.spacing.unit * 25,
        textDecoration: 'none',
        width: theme.spacing.unit * 24,
        textTransform: 'none',
        "&:hover": {
            textDecoration: 'none',
            color: 'orange',
            backgroundColor: 'transparent',
        }
    },
    formcontrol: {
        width: '100%',
       
       // marginBottom: theme.spacing.unit * 2,
       
      
      
            
      },
      selectcontrol:{
        marginBottom: theme.spacing.unit *3,
        marginTop: theme.spacing.unit * 1,
        width: '100%',
       
      },

    titile: {
        marginBottom: theme.spacing.unit * 3,
    },
    modal: {
        marginTop: theme.spacing.unit * 16,
    },
    password: {
        marginLeft: theme.spacing.unit * 10,
        color: '#23333D',
        fontSize: theme.spacing.unit * 2,
        textTransform: 'none',
    }
})



  export interface NewUserProps extends RouteComponentProps<any> {
    classes: any
    newUserDetails?: any
    user?: any
    existingUser?: any
    action?: string
}

export interface NewUserState {
   UserId: string
   Name: string 
   MailId: string
   ContactNumber: string
   Designation: string
   Role: string
   error: string
   errors: any
   isError: boolean
}


 class NewUserForm extends React.Component<NewUserProps,NewUserState> {
    constructor(props: NewUserProps) {
        super(props)
        this.state = {
            UserId: '',
            Name: '',
            MailId: '',
            ContactNumber: '',
            Designation: '',
            Role: '',
            error: '',
            errors: {},
            isError: false
        }
    }

    componentWillMount(){

        console.log('existing user ', this.props.action)
        if(this.props.action === 'Edit')
        {
            console.log('in edit user ', this.props.action)

            this.setState({ UserId: this.props.existingUser.employee_id, 
                Name: this.props.existingUser.name ,MailId: this.props.existingUser.email ,
                ContactNumber: this.props.existingUser.contact_number, Role: this.props.existingUser.role })

        }
        else if(this.props.action === 'Add')
        {
            console.log('in add user ', this.props.action)
            this.resetInput()

        }

    }

    resetInput = () => {
        this.setState({ UserId: '', Name: '',MailId: '' ,ContactNumber: '', Designation: '', Role: '' , errors: {}})
      
    }


    onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

      
        if (event!.target) {
            this.setState({ ...this.state, [event.target.name]: event.target.value })
        }

        console.log('newUser form', this.state)
    }

   
    isValid() {
        const { errors, isValid } = validateInput(this.state)
        console.log('new form erros', errors, isValid)
        if (!isValid) {
            this.setState({ errors })
            this.setState({isError: true})
          }
    
        return isValid;
      }
      

    handleSubmit = () => {

        if (this.isValid()){

            console.log(' user form is valid')
          this.props.newUserDetails(this.state, this.props.action)
        }

        else {
            console.log(' user form NOT valid')

        }
        
       

        // this.props.history.push("/userDashboard")

    }


    render() {
        const { classes } = this.props
       console.log('role ', this.props.existingUser)

        return (
            <React.Fragment>
             
            
             <main className={classes.main}>


                <CssBaseline />
               
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        

                    <PersonAdd fontSize={'large'}/>
                    </Avatar>
                    <Typography className={classes.titile} component='h1' variant='h3'>
                    <h4 >{this.props.action === 'Add'? 'New User': 'Modify User'}</h4>
                    </Typography>
                    <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='MailId' label='Email Address' type='text' variant='outlined' disabled={false}  
          value={this.state.MailId}  
          error = {this.state.errors.MailId} onChange={this.onTextChange.bind(this)} />           
          </FormControl>
          <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='Name' label='Employee Name' type='text' variant='outlined' disabled={false} 
               value={this.state.Name}  
               error = {this.state.errors.Name}
          onChange={this.onTextChange.bind(this)} />        
          </FormControl>
          <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='UserId' label='Employee Id' type='text' variant='outlined' disabled={false}  
               value={this.state.UserId}  

               error = {this.state.errors.UserId} onChange={this.onTextChange.bind(this)} />           
          </FormControl>
     
         
          <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='ContactNumber' label='ContactNumber' type='text' variant='outlined' disabled={false}  
                value={this.state.ContactNumber}  

                error = {this.state.errors.ContactNumber} onChange={this.onTextChange.bind(this)} />           
          </FormControl>
         
          <FormControl className={classes.selectcontrol} fullWidth error={this.state.errors.Role && this.state.errors.Role.length>0}>
          <SelectBox name='Role' label='Role' invTypes={role}  error = {this.state.errors.Role} variant='outlined'
              value={this.state.Role}  id='userRole'

          onChange={this.onTextChange.bind(this)}/>    
        <FormHelperText>{this.state.errors.Role}</FormHelperText>
    
          </FormControl>

        <FormControl>

       {this.props.action === 'Add'? 
        <ButtonBox type='submit' name='Add User' label='AddUser' class={classes.submit}  onClick={this.handleSubmit.bind(this)}/>
        :
        <ButtonBox type='submit' name='Edit User' label='EditUser' class={classes.submit}  onClick={this.handleSubmit.bind(this)}/>
        }
        </FormControl>


                </div>
            </main>
             
               
            </React.Fragment>

        )
    }
}

export default withRouter(withStyles(styles)(NewUserForm))


const role= [ { name: 'Employee' },
{ name: 'L1 Manager'},
{ name: 'L2 Manager' },
{ name: 'Inventory Manager' },

]