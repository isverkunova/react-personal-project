// Core
import React from 'react';
import { mount } from 'enzyme';
import Task from './';

// Mock
const _removeTaskMock = jest.fn();

const props = {
    _removeTask: _removeTaskMock,
    tasks:       [],
    message:     '',
};

const initialState = {
    isEditing: false,
    message:   '',
};

const result = mount(<Task { ...props } />);

describe('Task component:', () => {
    describe('should have valid markup elements', () => {
        test('core JSX', () => {
            console.log(document.createElement);
            expect(result.find('li.task').length).toBe(1);
            expect(result.find('div.content').length).toBe(1);
            expect(result.find('div.actions').length).toBe(1);
            expect(result.find('input').length).toBe(1);
            expect(result.find('span').length).toBe(1);
            expect(result.find('Checkbox').length).toBe(1);
            expect(result.find('Star').length).toBe(1);
            expect(result.find('Remove').length).toBe(1);
        });
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('should respond on edit-mode change properly', () => {
        result.find('Edit').simulate('click');
        expect(result.state('isEditing')).toBe(true);

        result.find('Edit').simulate('click');
        expect(result.state('isEditing')).toBe(false);
    });

    test('_removeTask prop should be invoked after click on Remove', () => {
        result.find('Remove').simulate('click');

        expect(_removeTaskMock).toHaveBeenCalledTimes(1);
    });
});
