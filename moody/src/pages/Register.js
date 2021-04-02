import {React, useState, useContext}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../images/4391855.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from "react-query";
import Snackbar from '@material-ui/core/Snackbar';
import {AuthContext} from '../components/AuthContext';
import { set } from 'date-fns';
import { Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="#594D4F" align="center">
      {'Copyright © '}
        Moody :) 2021.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: "#594D4F",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  avatar:{
    backgroundColor:"#ed9f93"

},
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#ed9f93"
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [open, setOpen] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [username, SetUsername] = useState('')

  const postSignInData = (data) => {
    const params = new URLSearchParams()
    params.append('username', data.username);
    params.append('password', data.password);
    SetUsername(data.username);
    return axios.post('http://localhost:8000/token',params)
  }

  const handleSignInData= useMutation(postSignInData ,{
    onSuccess: (response) => {
      setState({user_name: username,access_token:response.data.access_token});
      setSnackBarMessage('Sign in succesful!')
      handleClick()
    },
    onError: (error) => {
      setSnackBarMessage('An error occured')
      handleClick()
    }
  })

  const onSubmit = (data) => {
    handleSignInData.mutate(data);
    console.log(data)
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Grid container component="main" className={classes.root}>
      {handleSignInData.isSuccess && <Redirect to='/'/>}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        message={snackBarMessage}
      />
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register({ required: true, maxLength: 30 })}
              autoComplete="fname"
              name="username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
            />
            <TextField
              inputRef={register({ required: true, minLength: 5, maxLength: 30, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/ })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && "Password must be between 5 to 30 characters and must include at least one number"}
            {handleSignInData.isError && `${handleSignInData.error.response.data.detail}`}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="#594D4F"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}