import ButtonXIcon from '../../../assets/icons/button/button-x.svg';
import LeftlineIcon from '../../../assets/icons/button/left-line.svg';
import LeftIcon from '../../../assets/icons/button/left.svg';
import CautionIcon from '../../../assets/icons/caution/caution.svg';
import CautionCircleIcon from '../../../assets/icons/caution/checkbox-circle.svg';
import CheckboxNoneIcon from '../../../assets/icons/check-box/check-box-none.svg';
import CheckboxIcon from '../../../assets/icons/check-box/checkbox-circle-fill.svg';
import DownIcon from '../../../assets/icons/dropbox/down.svg';
import UpIcon from '../../../assets/icons/dropbox/up.svg';
import EyecloseIcon from '../../../assets/icons/eye/eye-close.svg';
import EyeopenIcon from '../../../assets/icons/eye/eye-open.svg';
import BellIcon from '../../../assets/icons/icon/bell.svg';
import EmailIcon from '../../../assets/icons/icon/email.svg';
import ReadingGlassIcon from '../../../assets/icons/icon/reading-glasses.svg';
interface Props {
  shape:
    | 'email'
    | 'Reading-glass'
    | 'Button-x'
    | 'Left-line'
    | 'Left'
    | 'Caution'
    | 'Caution-circle'
    | 'checkbox'
    | 'checkbox-circle'
    | 'checkbox-none'
    | 'Up'
    | 'Down'
    | 'Eye-open'
    | 'Eye-close'
    | 'Bell';
}

const SvgIcon: React.FC<Props> = ({ shape }) => {
  switch (shape) {
    case 'email':
      return <EmailIcon />;
    case 'Reading-glass':
      return <ReadingGlassIcon />;
    case 'Button-x':
      return <ButtonXIcon />;
    case 'Left-line':
      return <LeftlineIcon />;
    case 'Left':
      return <LeftIcon />;
    case 'Caution':
      return <CautionIcon />;
    case 'Caution-circle':
      return <CautionCircleIcon />;
    case 'checkbox':
      return <CheckboxIcon />;
    case 'checkbox-circle':
      return <CautionCircleIcon />;
    case 'checkbox-none':
      return <CheckboxNoneIcon />;
    case 'Up':
      return <UpIcon />;
    case 'Down':
      return <DownIcon />;
    case 'Eye-open':
      return <EyeopenIcon />;
    case 'Eye-close':
      return <EyecloseIcon />;
    case 'Bell':
      return <BellIcon />;
    default:
      return null;
  }
};

export default SvgIcon;
