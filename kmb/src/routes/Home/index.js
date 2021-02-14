import { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';

import NewTaskForm from '../../components/NewTaskForm';
import TaskRoller from '../../components/TaskRoller';
import TimeOfDay from '../../components/TimeOfDay';

import AppContext from '../../context/AppContext';

import Timer from '../../components/ATimer';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '30px'
  },
  columns: {
    textAlign: 'center',
    display: 'flex',
    width: '100%',
  },
  column: {
    width: '33.3%',
    background: '#1abc9c',
  },
  card: {
    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)',
    margin: 50,
    padding: 12,
    borderRadius: '1.5rem',
  },
  cardHeader: {
    background: '#1abc9c',
    color: 'white',
    fontFamily: 'sans-serif',
    borderRadius: '1.5rem',
  },
  column1: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '30px'
  },
  title: {
    color: 'white'
  }
})

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
  })

  useEffect(() => {
    console.log('here')
    setValues({
      ...values,
      currentTask: appContext.currentTask
    })
  }, [appContext.currentTask])

  const handleDurationChange = (e, newValue) => {
    setValues({
      ...values,
      duration: newValue
    })
  }

  const handleClick = event => {
    if (!appContext.tasks) {
      // Alert the user there is no tasks 
    } else {
      let tod = [];

      if (values.morning) {
        tod.push('morning')
      }
      if (values.afternoon) {
        tod.push('afternoon')
      }
      if (values.night) {
        tod.push('night')
      }
      if (values.anytime) {
        tod.push('anytime')
      }

      setValues({
        ...values,
        taskTime: true,
        tod: tod,
      })
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.columns}>
        <div className={classes.column}>
          <div className={classes.column1}>
            <Card className={classes.card}>
              <Box className={classes.cardHeader}>
                <Typography variant="h4" component="h4">
                  New Task
                </Typography>
                <NewTaskForm />
              </Box>
            </Card>
          </div>
        </div>
        <div className={classes.column}>
          <div className={classes.title}>
            Wondering what to do right now?
          </div>
          {appContext.currentTask === null && values.taskTime
            ? <TaskRoller duration={values.duration} tod={values.tod} />
            : <div>
                <Slider
                  min={0}
                  step={30}
                  max={300}
                  marks
                  value={values.duration}
                  onChange={handleDurationChange}
                  valueLabelDisplay="auto"
                />
                <TimeOfDay 
                  row={true} 
                  values={values} 
                  setValues={setValues} />
                <Button 
                  disabled={appContext.tasks.length === 0 || values.duration === 0 || (values.anytime === false && values.morning === false && values.afternoon === false && values.night === false)} 
                  variant="contained" 
                  color="primary" 
                  onClick={handleClick}>Click Me!</Button>
              </div>
          }
        </div>
        <div className={classes.column}>
          {/* TODO: Timer over here with last task, if ongoing - time is counting down from the initial time that was given when created,
            if ongoing (and 'Click Me' is pressed) - a red 'X' appears over the timer and task is reported as incompleted 
            if done (timer expired) - green checkmark shows and  task is reported as completed*/}
          {values.currentTask !== null ?
            <div>
              hello
            </div>
            : null
          }
        </div>
      </div>
    </div>
  )
}