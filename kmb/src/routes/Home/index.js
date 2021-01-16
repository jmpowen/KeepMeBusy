import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import NewTaskForm from '../../components/NewTaskForm';

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
    width: '33.3%'
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

export default function Home () {
  const classes = useStyles();

  const handleClick = event => {

  }

  return (
    <div className={classes.root}>
      <div className={classes.columns}>
        <div className={classes.column}>
          {/* TODO: Add new task here*/}
          <Card className={classes.card}>
            <Box className={classes.cardHeader}>
              <Typography variant="h4" component="h4">
                New Task
              </Typography>
              <NewTaskForm />
            </Box>
          </Card>
        </div>
        <div className={classes.column}>
          <div>
            Wondering what to do right now?
          </div>
          <Button variant="contained" color="primary" onClick={handleClick}>Click Me!</Button>
        </div>
        <div className={classes.column}>
          {/* TODO: Timer over here with last task, if ongoing - time is counting down from the initial time that was given when created,
            if ongoing (and 'Click Me' is pressed) - a red 'X' appears over the timer and task is reported as incompleted 
            if done (timer expired) - green checkmark shows and  task is reported as completed*/}
          world
        </div>
      </div>
    </div>
  )
}