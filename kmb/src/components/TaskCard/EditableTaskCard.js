import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import EditTask from '../../components/EditTask';

const useStyles = makeStyles({
  root: {
    margin: '20px',
    width: '200px',
    height: '100px',
  },
  text: {
    
  }
})

export default function TaskCard({ taskObj }) {
  const classes = useStyles();
  let task = taskObj;
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
      <Card className={classes.root}>
        <CardActionArea onClick={handleClick}>
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
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <EditTask />
        </Popover>
      </Card>
  )
}