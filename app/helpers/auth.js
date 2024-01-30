'use server'

import { cookies } from 'next/headers';

const TOKEN_NAME = 'ftune';

export const logout = () => {
  cookies().delete(TOKEN_NAME)
  return true;
};

export const checkAuthentication = async () => {
  return Promise.resolve(!!cookies().get(TOKEN_NAME));
};
