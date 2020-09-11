import React from 'react';

const Spinner = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

Spinner.propTypes = {};

export default Spinner;
