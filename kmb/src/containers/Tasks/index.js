import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import SearchBar from '../../components/SearchBar';
import TaskCard from '../../components/TaskCard';
import EditableTaskCard from '../../components/TaskCard/EditableTaskCard';
import SelectableTaskCard from '../../components/TaskCard/SelectableTaskCard';

import { GetData } from '../../helpers/httpRequests';
import { useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    color: '#6CEF1F',
    textAlign: 'center',
    height: '100%'
  },
  drawerRoot: {
    display: 'flex'
  },
  drawer: {
    width: '18%',
    backgroundColor: 'black'
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
  const match = useRouteMatch();
  console.log(match)

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

      
      setFetchedData({ tasks: [{ id: 0, description: 'asdf adfs', name: 'task 1' }] })
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
      <h1>{/* hackiest bullshit workaround so that the drawer search bar shows below the header -_- */}</h1>

        <Drawer
          className={classes.drawer}
          variant='permanent'
          anchor='left'>
        <h1>stuff</h1>
            <SearchBar />
          <Divider />
          {fetchedData.tasks && (
            <List>
              {fetchedData.tasks.map(task => (
                <ListItem button key={task.id}>
                  <ListItemIcon>{'some icon (maybe a type field for task'}</ListItemIcon>
                  <ListItemText primary={task.description} />
                </ListItem>
              ))}
            </List>
          )}
        </Drawer>
      <main>

      </main>
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