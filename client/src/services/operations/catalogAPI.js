import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData, ratingsEndpoints } from "../apis";
export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const res = await apiConnector(
      "GET",
      catalogData.CATALOGPAGEDATA_API + `/${categoryId}`
    );
    if (res.status !== 200)
      throw new Error("could not fetch category page data");
    result = res?.data?.data;
  } catch (error) {
    console.error("CATALOGPAGEDATA API ERROR............", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchAllReviews = async () => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      ratingsEndpoints.REVIEWS_DETAILS_API
    );
    // console.log("Logging response form REVIEWS_DETAILS_API", response);
    if (response.status !== 200) throw new Error(response.data.message);
    result = response.data?.data;
  } catch (error) {
    console.error("REVIEWS_DETAILS_API ERROR........", error);
  }
  return result;
};
