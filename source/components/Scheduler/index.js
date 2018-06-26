// Core
import React, { Component } from 'react';

// Components
import { withData } from 'components/HOC/withData';
import Task from 'components/Task';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
// import { getUniqueID, delay } from 'instruments/helpers';
import { token, api } from 'config/api';
import Checkbox from 'theme/assets/Checkbox';

@withData
export default class Scheduler extends Component {
    state = {
        tasks: [
            {
                id:        'xjh',
                message:   'Успешно пройти React-интенсив компании Lectrum',
                completed: false,
                favorite:  true,
            },
            {
                id:        'xjr',
                message:   'Взять автограф у Джареда Лето',
                completed: false,
                favorite:  false,
            },
            {
                id:        'xrh',
                message:   'Зарегестрировать бабушку в Твиче',
                completed: false,
                favorite:  false,
            },
            {
                id:        'rjh',
                message:   'Записать собаку на груминг',
                completed: false,
                favorite:  false,
            },
            {
                id:        'xph',
                message:   'Научиться играть на барабанах',
                completed: true,
                favorite:  false,
            }
        ],
        spinning: false,
        message:  '',
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
        // const task = {
        //     id:        getUniqueID(),
        //     message,
        //     completed: false,
        //     favorite:  false,
        // };

        // await delay(600);

        // this.setState(({ tasks }) => ({
        //     tasks:    [task, ...tasks],
        //     spinning: false,
        // }));
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

        // await delay(600);

        // this.setState(({ tasks }) => ({
        //     tasks:    tasks.filter((task) => task.id !== id),
        //     spinning: false,
        // }));
    }

    _editTask = async (taskToEdit) => {
        this._setSpinningState(true);

        const response = await fetch(api, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  token,
            },
            body: JSON.stringify(taskToEdit),
        });

        const { data: editedTask } = await response.json();

        this.setState(({ tasks }) => ({
            tasks: tasks.map(
                (task) => task.id === editedTask[0].id ? editedTask[0] : task,
            ),
            spinning: false,
        }));
    };

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
        const { spinning, tasks, message } = this.state;

        const tasksJSX = tasks.map((task) => {

            return (
                <Task
                    key = { task.id }
                    { ...task }
                    _editTask = { this._editTask }
                    _removeTask = { this._removeTask }
                    //_setPriority = { this._setPriority }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { spinning } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'text' />
                    </header>
                    <section>
                        <form onSubmit = { this._handleFormSubmit }>
                            <input
                                maxLength = '50'
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { message }
                                onChange = { this._getValue }
                                onKeyPress = { this._submitOnEnter }
                            />
                            <button type = 'submit'>Добавить задачу</button>
                        </form>
                        <div>
                            <ul>
                                { tasksJSX }
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            color1 = '#000'
                            color2 = '#fff'
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>
                </main>
            </section>
        );
    }
}
