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
import Devices from '@material-ui/icons/Devices'
import Edit from '@material-ui/icons/Edit'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import { LARGE } from 'material-ui/utils/withWidth'
import {validateInput} from '../validations/inventory'
 
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
        marginTop: theme.spacing.unit * 2,
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
       
     //  marginBottom: theme.spacing.unit * 1,
      
            
      },
      dateformcontrol:{
       marginBottom: theme.spacing.unit * -1,
        
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



  export interface InventoryFormprops extends RouteComponentProps<any> {
    classes: any
    newInvDetails?: any
    Inventory?: any
    existingInv?: any
    action?: string
}

export interface InventoryFormState {
   InventoryType: string
   Model: string 
   SerialNo: string
   SIM: string
   Manufacturer: string
   Configuration: string
   errors: any
}


 class InventoryForm extends React.Component<InventoryFormprops,InventoryFormState> {
    constructor(props: InventoryFormprops) {
        super(props)
        this.state = {
            InventoryType: '',
            Model: '',
            SerialNo: '',
            SIM: '',
            Manufacturer: '',
            Configuration: '',
            errors:{}
        }
    }

    componentWillMount(){

        console.log('existing user ', this.props.action)
        if(this.props.action === 'Edit')
        {
            console.log('in edit user ', this.props.action)

           this.setState({ InventoryType: this.props.existingInv.product_type, 
            Model: this.props.existingInv.model ,SerialNo: this.props.existingInv.serial_no ,
            SIM: this.props.existingInv.sim_no  })

        }
        else if(this.props.action === 'Add')
        {
            console.log('in add user ', this.props.action)
            this.resetInput()

        }

    }

    resetInput = () => {
        this.setState({ InventoryType: '', Model: '',SerialNo: '' ,SIM: '', Manufacturer: '', Configuration: '' })
      
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
           
          }
    
        return isValid;
      }
      

    handleSubmit = () => {

       if(this.isValid()){
        console.log('Inventory form is  valid')

        this.props.newInvDetails(this.state, this.props.action);
       }

       else{

        console.log('Inventory form is not valid')
       }
       

        // this.props.history.push("/userDashboard")

    }


    render() {
        const { classes } = this.props
       console.log('role ', this.props.existingInv)

        return (
            <React.Fragment>
   
             <main className={classes.main}>


                <CssBaseline />
               
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        

                    <Devices fontSize={'large'}/>
                    </Avatar>
                    <Typography className={classes.titile} component='h1' variant='h3'>
                    <h4 >{this.props.action === 'Add'? 'New Inventory': 'Modify Inventory'}</h4>
                    </Typography>
                    <FormControl className={classes.dateformcontrol} fullWidth error={this.state.errors.InventoryType}>
          <SelectBox name='InventoryType' label='Inventory Type' invTypes={invTypes}   variant='outlined'
              value={this.state.InventoryType}  id='newInv'

          onChange={this.onTextChange.bind(this)}/>     
            <FormHelperText>{this.state.errors.InventoryType}</FormHelperText>
   
          </FormControl>
          <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='Model' label='Model' type='text' variant='outlined' disabled={false} 
               value={this.state.Model}  
               error = {this.state.errors.Model}
          onChange={this.onTextChange.bind(this)} />        
          </FormControl>
          <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='SerialNo' label='Serial Number' type='text' variant='outlined' disabled={false}  
               value={this.state.SerialNo}  

               error = {this.state.errors.SerialNo} onChange={this.onTextChange.bind(this)} />   
            
          </FormControl>
          {this.state.InventoryType!=null && this.state.InventoryType === 'DataCard' ?      
               <FormControl className={classes.formcontrol}  fullWidth >
          <TextBox name='SIM' label='SIM Number' type='text' variant='outlined' disabled={false}  
                value={this.state.SIM}  

                error = {this.state.errors.SIM} onChange={this.onTextChange.bind(this)} />           
          </FormControl>
          :'' }
         
          
        <FormControl   >

       {this.props.action === 'Add'? 
        <ButtonBox type='submit' name='Add Inventory' label='Addinventory' class={classes.submit}  onClick={this.handleSubmit.bind(this)}/>
        :
        <ButtonBox type='submit' name='Edit Inventory' label='Editinventory' class={classes.submit}  onClick={this.handleSubmit.bind(this)}/>
        }
        </FormControl>


                </div>
            </main>
             
               
            </React.Fragment>

        )
    }
}

export default withRouter(withStyles(styles)(InventoryForm))


const invTypes= [ { name: 'Laptop' },
{ name: 'DataCard'},
]