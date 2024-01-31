'use client';

// Import necessary modules
import Link from 'next/link';
import { useEffect, useState } from "react";
import { redirectUser } from "@/app/auth/authHelper";
import { useGlobalState } from "@/app/globalstatecontext";
import { useCookies } from 'next-client-cookies';

// Define the Cart component
export default function Cart() {
  // Initialize state variables
  const TOKEN_NAME = 'ftune';
  const cookies = useCookies();
  const [cart, setCart] = useState<any[]>([]);
  const [isRemoveAllQtyCalled, setIsRemoveAllQtyCalled] = useState(false);
  const { state } = useGlobalState();

  // Fetch cart data from the server
  useEffect(() => {
    const fetchFinalProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: 'include',
          body: JSON.stringify({
            ftune : cookies.get(TOKEN_NAME)
          })
        });
        if (response.ok) {
          const usercart = await response.json();
          // Transform the received cart data into the expected format
          const transformedCart = usercart.map((product: any) => ({
            id: product.product_id._id,
            name: product.product_id.productName,
            packs: product.totalQty.map((pack: any) => ({
              size: pack.quantity.toString(),
              quantity: pack.count,
              price: pack.cost
            })),
            prodImgLink: product.product_id.prodImgLink // Store product image link
          }));
          setCart(transformedCart);
          // console.log("transformedCart")
          // console.log(JSON.stringify(transformedCart));
        }
      } catch (err) {
        // console.log("logic error", err);
      }
    }
   // console.log("Cart Length:", cart.length);

    fetchFinalProducts();
    if (isRemoveAllQtyCalled) {
      fetchFinalProducts();
      setIsRemoveAllQtyCalled(false);
    }
  },[isRemoveAllQtyCalled]);
  

  const removeAllQty = async (productId: any, quantity: any, count:any, item:any) => {
    if (!state.isLoggedIn) return redirectUser('/auth/login');
    // console.log("item")
    // console.log(JSON.stringify(item))
    try {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          const existingPackIndex = item.packs.findIndex((pack: { size: any; }) => pack.size === quantity);
          if (existingPackIndex !== -1) {
            // If the pack already exists, update its quantity if it's greater than 1
            const updatedPacks = item.packs.map((pack: { quantity: number; }, index: any) =>
                index === existingPackIndex ? { ...pack, quantity: Math.max(pack.quantity - count, 0) } : pack
            );
            return {
              ...item,
              packs: updatedPacks
            };
          }
        }
        return item;
      });
  
      setCart(updatedCart);
  
      // Send the PUT request to update the cart on the server
      
        const cartDetails = [{
          product_id: productId, // Pass the product_id here
          totalQty: [{ quantity: parseInt(quantity), count: -count }] // Parse quantity as integer
        }];
        // console.log("cartDetails")
        // console.log(JSON.stringify(cartDetails));
        
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
        }else{
          setIsRemoveAllQtyCalled(true);
        }
  
        const updatedData = await response.json();
     //   console.log("Cart updated successfully:", updatedData);
      
    } catch (error) {
      console.error("Error updating cart:", error);
    }
    };
  //new adty 
  const addQTY = async (productId: any, quantity: any) => {
    if (!state.isLoggedIn) return redirectUser('/auth/login');
    
    try {
        const updatedCart = cart.map((item) => {
            if (item.id === productId) {
                const existingPackIndex = item.packs.findIndex((pack: { size: any; }) => pack.size === quantity);
                if (existingPackIndex !== -1) {
                    // If the pack already exists, update its quantity
                    return {
                        ...item,
                        packs: item.packs.map((pack: { quantity: number; }, index: any) =>
                            index === existingPackIndex ? { ...pack, quantity: pack.quantity + 1 } : pack
                        )
                    };
                } else {
                    // If the pack does not exist, add it with quantity 1
                    return {
                        ...item,
                        packs: [...item.packs, { size: quantity, quantity: 1, price: 0 }]
                    };
                }
            }
            return item;
        });

        setCart(updatedCart);

        // Send the PUT request to update the cart on the server
        const cartDetails = [{
          product_id: productId, // Pass the product_id here
          totalQty: [{ quantity: parseInt(quantity), count: 1 }] // Parse quantity as integer
      }];
        // console.log("cartDetails")
        // console.log(JSON.stringify(cartDetails));
        console.log(document.cookie)

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
      //  console.log("Cart updated successfully:", updatedData);
    } catch (error) {
        console.error("Error updating cart:", error);
    }
};

