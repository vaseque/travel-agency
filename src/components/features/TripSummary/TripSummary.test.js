import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';
import {Link} from 'react-router-dom';

describe('Component TripSummary', () => {

  let component;
  beforeEach(() => {
    const id = 'abc';
    const img= 'img.jpg';
    const name = 'xyz';
    const cost = '123';
    const days = 123;
    const tags = ['tag1', 'tag2', 'tag3'];

    component = shallow(<TripSummary
      id={id}
      image={img} 
      name={name}
      cost={cost} 
      days={days}
      tags={tags}
    />);
  });

  it('should create correct link address', () => {
    const expectedId = 'abc';
    expect(component.find(Link).prop('to')).toEqual(`/trip/${expectedId}`);
  });
  
  it('should check img got correct props', () => {
    const expectedImg = 'img.jpg';
    const expectedName = 'xyz';
    expect(component.find('img').prop('src')).toEqual(expectedImg);
    expect(component.find('img').prop('alt')).toEqual(expectedName);
  });
  
  it('should correctly render props: name cost days', () => {
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
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    expect(component.find('.tags span').at(0).text()).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedTags[2]);
  });

  it('it should not render parent element for nesting tag spans if prop tags falsy', () => {
    const tags = [];
    const component = shallow(<TripSummary tags={tags} />);
    expect(component.find('.tags span')).toHaveLength(0);
  });
  
});
