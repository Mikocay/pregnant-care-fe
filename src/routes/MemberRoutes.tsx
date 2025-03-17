import config from '@/config';
import MemberLayout from '@/layouts/MemberLayout';
import MemberSettingLayout from '@/layouts/MemberLayout/SettingLayout';
import SettingsPage from '@/pages/Member/Account';
import Calendar from '@/pages/Member/Calendar';
import Dashboard from '@/pages/Member/Dashboard';
import Pregnancy from '@/pages/Member/Pregnancy';
import UpdateUserForm from '@/pages/Member/Account/Profile';
import SubscriptionPage from '@/pages/Member/Account/Subscription';
import BlogDetail from '@/pages/Admin/ManageBlogs/BlogDetail';

const MemberRoutes = [
  {
    path: config.routes.member.dashboard,
    element: <MemberLayout />, // Layout chỉ áp dụng cho các trang con
    children: [
      { index: true, element: <Dashboard /> },
      { path: config.routes.member.dashboardByFetus, element: <Dashboard /> },
      { path: config.routes.member.calendar, element: <Calendar /> },
      // Corrected path here
      { path: config.routes.member.pregnancy, element: <Pregnancy /> }, // relative path
      { path: config.routes.member.pregnancyByWeek, element: <Pregnancy /> },
      { path: config.routes.member.blogDetail, element: <BlogDetail /> }, // Add route for blog detail
    ],
  },
  {
    path: config.routes.member.account,
    element: <MemberSettingLayout />, // Không sử dụng MemberLayout
    children: [
      {
        path: config.routes.member.account,
        element: <SettingsPage />,
      },
      { path: config.routes.member.profile, element: <UpdateUserForm /> },
      {
        path: config.routes.member.subscription,
        element: <SubscriptionPage />,
      },
    ],
  },
];

export default MemberRoutes;
