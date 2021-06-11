import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#4DBD0C'
    },
    title: {
      flexGrow: 1,
      width: 200,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    navButtons: {
      marginLeft: '2%',
      width: '100%',
      float: 'left',
    },
    navButton: {
      color: 'white',
      '&:focus': {
        border: '1px solid black',
        color: 'black',
      },
    },
  }));

export default function Header() {
  const classes = useStyles();
  let history = useHistory();

  // Seems weird but I'm trying to get rerender to happen when
  // localStorage value changes and that isn't happening on its own.
  // Maybe using state after localstorage will do it...
  const [accessToken, setAccessToken] = useLocalStorage('token', null);

  const handleNavigation = (route) => {
    history.push(route);
  }

  const handleLogout = () => {
    setAccessToken(null);
    history.push("/login");
    // TODO: need to implement unvalidateUser action (actually just change the name to reflect the new actions use of logging in, validating, with an access token
    // and logging out, unvalidating, by setting access_token to null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => handleNavigation('/')}>
            Keep Me Busy!
          </Typography>
          {accessToken ? (
            <div className={classes.navButtons}>
              <Button
                onClick={() => handleNavigation('/analytics')}
                className={classes.navButton}
              >
                Analytics
              </Button>
              <Button
                onClick={() => handleNavigation('/profile')}
                className={classes.navButton}
              >
                Profile
              </Button>
              <Button
                onClick={() => handleNavigation('/tasks')}
                className={classes.navButton}
              >
                Tasks
              </Button>
            </div>
          ) : null}
          {accessToken !== null ?
              <Button onClick={handleLogout} color="inherit">Logout</Button>
            :
              null
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}
