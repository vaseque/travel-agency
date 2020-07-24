import React from 'react';
import styles from './HappyHourAd.scss';
import {formatTime} from '../../../utils/formatTime';
import PropTypes from 'prop-types';

class HappyHourAd extends React.Component {

  componentDidMount(){
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));
  
    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }
  
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  render() {
    const {title, promoDescription} = this.props;

    const time = this.getCountdownTime();
    const timeOrText = time < (23*3600)+1 ? formatTime(time) : promoDescription;

    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{timeOrText}</div>
      </div>
    );
  }
}

HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.string,
};

export default HappyHourAd;