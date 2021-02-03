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
    tasks: null,
    taskNo: 0,
  })

  const handleAccept = () => {
    let task = values.tasks[values.taskNo];
    appContext.newCurrentTask({
      task
    });
  }

  const handleReject = () => {
    setValues({
      ...values,
      taskNo: values.taskNo + 1,
    })
  }

  useEffect(() => {
    let theTasks = RandomTask(appContext.tasks, duration, tod);
    setValues({
      ...values,
      tasks: theTasks,
    })
  }, [])

  return (
    <>
      {values.tasks ?
        values.taskNo !== values.tasks.length ?
          <div>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2" >
                  {values.tasks[values.taskNo].taskName}
                </Typography>
                <Typography color="textSecondary">
                  {values.tasks[values.taskNo].minutes} minutes
                </Typography>
                <Typography color="textSecondary">
                  {values.tasks[values.taskNo].notes}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton className={classes.accept} onClick={handleAccept} color="primary" aria-label="check" component="span">
                  <DoneOutlineIcon />
                </IconButton>
                <IconButton className={classes.reject} onClick={handleReject} color="secondary" aria-label="check" component="span">
                  <CloseIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
          : 
          <div>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  There are no more tasks available with these filters.
                  Go read a book.
                </Typography>
              </CardContent>
            </Card>
          </div>
        : null
      }
    </>
  )
}