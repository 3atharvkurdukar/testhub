import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home/Home';
import Error404Page from './containers/Error404Page/Error404Page';
import ComingSoonPage from './containers/ComingSoonPage/ComingSoonPage';

class App extends Component {
  render() {
    let navbarLinks = [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/about' },
      { title: 'Admin', href: '/login/admin' },
    ];

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar links={navbarLinks} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={ComingSoonPage} />
            <Route component={Error404Page} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
