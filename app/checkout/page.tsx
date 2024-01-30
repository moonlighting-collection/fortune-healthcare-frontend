'use client';

import { useState, useEffect } from 'react';
import { redirectUser } from '../auth/authHelper';

export default function Checkout() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [orderSummary, setOrderSummary] = useState<any>(null);
    const [productOrderDetails, setproductOrderDetails]=useState<any>(null);
    const [creditCardData, setCreditCardData] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        nameOnCard: '', 
    });
    interface CreditCardDetails {
    cardNumber: string;
    cardExpiry: string;
    cardCvv: string;
}

interface UserOrder {
    // Define the structure of the user order object if needed
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    billingAddress: string;
    city: string;
    postcode: string;
    note: string;
    creditCardDetails: CreditCardDetails;
    userOrder: UserOrder; // Define the structure of the user order object if needed
    Total: number;
}


// Now you can safely access formData properties without TypeScript errors


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        billingAddress: '',
        city: '',
        postcode: '',
        note: '',
        creditCardDetails: {
            cardNumber: '',
            cardExpiry: '',
            cardCvv: '',
        },
        userOrder:{},
        Total:0
    });

    const handleCreditCardChange = (e: any) => {
        const { name, value } = e.target;
        setCreditCardData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const closeButton = () =>{
        redirectUser('/');
        setPopupOpen(false)
    }
    const handleFeedbackSubmit = async (event: any) => {
        event.preventDefault();
        const newFeedbackData = {
            feedback: event.target.newFeedback.value,
            feedbackSenderData: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            }
        };
        try {
            const sendFeedBack = await fetch("https://navy-blue-dibbler-boot.cyclic.app/checkout/feedBack", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newFeedbackData),
            });
            if(sendFeedBack){
            
            }   

        }catch (err){
           
        }
        redirectUser('/');
        setPopupOpen(false);
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const requiredFields = ["firstName", "lastName", "email", "phoneNumber", "address", "creditCardDetails.cardNumber", "creditCardDetails.cardExpiry", "creditCardDetails.cardCvv", "creditCardDetails.nameOnCard"];
        const emptyFields = requiredFields.filter(field => {
            let fieldValue;
            if (field.includes('creditCardDetails')) {
                const creditCardField = field.split('.')[1] as keyof CreditCardDetails;
                fieldValue = creditCardData[creditCardField];
            } else {
                fieldValue = formData[field as keyof FormData];
            }
            return !fieldValue;
        });
        
        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
            return;
        }
        formData.creditCardDetails = creditCardData;
        formData.userOrder = productOrderDetails
        formData.Total = orderSummary.total;
        if(formData.Total > 25){
            setPopupOpen(true);
            try {
                const sendOrder = await fetch("https://navy-blue-dibbler-boot.cyclic.app/checkout", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                });
                if(sendOrder){
             
                }   
    
            }catch (err){
                console.log(err)
            }
        }else{
            alert("Cart Emtpy")
            return;
        }
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
        const fetchFinalProducts = async () => {
            try {
                const response = await fetch("https://navy-blue-dibbler-boot.cyclic.app/cart", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    const usercart = await response.json();
                    const transformedCart = usercart.map((product: any) => ({
                        title: product.product_id.productName,
                        description: product.product_id.use,
                        imageUrl: product.product_id.prodImgLink,
                        price: calculateProductPrice(product.totalQty),
                        totalQty: product.totalQty,
                    }));
                    const userOrder = usercart.map((product: any) => ({
                        name: product.product_id.productName,
                        packs: product.totalQty.map((pack: any) => ({
                          size: pack.quantity.toString(),
                          quantity: pack.count,
                          price: pack.cost
                        })),
                      }));
                      setproductOrderDetails(userOrder);
                     
                    const subtotal = transformedCart.reduce((acc: number, item: any) => acc + item.price, 0);
                    const shippingTax = 25.00; // Assuming this is a fixed value
                    const total = subtotal + shippingTax;
    
                    setOrderSummary({
                        items: transformedCart,
                        subtotal: subtotal.toFixed(2),
                        shippingTax: shippingTax.toFixed(2),
                        total: total.toFixed(2),
                    });
                }
            } catch (err) {
                console.log("logic error", err);
            }
        };
        fetchFinalProducts();
    }, []); 
    useEffect(() => {
        if (sameAsShipping) { 
            setFormData(prevData => ({
                ...prevData,
                billingAddress: prevData.address,
            }));
        }
        if (!sameAsShipping) {
            setFormData(prevData => ({
                ...prevData,
                billingAddress: "",
            }));
        }
    },[formData.address,sameAsShipping]);
    const calculateProductPrice = (totalQty: any[]) => {
        // Initialize totalPrice for the product
        let totalPrice = 0;
    
        // Iterate over each item in the totalQty array
        totalQty.forEach((item: any, index: number) => {
            // Multiply the quantity by the cost for each item and add it to the totalPrice
            totalPrice += item.count * item.cost;
        });
    
    
        return totalPrice;
    };
    
    
    
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
                        <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-6">
                            <div className="w-full">
                                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-500">
                                Email
                                </label>
                                <input
                                       name="email"
                                       type="text"
                                       placeholder="Email"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-500">
                                    Contact Number
                                </label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Contact Number"
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                            <div className="w-full">
                                        <label htmlFor="nameOnCard" className="block text-sm font-semibold text-gray-500">
                                            Name on Card
                                        </label>
                                        <input
                                            name="nameOnCard"
                                            type="text"
                                            placeholder="Name on Card"
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            onChange={handleCreditCardChange}
                                        />
                                    </div>
                                   
                        </div>
                        <p>*Your card will be charged by the name "ASHER HEALTH STORE"</p>
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
    <div className="md:w-1/3">
        <div className="pt-12 md:p-6 2xl:ps-4 flex flex-col items-center p-6 rounded-lg border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="mt-8 flex flex-col gap-4">
                {orderSummary.items.map((item: any, index: any) => (
                    item.totalQty.length > 0 && (
<div key={index} className="flex space-x-4 border-b pb-4" style={{ width: '100%' }}>
                            <div>
                                <img src={item.imageUrl} alt={`Product ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-sm text-gray-500">{item.description}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-red-600 font-semibold">Item Total</span>
                                    <span className="ml-2">${item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                <span className="text-gray-600">Subtotal</span>
                <span className="ml-auto font-bold">${parseFloat(orderSummary.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                <span className="text-gray-600">Flat Shipping Charge</span>
                <span className="ml-auto font-bold">${parseFloat(orderSummary.shippingTax).toFixed(2)}</span>
            </div>
            <div className="flex items-center w-full py-4 font-semibold text-xl border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                <span className="text-gray-600">Total</span>
                <span className="ml-auto font-bold text-blue-600">${parseFloat(orderSummary.total).toFixed(2)}</span>
            </div>
            <p>*Your card will be charged by the name "ASHER HEALTH STORE" for the above amount</p>
        </div>
    </div>
)}


            </div>
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-md">
                        <p className="text-xl font-bold mb-4">Submission Successful!</p>
                        <p>Your data has been submitted successfully, Soon you will receive an email.</p>
                        <form onSubmit={handleFeedbackSubmit}>
                            <label htmlFor="newFeedback" className="block mb-3 text-sm font-semibold text-gray-500">Any Feedback? We would love to here from you!</label>
                            <textarea
                                name="newFeedback"
                                className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                rows={4}
                                placeholder="Provide your new feedback here"
                            ></textarea>
                            <div className='flex justify-between'>
                                <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Submit New Feedback</button>
                                <button onClick={closeButton} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Close</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </section>
    );
}
