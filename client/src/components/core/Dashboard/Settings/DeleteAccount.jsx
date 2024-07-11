import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile } from "../../../../services/operations/SettingsAPI";
import { useNavigate } from "react-router-dom";
function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlerDeleteAccount() {
    dispatch(deleteProfile(token, navigate));
  }

  return (
    <div className="relative mx-auto mt-10 max-w-3xl rounded-lg border border-pink-700 bg-pink-900 p-6">
      <h2 className="ml-12 text-lg font-bold text-pink-5">Delete Account</h2>
      <p className="ml-12 mt-2 text-sm text-pink-25">
        Would You Like to Delete Account?
        <br />
        This account contains Paid Courses. Deleting your account will remove
        all the contain associated with it.
      </p>
      <button
        onClick={handlerDeleteAccount}
        className="ml-12 mt-2 italic text-pink-300"
      >
        I want to delete my account
      </button>
      <AiOutlineUserDelete className="absolute left-7 top-7 text-lg text-pink-200" />
    </div>
    //TODO: show confirmation modal or a dialog
  );
}

export default DeleteAccount;
