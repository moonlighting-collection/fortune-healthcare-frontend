'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/product')
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
            <p> Take the first step towards a healthier, happier you!</p>
            </p>
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
            {/* <div className="flex">
              <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12" viewBox="0 0 32 32"><path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fillRule="evenodd"></path></svg>
                <span className="ml-2 flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">Ask us on</span>
                  <span className="title-font font-medium">Whatsapp</span>
                </span>
              </button>
              <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none">
                <span className="ml-4 flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">Contact us</span>
                  <span className="title-font font-medium">+1 672 2562 2526</span>
                </span>
              </button>
            </div> */}
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
                   //        src={product.prodImgLink} // Use prodImgLink from the product object
                            alt={product.productName}
                            width={722}
                            height={402}
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