import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = ['form-control'];
  if (props.shadow) {
    inputClasses.push('shadow');
  }

  if (props.shouldValidate && props.touched) {
    inputClasses.push(props.invalid ? 'is-invalid' : 'is-valid');
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <div className="form-group">
          {props.label ? (
            <label className={classes.TextShadow}>{props.label}</label>
          ) : null}
          <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          {props.helpText && (
            <small className="text-muted">{props.helpText}</small>
          )}
        </div>
      );
      break;
    case 'textarea':
      inputElement = (
        <div className="form-group">
          <textarea
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          {props.helpText && (
            <small className="text-muted">{props.helpText}</small>
          )}
        </div>
      );
      break;
    case 'select':
      inputElement = (
        <div className="form-group">
          {props.label ? (
            <label className={classes.TextShadow}>{props.label}</label>
          ) : null}
          <select
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          >
            {props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayName}
              </option>
            ))}
          </select>
          {props.helpText && (
            <small className="text-muted">{props.helpText}</small>
          )}
        </div>
      );
      break;
    default:
      inputElement = (
        <div className="form-group">
          {props.label ? (
            <label className={classes.TextShadow}>{props.label}</label>
          ) : null}
          <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          {props.helpText && (
            <small className="text-muted">{props.helpText}</small>
          )}
        </div>
      );
  }
  return <React.Fragment>{inputElement}</React.Fragment>;
};

export default input;
