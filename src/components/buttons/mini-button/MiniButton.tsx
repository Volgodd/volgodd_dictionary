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

enum BUTTON_TYPE {
  BUFFER = 'buffer',
  DICTIONARY = 'dictionary',
  CHANGE_COLOR = 'changeColor',
  SEARCH_ICON = 'searchIcon',
  CLOSE_ICON = 'closeIcon',
  DELETE_ICON = 'deleteIcon',
  BACK_ICON = 'backIcon',
  SETTINGS_ICON = 'settingsIcon',
  VISIBILITY_ICON = 'visibilityIcon',
  PEN_ICON = 'penIcon'
}

const getButtonIcon = (type: string) => {
  switch (type) {
    case BUTTON_TYPE.BUFFER:
      return <BufferIcon />;
    case BUTTON_TYPE.DICTIONARY:
      return <DictionaryIcon />;
    case BUTTON_TYPE.CHANGE_COLOR:
      return <ChangeColorIcon />;
    case BUTTON_TYPE.SEARCH_ICON:
      return <SearchIcon />;
    case BUTTON_TYPE.CLOSE_ICON:
      return <CloseIcon />;
    case BUTTON_TYPE.DELETE_ICON:
      return <DeleteIcon />;
    case BUTTON_TYPE.BACK_ICON:
      return <BackArrowIcon />;
    case BUTTON_TYPE.SETTINGS_ICON:
      return <SettingsIcon />;
    case BUTTON_TYPE.VISIBILITY_ICON:
      return <VisibilityIcon />;
    case BUTTON_TYPE.PEN_ICON:
      return <PenIcon />;
  }
};

type MiniButtonProps = {
  type: string;
  additionalStyles?: string;
  onClickF: () => void;
  transparent?: boolean;
  bigger?: boolean;
  title?: string;
};

const MiniButton: React.FC<MiniButtonProps> = ({
  type,
  additionalStyles,
  onClickF,
  transparent = false,
  bigger = false,
  title
}) => {
  return (
    <div className={clsx(styles.miniButtonContainer, additionalStyles)} title={title}>
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
