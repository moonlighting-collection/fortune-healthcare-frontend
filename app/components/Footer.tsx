import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-blue-400 text-gray-600 body-font">
      <div className="container px-5 py-20 mx-auto flex md:items-center lg:items-start md:flex-row md:justify-around md:flex-nowrap flex-wrap flex-col">
        <div className="md:w-[21rem] w-full px-4 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">1StepCure</span>
          </a>
          <p className="mt-2 text-sm text-gray-800 px-1">Our Support Team Is Available All Days</p>
          <div className="flex flex-col gap-2 mt-2 md:mt-4">
            <button className="w-48 px-4 bg-gray-100 inline-flex rounded-lg items-center hover:bg-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 14l7-7 7 7M5 14v6a2 2 0 002 2h10a2 2 0 002-2v-6M5 20h14" />
              </svg>
              <span className="px-2 py-1 flex items-start flex-col leading-none">
                <span className="text-[0.6rem] text-gray-600 mb-1">Ask us on Email</span>
                <span className="title-font font-medium" style={{ fontSize: '0.65rem' }}>1stepcure@gmail.com</span>
              </span>
            </button>

            <button className="w-48 px-4 bg-gray-100 inline-flex  rounded-lg items-center hover:bg-gray-200 focus:outline-none">
              <svg className='w-6 h-6' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 202.592 202.592" xmlSpace="preserve">
                <g>
                  <g>
                    <path d="M198.048,160.105l-31.286-31.29c-6.231-6.206-16.552-6.016-23.001,0.433l-15.761,15.761
			c-0.995-0.551-2.026-1.124-3.11-1.732c-9.953-5.515-23.577-13.074-37.914-27.421C72.599,101.48,65.03,87.834,59.5,77.874
			c-0.587-1.056-1.145-2.072-1.696-3.038l10.579-10.565l5.2-5.207c6.46-6.46,6.639-16.778,0.419-23.001L42.715,4.769
			c-6.216-6.216-16.541-6.027-23.001,0.433l-8.818,8.868l0.243,0.24c-2.956,3.772-5.429,8.124-7.265,12.816
			c-1.696,4.466-2.752,8.729-3.235,12.998c-4.13,34.25,11.52,65.55,53.994,108.028c58.711,58.707,106.027,54.273,108.067,54.055
			c4.449-0.53,8.707-1.593,13.038-3.275c4.652-1.818,9.001-4.284,12.769-7.233l0.193,0.168l8.933-8.747
			C204.079,176.661,204.265,166.343,198.048,160.105z M190.683,176.164l-3.937,3.93l-1.568,1.507
			c-2.469,2.387-6.743,5.74-12.984,8.181c-3.543,1.364-7.036,2.24-10.59,2.663c-0.447,0.043-44.95,3.84-100.029-51.235
			C14.743,94.38,7.238,67.395,10.384,41.259c0.394-3.464,1.263-6.95,2.652-10.593c2.462-6.277,5.812-10.547,8.181-13.02l5.443-5.497
			c2.623-2.63,6.714-2.831,9.112-0.433l31.286,31.286c2.394,2.401,2.205,6.492-0.422,9.13L45.507,73.24l1.95,3.282
			c1.084,1.829,2.23,3.879,3.454,6.106c5.812,10.482,13.764,24.83,29.121,40.173c15.317,15.325,29.644,23.27,40.094,29.067
			c2.258,1.249,4.32,2.398,6.17,3.5l3.289,1.95l21.115-21.122c2.634-2.623,6.739-2.817,9.137-0.426l31.272,31.279
			C193.5,169.446,193.31,173.537,190.683,176.164z"/>
                  </g>
                </g>
              </svg>
              <span className="px-2 py-2 flex items-start flex-col leading-none">
                <span className="text-[0.5rem] text-gray-600 mb-1">Via Call</span>
                <span className="text-[0.6rem] font-medium">+1 7866388467</span>
              </span>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-wrap md:justify-between justify-around md:pr-20 -mb-10 md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>
            <nav className="list-none mb-10">
              <li>
                <a href="/category/COVID MEDS" className="text-gray-600 hover:text-gray-800">Covid Meds</a>
              </li>
              <li>
                <a href="/category/ANTIBACTERIAL" className="text-gray-600 hover:text-gray-800">Antibacterial</a>
              </li>
              <li>
                <a href="/category/PARASITIC INFECTIONS" className="text-gray-600 hover:text-gray-800">Parasitic Infection</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Comming Soon</a>
              </li>
            </nav>
          </div>
          {/* <div className="lg:w-1/4 md:w-1/2 px-4"> */}
          <div className="lg:w-1/2 md:w-1/2 px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">QUICK LINKS</h2>
            <nav className="list-none mb-10">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-800">About</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-gray-800">Contact US</a>
              </li>
              {/* <li>
                <a className="text-gray-600 hover:text-gray-800">Track Your Order //To-DO</a>
              </li> */}
              <li>
                <a href="/contact" className="text-gray-600 hover:text-gray-800">Frequently Asked Questions</a>
              </li>
            </nav>
          </div>
          {/* <div className="lg:w-1/4 md:w-1/2 px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">POLICIES //TODO</h2>
            <nav className="list-none mb-10">
              <li>
             
              <a className="text-gray-600 hover:text-gray-800">FAQ</a>
              </li>
              <li>
              <a className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
              
              </li>
              <li>
              <a className="text-gray-600 hover:text-gray-800">Terms and Conditions</a>
                
              </li>
              <li>
              <a className="text-gray-600 hover:text-gray-800">Returns, Refunds Policies</a>
              </li>
            </nav>
          </div> */}
        </div>
      </div>
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-sm text-center sm:text-left">© 2024 1StepCure —
            <a href="https://twitter.com/samprit" rel="noopener noreferrer" className=" ml-1" target="_blank">@CM-Services</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 ">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 ">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 ">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
