import {
  Switch,
  Route,
} from "react-router-dom";
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Home from '../Home';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  footer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  }
})

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet defaultTitle="Keep Me Busy">
        <meta name="description" content="An app to decide what you'll be working on." />
      </Helmet>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  )
}