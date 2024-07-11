import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

import { profileEndpoints } from "../apis";
const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;
export async function getUserData(token) {
  try {
    const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.user) {
      toast.success("Welcome");
      return response.data.user;
    }
    return null;
  } catch (error) {
    toast.error("Failed getting user data");
    console.error(error.message);
    return null;
  }
}
export async function getEnrolledCourses(token) {
  const toastId = toast.loading("Loading courses...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` }
    );
    // result = response
    if (!(response.status = 200)) throw new Error(response.data.message);
    result = response.data?.data;
  } catch (error) {
    toast.error("Error getting courses");
    console.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
}
//instructor dashboard data
export async function getInstructorData(token) {
  const toastId = toast.loading("Loading Dashboard...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    // result = response
    if (!(response.status = 200)) throw new Error(response.data.message);
    result = response.data?.data;
  } catch (error) {
    toast.error("Error getting data");
    console.error("GET INSTRUCTOR API ERROR......", error.message);
  }
  toast.dismiss(toastId);
  return result;
}
