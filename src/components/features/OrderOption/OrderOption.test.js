import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import Icon from '../../common/Icon/Icon';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='abc' type='text' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render correct title', () => {
    const title = 'abc';
    const component = shallow(<OrderOption name='abc' type='text' />);
    expect(component.find('h3').text()).toEqual(title);
  });

});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });
   
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);
        
          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);
        
          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': {
        it('contains divs with icons', () => {
          const iconsWrapper = renderedSubcomponent.find('.component');
          expect(iconsWrapper.length).toBe(1);
        
          expect(iconsWrapper.find(Icon).at(1).prop('name')).toBe(mockProps.values[0].icon);
          expect(iconsWrapper.find('span').at(1).text()).toBe(mockProps.values[0].name);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('div').at(3).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'checkboxes': {
        it('contains checkboxes and correct input names', () => {
          const checkboxesWrapper = renderedSubcomponent.find('.checkboxes');
          expect(checkboxesWrapper.length).toBe(1);

          const checkboxes = checkboxesWrapper.find('input');
          expect(checkboxes.length).toBe(mockProps.values.length);
          expect(checkboxes.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(checkboxes.at(1).prop('value')).toBe(mockProps.values[1].id);

          const labels = checkboxesWrapper.find('label');
          expect(labels.at(0).find('span').at(0).text()).toBe(mockProps.values[0].name);
          expect(labels.at(1).find('span').at(0).text()).toBe(mockProps.values[1].name);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').at(1).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }
      case 'number': {
        it('contains value change options: min & max', () => {
          const inputWrapper = renderedSubcomponent.find('.number');
          expect(inputWrapper.length).toBe(1);

          expect(inputWrapper.find('.inputSmall').prop('min')).toEqual(mockProps.limits.min);
          expect(inputWrapper.find('.inputSmall').prop('max')).toEqual(mockProps.limits.max);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': {
        it('contains text input', () => {
          const inputWrapper = renderedSubcomponent.find('.component');
          expect(inputWrapper.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'date': {
        it('contains date change input', () => {
          const inputWrapper = renderedSubcomponent.find('.input');
          expect(inputWrapper.length).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}