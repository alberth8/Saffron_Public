import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export default function (ComposedCom) {
  class Authentication extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object,
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedCom {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool,
  };

  return connect(mapStateToProps)(Authentication);
}
