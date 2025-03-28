import TrackingCalendar from '@/pages/Member/Calendar/TrackingCalendar';

const Calendar = () => {
  const dueDate = new Date('2025-4-16');

  return <TrackingCalendar dueDate={dueDate} />;
};

export default Calendar;
