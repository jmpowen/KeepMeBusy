// https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  time: {
    fontSize: '3rem',
    padding: '2rem'
  },
  button: {
    padding: '.6rem 1.5rem',
    margin: '.4rem',
    borderRadius: '3px',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: '.8rem',
    borderStyle: 'groove',
    '&:focus': {
      outlineWidth: 0
    },
    '&:hover': {
      backgroundColor: '3151ff',
      border: '1px solid #1b1f2b',
    }
  },
})

const Timer = () => {
  const classes = useStyles();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className={classes.root}>
      <div className={classes.time}>
        {seconds}s
      </div>
      <div className="row">
        <button className={classes.button} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;