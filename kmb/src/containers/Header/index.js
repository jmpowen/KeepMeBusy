import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useLocalStorage from '../../hooks/useLocalStorage';
import CustomPopover from '../../components/CustomPopover';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
      zIndex: 1400

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
    profileButton: {
      backgroundColor: 'white'
    },
    selectAction: {
      display: "flex",
      flexFlow: "column wrap",
    },
  });

  const actions = ['Profile', 'Logout']

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

  const handleAccountClick = (event) => {
    console.log(event.target)
    console.log(event.currentTarget)
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          <div>
            <Button className={classes.navButton} variant='outlined' onClick={handleLogout}>Logout</Button>
          </div>
            :
              null
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}
