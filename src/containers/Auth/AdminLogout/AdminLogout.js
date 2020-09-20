import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as adminActions from '../../../store/actions/admin';

class AdminLogout extends Component {
  componentDidMount() {
    this.props.onLogout(this.props.auth);
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.admin.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (auth) => dispatch(adminActions.logout(auth)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogout);
