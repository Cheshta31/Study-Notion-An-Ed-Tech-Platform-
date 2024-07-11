import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";
import { setUser } from "../../slices/profileSlice";
const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating DP...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) throw new Error(response.data.message);
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export async function updateProfile(token, formData) {
  let result = [];
  const toastId = toast.loading("Updating Profile...");
  try {
    const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) throw new Error(response.data.message);
    // console.log(response.data.profileDetails);
    if (response.data.profileDetails);
    // result = response.data.profileDetails;
    toast.success("Profile Updated Success");
  } catch (error) {
    console.error("UPDATE_PROFILE_API API ERROR............", error.message);
    toast.error("Error in updating profile");
  }
  toast.dismiss(toastId);
  return result;
}

export async function ChangePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) throw new Error(response.data.message);
    toast.success("Password Changed Successfully");
  } catch (error) {
    console.error("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Password Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.error("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
    }
    toast.dismiss(toastId);
  };
}
