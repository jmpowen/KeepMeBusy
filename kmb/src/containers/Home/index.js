import { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NewTaskForm from '../../components/NewTaskForm';
import TaskRoller from '../../components/TaskRoller';
import CountdownTimer from '../../components/CountdownTimer';
import CheckboxOptions from '../../components/CheckboxOptions';

import AppContext from '../../context/AppContext';
import { PostData } from '../../helpers/httpRequests';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '30px',
    height: '100%',
  },
  row: {
    width: '100%',
    height: 500,
  },
  options: {
    marginLeft: '30%',
    marginRight: '30%'
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
    duration: 60,
    Anytime: false,
    Morning: false,
    Afternoon: false,
    Night: false,
    tod: [],
    alert: null
  });

  useEffect(() => {
    if (values.alert === null) {
      return;
    }
    toast[values.alert.type](values.alert.message);
    setTimeout(() => {
      setValues({
        ...values,
        alert: null,
      });
    }, 1000);
  }, [values.alert]);

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
        tod: tod,
      });
    }
  };

  const handleTaskStatus = (status) => {
    // status is a string, either "completed" or "failed"
    let data = {};
    data.user = appContext.user;
    data.task = appContext.currentTask;
    data.status = status;
    PostData('someURL', data)
      .then(res => res.json())
      .then(res => {
        if (res.length === 1) {
          setValues({
            ...values,
            alert: { type: 'success', message: 'Task log recorded!' }
          });
        } else {
          setValues({
            ...values,
            alert: { type: 'error', message: 'Task log not recorded!' }
          });
        }
      })

    appContext.newCurrentTask(null);
    /*  Need to make a task logged fetch request here,
        record the task, the completion status, time left if failed, time left if completed,
        current time */
  };

  return (
    <div className={classes.root}>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>Wondering what to do right now?</h1>
      <div className={classes.row}>
        {/*appContext.currentTask === null && values.taskTime ? (
            <TaskRoller duration={values.duration} tod={values.tod} />
        ) : ( */}
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
              <CheckboxOptions
                row={true}
                catchAllLabel='Anytime'
                valueLabels={['Anytime', 'Morning', 'Afternoon', 'Night']}
                values={values}
                setValues={setValues}
              />
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
                Give me something to do!
              </Button>
            </div>
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
                onClick={() => handleTaskStatus('completed')}
              >
                Completed
              </Button>
              <Button
                className={classes.currentTaskButtonF}
                onClick={() => handleTaskStatus('failed')}
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
