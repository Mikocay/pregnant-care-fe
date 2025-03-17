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
    pregnancy: '/member/pregnancy',
    //* Account Routes
    account: '/member/account',
    pregnancyByWeek: '/member/pregnancy/:id',
    profile: '/member/account/profile',
    subscription: '/member/account/subscription',
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
    payment_method: '/accounts/create-payment-method',
    checkout: '/accounts/checkout',
    unauthorized: '/unauthorized',
  },
};

export default routes;
