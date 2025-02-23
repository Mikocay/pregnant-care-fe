import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

interface TrackingCalendarProps {
  dueDate: Date;
}

const getPregnancyStartDate = (dueDate: Date) => {
  const startDate = new Date(dueDate);
  startDate.setDate(startDate.getDate() - 280); // Trừ 280 ngày để lấy ngày bắt đầu thai kỳ
  return startDate;
};

const getPregnancyWeek = (date: Date, pregnancyStart: Date) => {
  const diffInDays = Math.floor(
    (date.getTime() - pregnancyStart.getTime()) / (1000 * 60 * 60 * 24),
  );
  const week = Math.floor(diffInDays / 7) + 1;

  // Ngăn số âm và vượt quá 40 tuần
  if (week < 1 || week > 40) return null;
  return week;
};

const isWeekStart = (date: Date, pregnancyStart: Date) => {
  const diffInDays = Math.floor(
    (date.getTime() - pregnancyStart.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diffInDays % 7 === 0; // Nếu đúng ngày bắt đầu tuần thai kỳ
};

const TrackingCalendar: React.FC<TrackingCalendarProps> = ({ dueDate }) => {
  const pregnancyStartDate = getPregnancyStartDate(dueDate);

  return (
    <Calendar
      bordered
      renderCell={(date) => {
        const weekNumber = getPregnancyWeek(date, pregnancyStartDate);
        const isDueDate = date.toDateString() === dueDate.toDateString(); // Kiểm tra ngày sinh

        if (isDueDate) {
          return (
            <div
              style={{
                color: 'red',
                padding: '5px',
                borderRadius: '5px',
                fontWeight: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: '50%',
                fontSize: '1.2em',
              }}
            >
              Due Date
            </div>
          );
        }

        return weekNumber && isWeekStart(date, pregnancyStartDate) ? (
          <div
            style={{
              display: 'flex',
              color: '#FBC0C2',
              textAlign: 'center',
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50%',
              fontSize: '1.2em',
            }}
          >
            Week {weekNumber}
          </div>
        ) : null;
      }}
    />
  );
};

export default TrackingCalendar;
