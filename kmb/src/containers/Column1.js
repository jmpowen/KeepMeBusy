import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import NewTaskForm from '../components/NewTaskForm';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: '30px'
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
  }
})

export default function Column1() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Box className={classes.cardHeader}>
          <Typography variant="h4" component="h4">
            New Task
          </Typography>
          <NewTaskForm />
        </Box>
      </Card>
    </div>
  )
}