'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirectUser } from '@/app/auth/authHelper';
import Link from 'next/link';

export default function Category({ params }: any) {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/collection/get?category=${decodeURIComponent(params.category)}`);
        const data = await response.json();
        setCategoryData(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
        redirectUser('/')
      }
    };
    fetchData();
  }, [params.category]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">CATEGORY NAME</h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            {decodeURIComponent(params.category)}
          </h1>
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-wrap -m-4">
              {categoryData.map((item: any, index) => (
                <div className="p-4 md:w-1/3" key={index}>
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <Image
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      // src={item.image} // Replace with the actual property from your API response
                      src="https://dummyimage.com/722x402"
                      alt={item.productName} // Replace with the actual property from your API response
                      width={722}
                      height={402}
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {item.categoryName} {/* Replace with the actual property from your API response */}
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {item.productName} {/* Replace with the actual property from your API response */}
                      </h1>
                      <p className="leading-relaxed mb-3">{item.description}</p> {/* Replace with the actual property from your API response */}
                      <div className="flex items-center flex-wrap">
                        <Link href={'/product/' + item.productName + '?product=' + item._id}>
                          <p
                            className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0"
                          >
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
