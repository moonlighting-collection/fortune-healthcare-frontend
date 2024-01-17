'use client';

import {useState} from "react";

export default function Checkout() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setPopupOpen(true);
    };

    return (
        <section className="container mx-auto mt-20">
            <h1 className="text-center font-bold text-blue-600 text-3xl lg:text-5xl mb-8">
                Checkout
            </h1>

            <div className="flex flex-col md:flex-row justify-around px-10">
                <div className="w-full md:w-1/2 mb-8">
                    <h2 className="font-bold text-xl mb-4 text-center">Shipping Details</h2>
                    <form className="w-full">
                        <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-6">
                            <div className="w-full">
                                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-500">
                                    First Name
                                </label>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-500">
                                    Last Name
                                </label>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <label htmlFor="Email"
                                    className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                <input name="Last Name" type="text" placeholder="Email"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <label htmlFor="Address"
                                    className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                <textarea
                                    className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    name="Address" cols={20} rows={4} placeholder="Address"></textarea>
                            </div>
                        </div>
                        <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                                <label htmlFor="city"
                                    className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                <input name="city" type="text" placeholder="City"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="w-full lg:w-1/2 ">
                                <label htmlFor="postcode" className="block mb-3 text-sm font-semibold text-gray-500">
                                    Postcode</label>
                                <input name="postcode" type="text" placeholder="Post Code"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <label className="flex items-center text-sm group text-heading">
                                <input type="checkbox"
                                    className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1" />
                                <span className="ml-2">Save this information for next time</span></label>
                        </div>
                        <div className="relative pt-3 xl:pt-6"><label htmlFor="note"
                            className="block mb-3 text-sm font-semibold text-gray-500"> Notes
                            (Optional)</label><textarea name="note"
                                className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                rows={4} placeholder="Notes for delivery"></textarea>
                        </div>
                        <div className="mt-4">
                            <button onClick={event => handleSubmit(event)} className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">
                                Process
                            </button>
                        </div>
                    </form>
                </div>
                <div className="md:w-1/3">
                    <div className="pt-12 md:pt-0 2xl:ps-4 flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="mt-8">
                            <div className="flex flex-col space-y-4">
                                <div className="flex space-x-4">
                                    <div>
                                        <img src="https://source.unsplash.com/user/erondu/1600x900" alt="image"
                                            className="w-60" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Title</h2>
                                        <p className="text-sm">Lorem ipsum dolor sit amet, tet</p>
                                        <span className="text-red-600">Price</span> $20
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div>
                                        <img src="https://source.unsplash.com/collection/190727/1600x900" alt="image"
                                            className="w-60" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Title</h2>
                                        <p className="text-sm">Lorem ipsum dolor sit amet, tet</p>
                                        <span className="text-red-600">Price</span> $20
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex p-4 mt-4">
                            <h2 className="text-xl font-bold">ITEMS 2</h2>
                        </div>
                        <div
                            className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Subtotal<span className="ml-2">$40.00</span></div>
                        <div
                            className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Shipping Tax<span className="ml-2">$10</span></div>
                        <div
                            className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Total<span className="ml-2">$50.00</span></div>
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-md">
                        <p className="text-xl font-bold mb-4">Submission Successful!</p>
                        <p>Your data has been submitted successfully.</p>
                        <button onClick={() => setPopupOpen(false)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Close</button>
                    </div>
                </div>
            )}
        </section >
    );
}
