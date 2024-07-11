import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import TotalAndBuy from "./TotalAndBuy";
//wishlist is cart

function Cart() {
  const { cart, totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-x-2 text-sm text-richBlack-300"
      >
        <BiChevronLeft />
        Back
      </button>
      <h1 className="mt-3 text-3xl text-richBlack-5">Your Wishlist</h1>
      <h2 className="mb-3 mt-9 text-sm text-richBlack-300">
        {`${totalItems} `}items in your cart
      </h2>
      <div className="mx-auto max-w-maxContent border-t border-t-richBlack-300 border-opacity-60 py-6">
        {totalItems > 0 ? (
          <div className="flex flex-col items-center justify-between gap-5 sm:items-stretch lg:flex-row lg:items-start">
            {/* items */}
            <div className="flex-grow space-y-5">
              {cart.map((course) => (
                <CartItem key={course._id} course={course} />
              ))}
            </div>
            {/* total */}
            <TotalAndBuy />
          </div>
        ) : (
          <h3 className="mt-10 text-center text-xl text-richBlack-50">
            Your Cart is Empty
          </h3>
        )}
      </div>
    </>
  );
}

export default Cart;
