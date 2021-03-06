import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// Redux
import { Provider } from 'react-redux';
import store from './redux/store'
import { logoutUser } from './redux/actions/userActions'
import { SET_AUTHENTICATED } from './redux/types'

// Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute'

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import cleanerPage from './pages/cleanerPage'
import searchPage from './pages/searchPage'

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://us-central1-justclean-4db3e.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token); //json token
  if (decodedToken.exp * 1000 < Date.now()) { // inside decodedtoken has exp as expired time
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/login' component={login} />
                <AuthRoute exact path='/signup' component={signup} />
                <Route exact path='/cleaners/:cleanerName' component={cleanerPage} />
                <Route exact path='/cleaners/search/:location' component={searchPage} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
