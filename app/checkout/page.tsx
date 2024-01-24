'use client';

import { useState, useEffect } from 'react';

export default function Checkout() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [orderSummary, setOrderSummary] = useState<any>(null);

    const [creditCardData, setCreditCardData] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        billingAddress: '',
        city: '',
        postcode: '',
        note: '',
        creditCardDetails: {
            cardNumber: '',
            cardExpiry: '',
            cardCvv: '',
        }
    });

    const handleCreditCardChange = (e: any) => {
        const { name, value } = e.target;
        setCreditCardData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFeedbackSubmit = (event: any) => {
        event.preventDefault();

        // Assuming you have a separate API endpoint for submitting new feedback
        const apiUrl = "https://your-backend-api/new-feedback";

        // Create a feedback object with the input data
        const newFeedbackData = {
            feedback: event.target.newFeedback.value,
            // Add other relevant data if needed
        };

        // Send the new feedback data to the backend
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFeedbackData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("New Feedback submitted successfully:", data);
                // You can handle the response from the backend if needed
            })
            .catch(error => {
                console.error("Error submitting new feedback:", error);
                // Handle errors if needed
            });
        setPopupOpen(false)
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        formData.creditCardDetails = creditCardData

        // try {
        // const response = await fetch('/api/submitOrder', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // });

        // if (response.ok) {
        //     // Simulate fetching order summary
        //     // Replace this with actual API call
        //     const orderSummaryResponse = await fetch('/api/getOrderSummary');
        //     if (orderSummaryResponse.ok) {
        //         const summaryData = await orderSummaryResponse.json();
        //         setOrderSummary(summaryData);
        //     }

        setPopupOpen(true);
        //     } else {
        //         console.error('Error submitting the form');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };

    const handleCheckboxChange = () => {
        setSameAsShipping(!sameAsShipping);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        // Fetch initial order summary when the component mounts
        const fetchInitialOrderSummary = async () => {
            // try {
            // Simulate fetching order summary
            // Replace this with actual API call
            // const orderSummaryResponse = await fetch('/api/getOrderSummary');
            // if (orderSummaryResponse.ok) {
            //     const summaryData = await orderSummaryResponse.json();
            setOrderSummary({
                items: [
                    {
                        title: 'Product 1',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        imageUrl: 'https://example.com/product1.jpg',
                        price: 25.99,
                    },
                    {
                        title: 'Product 2',
                        description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                        imageUrl: 'https://example.com/product2.jpg',
                        price: 19.99,
                    },
                ],
                subtotal: 45.98,
                shippingTax: 25.00,
                total: 50.98,
            });
            // }
            // } catch (error) {
            //     console.error('Error fetching order summary:', error);
            // }
        };

        fetchInitialOrderSummary();
    }, []); // Run this effect only once when the component mounts

    return (
        <section className="container mx-auto mt-20">
            <h1 className="text-center font-bold text-blue-600 text-3xl lg:text-5xl mb-8">
                Checkout
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-around px-10">
                <div className="w-full md:w-1/2 mb-8">
                    <h2 className="font-bold text-xl mb-4 text-center">Shipping Details</h2>
                    <form className="w-full" onSubmit={handleSubmit}>
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <label htmlFor="Email" className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full">
                                <label htmlFor="Address" className="block mb-3 text-sm font-semibold text-gray-500">Shipping Address</label>
                                <textarea
                                    className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    name="address"
                                    cols={20}
                                    rows={4}
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                        </div>
                        {!sameAsShipping &&
                            <div className="mt-4">
                                <div className="w-full">
                                    <label htmlFor="Address" className="block mb-3 text-sm font-semibold text-gray-500">Billing Address</label>
                                    <textarea
                                        className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        name="billingAddress"
                                        cols={20}
                                        rows={4}
                                        placeholder="Billing Address"
                                        value={formData.billingAddress}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>
                        }
                        <div className="flex items-center mt-4">
                            <label className="flex items-center text-sm group text-heading">
                                <input
                                    type="checkbox"
                                    checked={sameAsShipping}
                                    onChange={handleCheckboxChange}
                                    className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                                />
                                <span className="ml-2">Billing address same as shipping address</span>
                            </label>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-6">
                            <div className="w-full">
                                <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-500">
                                    Credit Card Number
                                </label>
                                <input
                                    name="cardNumber"
                                    type="text"
                                    placeholder="Credit Card Number"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    onChange={handleCreditCardChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="cardExpiry" className="block text-sm font-semibold text-gray-500">
                                    Expiration Date
                                </label>
                                <input
                                    name="cardExpiry"
                                    type="text"
                                    placeholder="MM/YYYY"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    onChange={handleCreditCardChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="cardCvv" className="block text-sm font-semibold text-gray-500">
                                    CVV
                                </label>
                                <input
                                    name="cardCvv"
                                    type="text"
                                    placeholder="CVV"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    onChange={handleCreditCardChange}
                                />
                            </div>
                        </div>
                        <div className="relative pt-3 xl:pt-6">
                            <label htmlFor="note" className="block mb-3 text-sm font-semibold text-gray-500"> Notes (Optional)</label>
                            <textarea
                                name="note"
                                className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                rows={4}
                                placeholder="Notes for delivery"
                                value={formData.note}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                            >
                                Process
                            </button>
                        </div>
                    </form>
                </div>
                {orderSummary && (
                    <div className="md:w-1/3 ">
                        <div className="pt-12 md:p-6 2xl:ps-4 flex flex-col items-center p-6 rounded-lg border-2 border-gray-200">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="mt-8 flex flex-col gap-4">
                                {orderSummary.items.map((item: any, index: any) => (
                                    <div key={index} className="flex space-x-4 border-b pb-4">
                                        <div>
                                            <img src={item.imageUrl} alt={`Product ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold">{item.title}</h2>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-red-600 font-semibold">Price</span>
                                                <span className="ml-2">${item.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="ml-auto font-bold">${orderSummary.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                                <span className="text-gray-600">Flat Shipping Charge</span>
                                <span className="ml-auto font-bold">${orderSummary.shippingTax.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center w-full py-4 font-semibold text-xl border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                                <span className="text-gray-600">Total</span>
                                <span className="ml-auto font-bold text-blue-600">${orderSummary.total.toFixed(2)}</span>
                            </div>
                            <p>*Your card will be charged by 1StepCure for above amount</p>
                        </div>
                    </div>
                )}
            </div>
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-md">
                        <p className="text-xl font-bold mb-4">Submission Successful!</p>
                        <p>Your data has been submitted successfully.</p>
                        <form onSubmit={handleFeedbackSubmit}>
                            <label htmlFor="newFeedback" className="block mb-3 text-sm font-semibold text-gray-500">New Feedback</label>
                            <textarea
                                name="newFeedback"
                                className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                rows={4}
                                placeholder="Provide your new feedback here"
                            ></textarea>
                            <div className='flex justify-between'>
                                <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Submit New Feedback</button>
                                <button onClick={() => setPopupOpen(false)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Close</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </section>
    );
}
