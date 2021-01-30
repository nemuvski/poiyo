/**
 * dayjsの共通設定とヘルパー関数.
 */

import dayjs, {Dayjs} from 'dayjs';
import 'dayjs/locale/ja';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ja');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');
export default dayjs;

export const formatYMD = (day: Dayjs): string => {
  return day.format('YYYY年MM月DD日');
};
