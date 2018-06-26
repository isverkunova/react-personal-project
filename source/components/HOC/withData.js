import React, { Component } from 'react';

const withData = (Enhanceable) => {
    return class WithData extends Component {
        render () {
            return <Enhanceable { ...this.props } { ...this.state } />;
        }
    };
};

export { withData };
