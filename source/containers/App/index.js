// Core
import React, { Component } from 'react';

// Components
import Catcher from 'components/Catcher';
import Scheduler from 'components/Scheduler';

export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Scheduler />
            </Catcher>
        );
    }
}
