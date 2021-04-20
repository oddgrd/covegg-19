import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: 'auto',
        margin: 'auto',
        display: 'block',
        marginTop: '7rem'
      }}
      alt='Loading...'
    />
  </Fragment>
);

export default Spinner;
