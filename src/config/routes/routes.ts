const routes = {
  admin: {
    dashboard: '/admin',
    manageMember: '/admin/manage-member',
    growthMatrics: '/admin/grouth-matrics',
    managePlans: '/admin/manage-plans',
    formPlan: '/admin/form-plan',
  },

  public: {
    home: '/',
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
