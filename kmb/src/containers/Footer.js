import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    textAlign: 'center',
    background: '#1abc9c',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '30px',
  }
})

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/*TODO: Keep a group of tasks in a box down here, each new task gets added to this box*/}
      <h1>ye ye boi</h1>
    </div>
  );
}