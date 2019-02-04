import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const styles1 = (theme:any) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props:any) {
  const { classes, className, message, onClose, variant, ...other } = props;
  console.log('MySnackbarContent')

  return (
    <div>
   

    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
                  <CheckCircleIcon   />

          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
         
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
    </div>
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = (theme:any) => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

export interface snackProps { 

  
    classes? :any
    type?: string
    message?: any
    open?: boolean

}

export interface snackState { 

  
 open: boolean

}

class CustomizedSnackbars extends React.Component<snackProps,snackState > {

  constructor(props: snackProps) {
    super(props)
    this.state = {
        open: true

    }
}

handleClose = (event:any, reason:any) => {
 
  this.setState({ open: false });
};
handleClick = () => {
  this.setState({ open: true })
}

shouldComponentUpdate(nextProps:any, nextState:any) {
if(this.state.open == false){

  this.setState({ open: true })
}

  return true
}
componentDidMount(){
  console.log('componentDidMount')
  this.setState({ open: true })
}

  render() {
    const { classes } = this.props;
     console.log('CustomizedSnackbars')
    return (
      <div>
    
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.props.type}
            message= {this.props.message}
          />
        </Snackbar>
       
      </div>
    );
  }
}


export default withStyles(styles2)(CustomizedSnackbars);