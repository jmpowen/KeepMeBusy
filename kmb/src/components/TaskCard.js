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
    textOverflow: 'ellipsis'
  },
  text: {
    textOverflow: 'ellipsis'
  }
})

export default function TaskCard({ taskObj }) {
  const classes = useStyles();
  
  const task = taskObj;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="p" noWrap >
            {task.task}
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