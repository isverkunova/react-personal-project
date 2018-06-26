// Core
import React, { Component } from 'react';
import { func, string } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

// Assets
import Checkbox from 'theme/assets/Checkbox';
import Edit from 'theme/assets/Edit';
import Remove from 'theme/assets/Remove';
import Star from 'theme/assets/Star';

export default class Task extends Component {
    static propTypes = {
        _removeTask: func.isRequired,
        id:          string.isRequired,
        message:     string.isRequired,
    };

    state = {
        isEditing: false,
        message:   this.props.message,
    };

    _removeTask = () => {
        const { id, _removeTask } = this.props;

        _removeTask(id);
    };

    _updateTask = (event) => {
        this.setState({
            message: event.target.value,
        });
    };

    _setEditMode = () => {
        const { isEditing } = this.state;

        if (isEditing) {
            this._saveEditing();
        } else {
            this._startEditing();
        }
    };

    _startEditing = () => {
        const { message } = this.props;

        this.setState(() => ({
            isEditing: true,
            message,
        }));
    };

    _saveEditing = () => {
        const { id, _editTask } = this.props;
        const { message } = this.state;

        _editTask(id, message);
        this._cancelEditing();
    };

    _cancelEditing = () => {
        const { message } = this.props;

        this.setState(() => ({
            isEditing: false,
            message,
        }));
    };

    _editing = (event) => {
        const keyCode = event.key;

        switch (keyCode) {
            case 13:
                this._saveEditing();
                break;
            case 27:
                this._cancelEditing();
                break;
            default:
                break;
        }
    };

    render () {
        const { message } = this.state;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox className = { Styles.complete } />
                    <input
                        autoFocus
                        maxLength = '50'
                        type = 'text'
                        value = { message }
                        onChange = { this._updateTask }
                        onKeyPress = { this._editing }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star className = { Styles.setPriority } />
                    <Edit className = { Styles.edit } onClick = { this._setEditMode } />
                    <span onClick = { this._removeTask }><Remove /></span>
                </div>
            </li>
        );
    }
}
