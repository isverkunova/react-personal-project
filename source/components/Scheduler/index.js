// Core
import React, { Component } from 'react';
import { array, bool, func, string } from 'prop-types';

// Components
import { withApi } from 'components/HOC/withApi';
import Task from 'components/Task';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import Checkbox from 'theme/assets/Checkbox';

@withApi
export default class Scheduler extends Component {
    static propTypes = {
        _completeAllTasks: func,
        _editTask:         func,
        _getValue:         func,
        _handleFormSubmit: func,
        _removeTask:       func,
        _search:           func,
        _setPriority:      func,
        _submitOnEnter:    func,
        foundTask:         string,
        message:           string,
        spinning:          bool,
        tasks:             array,
    };

    render () {
        const { foundTask, message, tasks, spinning, _completeAllTasks, _editTask, _getValue, _handleFormSubmit, _removeTask, _search, _setPriority, _submitOnEnter } = this.props;

        const tasksJSX = tasks.filter(({ message: taskMessage }) => taskMessage.includes(foundTask.toLowerCase())).map((task) => {

            return (
                <Task
                    key = { task.id }
                    { ...task }
                    _editTask = { _editTask }
                    _removeTask = { _removeTask }
                    _setPriority = { _setPriority }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { spinning } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'text'
                            value = { foundTask }
                            onChange = { _search }
                        />
                    </header>
                    <section>
                        <form onSubmit = { _handleFormSubmit }>
                            <input
                                maxLength = '50'
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { message }
                                onChange = { _getValue }
                                onKeyPress = { _submitOnEnter }
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
                            onClick = { _completeAllTasks }
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>
                </main>
            </section>
        );
    }
}
