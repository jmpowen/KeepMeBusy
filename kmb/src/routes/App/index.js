import {
  Switch,
  Route,
} from "react-router-dom";
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Home from '../Home';
import Timer from '../Timer';

import AppState from '../../context/AppState';

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
      <AppState>
        <Helmet defaultTitle="Keep Me Busy">
          <meta name="description" content="An app to decide what you'll be working on." />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/timer" component={Timer} />
        </Switch>
        <div className={classes.footer}>
          <Footer />
        </div>
      </AppState>
    </div>
  )
}