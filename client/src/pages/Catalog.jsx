import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseCategories } from "../services/operations/courseAPI";
import { BiChevronLeft } from "react-icons/bi";
import { useState } from "react";
import { getCatalogPageData } from "../services/operations/catalogAPI";
import ReactStars from "react-stars";
import { SectionTab } from "../components/core/Catalog/SectionTab";
import CourseCard from "../components/core/Catalog/CourseCard";
import LoadSpinner from "../components/common/LoadSpinner";

function Catalog() {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getCategoryPageDetails = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      const { _id: categoryId } = categories.find(
        (cat) =>
          cat.name
            .split(" ")
            .map((s) => s.toLowerCase())
            .join("-") === catalogName
      );
      if (!categoryId) return;
      const res = await getCatalogPageData(categoryId);
      if (res) setCatalogPageData(res);
      setLoading(false);
    };
    getCategoryPageDetails();
  }, [catalogName]);
  // console.log(catalogPageData);
  if (loading)
    return (
      <div className="grid h-full min-h-screen w-full place-content-center bg-richBlack-900">
        <LoadSpinner />
      </div>
    );
  return (
    <div className="min-h-screen bg-richBlack-900 text-richBlack-5">
      <div className="bg-richBlack-800 ">
        <div className="mx-auto max-w-maxContent p-6">
          <h3
            onClick={() => navigate(-1)}
            className="flex items-center gap-x-2 text-sm text-richBlack-300"
          >
            Home / catalog /{" "}
            <span className="text-yellow-25">
              {catalogName.replace(/\b\w/g, (match) => match.toUpperCase())}
            </span>
          </h3>

          <h1 className="mt-3 text-3xl text-richBlack-5">
            {catalogPageData?.selectedCategory?.name}
          </h1>
          <p className="text-richBlack-200">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>
      {/* section 1 */}
      <div className="mx-auto max-w-maxContent p-6">
        <h4 className="text-3xl font-semibold">Course To Get You Started</h4>
        <SectionTab catalogPageData={catalogPageData} />
      </div>

      {/* section 2 */}
      <div className="mx-auto max-w-maxContent p-6">
        <h4 className="text-3xl font-semibold">Top Courses in {}</h4>
      </div>

      {/* section 3 */}
      <div className="mx-auto max-w-maxContent p-6">
        <h4 className="my-6 text-3xl font-semibold">Frequently Bought</h4>
        <div className="grid grid-cols-1 justify-items-center gap-10  lg:grid-cols-2 xl:justify-items-stretch">
          {catalogPageData?.topSellingCourses?.map((course) => (
            <CourseCard course={course} key={course._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
