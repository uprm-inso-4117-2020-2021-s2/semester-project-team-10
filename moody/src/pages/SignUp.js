import React from 'react';
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
import { useMutation } from "react-query";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

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
  //to change the color of the icon
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

export default function SignUpSide() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [snackBarMessage, setSnackBarMessage] = React.useState('')
  const [open, setOpen] = React.useState(false);

  const postSignUpData= useMutation(data=> axios.post('http://localhost:8000/users', data), {
    onSuccess: async () => {
      setSnackBarMessage('Sig up succesful!')
      handleClick()
    },
    onError: async () => {
      setSnackBarMessage('An error occured')
      handleClick()
    }
  })

  const onSubmit = (data) => { 
    postSignUpData.mutate(data)
    console.log(data);
  }

   const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Grid container component="main" className={classes.root}>
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
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}> */}
                {/* <TextField */}
                  {/* inputRef={register({ required: true, maxLength: 30 })} */}
                  {/* autoComplete="fname" */}
                  {/* name="firtsName" */}
                  {/* variant="outlined" */}
                  {/* margin="normal" */}
                  {/* required */}
                  {/* fullWidth */}
                  {/* id="firstName" */}
                  {/* label="First Name" */}
                  {/* autoFocus */}
                {/* /> */}
              {/* </Grid> */}
              {/* <Grid item xs={12} sm={6}> */}
                {/* <TextField */}
                  {/* inputRef={register({ required: true, maxLength: 30 })} */}
                  {/* variant="outlined" */}
                  {/* margin="normal" */}
                  {/* required */}
                  {/* fullWidth */}
                  {/* name="lastName" */}
                  {/* label="Last Name" */}
                  {/* id="lastName" */}
                  {/* autoComplete="lname" */}
                {/* /> */}
              {/* </Grid> */}
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
                <TextField
                  inputRef={register({ required: true })}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete='email'
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  inputRef={register({ required: true, minLength: 5, maxLength: 30, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/})}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
            </Grid>
              {/* <Grid item xs={12} >
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordAgain"
                    label="Confirm Password"
                    type="passwordAgain"
                    id="passwordAgain"
                    autoComplete="current-password-again"
                /> */}
              {/* </Grid> */}
            </Grid>
            {errors.password && "Password must be between 5 to 30 characters and must include at least one number"}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="#ed9f93"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item >
                <Link href="/register" variant="body2">
                  {"Already have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </form>
        </div>
            <Box mt={5}>
              <Copyright />
            </Box>
      </Grid>
    </Grid>
  );
}