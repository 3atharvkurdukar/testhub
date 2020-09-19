import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Input from '../Input/Input';
import updateObject from '../../utility/updateObject';

class Form extends Component {
  state = {
    formData: null,
    formIsValid: false,
  };

  componentDidMount() {
    this.setState({
      formData: this.props.formData,
    });
    this.checkFormValidity(this.props.formData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.formData !== this.props.formData) {
      this.setState({
        formData: this.props.formData,
      });
      this.checkFormValidity(this.state.formData);
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.min || rules.min === 0) {
      isValid = +value >= rules.min && isValid;
    }
    if (rules.max || rules.max === 0) {
      isValid = +value <= rules.max && isValid;
    }
    if (rules.minlength) {
      isValid = value.trim().length >= rules.minlength && isValid;
    }
    if (rules.maxlength) {
      isValid = value.trim().length <= rules.maxlength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /((\w+)@(\w+)\.(\w+))|^$/;
      isValid = pattern.test(value.trim().toLowerCase()) && isValid;
    }
    if (rules.isUsername) {
      const pattern = /[a-zA-Z0-9]+|^$/;
      isValid = pattern.test(value.trim().toLowerCase()) && isValid;
    }
    if (rules.isMobileNo) {
      const pattern = /^[0-9]{10}$/;
      isValid = pattern.test(value.trim().toLowerCase()) && isValid;
    }
    return isValid;
  };

  checkFormValidity = (formData) => {
    let formIsValid = true;
    for (let key in formData) {
      formIsValid = formData[key].valid && formIsValid;
    }
    this.setState({
      formIsValid: formIsValid,
    });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.formData[inputIdentifier],
      {
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.formData[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    let updatedFormData = updateObject(this.state.formData, {
      [inputIdentifier]: updatedFormElement,
    });
    this.setState({
      formData: updatedFormData,
    });

    this.checkFormValidity(updatedFormData);
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const finalFormData = {};
    for (const formEl of Object.keys(this.state.formData)) {
      finalFormData[formEl] = this.state.formData[formEl].value;
    }
    this.props.submitted(finalFormData);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.formData) {
      formElementsArray.push({
        id: key,
        config: this.state.formData[key],
      });
    }
    return (
      <form onSubmit={this.onSubmitHandler}>
        <Row>
          <Col xs={12}>
            {formElementsArray.map((formElement) => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                label={formElement.config.label}
                helpText={formElement.config.helpText}
                changed={(event) =>
                  this.inputChangedHandler(event, formElement.id)
                }
                shouldValidate={formElement.config.validation ? true : false}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
              />
            ))}
          </Col>
          <Col xs={12}>
            <Button
              block
              className="shadow"
              variant={this.props.submitButton.variant}
              type="submit"
              disabled={!this.state.formIsValid || this.props.loading}
            >
              {this.props.loading
                ? 'Loading...'
                : this.props.submitButton.value}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Form;
