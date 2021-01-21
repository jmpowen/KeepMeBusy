import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppContext from '../context/AppContext';
import TaskCard from '../components/TaskCard';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    textAlign: 'center',
    background: '#1abc9c',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '30px',
    height: '230px'
  }
})

export default function Footer() {
  let appContext = useContext(AppContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/*TODO: Keep a group of tasks in a box down here, each new task gets added to this box*/}
      {appContext.tasks.length 
        ? appContext.tasks.map((task) => (
          <TaskCard taskObj={task} />
        ))
      : null}
    </div>
  );
}