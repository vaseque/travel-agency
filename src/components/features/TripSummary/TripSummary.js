import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from './TripSummary.scss';
import {Col} from 'react-flexbox-grid';
import {promoPrice} from '../../../utils/promoPrice';
import {formatPrice} from '../../../utils/formatPrice';

class TripSummary extends React.Component {
  componentDidMount(){
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    const {id, image, name, cost, days, tags} = this.props;

    const costAsNumber = parseInt(cost.replace(/[^0-9.]/g, ''));
    const promoCost = formatPrice(promoPrice(costAsNumber, 20));
    const time = new Date();
    const promoTime = time.getUTCHours();

    return (
      <Col xs={12} sm={6} lg={4} className={styles.column}>
        <Link to={`/trip/${id}`} className={styles.link}>
          <article className={styles.component}>
            <img src={image} alt={name} />
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.details}>
              <span>{days} days</span>
              <span>from {promoTime === 12 ? promoCost : cost}</span>
            </div>
            <div className={styles.tags}>
              {tags && tags.map(tag => (
                <span className={styles.tag} key={tag.toString()}>{tag}</span>
              ))}
            </div>
          </article>
        </Link>
      </Col>
    );
  }
}

TripSummary.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  intro: PropTypes.string,
  cost: PropTypes.string.isRequired,
  days: PropTypes.number.isRequired,
  tags: PropTypes.array,
};

export default TripSummary;
