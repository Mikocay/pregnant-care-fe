import TrackingCalendar from '@/pages/Member/components/TrackingCalendar';

const Calendar = () => {
  const dueDate = new Date('2025-6-16');

  return <TrackingCalendar dueDate={dueDate} />;
};

export default Calendar;
