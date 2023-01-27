import BackArrowIcon from 'icons/BackArrowIcon';
import BufferIcon from 'icons/BufferIcon';
import ChangeColorIcon from 'icons/ChangeColorIcon';
import CloseIcon from 'icons/CloseIcon';
import DeleteIcon from 'icons/DeleteIcon';
import PenIcon from 'icons/PenIcon';
import DictionaryIcon from 'icons/DictionaryIcon';
import SearchIcon from 'icons/SearchIcon';
import clsx from 'clsx';
import styles from './MiniButton.module.scss';

const getButtonIcon = (type) => {
  switch (type) {
    case 'buffer':
      return <BufferIcon />;
    case 'dictionary':
      return <DictionaryIcon />;
    case 'changeColor':
      return <ChangeColorIcon />;
    case 'searchIcon':
      return <SearchIcon />;
    case 'closeIcon':
      return <CloseIcon />;
    case 'deleteIcon':
      return <DeleteIcon />;
    case 'backIcon':
      return <BackArrowIcon />;
    default:
      return <PenIcon />;
  }
};

const MiniButton = ({ type, additionalStyles, onClickF, transparent = false }) => {
  return (
    <div className={clsx(styles.miniButtonContainer, additionalStyles)}>
      <button
        className={clsx(
          styles.miniButton,
          transparent && styles.miniButton_transparent && additionalStyles
        )}
        onClick={() => onClickF()}>
        {getButtonIcon(type)}
      </button>
    </div>
  );
};

export default MiniButton;
