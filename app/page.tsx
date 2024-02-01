'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/product`)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter((product: any) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='xl:px-48 lg:px-24'>
      <section className="text-gray-600 body-font">
        {/* <div className="container mx-auto flex flex-col px-5 py-6 justify-center items-center"> */}
        <div className="container mx-auto flex flex-col px-0 py-0 justify-center items-center">
          <div className="w-full md:w-3/4 flex flex-col items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              1StepCure: Take One Step towards health
            </h1>
            <p className="mb-8 leading-relaxed font-semibold font-sans">
              Welcome to 1StepCure, your trusted online destination for premium healthcare medicines.
              Discover a curated selection of top-quality medicines along with our expert guidance and convenient delivery.
              <span> Take the first step towards a healthier, happier you!</span>
            </p>
            <div className="flex">
              <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 14l7-7 7 7M5 14v6a2 2 0 002 2h10a2 2 0 002-2v-6M5 20h14" />
                </svg>
                <span className="px-2 py-1 flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">Ask us on Email</span>
                  <span className="title-font font-medium">1stepcure@gmail.com</span>
                </span>
              </button>
              <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none">
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
                <span className="ml-4 flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">Contact us</span>
                  <span className="title-font font-medium">+1 7866388467</span>
                </span>
              </button>
            </div>
            <div className="flex w-full justify-center items-end">
              <div className="relative mr-4 w-full xl:w-1/2 md:w-full text-center md:text-left">
                <label htmlFor="hero-field" className="leading-7 text-sm text-gray-600">
                  Search Products
                </label>
                <input
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-blue-200 focus:bg-transparent border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <p className="mt-1 leading-relaxed font-semibold font-sans">
              Explore some of our extensive range below today!
            </p>

          </div>
        </div>
      </section>




      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filteredProducts.map((product: any) => (
              <div key={product._id} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <Image
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={product.prodImgLink} // Use prodImgLink from the product object
                    alt={product.productName}
                    width={722}
                    height={402}
                    priority
                  />

                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {product.categoryName}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {product.productName}
                    </h1>
                    {/* <p className="leading-relaxed mb-3">{product.productIntro}</p>
                    <p className="leading-relaxed mb-3">{product.benefits}</p> */}
                    <div className="flex items-center flex-wrap">
                      <Link href={'/product/' + product.productName + '?product=' + product._id}>
                        <p className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">
                          Learn More
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </p>
                      </Link>
                      {/* <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        15
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        12
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}