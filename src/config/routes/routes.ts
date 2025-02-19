const routes = {
  admin: {
    dashboard: '/admin',
    manageMember: '/admin/manage-member',
    growthMatrics: '/admin/grouth-matrics',
    blog: '/admin/blog',
  },

  public: {
    home: '/',
  },

  auth: {
    signUp: '/signup',
    login: '/login',
    confirmEmail: '/confirm-email',
  },
};

export default routes;
