import React from 'react';
import DatePicker from 'react-datepicker';
import styles from './OrderOption.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';

const OrderOptionDate = ({currentValue, setOptionValue}) => (
  <DatePicker
    className={styles.input}
    isClearable
    showMonthDropdown
    monthsShown={2}
    selected={currentValue}
    onChange={event => setOptionValue(event)}
  />  
);

OrderOptionDate.propTypes = {
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;