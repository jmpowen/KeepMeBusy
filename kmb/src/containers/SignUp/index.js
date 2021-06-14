import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppContext from '../../context/AppContext';

import { PostData } from '../../helpers/httpRequests';
import { isNullOrEmptyOrWhitespace } from '../../helpers/inputs';

import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: 100,
  },
  card: {
    margin: 'auto',
    width: '30%',
    boxShadow: '10px 10px 10px grey',
  },
  textFields: {
    padding: 10,
  },
  submitButton: {
    padding: 10,
  }
});

export default function SignUp() {
  let appContext = useContext(AppContext);
  let history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    username: null,
    password: null,
    password2: null,
    alert: null
  });

  useEffect(() => {
    if (values.alert === null) {
      return;
    }
    toast[values.alert.type](values.alert.message);
    setTimeout(() => {
      setValues({
        ...values,
        alert: null,
      });
    }, 1000);
  }, [values.alert]);

  const [accessToken, setAccessToken] = useLocalStorage('token', null);

  const handleSignUp = () => {
    if (accessToken) {
      history.push("/");
    } 

    if (isNullOrEmptyOrWhitespace(values.username)) {
      setValues({
        ...values,
        alert: { type: 'error', message: 'Username is not entered!' }
      });
      return; 
    } else if (isNullOrEmptyOrWhitespace(values.password)) {
      setValues({
        ...values,
        alert: { type: 'error', message: 'Password is not entered!' }
      });
      return; 
    } else if (isNullOrEmptyOrWhitespace(values.password2)) {
      setValues({
        ...values,
        alert: { type: 'error', message: 'Confirm Password is not entered!' }
      });
      return; 
    } else if (values.password !== values.password2) {
      setValues({
        ...values,
        alert: { type: 'error', message: 'Passwords do not patch!' }
      });
      return; 
    }
    
    PostData('someURL', { USERNAME: values.username, PASSWORD: values.password })
      .then(res => {
        if (res.status === 200) {
          history.push('/createProfile');
        } else {
          setValues({
            ...values,
            alert: { type: 'error', message: 'Error occurred. Try again.' }
          });
        }
      })
      .catch(err => console.log(err))

  }

  if (accessToken) {
    handleSignUp();
  }

  return (
    <div className={classes.root}>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Card className={classes.card}>
        <div className={classes.textFields}>
          <TextField
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            label="Username"
            type="search"
            variant="outlined"
            />
        </div>
        <div className={classes.textFields}>
          <TextField
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            label="Password"
            type="password"
            variant="outlined"
            />
        </div>
        <div className={classes.textFields}>
          <TextField
            value={values.password2}
            onChange={(e) => setValues({ ...values, password2: e.target.value })}
            label="Confirm Password"
            type="password"
            variant="outlined"
            />
        </div>
        <div className={classes.submitButton}>
          <Button 
            onClick={handleSignUp}
            variant="contained"
            >Sign Up</Button>
        </div>
      </Card>
    </div>
  );
}
