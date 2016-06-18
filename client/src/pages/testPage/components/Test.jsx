import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const Test = (props) => {

  return (
    <div>
      <p>This is a test component</p>
    </div>
  );
};

function mapStateToProps(state) {

  return {
    testState: state.test
  }

}

export default connect(mapStateToProps)(Test);
