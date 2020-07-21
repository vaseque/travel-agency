import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';
import {Link} from 'react-router-dom';

const props = {
  id: 'abc',
  image: 'img.jpg',
  name: 'xyz',
  cost: '123',
  days: 123,
};

describe('Component TripSummary', () => {

  it('should create correct link address', () => {
    const component = shallow(<TripSummary {...props} tags={['tag1', 'tag2', 'tag3']} />);
    const expectedId = 'abc';
    expect(component.find(Link).prop('to')).toEqual(`/trip/${expectedId}`);
  });
  
  it('should check img got correct props', () => {
    const component = shallow(<TripSummary {...props} tags={['tag1', 'tag2', 'tag3']} />);
    const expectedImg = 'img.jpg';
    const expectedName = 'xyz';
    expect(component.find('img').prop('src')).toEqual(expectedImg);
    expect(component.find('img').prop('alt')).toEqual(expectedName);
  });
  
  it('should correctly render props: name cost days', () => {
    const component = shallow(<TripSummary {...props} tags={['tag1', 'tag2', 'tag3']} />);
    const expectedName = 'xyz';
    const expectedCost = '123';
    const expectedDays = 123;
    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details span').at(0).text()).toEqual(expectedDays + ' ' + 'days');
    expect(component.find('.details span').at(1).text()).toEqual('from' + ' ' + expectedCost);
  });
    
  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });
  
  it('should render given tags through props from array in consecutive order', () => {
    const component = shallow(<TripSummary {...props} tags={['tag1', 'tag2', 'tag3']} />);
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });

  it('it should not render parent element for nesting tag spans if prop tags falsy', () => {
    const component = shallow(<TripSummary {...props} />);
    expect(component.find('.tags span')).toHaveLength(0);
  });
});