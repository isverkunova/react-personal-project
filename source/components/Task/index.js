// Core
import React, { Component, createRef } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';

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
        tasks:       arrayOf(
            shape({
                completed: bool.isRequired,
                favorite:  bool.isRequired,
                id:        string.isRequired,
                message:   string.isRequired,
            })
        ),
    };

    state = {
        isEditing: false,
        message:   this.props.message,
    };

    taskInput = createRef();

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
            this._cancelEditing();
        } else {
            this._startEditing();
        }
    };

    _setPriority = () => {
        const { id, _editTask, completed, favorite } = this.props;
        const { message } = this.state;

        _editTask({ id, completed, message, favorite: !favorite });
    };

    _setCompletion = () => {
        const { id, _editTask, completed, favorite } = this.props;
        const { message } = this.state;

        _editTask({ id, completed: !completed, message, favorite });
    };

    _startEditing = () => {
        const { message } = this.props;

        this.setState({
            isEditing: true,
            message,
        },
        () => this.taskInput.current.focus());
    };

    _saveEditing = () => {
        const { id, _editTask, completed, favorite } = this.props;
        const { message } = this.state;

        _editTask({ id, message, completed, favorite });

        this.setState({
            isEditing: false,
        });
    };

    _cancelEditing = () => {

        const { message } = this.props;

        this.setState(() => ({
            isEditing: false,
            message,
        }));
    };

    _editing = (event) => {
        const keyCode = event.keyCode;

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
        const { completed, favorite } = this.props;

        const { message, isEditing } = this.state;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.complete }
                        onClick = { this._setCompletion }
                    />
                    <input
                        disabled = { !isEditing }
                        maxLength = '50'
                        ref = { this.taskInput }
                        type = 'text'
                        value = { message }
                        onChange = { this._updateTask }
                        onKeyDown = { this._editing }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        className = { Styles.setPriority }
                        onClick = { this._setPriority }
                    />
                    <Edit
                        checked = { isEditing }
                        className = { Styles.edit }
                        onClick = { this._setEditMode }
                    />
                    <span onClick = { this._removeTask }><Remove /></span>
                </div>
            </li>
        );
    }
}
