import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';

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
    boxShadow: '10px 10px 10px 10px grey',
  },
  textFields: {
    padding: 10,
  },
  submitButton: {
    padding: 10,
  },
  signuplink: {
    margin: 30,
    color: 'blue',
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

export default function Login() {
  let appContext = useContext(AppContext);
  let history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    username: null,
    password: null,
  });

  const [alerts, setAlerts] = useState({
    username: false,
    password: false
  })

  const [accessToken, setAccessToken] = useLocalStorage('token', null);

  const handleLogin = () => {
    if (accessToken) {
      history.push("/");
    } 
    
    let aUsername = isNullOrEmptyOrWhitespace(values.username);
    let aPassword = isNullOrEmptyOrWhitespace(values.password);

    setAlerts({
      username: aUsername,
      password: aPassword
    })
    
    if(aUsername || aPassword) {
      return
    }
    
    // Fetch request hur
  }

  const handleSignUp = () => {
    history.push("/signup");
  }

  if (accessToken) {
    handleLogin();
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.textFields}>
          <TextField
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            label="Username"
            type="search"
            variant="outlined"
            />
            {alerts.username ?
                <Alert severity="error">Input invalid</Alert>
              :
                null}
        </div>
        <div className={classes.textFields}>
          <TextField
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            label="Password"
            type="password"
            variant="outlined"
            />
            {alerts.password ?
                <Alert severity="error">Input invalid</Alert>
              :
                null}
        </div>
        <div className={classes.submitButton}>
          <Button 
            onClick={handleLogin}
            variant="contained"
            >Login</Button>
        </div>
      </Card>
      <div className={classes.signuplink} onClick={handleSignUp}>
        No account? Sign Up!
      </div>
    </div>
  );
}
