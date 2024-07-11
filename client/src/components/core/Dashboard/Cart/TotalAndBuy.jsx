import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnYellow from "../BtnYellow";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { resetCart } from "../../../../slices/cartSlice";

const TotalAndBuy = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePurchase = async () => {
    const courseIds = cart?.map((course) => course._id);
    await buyCourse(token, courseIds, user, navigate, dispatch);
    dispatch(resetCart());
    return;
  };
  return (
    <div className="flex flex-col self-stretch rounded-lg bg-richBlack-700 p-6 md:w-56 md:self-auto">
      <h3 className="text-richBlack-400">Total</h3>
      <h4 className="text-2xl font-bold text-yellow-50">Rs. {total}</h4>
      <strike className="text-sm text-richBlack-300">
        Rs. {total + total * (10 / 100)}
      </strike>
      <BtnYellow className={"mt-2"} onClick={handlePurchase} text={"Buy Now"} />
    </div>
  );
};

export default TotalAndBuy;
