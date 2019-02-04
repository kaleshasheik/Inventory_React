import * as React from 'react'
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as _ from 'lodash'

import  TableData  from '../core-libs/TableHeader'


export interface DashBoardModalFormProps { 
 
    action: string
    requestDetails?: any
    headers?: any
}

export interface DashBoardModalFormState { 
 
    modal: boolean
}

export class DashBoardModalForm extends React.Component<DashBoardModalFormProps, DashBoardModalFormState> {
    
    constructor(props: DashBoardModalFormProps) {
        super(props)
        this.state = {
           
            modal: true

        }
    }

    closeModal = () => {
      
        this.setState({
            modal: !this.state.modal
          });
    }
    
    render() {
         alert(DashBoardModalForm)
         console.log(this.props.requestDetails)
            return(

                <Modal style={{marginTop: '10%'}} isOpen={this.state.modal} >
                <ModalHeader> Do you want to {this.props.action} this request ? </ModalHeader>
                <ModalBody>
             
                </ModalBody>
                <ModalFooter>
                <Button onClick={this.closeModal.bind(this)} color="primary">Change Password</Button>{' '}
            <Button onClick={this.closeModal.bind(this)} color="secondary" >Cancel</Button>
                </ModalFooter>
              </Modal>
            )
    }
}



   
