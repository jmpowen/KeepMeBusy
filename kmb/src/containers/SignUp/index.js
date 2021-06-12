import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
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
  });

  const [alerts, setAlerts] = useState({
    username: false,
    password: false,
    password2: false,
  })

  const [accessToken, setAccessToken] = useLocalStorage('token', null);

  const handleSignUp = () => {
    if (accessToken) {
      history.push("/");
    } 
    
    let aUsername = isNullOrEmptyOrWhitespace(values.username);
    let aPassword = isNullOrEmptyOrWhitespace(values.password);
    let aPassword2 = isNullOrEmptyOrWhitespace(values.password) || values.password !== values.password2;

    setAlerts({
      username: aUsername,
      password: aPassword,
      password2: aPassword2,
    })
    
    if(aUsername || aPassword || aPassword2) {
      return
    }
    
    // Fetch request hur
  }

  if (accessToken) {
    handleSignUp();
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
        <div className={classes.textFields}>
          <TextField
            value={values.password2}
            onChange={(e) => setValues({ ...values, password2: e.target.value })}
            label="Confirm Password"
            type="password"
            variant="outlined"
            />
            {alerts.password2 ?
                <Alert severity="error">Input invalid</Alert>
              :
                null}
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
