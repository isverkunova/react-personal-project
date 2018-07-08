// Core
import React, { Component } from 'react';

// Instruments
import { token, api } from 'config/api';

const withApi = (Enhanceable) => {
    return class WithApi extends Component {
        state = {
            foundTask: '',
            message:   '',
            spinning:  false,
            tasks:     [],
        };

        componentDidMount () {
            this._fetchTasks();
        }

        _setSpinningState = (state) => {
            this.setState({
                spinning: state,
            });
        }

        _addTask = async (message) => {
            this._setSpinningState(true);

            const response = await fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  token,
                },
                body: JSON.stringify({ message }),
            });

            const { data: task } = await response.json();

            this.setState(({ tasks }) => ({
                tasks:    [task, ...tasks],
                spinning: false,
            }));

            this._sorting(this.state.tasks);
        }

        _removeTask = async (id) => {
            this._setSpinningState(true);

            await fetch(`${api}/${id}`, {
                method:  'DELETE',
                headers: {
                    Authorization: token,
                },
            });

            this.setState(({ tasks }) => ({
                tasks:    tasks.filter((task) => task.id !== id),
                spinning: false,
            }));
        }

        _editTask = async (taskToEdit) => {
            this._setSpinningState(true);

            const response = await fetch(api, {
                method:  'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  token,
                },
                body: JSON.stringify([taskToEdit]),
            });

            const {
                data: [updatedTaskFromResponse],
            } = await response.json();

            this.setState(({ tasks }) => {
                const indexToReplace = tasks.indexOf(
                    tasks.find((task) => task.id === updatedTaskFromResponse.id),
                );

                const newTasks = [
                    ...tasks.filter((task) => task.id !== updatedTaskFromResponse.id)
                ];

                newTasks.splice(indexToReplace, 0, updatedTaskFromResponse);

                this._sorting(newTasks);
            });

            this._setSpinningState(false);
        }

        _completeTask = async (tasksToEdit) => {
            this._setSpinningState(true);

            const response = await fetch(api, {
                method:  'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  token,
                },
                body: JSON.stringify(tasksToEdit),
            });

            const {
                data: [updatedTaskFromResponse],
            } = await response.json();

            this.setState(({ tasks }) => {
                const indexToReplace = tasks.indexOf(
                    tasks.find((task) => task.id === updatedTaskFromResponse.id),
                );

                const newTasks = [
                    ...tasks.filter((task) => task.id !== updatedTaskFromResponse.id)
                ];

                newTasks.splice(indexToReplace, 0, updatedTaskFromResponse);

                this._sorting(newTasks);
            });

            this._setSpinningState(false);
        }


        _fetchTasks = async () => {
            this._setSpinningState(true);

            const response = await fetch(`${api}`, {
                method:  'GET',
                headers: {
                    Authorization: token,
                },
            });

            const { data: tasks } = await response.json();

            this.setState({
                tasks,
                spinning: false,
            });

            this._sorting(this.state.tasks);
        }

        _sorting = (tasks) => {
            const priorityTasks = tasks.filter((task) => task.favorite && !task.completed);
            const defaultTasks = tasks.filter((task) => !task.favorite && !task.completed);
            const completedPriorityTasks = tasks.filter((task) => task.favorite && task.completed);
            const completedTasks = tasks.filter((task) => !task.favorite && task.completed);

            this.setState({
                tasks: [...priorityTasks, ...defaultTasks, ...completedPriorityTasks, ...completedTasks],
            });
        }

        _search = (event) => {
            const { value } = event.target;

            this.setState({
                foundTask: value,
            });
        }

        _completeAllTasks = () => {
            const { tasks } = this.state;

            const setCompT = tasks.map((task) => ({ ...task, completed: !this._setCompletion() }));

            this.setState({
                tasks: setCompT,
            });

            this._completeTask(setCompT);
        }

        _setCompletion = () => {
            const { tasks } = this.state;

            return tasks.every(({ completed }) => completed);
        }

        _getValue = (event) => {
            const { value } = event.target;

            this.setState({
                message: value,
            });
        }

        _handleFormSubmit = (event) => {

            event.preventDefault();

            this._submitTask();
        }

        _submitTask = () => {
            const { message } = this.state;

            if (!message) {
                return null;
            }

            this._addTask(message);

            this.setState({
                message: '',
            });
        }

        _submitOnEnter = (event) => {
            const enterKey = event.key === 'Enter';

            if (enterKey) {
                event.preventDefault();
                this._submitTask();
            }
        }

        render () {
            return (
                <Enhanceable
                    { ...this.props }
                    { ...this.state }
                    _completeAllTasks = { this._completeAllTasks }
                    _editTask = { this._editTask }
                    _getValue = { this._getValue }
                    _handleFormSubmit = { this._handleFormSubmit }
                    _removeTask = { this._removeTask }
                    _search = { this._search }
                    _setPriority = { this._setPriority }
                    _submitOnEnter = { this._submitOnEnter }
                />
            );
        }
    };
};

export { withApi };
