import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionNumber = ({currentValue, setOptionValue, ...values}) => (
  <div className={styles.number}>
    <input
      className={styles.inputSmall}
      type='number'
      value={currentValue}
      min={values.limits.min}
      max={values.limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
    <span className={styles.span}>{formatPrice(values.price)}</span>
  </div>
);

OrderOptionNumber.propTypes = {
  values: PropTypes.array,
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setOptionValue: PropTypes.func,
};

export default OrderOptionNumber;