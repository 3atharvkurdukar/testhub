import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home/Home';
import AdminLogin from './containers/Auth/AdminLogin/AdminLogin';
import AdminLogout from './containers/Auth/AdminLogout/AdminLogout';
import Error404Page from './containers/Error404Page/Error404Page';
import ComingSoonPage from './containers/ComingSoonPage/ComingSoonPage';
import Practice from './containers/Practice/Practice';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

class App extends Component {
  render() {
    let navbarLinks = [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/about' },
      { title: 'Admin', href: '/login' },
    ];

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar links={navbarLinks} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={ComingSoonPage} />
            <Route exact path="/login" component={AdminLogin} />
            <Route exact path="/logout" component={AdminLogout} />
            <Route exact path="/practice" component={Practice} />
            <Route exact path="/review" component={ComingSoonPage} />
            <Route component={Error404Page} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withErrorHandler(App);
