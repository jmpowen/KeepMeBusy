import { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import TimeOfDay from './TimeOfDay';

import AppContext from '../context/AppContext';

const useStyles = makeStyles({
  root: {
    padding: 5,
    margin: '10px',
    borderRadius: '1.5rem',
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minute: {
    width: 36
  },
  formControl: {
    paddingLeft: 90,
    float: 'left',
  },
  notes: {
    paddingRight: 20,
    float: 'right',
  },
  submitButton: {
    paddingTop: 20,
  }
})

export default function NewTaskForm() {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const [values, setValues] = useState({
    taskName: "",
    minute: 0,
    notes: "",
    morning: false,
    afternoon: false,
    night: false,
    anytime: false,
  })

  const handleChange = (e) => {
    if (e.target.name === 'minute') {
      if (e.target.value >= 0 && e.target.value <= 300) {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        })
      }
    } else if (e.target.name === 'anytime') {
      setValues({
        ...values,
        [e.target.name]: e.target.checked,
        'morning': e.target.checked,
        'afternoon': e.target.checked,
        'night': e.target.checked
      })
    } else if (e.target.name === 'morning' || e.target.name === 'afternoon' || e.target.name === 'night') {
      if (values.anytime) {
        setValues({
          ...values,
          'anytime': e.target.checked,
          [e.target.name]: e.target.checked,
        })
      } else {
        setValues({
          ...values,
          [e.target.name]: e.target.checked,
        })
      }
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSubmit = e => {
    let alreadyATask = appContext.tasks.some((task) => task.taskName === values.taskName)

    if (values.taskName === "") {
      // Alert user that there is no task filled in
    } else if (values.minute === 0) {
      // Alert user there needs to be a time for tasks
    } else if (alreadyATask) {
      // Alert user that there is already a task in the task list
    } else if (!values.anytime && !values.morning && !values.afternoon && !values.night) {
      // Alert user that there needs to be at least one value set
    } else {
      let tod = []

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

      appContext.addTask({
        taskName: values.taskName,
        notes: values.notes,
        minutes: Number.parseInt(values.minute),
        timeOfDay: tod,
      })

      setValues({
        taskName: "",
        minute: 0,
        notes: "",
        morning: false,
        afternoon: false,
        night: false,
        anytime: false
      });
    }
  }
  /**
   * TODO: Redo this whole form layout because it is janky as fuck. Currently focusing on functionality and getting a working website.
   * But seriously I hate what is happening here.
   */
  return (
    <Card className={classes.root}>
      <TextField value={values.taskName} name='taskName' onChange={handleChange} id="standard-basic" label="Task Name" />
      <Box className={classes.time}>
        {/* TODO: The look of this time input is just weird. Change it. (possible donation to react community in the form of a time input component?? EYY!!)*/}
        <Typography variant="h6" >Time: </Typography>
        <Input className={classes.minute} name='minute' value={values.minute} onChange={handleChange}/>
        <Typography variant="h6"> (minutes)</Typography>
      </Box>
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Time of day</FormLabel>
          <TimeOfDay row={false} values={values} setValues={setValues}/>
        </FormControl>
        <div className={classes.notes}>
          <TextField
              id="outlined-multiline-static"
              name='notes'
              label="Notes"
              multiline
              rows="6"
              value={values.notes}
              onChange={e => handleChange(e)}
              margin="normal"
              variant="outlined"
              />
        </div>
      </div>

      <div className={classes.submitButton}>
        <Button variant="contained" onClick={handleSubmit} >Submit</Button>
      </div>
    </Card>
  )
}