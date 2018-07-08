// Core
import React from 'react';
import { mount } from 'enzyme';
import { Scheduler } from './';

const props = {
    tasks: [],
};

const result = mount(<Scheduler { ...props } />);

describe('Scheduler component:', () => {
    describe('should have valid markup elements', () => {
        test('core JSX', () => {
            expect(result.find('section').length).toBe(2);
            expect(result.find('header').length).toBe(1);
            expect(result.find('footer').length).toBe(1);
            expect(result.find('button').length).toBe(1);
            expect(result.find('input').length).toBe(2);
            expect(result.find('main').length).toBe(1);
            expect(result.find('span').length).toBe(1);
            expect(result.find('form').length).toBe(1);
            expect(result.find('div').length).toBe(3);
            expect(result.find('ul').length).toBe(1);
            expect(result.find('h1').length).toBe(1);
            expect(result.find('Spinner').length).toBe(1);
            expect(result.find('Catcher').length).toBe(0);
            expect(result.find('Checkbox').length).toBe(1);
            expect(result.find('FlipMove').length).toBe(1);
            expect(result.find('Task').length).toBe(0);
        });
    });
});
