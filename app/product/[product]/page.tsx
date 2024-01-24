'use client';

import Image from "next/image"
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { redirectUser } from "@/app/auth/authHelper";
import { useGlobalState } from "@/app/globalstatecontext";


export default function Product({ params }: any) {


    const [cart, setCart] = useState(Object);
    const { state } = useGlobalState()
    const [productData, setProductData] = useState<any>(null);
    const searchParams = useSearchParams()

    const handleAddToCart = (productQuantityId: any) => {
        if (!state.isLoggedIn) return redirectUser('/auth/login');

        setCart((prevCart: any) => {
            const newCart = { ...prevCart };

            if (newCart[productQuantityId]) {
                newCart[productQuantityId]++;
            } else {
                newCart[productQuantityId] = 1;
            }

            (async () => {
                const data = await updateCartBackend(newCart);
                if (data) {
                    setCart(newCart);
                }
            })();
            return prevCart;
        });
    };


    const handleRemoveFromCart = (productQuantityId: any) => {
        setCart((prevCart: any) => {
            const newCart = { ...prevCart };

            if (newCart[productQuantityId] > 1) {
                newCart[productQuantityId]--;
            } else {
                delete newCart[productQuantityId];
            }

            (async () => {
                const data = await updateCartBackend(newCart);
                if (data) {
                    setCart(newCart);
                }
            })();
            return prevCart;
        });
    };



    const updateCartBackend = async (updatedCart: any) => {
        try {
            const response = await fetch("http://localhost:5000/cart", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    cartDetails: Object.entries(updatedCart).map(([product_id, count]: any) => ({
                        product_id,
                        count,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedData = await response.json();
            console.log("Cart updated successfully:", updatedData);
            return updatedData;
        } catch (error) {
            console.error("Error updating cart:", error);
            return null;
        }
    };


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/product?product=${searchParams.get('product')}`);
                const data = await response.json();
                setProductData(data.products[0]);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, [params.productId]);



    return (

        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                {productData ? (
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded overflow-hidden">
                            <Image
                                className="w-full h-full object-cover object-center"
                                src="https://dummyimage.com/400x400"
                                // src={productData.image}
                                alt={productData.productName}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {productData.categoryName}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {productData.productName}
                            </h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <h3>Description:</h3>
                            <p className="leading-relaxed text-justify">{productData.productIntro}</p><br />
                            <h3>Benefits:</h3>
                            <p className="leading-relaxed text-justify">{productData.benefits}</p>

                            <div className="overflow-x-auto py-10">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Quantity</th>
                                            <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Price</th>
                                            <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productData.price.map(({ quantity, cost, _id }: any) => (
                                            <tr key={_id} className="hover:bg-gray-50 border">
                                                <td className="py-3 px-4 border text-center">{quantity}</td>
                                                <td className="py-3 px-4 border text-center">${cost.toFixed(2)}</td>
                                                <td className="py-3 px-4 border text-center">
                                                    {cart[_id] ? (
                                                        <>
                                                            <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                                                                onClick={() => handleRemoveFromCart(_id)}
                                                            >
                                                                -
                                                            </button>
                                                            <button className="bg-gray-300 text-gray-700 font-bold py-2 px-4">
                                                                {cart[_id]}
                                                            </button>
                                                            <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                                                                onClick={() => handleAddToCart(_id)}
                                                            >
                                                                +
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleAddToCart(_id)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </section>
    )
}