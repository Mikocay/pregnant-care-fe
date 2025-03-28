const STRING_EMPTY = '';

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
};

const ROLE = {
  GUEST: 'guest',
  MEMBER: 'member',
  ADMIN: 'admin',
};

const APPOINTMENT_RULE = [];

const WEB_SOCKET_STATE = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
  NOTCONNECTED: 4,
};

const LOCAL_STOREAGE = {
  ACCESS_TOKEN: 'access_token',
  USER: 'user',
};

export {
  STRING_EMPTY,
  HTTP_STATUS,
  ROLE,
  APPOINTMENT_RULE,
  WEB_SOCKET_STATE,
  LOCAL_STOREAGE,
};
