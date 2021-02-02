import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


import AppContext from '../context/AppContext';

import { RandomTask } from '../helpers/SelectRandomTask';

/**
 * Design Goals:
 *  - Need to have accept reject buttons span 100% across the card, dividing card in half
 *  - Have card centered
 *  - 
 */
const useStyles = makeStyles({
  root: {

  },
  accept: {
    backgroundColor: 'green',
    color: 'white'
  },
  reject: {
    backgroundColor: 'red',
    color: 'white'
  }
})

export default function TaskRoller({ duration, tod }) {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const [values, setValues] = useState({
    task: null,
  })

  console.log('TaskRoller function');

  useEffect(() => {
    console.log('useEffect')
    let theTask = RandomTask(appContext.tasks, duration, tod);
    console.log(theTask);
    setValues({
      ...values,
      task: theTask,
    })
  }, [])

  if (!values.task) {
    console.log('taskRoller task');
    return null;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" >
          {values.task.taskName}
        </Typography>
        <Typography color="textSecondary">
          {values.task.minutes} minutes
        </Typography>
        <Typography color="textSecondary">
          {values.task.notes}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton className={classes.accept} color="primary" aria-label="check" component="span">
          <DoneOutlineIcon />
        </IconButton>
        <IconButton className={classes.reject} color="secondary" aria-label="check" component="span">
          <CloseIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}