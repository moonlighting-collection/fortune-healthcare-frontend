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
          <div className="flex mt-2 md:mt-4">
          <button className="bg-gray-100 inline-flex px-1 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 14l7-7 7 7M5 14v6a2 2 0 002 2h10a2 2 0 002-2v-6M5 20h14" />
  </svg>
  <span className="px-2 py-1 flex items-start flex-col leading-none">
    <span className="text-[0.6rem] text-gray-600 mb-1">Ask us on Email</span>
    <span className="title-font font-medium" style={{ fontSize: '0.65rem' }}>1stepcure@gmail.com</span>
  </span>
</button>

            <button className="bg-gray-100 inline-flex  rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-8" viewBox="0 0 32 32">
    <path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fillRule="evenodd"></path>
  </svg>
              <span className="px-2 py-2 flex items-start flex-col leading-none">
                <span className="text-[0.5rem] text-gray-600 mb-1">Via WhatsApp or Call</span>
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
