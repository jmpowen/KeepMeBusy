import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import AppContext from '../context/AppContext';
import Timer from './Timer';

export default function CurrentTask() {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const [values, setValues] = useState({
    seconds: 0,
    isActive: false,
    task: null,
  })

  function toggle() {
    setValues({
      ...values,
      isActive: !values.isActive
    });
  }

  function reset() {
    setValues({
      ...values,
      seconds: 0,
      isActive: false
    });
  }


  useEffect(() => {

  }, [values.isActive, values.seconds])

  return (
    <Card>
      <Timer />
    </Card>
  )
}