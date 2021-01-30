import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TaskRoller from '../components/TaskRoller';

import AppContext from '../context/AppContext';

const useStyles = makeStyles({
  title: {
    color: 'white',
  }
})

export default function Column2() {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const [values, setValues] = useState({
    taskNum: null,
    taskTime: false,
  })

  const handleClick = event => {
    if (!appContext.tasks) {
      // Alert the user there is no tasks 
    } else {
      let num = Math.floor(Math.random() * appContext.tasks.length);
      setValues({
        ...values,
        taskNum: num,
        taskTime: true
      })
    }
  }

  return (
    <>
      <div className={classes.title}>
        Wondering what to do right now?
      </div>
      {values.taskTime
        ? <TaskRoller taskNum={values.taskNum} />
        : <Button disabled={appContext.tasks.length === 0} variant="contained" color="primary" onClick={handleClick}>Click Me!</Button>
      }
    </>
  )
}