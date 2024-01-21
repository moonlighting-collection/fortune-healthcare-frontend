'use server'

import { redirectUser } from '../auth/authHelper';
import { cookies } from 'next/headers';

const TOKEN_NAME = 'ftune';

export const logout = () => {
  cookies().delete(TOKEN_NAME)
  redirectUser("/auth/login")
  return true;
};

export const checkAuthentication = async () => {
  return !!cookies().get(TOKEN_NAME);
};
