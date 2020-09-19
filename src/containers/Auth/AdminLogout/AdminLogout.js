import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as adminActions from '../../../store/actions/admin';

class AdminLogout extends Component {
  componentDidMount() {
    this.props.onLogout(this.props.aAuth);
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = (state) => {
  return {
    aAuth: state.admin.aAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (aAuth) => dispatch(adminActions.logout(aAuth)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogout);
