import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import classes from './AdminLogin.module.css';
import Form from '../../../components/Form/Form';
import * as adminActions from '../../../store/actions/admin';

class AdminLogin extends Component {
  state = {
    loginForm: {
      formInputs: {
        username: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Username',
          },
          label: 'Username',
          value: '',
          validation: {
            required: true,
            isUsername: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          label: 'Password',
          helpText: 'The password must be at least 8 characters',
          value: '',
          validation: {
            required: true,
            minlength: 8,
          },
          valid: false,
          touched: false,
        },
      },
      submitButton: {
        variant: 'primary',
        value: 'Login',
      },
    },
  };

  loginHandler = (formData) => {
    this.props.onAuth(formData.username, formData.password);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isAuth ? <Redirect to="/" /> : null}
        <Row className="mx-0">
          <Col lg={6} className={classes.LoginHero}></Col>
          <Col xs={12} lg={6} className={classes.LoginContainer}>
            <Container>
              <Row className="justify-content-center">
                <Col xs={12}>
                  <h2 className="text-center text-secondary mb-4">
                    Admin Login
                  </h2>
                </Col>
                {this.props.errorMsg ? (
                  <Col xs={12}>
                    <Alert variant="danger">{this.props.errorMsg}</Alert>
                  </Col>
                ) : null}
                <Col xs={12} md={8}>
                  <Form
                    formData={this.state.loginForm.formInputs}
                    submitButton={this.state.loginForm.submitButton}
                    loading={this.props.loading}
                    submitted={this.loginHandler}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.admin.loading,
    errorMsg: state.admin.errorMsg,
    isAuth: state.admin.aAuth != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(adminActions.checkAuthState()),
    onAuth: (username, password) =>
      dispatch(adminActions.auth(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
