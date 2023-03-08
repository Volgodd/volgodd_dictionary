import { ALERT_OVERLAY_TYPES } from 'common/constants';
import MiniButton from 'components/buttons/mini-button/MiniButton';
import clsx from 'clsx';
import styles from './AlertOverlay.module.scss';
import useGlobalContext from 'hooks/useGlobalContext';
import { useState } from 'react';

const AlertOverLay = () => {
  const { alertOverlay, setAlertOverlay } = useGlobalContext();
  const { WORDS_LEARNT, DELETE } = ALERT_OVERLAY_TYPES;

  let customStyle;
  let alertText;

  switch (alertOverlay.type) {
    case ALERT_OVERLAY_TYPES.WORDS_LEARNT:
      customStyle = styles.alertWrapper_green;
      alertText = "Great! You've learnt everything!";
      break;
    case ALERT_OVERLAY_TYPES.DELETE:
      customStyle = styles.alertWrapper_red;
      alertText = 'Are you sure?';
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

export default AlertOverLay;
