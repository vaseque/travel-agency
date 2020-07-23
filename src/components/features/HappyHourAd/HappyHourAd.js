import React from 'react';
import styles from './HappyHourAd.scss';

class HappyHourAd extends React.Component {
  constructor(){
    super();

    setInterval(() => {
      this.forceUpdate();
    },1000);
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
    const time = this.getCountdownTime();
    const timeOrText = time < (23*3600)+1
      ? time
      : 'It\'s your time! Take advantage of Happy Hour! All offers 20% off!';

    return (
      <div className={styles.component}>
        <h3 className={styles.title}>Happy Hour</h3>
        <div className={styles.promoDescription}>{timeOrText}</div>
      </div>
    );
  }
}

export default HappyHourAd;