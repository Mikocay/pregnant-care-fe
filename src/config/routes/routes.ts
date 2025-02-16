const routes = {
  admin: {
    dashboard: '/admin',
    manageMember: '/admin/manage-member',
  },

  public: {
    home: '/',
  },

  auth: {
    signUp: '/signup',
    login: '/login',
    confirmEmail: '/confirm-email',
    validateEmail: '/users/validate-email',
    forgotPassword: '/forgot-password',
  },
};

export default routes;
