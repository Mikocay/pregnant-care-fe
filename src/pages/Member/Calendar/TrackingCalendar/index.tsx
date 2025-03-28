import React, { useState } from 'react';
import {
  Calendar,
  Badge,
  Card,
  Select,
  Row,
  Col,
  Typography,
  Button,
  Tooltip,
  Divider,
  Tag,
  Progress,
} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  LeftOutlined,
  RightOutlined,
  CalendarTwoTone,
  InfoCircleOutlined,
  HeartFilled,
} from '@ant-design/icons';
import styles from './TrackingCalendar.module.css';

const { Option } = Select;
const { Title, Text } = Typography;

interface TrackingCalendarViewProps {
  dueDate: Date;
}

// Pregnancy calculation logic
const getPregnancyStartDate = (dueDate: Date) => {
  const startDate = new Date(dueDate);
  startDate.setDate(startDate.getDate() - 280); // Subtract 280 days to get pregnancy start date
  return startDate;
};

const getPregnancyWeek = (date: Date, pregnancyStart: Date) => {
  const diffInDays = Math.floor(
    (date.getTime() - pregnancyStart.getTime()) / (1000 * 60 * 60 * 24),
  );
  const week = Math.floor(diffInDays / 7) + 1;

  // Prevent negative numbers and exceeding 40 weeks
  if (week < 1 || week > 40) return null;
  return week;
};

