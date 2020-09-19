import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home/Home';
import AdminLogin from './containers/Auth/AdminLogin/AdminLogin';
import AdminLogout from './containers/Auth/AdminLogout/AdminLogout';
import Error404Page from './containers/Error404Page/Error404Page';
import ComingSoonPage from './containers/ComingSoonPage/ComingSoonPage';
import Practice from './containers/Practice/Practice';
import Review from './containers/Review/Review';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import * as adminActions from './store/actions/admin';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAdminAuthState();
  }

  render() {
    let navbarLinks = [
      { title: 'Home', href: '/' },
      { title: 'About', href: '/about' },
      { title: 'Admin', href: '/login' },
    ];
    if (!!this.props.admin) {
      navbarLinks = [
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about' },
        { title: 'Logout', href: '/logout' },
      ];
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar links={navbarLinks} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={ComingSoonPage} />
            <Route exact path="/login" component={AdminLogin} />
            <Route exact path="/practice" component={Practice} />
            {!!this.props.admin ? (
              <React.Fragment>
                <Route exact path="/logout" component={AdminLogout} />
                <Route exact path="/review" component={Review} />
              </React.Fragment>
            ) : null}
            <Route component={Error404Page} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin.adminData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAdminAuthState: () => dispatch(adminActions.checkAuthState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(App));
