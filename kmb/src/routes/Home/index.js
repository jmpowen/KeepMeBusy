// import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Column1 from '../../containers/Column1';
import Column2 from '../../containers/Column2';
import Column3 from '../../containers/Column3';

// import appContext from '../../context/AppContext';

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
    margin: 10,
    padding: 10,
    borderRadius: '1.5rem',
  },
  cardHeader: {
    background: '#1abc9c',
    color: 'white',
    fontFamily: 'sans-serif',
    borderRadius: '1.5rem',
  }
})

export default function Home() {
  const classes = useStyles();
  // const AppContext = useContext(appContext);

  return (
    <div className={classes.root}>
      <div className={classes.columns}>
        <div className={classes.column}>
          <Column1 />
        </div>
        <div className={classes.column}>
          <Column2 />
          </div>
        <div className={classes.column}>
          {/* TODO: Timer over here with last task, if ongoing - time is counting down from the initial time that was given when created,
            if ongoing (and 'Click Me' is pressed) - a red 'X' appears over the timer and task is reported as incompleted 
            if done (timer expired) - green checkmark shows and  task is reported as completed*/}
          <Column3 />
        </div>
      </div>
    </div>
  )
}