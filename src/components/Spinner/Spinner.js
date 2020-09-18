import React from 'react';
import classes from './Spinner.module.css';

const Spinner = (props) => {
  const style = {
    backgroundColor: `var(--${props.variant})`,
  };
  return (
    <div className={classes.Spinner}>
      <div className={classes.Bounce1} style={style}></div>
      <div className={classes.Bounce2} style={style}></div>
    </div>
  );
};

export default Spinner;
