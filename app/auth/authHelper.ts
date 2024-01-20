'use server'
 
import { redirect } from 'next/navigation'
 
export async function redirectUser(urlPath: string) {
  redirect(urlPath)
}