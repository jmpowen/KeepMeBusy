import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useRouteMatch, useLocation, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Task from '../Task';

import SearchBar from '../../components/SearchBar';
import TaskList from '../../components/TaskList';
import TaskCard from '../../components/TaskCard';
import EditableTaskCard from '../../components/TaskCard/EditableTaskCard';
import SelectableTaskCard from '../../components/TaskCard/SelectableTaskCard';

import { GetData } from '../../helpers/httpRequests';

const useStyles = makeStyles({
  root: {
    color: '#6CEF1F',
    textAlign: 'center',
    height: '100%',
    width: '100%',
  },
  drawer: {
  },
  main: {
    
  }
})

export default function Tasks() {
  const classes = useStyles();
  let location = useLocation();
  let match = useRouteMatch();
  let history = useHistory();
  let params = useParams();

  const [values, setValues] = useState({
    task: null,
    alert: null
  })

  const [fetchedData, setFetchedData] = useState({
    tasks: null
  })

  useEffect(() => {
    GetData('someURL')
      .then(res => {
        setFetchedData({ tasks: res })
      })
      
      setFetchedData({ 
        tasks: [
          { ID: 0, TYPE: 'EDUCATION', DESCRIPTION: 'd adfs', NAME: 'task 1' },
          { ID: 1, TYPE: 'EDUCATION', DESCRIPTION: 'asdf d', NAME: 'task 1' },
        ]
      })
  }, [])

  useEffect(() => {
    /* 
      Get data for specific task from analytics
    */
  }, [values.task])

  const handleTaskSelected = (task) => {
    console.log(location)
    console.log(match)
    console.log(history);
    console.log(params)
    console.log(task)
    setValues({
      ...values,
      task: task
    });
    history.push(`${location.pathname}/${task.ID}`)
    // Need to remove from fetchedData and add to values, have a FD index so it
    // can return to the same spot in the array, values does not matter so much
  }

  const handleAddTasks = () => {

  }

  return (
    <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          anchor='left'>
            <h4></h4>
            <h1></h1>
            <Divider />
            <SearchBar />
            <Divider />
          {fetchedData.tasks && (
            <TaskList list={fetchedData.tasks} handleClick={handleTaskSelected} />
          )}
        </Drawer>
        {/*
      <Grid container className={classes.main}>
            {values.task && (
              <>
                <Grid item xs={12}>
                  <Paper>{`${values.task}`}</Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>{' '}</Paper>
                </Grid>
              </>
            )}
            </Grid>*/}

      <Switch>
        <Route path={`/tasks/:taskID`}>
          <Task />
        </Route>
      </Switch>
    </div>
  )
}

/*

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

*/