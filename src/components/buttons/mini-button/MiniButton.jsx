import BackArrowIcon from 'icons/BackArrowIcon';
import BufferIcon from 'icons/BufferIcon';
import ChangeColorIcon from 'icons/ChangeColorIcon';
import CloseIcon from 'icons/CloseIcon';
import DeleteIcon from 'icons/DeleteIcon';
import DictionaryIcon from 'icons/DictionaryIcon';
import PenIcon from 'icons/PenIcon';
import SearchIcon from 'icons/SearchIcon';
import SettingsIcon from 'icons/SettingsIcon';
import VisibilityIcon from 'icons/VisibilityIcon';
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
    case 'settingsIcon':
      return <SettingsIcon />;
    case 'visibilityIcon':
      return <VisibilityIcon />;
    default:
      return <PenIcon />;
  }
};

const MiniButton = ({ type, additionalStyles, onClickF, transparent = false, bigger = false }) => {
  return (
    <div className={clsx(styles.miniButtonContainer, additionalStyles)}>
      <button
        type="button"
        className={clsx(
          styles.miniButton,
          transparent && styles.miniButton_transparent,
          bigger && styles.bigger
        )}
        onClick={() => onClickF()}>
        {getButtonIcon(type)}
      </button>
    </div>
  );
};

export default MiniButton;
