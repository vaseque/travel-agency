import React from 'react';
import PropTypes from 'prop-types';
import HTMLParser from 'react-html-parser';

import NotFound from '../NotFound/NotFound';
import Section from '../../layout/Section/Section';
import PageTitle from '../../common/PageTitle/PageTitle';
import SideImage from '../../common/SideImage/SideImage';
import DetailsBox from '../../common/DetailsBox/DetailsBox';
import DetailsImage from '../../common/DetailsImage/DetailsImage';
import List from '../../common/List/List';
import ListItem from '../../common/ListItem/ListItem';
import OrderForm from '../../features/OrderForm/OrderFormContainer';

import styles from './Trip.scss';
import {Grid, Row, Col} from 'react-flexbox-grid';

import {promoPrice} from '../../../utils/promoPrice';
import {formatPrice} from '../../../utils/formatPrice';


class Trip extends React.Component {
  componentDidMount(){
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    const {error, id, name, image, cost, days, description, country, intro} = this.props;

    const costAsNumber = parseInt(cost.replace(/[^0-9.]/g, ''));
    const promoCost = formatPrice(promoPrice(costAsNumber, 20));
    const time = new Date();
    const promoTime = time.getUTCHours();
  
    if(error) return <NotFound />;
    else return (
      <Section>
        <Grid>
          <PageTitle text={name} />
        </Grid>
        <DetailsBox>
          <DetailsImage>
            <SideImage source={image} />
          </DetailsImage>
          <Grid>
            <Row>
              <Col md={12} lg={4}>
                <div className={styles.intro}>
                  {HTMLParser(intro)}
                </div>
                <List variant='light'>
                  <ListItem title={`<strong>Duration:</strong> ${days} days`} icon='calendar-alt' />
                  {promoTime === 12 && <div className={styles.price}><strong>Price:</strong> from {promoCost}</div>}
                  <ListItem title={`<strong>Standard price:</strong> from ${cost}`} icon='money-bill-wave' />
                </List>
              </Col>
            </Row>
          </Grid>
        </DetailsBox>
        <Grid>
          <Row>
            <Col xs={12}>
              <PageTitle text='Trip options' />
              {HTMLParser(description)}
              <OrderForm tripCost={cost} tripId={id} tripName={name} countryCode={country.alpha3Code} />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <PageTitle text={`About ${country.name}`} />
        </Grid>
        <DetailsBox>
          <DetailsImage>
            <SideImage source={country.flag} />
          </DetailsImage>
          <Grid>
            <Row>
              <Col md={12} lg={4}>
                <List variant='light'>
                  <ListItem title={`<strong>Capital:</strong> ${country.capital}`} icon='city' />
                  <ListItem title={`<strong>Population:</strong> ${country.population / 1000000} millions`} icon='users' />
                  <ListItem title={`<strong>Currency:</strong> ${country.currencies[0].symbol} (${country.currencies[0].name})`} icon='money-bill-wave' />
                </List>
              </Col>
            </Row>
          </Grid>
        </DetailsBox>
      </Section>
    );
  }
}
 
Trip.propTypes = {
  error: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  intro: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  cost: PropTypes.string,
  days: PropTypes.number,
  description: PropTypes.string,
  country: PropTypes.object,
};

export default Trip;