const subtractQty = async (productId: any, quantity: any) => {
  if (!state.isLoggedIn) return redirectUser('/auth/login');

  try {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        const existingPackIndex = item.packs.findIndex((pack: { size: any; }) => pack.size === quantity);
        if (existingPackIndex !== -1) {
          // If the pack already exists, update its quantity if it's greater than 1
          const updatedPacks = item.packs.map((pack: { quantity: number; }, index: any) =>
            index === existingPackIndex ? { ...pack, quantity: Math.max(pack.quantity - 1, 1) } : pack
          );
          return {
            ...item,
            packs: updatedPacks
          };
        }
      }
      return item;
    });

    setCart(updatedCart);

    // Send the PUT request to update the cart on the server
    if (updatedCart.find(item => item.id === productId)?.packs.find((pack: { size: any; }) => pack.size === quantity)?.quantity >= 1 ) {
      const cartDetails = [{
        product_id: productId, // Pass the product_id here
        totalQty: [{ quantity: parseInt(quantity), count: -1 }] // Parse quantity as integer
      }];
      // console.log("cartDetails")
      // console.log(JSON.stringify(cartDetails));
      console.log(document.cookie)

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
    }
  } catch (error) {
    //console.error("Error updating cart:", error);
  }
};



  const calculateTotalAmountForPack = (pack: any) => {
    return pack.quantity * pack.price;
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (total: any, item: any) =>
        total + item.packs.reduce((packTotal: any, pack: any) => packTotal + calculateTotalAmountForPack(pack), 0),
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCost = 25; // Fixed shipping cost
    return subtotal + shippingCost;
  };
2
  return (
    <section className="bg-gray-100 py-6 px-2 sm:px-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Cart Items</h1>
      <div className="max-w-screen-md mx-auto">
        {cart.map((item) => {
          if (item.packs.length > 0) {
            return (
              <div key={item.id} className="mb-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center">
                  <img
                    src={item.prodImgLink}
                    alt={item.name}
                    className="w-24 sm:w-40 h-24 sm:h-auto rounded-l-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mt-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-2 sm:px-4 py-2 font-semibold text-sm text-gray-700 border">Pack</th>
                        <th className="px-2 sm:px-4 py-2 font-semibold text-sm text-gray-700 border w-1/4 sm:w-1/6">
                          Quantity
                        </th>
                        <th className="px-2 sm:px-4 py-2 font-semibold text-sm text-gray-700 border">Price</th>
                        <th className="px-2 sm:px-4 py-2 font-semibold text-sm text-gray-700 border">Total</th>
                        <th className="px-2 sm:px-4 py-2 font-semibold text-sm text-gray-700 border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.packs.map((pack: any, packIndex: any) =>
                        pack.quantity > 0 && (
                          <tr key={packIndex} className="hover:bg-gray-50 border">
                            <td className="px-2 sm:px-4 py-2 border text-center">{pack.size}</td>
                            <td className="px-2 sm:px-4 py-2 border text-center">
                              <div className="flex items-center justify-center sm:justify-start">
                              <button
                                onClick={() => subtractQty(item.id, pack.size)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-l h-10"
                                disabled={pack.quantity === 1} // Disable the button if quantity is 1
                              >
                                -
                              </button>
                                <input
                                  className="w-12 sm:w-16 h-10 bg-gray-300 font-bold text-black text-center"
                                  type="number"
                                  value={pack.quantity}
                                
                                  min="0"
                                  readOnly
                                />
                                <button
                                  onClick={() => addQTY(item.id, pack.size)}
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-r h-10"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="px-2 sm:px-4 py-2 border text-center">${pack.price.toFixed(2)}</td>
                            <td className="px-2 sm:px-4 py-2 border text-center">
                              ${calculateTotalAmountForPack(pack).toFixed(2)}
                            </td>
                            <td className="px-2 sm:px-4 py-2 border text-center">
                              <button
                                onClick={() => removeAllQty(item.id, pack.size, pack.quantity, item)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }
          return null; // If item.packs has no items, return null to render nothing
        })}
        <div className="mt-6 bg-white rounded-lg border p-4 shadow-md">
          <div className="mb-4 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${calculateSubtotal().toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Flat Shipping Charge</p>
            <p className="text-gray-700">$25</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="text-right text-lg font-bold">${calculateTotal().toFixed(2)}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <div className="flex gap-8 justify-around mt-6">
          {/* {calculateTotal()>25 && ( */}
  <Link
    href="/checkout"
    className="w-full rounded-md bg-blue-500 py-1.5 font-medium text-center text-white hover:bg-blue-600"
  >
    Check out
  </Link>
 {/* )} */}
          </div>
        </div>
      </div>
    </section>
  );
      }  