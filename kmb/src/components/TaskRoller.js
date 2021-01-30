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

export default function TaskRoller({ taskNum }) {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const [values, setValues] = useState({
    task: null,

  })

  useEffect(() => {
    setValues({
      ...values,
      task: appContext.tasks[taskNum],
    })
  }, [taskNum])

  if (!values.task) {
    return null
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" >
          {values.task.task}
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