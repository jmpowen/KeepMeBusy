import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TaskCard from '../../components/TaskCard';
import EditableTaskCard from '../../components/TaskCard/EditableTaskCard';
import SelectableTaskCard from '../../components/TaskCard/SelectableTaskCard';

import { GetData } from '../../helpers/httpRequests';

const useStyles = makeStyles({
  root: {
    color: '#6CEF1F',
    textAlign: 'center',
    width: '100%',
  },
  columns: {
    textAlign: 'center',
    display: 'flex',
    width: '100%',
  },
  column: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '40%',
    padding: '5%',
  },
  addTasksButton: {
    backgroundColor: '#4DBD0C',
  }
})

export default function Tasks() {
  const classes = useStyles();

  const [values, setValues] = useState({
    tasks: []
  })

  const [fetchedData, setFetchedData] = useState({
    tasks: null
  })

  useEffect(() => {
    GetData('someURL')
      .then(res => {
        setFetchedData({ tasks: res })
      })
  }, [])

  const handleTaskSelected = (index) => {
    console.log(index)
    // Need to remove from fetchedData and add to values, have a FD index so it
    // can return to the same spot in the array, values does not matter so much
  }

  const handleAddTasks = () => {

  }

  return (
    <div className={classes.root}>
      <div className={classes.columns}>
        <div className={classes.column}>
          {fetchedData.tasks && fetchedData.tasks.map(task => (
            <EditableTaskCard taskObj={task} handleTaskSelected={handleTaskSelected}/>
          ))}
        </div>
        <div className={classes.column}>
          {values.tasks && values.tasks.map(task => (
            <SelectableTaskCard taskObj={task} handleTaskSelected={handleTaskSelected}/>
          ))}
        </div>
      </div>
      <div>
        <Button className={classes.addTasksButton} onClick={handleAddTasks} variant="outlined" size="large">
          Add Tasks
        </Button>
      </div>
    </div>
  )
}