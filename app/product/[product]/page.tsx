'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { redirectUser } from "@/app/auth/authHelper";
import { useGlobalState } from "@/app/globalstatecontext";
import { useCookies } from 'next-client-cookies';

export default function Product({ params }: any) {
  const TOKEN_NAME = 'ftune';
  const cookies = useCookies();
  const { state } = useGlobalState();
  const searchParams = useSearchParams();
  const [cart, setCart] = useState<any>({});
  const [productData, setProductData] = useState<any>({
    categoryName: "Health",
    productName: "Vitamin C Tablets",
    prodImgLink: "image_link_here",
    price: [
      { quantity: 1, cost: 10 },
      { quantity: 3, cost: 27 }
    ],
    reviews: [
      {
        username: "John Doe",
        rating: 5,
        comment: "Great product, felt the difference immediately."
      },
      {
        username: "Jane Smith",
        rating: 4,
        comment: "Good, but a little pricey."
      },
      {
        username: "Bob Lee",
        rating: 3,
        comment: "Works fine, but could be better."
      }
    ]
  });


  const [review, setReview] = useState({username: "", rating: 0, comment: "" });
  
  const [errorMessage, setErrorMessage] = useState("");

const handleSubmitReview = async (e: any) => {
    e.preventDefault();
    if (!state.isLoggedIn) {
        setErrorMessage("You must be logged in to submit a review.");
        return redirectUser('/auth/login');
    }

    if (!review.username || !review.rating || !review.comment) {
        setErrorMessage("Please fill in all fields before submitting.");
        return;
    }

    try {
      const searchParam = searchParams.get('product');
      const reviewObject= {username:review.username,rating:review.rating,comment:review.comment,productId:searchParam};
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/product/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewObject),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedReviewData = await response.json();
        console.log("Review posted successfully:", updatedReviewData);
        // Optionally, reset the form after submitting
        setReview({ username: "", rating: 0, comment: "" });
    } catch (error) {
        console.error("Error posting review:", error);
        setErrorMessage("Error posting the review. Please try again.");
    }
};





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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ ftune: cookies.get(TOKEN_NAME), cartDetails }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
    } catch (error) {
      console.error("Error updating cart:", error);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ ftune: cookies.get(TOKEN_NAME), cartDetails }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const searchParam = searchParams.get('product');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/product?product=${searchParam}`);
        const data = await response.json();
        setProductData(data.products[0]);
        setCartLoaded(true);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProductData();
  }, [params.productId, searchParams]);

  return (
    <>
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                {productData ? (
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded overflow-hidden">
                            <Image
                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                src={productData.prodImgLink} 
                                alt={productData.productName}
                                layout="responsive"
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
                            <p className="leading-relaxed text-justify">{productData.productIntro}</p>
                            <br />
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
                                                                        className="bg-gray-300 text-gray-700 font-bold py-2 px-4"
                                                                    >
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
                            {state.isLoggedIn ? (
                                <div className="border p-4 my-4">
                                <h3 className="text-lg font-semibold">Submit Your Review</h3>
                                <form onSubmit={handleSubmitReview} className="mt-4">
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={review.username}
                                            onChange={(e) => setReview({ ...review, username: e.target.value })}
                                            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                            required
                                        />
                                    </div>
                            
                                    <div className="mb-4">
                                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                            Rating (1 to 5 stars)
                                        </label>
                                        <input
                                            type="number"
                                            id="rating"
                                            min="1"
                                            max="5"
                                            value={review.rating}
                                            onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                                            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                            required
                                        />
                                    </div>
                            
                                    <div className="mb-4">
                                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                            Comment
                                        </label>
                                        <textarea
                                            id="comment"
                                            rows={4}
                                            value={review.comment}
                                            onChange={(e) => setReview({ ...review, comment: e.target.value })}
                                            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                            required
                                        />
                                    </div>
                            
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Submit Review
                                    </button>
                                    {errorMessage && (
                                        <p className="text-red-500 mt-2">{errorMessage}</p>
                                    )}
                                </form>
                            </div>
                            ) : (
                                <p className="text-gray-500">Please log in to write a review.</p>
                            )}
                            {/* Reviews Section */}
                            {productData.reviews && productData.reviews.length > 0 && (
                                <div className="reviews-section py-10">
                                    <h3 className="text-lg font-semibold">Customer Reviews:</h3>
                                    {productData.reviews.map((review: any, index: number) => (
                                        <div key={index} className="review-item bg-gray-100 p-4 rounded mb-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-bold">{review.username}</h4>
                                                <span className="text-yellow-500">{"⭐".repeat(review.rating)}</span>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </section>
    </>
);
}
