'use client'

import { destroyCookie, parseCookies } from 'nookies';
import { redirectUser } from '../auth/authHelper';

const TOKEN_NAME = 'ftune';

export const logout = () => {
  destroyCookie(null, TOKEN_NAME); // Use destroyCookie from nookies to delete the cookie
  redirectUser("/auth/login");
  return true;
};

export const checkAuthentication = async () => {
  const cookies = parseCookies(); // Use parseCookies from nookies to get cookies

  return !!cookies[TOKEN_NAME];
};
