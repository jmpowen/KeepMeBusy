import { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    task: "",
    minute: null,
    notes: "",
    morning: false,
    afternoon: false,
    night: false,
    anytime: false,
  })

  const handleChange = (e) => {
    if (e.target.name === 'minute') {
      if (e.target.value >= 0 && e.target.value <= 999) {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        })
      }
    } else if (e.target.name === 'morning' || e.target.name === 'afternoon' || e.target.name === 'night' || e.target.name === 'anytime') {
      setValues({
        ...values,
        [e.target.name]: e.target.checked,
      })
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSubmit = e => {
    let alreadyATask = appContext.tasks.some((task) => task.task === values.task)

    if (values.task === "") {
      // Alert user that there is no task filled in
    } else if (values.minute === 0) {
      // Alert user there needs to be a time for tasks
    } else if (alreadyATask) {
      // Alert user that there is already a task in the task list
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
        task: values.task,
        notes: values.notes,
        minutes: values.minute,
        timeOfDay: tod,
      })

      setValues({
        task: "",
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
      <TextField value={values.task} name='task' onChange={e => handleChange(e)} id="standard-basic" label="Task Name" />
      <Box className={classes.time}>
        {/* TODO: The look of this time input is just weird. Change it. (possible donation to react community in the form of a time input component?? EYY!!)*/}
        <Typography variant="h6" >Time: </Typography>
        <Input className={classes.minute} name='minute' value={values.minute} onChange={e => handleChange(e)}/>
        <Typography variant="h6"> (minutes)</Typography>
      </Box>
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Time of day</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={values.morning} onChange={(e) => handleChange(e)} name="morning" />}
              label="Morning"
            />
            <FormControlLabel
              control={<Checkbox checked={values.afternoon} onChange={handleChange} name="afternoon" />}
              label="Afternoon"
            />
            <FormControlLabel
              control={<Checkbox checked={values.night} onChange={handleChange} name="night" />}
              label="Night"
            />
            <FormControlLabel
              control={<Checkbox checked={values.anytime} onChange={handleChange} name="anytime" />}
              label="Anytime"
            />
          </FormGroup>
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