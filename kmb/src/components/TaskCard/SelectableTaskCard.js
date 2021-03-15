import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    margin: '20px',
    width: '200px',
    height: '100px',
  },
  text: {
    
  }
})

export default function TaskCard({ taskObj, handleTaskSelected }) {
  const classes = useStyles();
  let task = taskObj;
  
  return (
      <Card className={classes.root}>
        <CardActionArea onClick={() => handleTaskSelected(task.id)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="p" noWrap >
              {task.taskName}
            </Typography>
            <Typography>
              {task.minutes} minutes
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" noWrap >
              {task.notes}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  )
}