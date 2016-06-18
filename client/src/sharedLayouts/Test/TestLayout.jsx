import React, { PropTypes } from 'react';

function TestLayout({ children }) {

  return (
    <div>
      <h1>This is a test layout</h1>
      <div>
        {children}
      </div>
    </div>
  );
}

TestLayout.propTypes = {
  children: PropTypes.node,
};

export default TestLayout;
