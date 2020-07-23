import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import Button from '../../common/Button/Button';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';
import styles from './OrderForm.scss';

const sendOrder = (options, tripCost, countryId, tripName, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    countryId,
    tripName,
    countryCode,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  if(options.name && options.contact) {
    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
};

const OrderForm = ({tripCost, options, setOrderOption, countryId, tripName, countryCode}) => (
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
      <div className={styles.red}>
        {!options.name && !options.contact
          ? <div>Please fill name and contact boxes first</div>
          : options.name && !options.contact
            ? <div>Please fill contact box yet</div>
            : options.contact && !options.name
              ? <div>Please fill name box yet</div>
              : null
        }
      </div>
      <Button onClick={() => sendOrder(options, tripCost, countryId, tripName, countryCode)}>Order now!</Button>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  countryId: PropTypes.string,
  tripName: PropTypes.string,
  countryCode: PropTypes.string,
};

export default OrderForm;