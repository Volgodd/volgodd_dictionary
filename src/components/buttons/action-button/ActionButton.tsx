import clsx from 'clsx';
import styles from './ActionButton.module.scss';

type ActionButtonProps = {
  name: string;
  onClickF?: () => void;
  additionalStyles?: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({ name, onClickF, additionalStyles }) => {
  return (
    <button onClick={onClickF} className={clsx(styles.button, additionalStyles)}>
      <span>{name}</span>
    </button>
  );
};

export default ActionButton;
