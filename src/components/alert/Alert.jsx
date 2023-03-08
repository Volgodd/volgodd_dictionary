import MiniButton from 'components/buttons/mini-button/MiniButton';
import clsx from 'clsx';
import styles from './Alert.module.scss';
import { useState } from 'react';

const Alert = ({ type }) => {
  let customStyle;
  let alertText;

  switch (type) {
    case 'green':
      customStyle = styles.alertWrapper_green;
      alertText = "Great! You've learnt everything!";
      break;
    case 'red':
      customStyle = styles.alertWrapper_red;
      break;
    default:
      customStyle = styles.alertWrapper_orange;
  }

  return (
    <div className={styles.alertWrapper}>
      <div className={clsx(styles.alertFrame)}>
        <span>{alertText}</span>
        <MiniButton additionalStyles={styles.closeButton} type="closeIcon" />
      </div>
      <div className={styles.alertShade} />
    </div>
  );
};

export default Alert;
