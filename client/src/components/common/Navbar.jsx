import React, { useEffect, useState } from "react";
import { Link, Outlet, matchPath, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo/logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { HiOutlineChevronDown, HiLogout } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { BiCaretDown } from "react-icons/bi";
import { logout } from "../../services/operations/authAPI";

function Navbar() {
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    const fetchSubLinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(result.data.data);
      } catch (error) {
        console.error("Could not fetch the category list");
        console.error(error);
      }
    };
    fetchSubLinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => matchPath({ path: route }, location.pathname);
  return (
    <>
      <nav className="flex items-center justify-between border-b-[1px] border-b-richBlack-700 bg-richBlack-800 px-5 py-3 pl-12 text-richBlack-25">
        <Link to={"/"}>
          <img className="h-6 md:h-8" src={Logo} alt="home" />
        </Link>
        <ul className="hidden items-center gap-3 md:flex">
          {NavbarLinks.map((link, idx) =>
            link.title === "Catalog" ? (
              <li key={idx} className="group relative flex cursor-pointer items-center gap-1">
                {link.title} <HiOutlineChevronDown />
                <div className="invisible absolute -left-8 top-10 z-10 flex w-52 flex-col gap-1 rounded-xl bg-white p-2 text-richBlack-700 opacity-0 transition-[transform_opacity] group-hover:visible group-hover:-translate-y-4 group-hover:opacity-100">
                  {subLinks.map((category, idx) => (
                    <Link
                      className="rounded-xl p-3 hover:bg-richBlack-25"
                      to={`catalog/${category.name
                        .split(" ")
                        .map((s) => s.toLowerCase())
                        .join("-")}`}
                      key={idx}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={idx}>
                <Link className={`cursor-pointer ${matchRoute(link?.path) ? "text-yellow-25" : ""}`} to={link.path}>
                  {link.title}
                </Link>
              </li>
            )
          )}
        </ul>
        {/* login signup/ dashboard */}
        <div className="flex items-center gap-4 text-richBlack-200">
          {/* cart */}
          {user && user?.accountType != "instructor" && (
            <Link to={"dashboard/cart"} className="relative">
              <BsFillCartFill />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 aspect-square rounded-lg bg-yellow-100 px-1 text-xs text-richBlack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {/* profile picture or login signup */}
          {!user ? (
            <>
              <Link className="hidden rounded-lg px-4 py-1 ring-2 ring-blue-500 sm:block" to={"/login"}>
                Log in
              </Link>
              <Link className="hidden rounded-lg px-4 py-1 ring-2 ring-blue-500 sm:block" to={"/signup"}>
                Sign up
              </Link>
              {/* //for mobile width */}
              <Link className="rounded-lg p-2 ring-2 ring-blue-500 sm:hidden" to={"/login"}>
                <BiLogIn />
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

function ProfileDropDown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div onClick={() => setShowLinks((prev) => !prev)} className="relative flex cursor-pointer items-center gap-1">
      <img className="aspect-square rounded-full object-cover" src={user?.image} width={30} />
      <BiCaretDown className="hidden sm:inline" />
      <div
        className={`absolute right-2 top-8 z-10 space-y-1 divide-y divide-richBlack-500 rounded bg-richBlack-700 p-2 text-xs text-richBlack-200 ${
          showLinks ? "block" : "hidden"
        }`}
      >
        <button className="hover:text-richBlack-25" onClick={() => navigate("dashboard/my-profile")}>
          Dashboard
        </button>
        <button onClick={() => dispatch(logout(navigate))} className="flex items-center gap-1 hover:text-richBlack-25">
          <HiLogout /> Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
