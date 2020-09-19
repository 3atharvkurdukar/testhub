import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/Modal/Modal';

const withErrorHandler = (WrappedComponent) => {
  class ErrorHandler extends Component {
    state = {
      error: null,
      modal: false,
    };

    componentDidMount() {
      if (
        this.props.error &&
        !(this.props.error.response && this.props.error.response.status < 500)
      ) {
        this.setState({ error: this.props.error, modal: true });
      }
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.error &&
        prevProps.error !== this.props.error &&
        !(this.props.error.response && this.props.error.response.status < 500)
      ) {
        this.setState({ error: this.props.error, modal: true });
      }
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null, modal: false });
    };

    render() {
      return (
        <React.Fragment>
          {this.state.error ? (
            <Modal
              show={this.state.modal}
              onHide={() => this.errorConfirmedHandler()}
              title={
                this.state.error.response
                  ? this.state.error.response.data.message
                  : this.state.error.message
              }
            >
              <p style={{ whiteSpace: 'pre-line' }}>{this.state.error.stack}</p>
            </Modal>
          ) : null}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      error: state.admin.error || state.questions.error,
    };
  };
  return connect(mapStateToProps)(ErrorHandler);
};

export default withErrorHandler;
