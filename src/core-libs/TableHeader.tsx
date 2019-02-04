import * as React from 'react'
import './Footer.scss'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import TableBody from '@material-ui/core/TableBody'

import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import { withStyles, createStyles, Theme, createMuiTheme ,MuiThemeProvider} from '@material-ui/core/styles'
import * as _ from 'lodash'
import ButtonBox from '../core-libs/ButtonBox'
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel'
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentReturn from '@material-ui/icons/AssignmentReturn'
import {Header} from '../core-libs/components/Header'
import {DashBoardModalForm} from '../forms/DashBoardModalForm'

import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

interface Iheader{
    name: string
}

interface Icolumns{
  
 
    RequestNo: number
    lapno: number
    assigned: string
    status: string

}

const CustomTableCell = withStyles(theme => ({
    head: {
       backgroundColor: '#708090',
      color: 'white',
      fontSize: 14,
     
    },
    body: {
      fontSize: 13,
    },
  }))(TableCell);
  
  const styles = (theme:Theme) => createStyles({
    root: {
       
        marginTop: theme.spacing.unit * 13,
        marginLeft: theme.spacing.unit * 12,
        
        overflowX: 'visible',
        bottom: '20px',
       marginBottom: '50px',
      
      },
      paper:{

        marginTop: theme.spacing.unit * 13,
        marginLeft: theme.spacing.unit * 2,
        width: '100%',
        
        overflowX: 'visible',
        bottom: '20px',
       marginBottom: '50px',
      },
      table: {
     
        bottom: '20px',
        height: '50%'
       
      },

      row: {
        '&:nth-of-type(even)': {
          backgroundColor: '#F8F8F8'
        },
        height: '10%',
       
      },
      cell:{
    
        height: '30%',
        width: '15%',
       

      },
      surrender:{

  color: 'green'
},
cancel:{
  color: 'red'
},
      submit: {
        backgroundColor: 'white',
        color: 'black',
        marginTop: '5px',
        border: '2px solid #779ecb',
        borderRadius: '12px',
        width:'80%',
        height: '2%',
        textTransform: 'none',
        marginLeft: theme.spacing.unit * 3,
        "&:hover": {
          textDecoration: 'none',
          backgroundColor:'#779ecb'
        }
      },
     
     
    });
  
export interface TableHeaderProps { 
    headers: any
    coulmns: any
    classes?: any
    needIconButton?: boolean
    title?: string
}

export interface TableHeaderState { 
   
    action: string
    modal?: any
}



 class TableData extends React.Component<TableHeaderProps, TableHeaderState> {

    constructor(props: TableHeaderProps) {
        super(props)
        this.state = {
          action: null,
          modal: false

      }
        
    }

    handleModal = () => {
      
      this.setState({
          modal: !this.state.modal
        });
  }
   
    handleClick = (name:any, value:string) => {
     
      this.setState({
        modal: !this.state.modal
      });
      
      this.setState(
        { action: name },
          () => {
            
          }
    );

       console.log('console',value)
       
  
    }

    
     row = (x:any, i:number, header:Iheader[]) =>
    <TableRow className={this.props.classes.row} key={`tr-${i}`}>
      {header.map((y:any, k:any) =>
        <CustomTableCell   key={`trc-${k}`}>
         
          {x[y.prop] != '' && x[y.prop] != null ? x[y.prop] : ' - '}
        </CustomTableCell>
      )}
 
{this.props.needIconButton && x.status == 'Assigned to User' ? (
      <Tooltip title="Surrender Inventory" aria-label="Add">
    <IconButton   type='submit' name= 'Surrender' value={x.RequestNo}  onClick={() => this.handleClick('Surrender', x)} >

    <AssignmentReturn fontSize="default"  className={this.props.classes.surrender} onClick={() => this.handleClick('Surrender', x)}  />
    </IconButton>
    </Tooltip>
    ) : 
  ( ''
  )
  }

{this.props.needIconButton && x.status !== 'Assigned to User' ? (
  <Tooltip title="Cancel this request" aria-label="Cancel">
  <IconButton  type='submit'  name='Cancel' value={x.RequestNo} onClick={() => this.handleClick('Cancel', x)}  >  
<Cancel fontSize="default"  className={this.props.classes.cancel} onClick={() => this.handleClick('Cancel', x)}  />
</IconButton>
</Tooltip>
    ) : 
  ( ''
  )
  }


    </TableRow>
  


    render() {
        const {classes} = this.props
        console.log('state', this.state.action)
        return ( 
          <React.Fragment>
         
            <div className={classes.root} >
            <h5 style={{marginLeft: '24%'}}> {this.props.title} </h5>
          
      <Table className={classes.table} cellPadding={0}>
     
            <TableHead className={this.props.classes.cell}>
                <TableRow className={this.props.classes.cell} >
                     {this.props.headers.map((header:Iheader, i: number) => {
                        return <CustomTableCell className={this.props.classes.cell} key={i}>{header.name}</CustomTableCell>
                    }) }
                   
                </TableRow>
            </TableHead>
     <TableBody>
      {this.props.coulmns.map((x:Icolumns, i:number) => this.row(x, i, this.props.headers))}
    </TableBody>
            </Table>    
      </div>

    
      <Modal style={{marginTop: '10%'}} isOpen={this.state.modal} >
          <ModalHeader> Do you want to {this.state.action} this Inventory  ?  </ModalHeader>
         
          <ModalFooter>
            <Button variant="outlined" onClick={this.handleModal.bind(this)} style={{borderRadius: '15px',}} color="secondary">No</Button>{' '}
            <Button onClick={this.handleModal.bind(this)} style={{color: 'white', backgroundColor: 'green', borderRadius: '15px',}} >Yes</Button>
          </ModalFooter>
        </Modal>
              
      </React.Fragment>
         )
        
    }
}


 
 export default withStyles(styles)(TableData)
