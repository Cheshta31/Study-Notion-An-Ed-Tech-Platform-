import React from "react";
import { Link } from "react-router-dom";
import { FooterLink2 } from "../../data/footer-links";
import { memo } from "react";
// Images
import Logo from "../../assets/Logo/logo-Full-Light.png";
// Icons
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { TbBrandGoogle } from "react-icons/tb";

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

function Footer() {
  return (
    <footer className="bg-richBlack-800">
      <div className="mx-auto grid w-11/12 max-w-screen-xl grid-cols-2 gap-5 py-8 text-richBlack-400 md:py-12">
        {/* left */}
        <div className="col-span-2 grid grid-cols-2 justify-items-start gap-3 border-richBlack-700 lg:col-span-1 lg:grid-cols-3 lg:border-r-[1px]">
          {/* studyNotion */}
          <div className="row-span-2">
            <img src={Logo} alt="studyNotion logo" />
            <h3 className="my-3 font-semibold text-richBlack-100">Company</h3>
            <div className="grid grid-cols-4 gap-x-1 gap-y-2">
              {["About", "Carriers", "Affiliates"].map((item, idx) => (
                <Link
                  key={idx}
                  className="col-span-4 cursor-pointer text-sm font-normal"
                  to={item.toLowerCase()}
                >
                  {item}
                </Link>
              ))}
              <FaFacebook />
              <TbBrandGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
          {/* resources */}
          <div>
            <h4 className="mb-3 font-semibold text-richBlack-100">Resources</h4>
            {Resources.map((item, idx) => (
              <Link
                key={idx}
                className="my-2 block cursor-pointer text-sm font-normal"
                to={item.replace(" ", "-").toLowerCase()}
              >
                {item}
              </Link>
            ))}
          </div>
          {/* support */}
          <div className="lg:order-1">
            <h4 className="mb-3 font-semibold text-richBlack-100">Support</h4>
            <Link className="my-2 text-sm font-normal" to={"/help-center"}>
              Help Center
            </Link>
          </div>
          {/* plans */}
          <div>
            <h4 className="mb-3 font-semibold text-richBlack-100">Plans</h4>
            {Plans.map((item, idx) => (
              <Link
                key={idx}
                className="my-2 block cursor-pointer text-sm font-normal"
                to={item.replace(" ", "-").toLowerCase()}
              >
                {item}
              </Link>
            ))}
          </div>
          {/* community */}
          <div>
            <h4 className="mb-3 font-semibold text-richBlack-100">Community</h4>
            {Community.map((item, idx) => (
              <Link
                key={idx}
                className="my-2 block cursor-pointer text-sm font-normal"
                to={item.replace(" ", "-").toLowerCase()}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        {/* right */}
        <div className="col-span-2 flex flex-wrap gap-3 lg:col-span-1 lg:justify-evenly">
          {FooterLink2.map((item, idx) => (
            <div className="flex-shrink-0 flex-grow lg:flex-grow-0" key={idx}>
              <h4 className="mb-3 font-semibold text-richBlack-100">
                {item.title}
              </h4>
              {item.links.map((linkObj, index) => (
                <Link
                  key={index}
                  to={linkObj.link}
                  className="my-2 block cursor-pointer text-sm font-normal"
                >
                  {linkObj.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
        {/* sub footer */}
        <div className="col-span-2 flex flex-col items-center justify-between gap-3 border-t-[1px] border-richBlack-700 pt-8 md:flex-row">
          <div className="space-x-4">
            {BottomFooter.map((item, idx) => (
              <Link
                key={idx}
                className="cursor-pointer text-sm font-normal"
                to={item.replace(" ", "-").toLowerCase()}
              >
                {item}
              </Link>
            ))}
          </div>
          <p className="text-sm font-normal">Made with ❤️ Nishant</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
