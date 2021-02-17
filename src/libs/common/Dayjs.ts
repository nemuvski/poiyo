/**
 * dayjsの共通設定とヘルパー関数.
 */

import dayjs, {Dayjs} from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export default dayjs;

export const formatYMDHm = (day: Dayjs, utc = false): string => {
  return day.utc(utc).format('YYYY年MM月DD日 HH:mm');
};

export const formatYMD = (day: Dayjs, utc = false): string => {
  return day.utc(utc).format('YYYY年MM月DD日');
};