const isWeekStart = (date: Date, pregnancyStart: Date) => {
  const diffInDays = Math.floor(
    (date.getTime() - pregnancyStart.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diffInDays % 7 === 0; // If it's the start day of a pregnancy week
};

// Get list data for calendar cell
const getListData = (value: Dayjs, dueDate: Date, pregnancyStartDate: Date) => {
  const dateObj = value.toDate();
  const weekNumber = getPregnancyWeek(dateObj, pregnancyStartDate);
  const isDueDate = dateObj.toDateString() === dueDate.toDateString();
  const isWeekStartDay = weekNumber && isWeekStart(dateObj, pregnancyStartDate);

  const items = [];

  if (isDueDate) {
    items.push({
      type: 'error',
      content: 'Due Date',
      icon: <HeartFilled className={styles.dueDateIcon} />,
    });
  }

  if (isWeekStartDay) {
    items.push({
      type: 'warning',
      content: `Week ${weekNumber}`,
      weekNumber: weekNumber,
    });
  }

  // Add other events here if needed

  return items;
};

const TrackingCalendarView: React.FC<TrackingCalendarViewProps> = ({
  dueDate,
}) => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [mode, setMode] = useState<'month' | 'year'>('month');
  const pregnancyStartDate = getPregnancyStartDate(dueDate);

  // Calculate current pregnancy week
  const today = new Date();
  const currentWeek = getPregnancyWeek(today, pregnancyStartDate) || 0;
  const weeksRemaining = 40 - currentWeek;
  const progressPercentage = (currentWeek / 40) * 100;

  // Handle panel change
  const handlePanelChange = (value: Dayjs, mode: string) => {
    setDate(value);
    setMode(mode as 'month' | 'year');
  };

  // Navigate previous
  const navigatePrevious = () => {
    if (mode === 'month') {
      setDate(date.subtract(1, 'month'));
    } else {
      setDate(date.subtract(1, 'year'));
    }
  };

  // Navigate next
  const navigateNext = () => {
    if (mode === 'month') {
      setDate(date.add(1, 'month'));
    } else {
      setDate(date.add(1, 'year'));
    }
  };

  // Navigate today
  const navigateToday = () => {
    setDate(dayjs());
  };

  // Navigate to due date
  const navigateToDueDate = () => {
    setDate(dayjs(dueDate));
  };

  // Cell renderer
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, dueDate, pregnancyStartDate);

    return (
      <ul className={styles.events}>
        {listData.map((item, index) => (
          <li key={index}>
            {item.icon ? (
              <Tooltip title={item.content}>{item.icon}</Tooltip>
            ) : item.weekNumber ? (
              <Tooltip title={item.content}>
                <Badge
                  className={styles.weekBadge}
                  count={item.weekNumber}
                  style={{
                    backgroundColor: '#FBC0C2',
                    color: '#333',
                  }}
                />
              </Tooltip>
            ) : (
              <Badge
                status={
                  item.type as
                    | 'success'
                    | 'processing'
                    | 'default'
                    | 'error'
                    | 'warning'
                }
                text={item.content}
              />
            )}
          </li>
        ))}
      </ul>
    );
  };

  // Month cell renderer
  const monthCellRender = (value: Dayjs) => {
    const dueDateObj = dayjs(dueDate);
    const isDueMonth =
      value.month() === dueDateObj.month() &&
      value.year() === dueDateObj.year();

    if (isDueMonth) {
      return (
        <div className={styles.dueMonthIndicator}>
          <Tooltip title="Due Month">
            <HeartFilled className={styles.dueMonthIcon} />
          </Tooltip>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={6}>
          <div className={styles.sidebar}>
            <Card className={styles.profileCard} bordered={false}>
              <div className={styles.profileHeader}>
                <CalendarTwoTone
                  twoToneColor="#ff7875"
                  className={styles.calendarIcon}
                />
                <Title level={4} className={styles.profileTitle}>
                  Pregnancy Tracker
                </Title>
              </div>

              <Divider className={styles.divider} />

              <div className={styles.dueInfo}>
                <div className={styles.infoRow}>
                  <Text strong>Due Date:</Text>
                  <Tag color="magenta" className={styles.dateTag}>
                    {dayjs(dueDate).format('MMMM D, YYYY')}
                  </Tag>
                </div>

                <div className={styles.infoRow}>
                  <Text strong>Current Week:</Text>
                  <Tag color="blue" className={styles.weekTag}>
                    Week {currentWeek > 0 ? currentWeek : 0}
                  </Tag>
                </div>

                <div className={styles.infoRow}>
                  <Text strong>Remaining:</Text>
                  <Text>
                    {weeksRemaining > 0
                      ? `${weeksRemaining} weeks`
                      : 'Any day now!'}
                  </Text>
                </div>

                <div className={styles.infoRow}>
                  <Text strong>Pregnancy Start:</Text>
                  <Text>
                    {dayjs(pregnancyStartDate).format('MMMM D, YYYY')}
                  </Text>
                </div>
              </div>

              <div className={styles.progressContainer}>
                <div className={styles.progressHeader}>
                  <Text strong>Pregnancy Progress</Text>
                  <Text type="secondary">
                    {Math.round(progressPercentage)}%
                  </Text>
                </div>
                <Progress
                  percent={progressPercentage}
                  status="active"
                  strokeColor={{
                    '0%': '#f460c5',
                    '100%': '#f8303a',
                  }}
                  showInfo={false}
                />
              </div>

              <Divider className={styles.divider} />

              <div className={styles.upcomingEvents}>
                <Title level={5}>Weekly Development</Title>
                {currentWeek > 0 && currentWeek <= 40 ? (
                  <div className={styles.weeklyContent}>
                    <div className={styles.weekHeader}>
                      <Tag color="#ff7875" className={styles.weekNumberTag}>
                        Week {currentWeek}
                      </Tag>
                      {getWeeklyMilestone(currentWeek)}
                    </div>
                    <Text className={styles.weeklyDescription}>
                      {getWeeklyDescription(currentWeek)}
                    </Text>
                  </div>
                ) : (
                  <Text type="secondary">No weekly information available.</Text>
                )}
              </div>

              {/* <Divider className={styles.divider} /> */}

              {/* <div className={styles.actions}>
                <Button
                  type="primary"
                  icon={<ScheduleOutlined />}
                  block
                  className={styles.actionButton}
                >
                  Add Appointment
                </Button>
                <Button
                  icon={<CheckCircleOutlined />}
                  block
                  className={styles.actionButton}
                  onClick={navigateToDueDate}
                >
                  Go to Due Date
                </Button>
              </div> */}
            </Card>
          </div>
        </Col>

        <Col xs={24} lg={18}>
          <Card bordered={false} className={styles.calendarCard}>
            <div className={styles.calendarHeader}>
              <div className={styles.calendarTitle}>
                <div className={styles.titleWithNav}>
                  <Button
                    type="text"
                    icon={<LeftOutlined />}
                    onClick={navigatePrevious}
                    className={styles.navButton}
                  />
                  <Title level={4} className={styles.dateTitle}>
                    {mode === 'month'
                      ? date.format('MMMM YYYY')
                      : date.format('YYYY')}
                  </Title>
                  <Button
                    type="text"
                    icon={<RightOutlined />}
                    onClick={navigateNext}
                    className={styles.navButton}
                  />
                </div>
                <div className={styles.calendarActions}>
                  <Button
                    type="text"
                    onClick={navigateToday}
                    className={styles.todayButton}
                  >
                    Today
                  </Button>
                  <Button
                    type="text"
                    onClick={navigateToDueDate}
                    className={styles.dueDateButton}
                  >
                    Due Date
                  </Button>
                  <Select
                    value={mode}
                    onChange={(value) => setMode(value)}
                    className={styles.modeSelect}
                  >
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                  </Select>
                </div>
              </div>

              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <HeartFilled className={styles.legendDueDate} />
                  <Text>Due Date</Text>
                </div>
                <div className={styles.legendItem}>
                  <Badge
                    count="1"
                    style={{
                      backgroundColor: '#FBC0C2',
                      color: '#333',
                    }}
                  />
                  <Text>Week Start</Text>
                </div>
                <div className={styles.legendItem}>
                  <div className={styles.todayIndicator} />
                  <Text>Today</Text>
                </div>
              </div>
            </div>

            <Calendar
              value={date}
              onPanelChange={handlePanelChange}
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
              mode={mode}
              className={styles.calendar}
            />

            <div className={styles.legend}>
              <div className={styles.footerInfo}>
                <InfoCircleOutlined className={styles.infoIcon} />
                <Text type="secondary">
                  The calendar highlights the start of each pregnancy week and
                  your due date. Week 1 starts on{' '}
                  {dayjs(pregnancyStartDate).format('MMMM D, YYYY')}.
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// Helper functions for weekly information
const getWeeklyMilestone = (week: number) => {
  const milestones: Record<number, string> = {
    8: 'Heartbeat can be detected',
    12: 'End of first trimester',
    20: 'Halfway point, gender can be determined',
    24: "Baby's movements become noticeable",
    28: 'Third trimester begins',
    37: 'Baby is considered full term',
    40: 'Due date',
  };

  return milestones[week] ? (
    <Badge
      status="processing"
      text={milestones[week]}
      className={styles.milestoneBadge}
    />
  ) : null;
};

const getWeeklyDescription = (week: number) => {
  const descriptions: Record<number, string> = {
    1: 'Conception occurs and the fertilized egg implants in the uterus.',
    4: 'The embryo is now about the size of a poppy seed. The neural tube is forming.',
    8: "Baby's heart is beating and facial features are forming. Size of a kidney bean.",
    12: 'All essential organs have formed. Baby is about the size of a lime.',
    16: 'Baby can make facial expressions and may start sucking thumb. Size of an avocado.',
    20: "You might feel baby's movements. Baby is about the size of a banana.",
    24: "Baby's face is fully formed. Footprints and fingerprints are forming. Size of an ear of corn.",
    28: "Baby's eyes can open and close. Size of an eggplant.",
    32: 'Baby is practicing breathing movements. Size of a squash.',
    36: 'Baby is gaining weight rapidly. Size of a honeydew melon.',
    40: 'Baby is fully developed and ready to meet you!',
  };

  // Return the closest week description if exact week not found
  for (let i = week; i > 0; i--) {
    if (descriptions[i]) return descriptions[i];
  }

  return 'Baby is developing new features every day!';
};

export default TrackingCalendarView;
