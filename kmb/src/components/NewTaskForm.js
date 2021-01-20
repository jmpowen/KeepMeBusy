import { useContext } from 'react';

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AppContext from '../context/AppContext';

const useStyles = makeStyles({
  root: {
    padding: 5,
    margin: 10,
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hour: {
    width: 26
  },
  minute: {
    width: 36
  },
  notes: {

  },
  button: {

  }
})

export default function NewTaskForm() {
  const classes = useStyles();
  const appContext = useContext(AppContext);

  const [values, setValues] = useState({
    task: "",
    hour: 0,
    minute: 0,
    notes: ""
  })

  const handleChange = (e) => {
    if (e.target.name === 'hour'|| e.target.name === 'minute') {
      /** 
       * TODO: Need to use refs to allow for an input field that moves focus once
       * there is a single number entered in this input box. ex. focus(hour) => type(1) => focus(minute)
       * 
       */
      if (e.target.value >= 0) {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
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
    e.preventDefault()
    let time = values.hour * 60 + values.minute //Time can be turned into one value for easier storage
    /**
     * TODO: Need to submit task to the task collection.
     * Task collection should be held in Context (probably AppContext)
     */

    appContext.addTask({
       task: values.task,
       notes: values.notes,
       minutes: time
     })
  }

  return (
    <Card className={classes.root}>
      <TextField value={values.task} name='task' onChange={e => handleChange(e)} id="standard-basic" label="Task Name" />
      <Box className={classes.time}>
        <Input className={classes.hour} type='number' name='hour' value={values.hour} onChange={e => handleChange(e)}/>
        <Typography variant="h6" >:</Typography>
        <Input className={classes.minute} type='number' name='minute' value={values.minute} onChange={e => handleChange(e)}/>
      </Box>
      <div>
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
      <Button variant="contained" onClick={handleSubmit} >Submit</Button>
    </Card>
  )
}