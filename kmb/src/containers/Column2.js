import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  title: {
    color: 'white',
  }
})

export default function Column2() {
  const classes = useStyles();

  const handleClick = event => {

  }

  return (
    <>
      <div className={classes.title}>
        Wondering what to do right now?
      </div>
      <Button variant="contained" color="primary" onClick={handleClick}>Click Me!</Button>
    </>
  )
}