import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';

const OrderForm = ({tripCost, options, setOrderOption}) => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption 
          currentValue={options[option.id]}
          setOrderOption={setOrderOption} 
          {...option} 
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary 
        tripCost={tripCost}
        options={options}
      />
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;