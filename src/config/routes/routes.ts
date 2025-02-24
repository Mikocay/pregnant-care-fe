const routes = {
  admin: {
    dashboard: '/admin',
    manageMember: '/admin/manage-member',
    growthMatrics: '/admin/grouth-matrics',
    managePlans: '/admin/manage-plans',
    formPlan: '/admin/form-plan',
    formGrwothMatrics: '/admin/form-growth-matrics',
  },

  member: {
    dashboard: '/member',
    calendar: '/member/calendar',
    account: '/member/account',
  },

  public: {
    home: '/',
    pricing: '/pricing',
  },

  auth: {
    signUp: '/signup',
    login: '/login',
    logout: '/logout',
    confirmEmail: '/confirm-email',
    validateEmail: '/users/validate-email',
    forgotPassword: '/forgot-password',
    unauthorized: '/unauthorized',
  },
};

export default routes;
