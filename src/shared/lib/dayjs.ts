import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ko';

dayjs.locale('ko');

dayjs.extend(isBetween);

export default dayjs;
