'use client';

import { useState } from 'react';

export default function Cart() {
    const [cart, setCart] = useState([
        {
            id: 1,
            name: 'Nike Air Max 2019',
            packs: [
                { size: '36EU - 4US', quantity: 2, price: 259 },
                { size: '36EU - 6US', quantity: 4, price: 789 }
            ]
        },
        {
            id: 2,
            name: 'Adidas Superstar',
            packs: [
                { size: '38EU - 6US', quantity: 3, price: 329 },
                { size: '38EU - 8US', quantity: 2, price: 459 }
            ]
        }
    ]);

  const handleQuantityChange = (productId: any, packIndex: any, newQuantity: any) => {
    setCart((prevCart: any) =>
      prevCart.map((item: any) =>
        item.id === productId
          ? {
              ...item,
              packs: item.packs.map((pack: any, index: any) =>
                index === packIndex ? { ...pack, quantity: newQuantity } : pack
              ),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: any, packIndex: any) => {
    setCart((prevCart: any) =>
      prevCart
        .map((item: any) =>
          item.id === productId
            ? {
                ...item,
                packs: item.packs.filter((_pack: any, index: any) => index !== packIndex),
              }
            : item
        )
        .filter((item: any) => item.packs.length > 0) // Remove product if no packs remaining
    );
  };

  const handleAddToCart = (productId: any, packIndex: any) => {
    setCart((prevCart: any) =>
      prevCart.map((item: any) =>
        item.id === productId
          ? {
              ...item,
              packs: item.packs.map((pack: any, index: any) =>
                index === packIndex ? { ...pack, quantity: 1 } : pack
              ),
            }
          : item
      )
    );
  };

  const handleEmptyCart = () => {
    setCart([]);
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
    const shippingCost = 4.99; // Assuming a fixed shipping cost
    return subtotal + shippingCost;
  };

  return (
    <section>
      <div className="bg-gray-100 py-24">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-4xl justify-center px-6 xl:px-0">
          {cart.map((item: any) => (
            <div key={item.id} className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="ml-4">
                    <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  </div>
                </div>
                <svg
                  onClick={() => handleRemoveItem(item.id, 0)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              {item.packs.length > 0 && (
                <table className="w-full border-collapse mt-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Size</th>
                      <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Quantity</th>
                      <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Price</th>
                      <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Total</th>
                      <th className="py-2 px-4 font-semibold text-sm text-gray-700 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.packs.map((pack: any, packIndex: any) => (
                      <tr key={packIndex} className="hover:bg-gray-50 border">
                        <td className="py-3 px-4 border text-center">{pack.size}</td>
                        <td className="py-3 px-4 border text-center">
                          <div className="flex items-center border-gray-100">
                            <button
                              onClick={() => handleQuantityChange(item.id, packIndex, Math.max(pack.quantity - 1, 0))}
                              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              -
                            </button>
                            <input
                              className="h-8 w-8 border bg-white text-center text-xs outline-none"
                              type="number"
                              value={pack.quantity}
                              onChange={(e) => handleQuantityChange(item.id, packIndex, parseInt(e.target.value))}
                              min="0"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, packIndex, pack.quantity + 1)}
                              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 border text-center">${pack.price.toFixed(2)}</td>
                        <td className="py-3 px-4 border text-center">${calculateTotalAmountForPack(pack).toFixed(2)}</td>
                        <td className="py-3 px-4 border text-center">
                          {pack.quantity > 0 ? (
                            <button
                              onClick={() => handleRemoveItem(item.id, packIndex)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(item.id, packIndex)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Add to Cart
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${calculateSubtotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-right text-lg font-bold">${calculateTotal().toFixed(2)}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <div className="flex gap-8 justify-around">
              <button
                onClick={handleEmptyCart}
                className="mt-6 w-full rounded-md border border-blue-500 py-1.5 font-medium text-blue-500 hover:border-blue-800 hover:text-blue-800"
              >
                Empty Cart
              </button>
              <button
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
