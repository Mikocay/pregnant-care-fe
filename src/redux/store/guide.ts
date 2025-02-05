// ├── src/
// │   ├── redux/
// │   │   ├── store.js             # Cấu hình Redux store
// │   │   └── rootSaga.js          # Combine tất cả sagas
// │   │
// │   ├── features/
// │   │   ├── auth/
// │   │   │   ├── authSlice.js     # Redux slice cho authentication
// │   │   │   ├── authSaga.js      # Saga cho các tác vụ authentication
// │   │   │   └── authSelectors.js # Các selector cho auth state
// │   │   │
// │   │   ├── user/
// │   │   │   ├── userSlice.js     # Redux slice cho user
// │   │   │   ├── userSaga.js      # Saga cho các tác vụ user
// │   │   │   └── userSelectors.js # Các selector cho user state
// │   │   │
// │   │   └── product/
// │   │       ├── productSlice.js
// │   │       ├── productSaga.js
// │   │       └── productSelectors.js