'use client';

import { useState } from "react";
import { redirectUser } from "../auth/authHelper";

export default function About() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = () => {
        redirectUser(`https://tools.usps.com/go/TrackConfirmAction?tLabels=${searchQuery}`)
    };
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col items-center text-center mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Welcome to 1StepCure - Your Trusted Source for Quality Medicines</h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">At 1StepCure, we are dedicated to providing you with access to high-quality medicines and healthcare products from the comfort of your home. As a leading online pharmacy, we strive to make healthcare accessible and affordable for everyone.</p>
                    <div className="py-4 flex relative mr-4 w-full xl:w-1/2 md:w-full justify-center text-center md:text-left">
                        <div className="w-2/3 flex flex-col gap-1">
                            <label htmlFor="hero-field" className="leading-7 text-md font-bold text-gray-600">
                                Track your Order
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="hero-field"
                                    name="hero-field"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Tracking ID..."
                                    className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-blue-200 focus:bg-transparent border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <button type="button" className="inline-flex items-center px-8 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150" onClick={handleSubmit}>
                                    Track
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
                    </div>
                </div>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Our Commitment to Quality</h2>
                            <p className="leading-relaxed text-base">We understand the importance of trust when it comes to healthcare. That's why we go above and beyond to ensure that all the products available on our platform are sourced from reputable manufacturers and adhere to strict quality standards.</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>

                        <div className="flex-grow">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Our Mission</h2>
                            <p className="leading-relaxed text-base">Our mission at 1StepCure is simple yet profound - to improve the health and well-being of our customers by offering a wide range of medicines and healthcare essentials at competitive prices.</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Get Started Today</h2>
                            <p className="leading-relaxed text-base">Experience the convenience of online shopping for healthcare products with 1StepCure. Browse our extensive catalog, place your order with confidence, and let us take care of the rest. Your health is our priority, and we are here to support you every step of the way.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}