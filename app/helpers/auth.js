import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../auth/authHelper';

const TOKEN_NAME = 'ftune';

export const logout = () => {
  destroyCookie(null, TOKEN_NAME);
  redirectUser("/auth/login")
  return true;
};

export const checkAuthentication = () => {
  const cookies = parseCookies();
  return !!cookies[TOKEN_NAME];
};
