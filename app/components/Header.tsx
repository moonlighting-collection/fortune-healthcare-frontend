'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGlobalState } from '../globalstatecontext';
import {logout} from '@/app/helpers/auth'

const token: any = "ftune"

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { state, setState } = useGlobalState();

  const handleDropdownClick = () => setIsDropdownOpen(currState => !currState)
  const handleLogout = () => {
    setState((prev) => ({...prev, isLoggedIn: false}))
    logout()
  }

  useEffect(() => {
    if(document.cookie[token] !== null) setState(prev => ({...prev, isLoggedIn: true}))
  }, [])

  return (
    <header className="text-gray-800 body-font">
      <div className="container mx-auto flex md:gap-5 flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <p className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">1StepCure</span>
          </p>
        </Link>
        <nav className="md:ml-auto flex flex-col flex-wrap items-center text-base justify-center relative">

          <button onClick={handleDropdownClick} className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-500 dark:hover:bg-blue-700" type="button">
            Search by Category
            <svg className={(!isDropdownOpen ? "" : "rotate-180 ") + "ml-16 w-2.5 h-2.5 ms-3"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div className={!isDropdownOpen ? "hidden" : "z-10 absolute top-12 bg-white rounded-lg shadow w-52 dark:bg-gray-700"}>
            {/* <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search category" />
              </div>
            </div> */}
            <ul className="h-48 py-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
              <Link href="/category/Bonnie Green">
                <li onClick={handleDropdownClick}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Bonnie Green</label>
                  </div>
                </li>
              </Link>
              <Link href="/category/Jese Leos">
                <li onClick={handleDropdownClick}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Jese Leos</label>
                  </div>
                </li>
              </Link>
              <Link href="/category/Michael Gough">
                <li onClick={handleDropdownClick}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Michael Gough</label>
                  </div>
                </li>
              </Link>
              <Link href="/category/Robert Wall">
                <li onClick={handleDropdownClick}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Robert Wall</label>
                  </div>
                </li>
              </Link>
              <Link href="/category/Joseph Mcfall">
                <li onClick={handleDropdownClick}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Joseph Mcfall</label>
                  </div>
                </li>
              </Link>
              <Link href="/category/Leslie Livingston">
                <li onClick={handleDropdownClick}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Leslie Livingston</label>
                  </div>
                </li>
              </Link>
            </ul>
            {/* <a href="#" className="flex items-center p-3 text-sm font-medium text-white border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white hover:underline">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              See All Products
            </a> */}
          </div>

        </nav>
        {
          state.isLoggedIn ?
            <><Link href='/cart'>
              <button className="inline-flex items-center bg-gray-100 border-0 px-5 py-2.5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              My Cart
            </button></Link>
            <button onClick={handleLogout} className="inline-flex items-center bg-gray-100 border-0 px-5 py-2.5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Logout
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button></> :
            <Link href="/auth/login">
              <button className="inline-flex items-center bg-gray-100 border-0 px-5 py-2.5 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
        }
      </div>
    </header>
  );
};

export default Header;
