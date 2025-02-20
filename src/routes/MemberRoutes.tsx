import config from '@/config';
import MemberLayout from '@/layouts/MemberLayout';
import Calendar from '@/pages/Member/Calendar';
import Dashboard from '@/pages/Member/Dashboard';

const MemberRoutes = {
  path: config.routes.member.dashboard,
  element: <MemberLayout />,
  children: [
    {
      path: config.routes.member.dashboard,
      element: <Dashboard />,
    },
    {
      path: config.routes.member.calendar,
      element: <Calendar />,
    },
  ],
};

export default MemberRoutes;
