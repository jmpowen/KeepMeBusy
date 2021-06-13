import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from './containers/Header';
import Analytics from './containers/Analytics';
import CreateProfile from './containers/CreateProfile';
import Home from './containers/Home';
import Login from './containers/Login';
import Profile from './containers/Profile';
import SignUp from './containers/SignUp';
import Tasks from './containers/Tasks';

import ProtectedRoute from './hoc/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <ProtectedRoute path="/analytics" component={Analytics} />
        <ProtectedRoute path="/createProfile" component={CreateProfile} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/tasks" component={Tasks} />
      </Switch>
    </Router>
  )
}

