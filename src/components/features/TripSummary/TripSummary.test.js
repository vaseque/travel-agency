import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';
import {Link} from 'react-router-dom';

describe('Component TripSummary', () => {

  it('should create correct link address', () => {
    const expectedId = 'abc';
    const component = shallow(<TripSummary id={expectedId} />);
    expect(component.find(Link).props('to')).toEqual(`/trip/${expectedId}`);
  });

  it('should check img got correct props', () => {
    const expectedSrc = 'img.jpg';
    const expectedAlt = 'imgDesc';
    const component = shallow(<TripSummary img={expectedSrc} name={expectedAlt} />);
    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedSrc);
  });

  it('should correctly render props: name cost days', () => {
    const expectedName = 'abc';
    const expectedCost = '123';
    const expectedDays = 123;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} />);
    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details span').at(1).text()).toEqual('from' + ' ' + expectedName);
    expect(component.find('.details span').at(0).text()).toEqual(expectedName + ' ' + 'days');
  });
  
  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render given tags through props from array in consecutive order', () => {
    const expectedTags = ['tag1', 'tag2', 'tag3'];
    const component = shallow(<TripSummary tags={expectedTags} />);
    expect(component.find('.tags span').at(0)).toEqual(expectedTags[0]);
    expect(component.find('.tags span').at(1)).toEqual(expectedTags[1]);
    expect(component.find('.tags span').at(2)).toEqual(expectedTags[2]);
  });
});