import { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import NewTaskForm from '../../components/NewTaskForm';
import TaskRoller from '../../components/TaskRoller';
import TimeOfDay from '../../components/TimeOfDay';
import CountdownTimer from '../../components/CountdownTimer';

import AppContext from '../../context/AppContext';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '30px',
    height: '100%',
  },
  row: {
    textAlign: 'center',
    width: '100%',
    height: 500,
  },
  options: {
    textAlign: 'center',
    width: '30%',
  },
  currentTaskColumn: {
    backgroundColor: 'white',
    borderRadius: '1.5rem',
  },
  currentTaskButtons: {},
  currentTaskButtonC: {
    margin: 10,
    backgroundColor: 'green',
    color: 'white',
  },
  currentTaskButtonF: {
    margin: 10,
    backgroundColor: 'red',
    color: 'white',
  },
});

export default function Home() {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const [values, setValues] = useState({
    taskNum: null,
    taskTime: false,
    duration: 60,
    anytime: false,
    morning: false,
    afternoon: false,
    night: false,
    tod: [],
    currentTask: null,
  });

  const handleDurationChange = (e, newValue) => {
    setValues({
      ...values,
      duration: newValue,
    });
  };

  const handleClick = (event) => {
    if (!appContext.tasks) {
      // Alert the user there is no tasks
    } else {
      let tod = [];

      if (values.morning) {
        tod.push('morning');
      }
      if (values.afternoon) {
        tod.push('afternoon');
      }
      if (values.night) {
        tod.push('night');
      }
      if (values.anytime) {
        tod.push('anytime');
      }

      setValues({
        ...values,
        taskTime: true,
        tod: tod,
      });
    }
  };

  const handleTaskCompletedFailed = (status) => {
    // status is a string, either "completed" or "failed"
    setValues({
      ...values,
      taskTime: false,
    });
    appContext.newCurrentTask(null);
    /*  Need to make a task logged fetch request here,
        record the task, the completion status, time left if failed, time left if completed,
        current time */
  };

  return (
    <div className={classes.root}>
      <div className={classes.row}>
          <Typography variant="h3"  >
            Wondering what to do right now?
          </Typography>
          {appContext.currentTask === null && values.taskTime ? (
            <TaskRoller duration={values.duration} tod={values.tod} />
          ) : (
            <div className={classes.options}>
              <Slider
                min={0}
                step={30}
                max={300}
                marks
                value={values.duration}
                onChange={handleDurationChange}
                valueLabelDisplay='auto'
              />
              <TimeOfDay row={true} values={values} setValues={setValues} />
              <Button
                disabled={
                  appContext.tasks.length === 0 ||
                  values.duration === 0 ||
                  (values.anytime === false &&
                    values.morning === false &&
                    values.afternoon === false &&
                    values.night === false)
                }
                variant='contained'
                color='primary'
                onClick={handleClick}
              >
                Click Me!
              </Button>
            </div>
          )}
      </div>
      <div className={classes.row}>
        {/* TODO: Timer over here with last task, if ongoing - time is counting down from the initial time that was given when created,
            if ongoing (and 'Click Me' is pressed) - a red 'X' appears over the timer and task is reported as incompleted 
          if done (timer expired) - green checkmark shows and task is reported as completed*/}
        {appContext.currentTask !== null ? (
          <div className={classes.currentTaskColumn}>
            <div>
              <CountdownTimer time={appContext.currentTask.minutes} />
            </div>
            <div className={classes.currentTaskButtons}>
              <Button
                className={classes.currentTaskButtonC}
                onClick={() => handleTaskCompletedFailed('completed')}
              >
                Completed
              </Button>
              <Button
                className={classes.currentTaskButtonF}
                onClick={() => handleTaskCompletedFailed('failed')}
              >
                Failed
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
