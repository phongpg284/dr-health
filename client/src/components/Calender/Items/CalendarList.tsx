import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/lib/calendar/generateCalendar';
import 'antd/lib/calendar/style';

const CalendarList = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default CalendarList;