'use client';

import Image from "next/image"
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { redirectUser } from "@/app/auth/authHelper";
import { useGlobalState } from "@/app/globalstatecontext";


export default function Product({ params }: any) {

    const [cart, setCart] = useState<any>({});
    const { state } = useGlobalState();
    const [productData, setProductData] = useState<any>(null);
    const searchParams = useSearchParams();
    const [cartLoaded, setCartLoaded] = useState(false);

    const handleAddToCart = async (quantity: any) => {
        if (!state.isLoggedIn) return redirectUser('/auth/login');

        setCart((prevCart: any) => {
            const newCart = { ...prevCart };

            if (newCart[quantity]) {
                newCart[quantity]++;
            } else {
                newCart[quantity] = 1;
            }
            return newCart;
        });
        const cartDetails = [{
            product_id: searchParams.get('product'),
            totalQty: [{ quantity: quantity, count: 1 }]
        }];
       
        try {
            console.log(document.cookie)

            // Send the PUT request to update the cart on the server
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/cart`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ cartDetails }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const updatedData = await response.json();
            //console.log("Cart updated successfully:", updatedData);
        } catch (error) {
            //console.error("Error updating cart:", error);
        }
    };

    const handleRemoveFromCart = async (quantity: any) => {
        setCart((prevCart: any) => {
            const newCart = { ...prevCart };

            if (newCart[quantity] > 1) {
                newCart[quantity]--;
            } else {
                delete newCart[quantity];
            }

            return newCart;
        });
        const cartDetails = [{
            product_id: searchParams.get('product'),
            totalQty: [{ quantity: quantity, count: -1 }]
        }];
    
        try {
            console.log(document.cookie)

            // Send the PUT request to update the cart on the server
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/cart`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ cartDetails }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const updatedData = await response.json();
           // console.log("Cart updated successfully:", updatedData);
        } catch (error) {
           // console.error("Error updating cart:", error);
        }
    };

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const searchParam = searchParams.get('product');
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/product?product=${searchParam}`);
                let loginUserCartDataQty: any[] = []; // Initialize as an empty array
                const data = await response.json();
                setProductData(data.products[0]);
                if (response.ok && state.isLoggedIn) { // Check if user is logged in
                    try {
                        console.log(document.cookie)
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/cart`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: 'include',
                        });
                        if (response.ok) {
                            const usercart = await response.json();
                            for (const item of usercart) {
                                if (item.product_id._id === searchParam) {
                                    loginUserCartDataQty = item.totalQty;
                                    break;
                                }
                            }
                        }
                    } catch (err) {
                     //   console.log("logic error", err);
                    }
                }
                const newCart = data.products.reduce((acc: any, item: any) => {
                    item.price.forEach(async (priceItem: any) => {
                        const quantity = priceItem.quantity;
                        let count = 0;
                        // Check if the quantity matches any quantity inside loginUserCartDataQty
                       if(state.isLoggedIn){
                        const matchingQty = loginUserCartDataQty.find((qtyItem: any) => qtyItem.quantity === quantity);
                        if (matchingQty) {
                            // If a match is found, set count to the count from loginUserCartDataQty
                            count = matchingQty.count;
                        }
                       }
                        acc[quantity] = count;
                    });
                    return acc;
                }, {});
                setCart(newCart);
                setCartLoaded(true);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProductData();
    }, [params.productId, searchParams, state.isLoggedIn]);


    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                {productData ? (
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded overflow-hidden">
                            <Image
                            className="lg:h-48 md:h-36 w-full object-cover object-center"
                            src={productData.prodImgLink} // Use prodImgLink from the product object
                            alt={productData.productName}
                            layout="responsive" // Add this to make the image responsive
                            width={1024}
                            height={1024}
                            
                        />
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {productData.categoryName}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {productData.productName}
                            </h1>

                            <h3 className="text-sm lg:text-base xl:text-lg font-semibold">Description:</h3>
                            <p className="leading-relaxed text-justify">{productData.productIntro}</p><br />
                            <h3 className="text-sm lg:text-base xl:text-lg font-semibold">Benefits:</h3>
                            <p className="leading-relaxed text-justify">{productData.benefits}</p>
                            <div className="overflow-x-auto py-10">
                                {cartLoaded && (
                                    <table className="w-full border-collapse">
                                        <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Quantity</th>
                                            <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Price</th>
                                            <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Action</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                        {productData.price.map(({ quantity, cost, _id }: any) => {
                                            const cartCount = cart[quantity] || 0;
                                            // console.log(cart[quantity], cart, quantity)


                                            return (
                                               
                                                <tr key={_id} className="hover:bg-gray-50 border">
                                                    <td className="py-3 px-4 border text-center">{quantity}</td>
                                                    <td className="py-3 px-4 border text-center">${cost.toFixed(2)}</td>
                                                    <td className="py-3 px-4 border text-center">
                                                        {cartCount > 0 ? (
                                                    
                                                            <>
                                                        
                                                                <button
                                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                                                                    onClick={() => handleRemoveFromCart(quantity)}
                                                                >
                                                                    -
                                                                </button>
                                                                <button 
                                                                className="bg-gray-300 text-gray-700 font-bold py-2 px-4">
                                                                    {cartCount}
                                                                </button>
                                                                <button
                                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                                                                    onClick={() => handleAddToCart(quantity)}
                                                                >
                                                                    +
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleAddToCart(quantity)}
                                                            >
                                                                Add to Cart
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                )}
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