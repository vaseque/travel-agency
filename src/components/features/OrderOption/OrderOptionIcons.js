import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon/Icon';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, required, setOptionValue}) => (
  <div className={styles.component}>
    {required ? '' : (
      <div 
        key='null' 
        onClick={() => setOptionValue('')}
      >
        <Icon name='times-circle' />
        <span>none</span>
      </div>
    )}
    {values.map(value => (
      <div 
        className={styles.icon}
        key={value.id}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon} />
        <span>{value.name}</span>
        <span className={styles.span}>{formatPrice(value.price)}</span>
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionIcons;