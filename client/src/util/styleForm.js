import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formContainer: {
      backgroundColor: 'rgb(211, 210, 210)',
      position: 'absolute',
      zIndex: 10,
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '50%',
      padding :'none',
      borderRadius: '5px',
    },
    closeButton:{
      float:'right',
      
    }, 
    selectControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

 const Copyright =()=>{
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <span>
         Kirae
        </span>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export { useStyles, Copyright };