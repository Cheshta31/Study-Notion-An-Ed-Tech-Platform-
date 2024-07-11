import React from "react";
import { BiPhone } from "react-icons/bi";
import { LuGlobe2 } from "react-icons/lu";
import { IoMdChatboxes } from "react-icons/io";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
import Footer from "../components/common/Footer";

function ContactUs() {
  return (
    <div className="bg-richBlack-900">
      <div className="mx-auto w-11/12 max-w-maxContent items-start justify-between gap-10 py-9 lg:flex">
        <div className="flex-shrink space-y-10 rounded-xl bg-richBlack-800 p-9">
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-richBlack-5">
              <IoMdChatboxes /> Chat on us
            </h2>
            <p className="font-medium text-richBlack-200">
              Our friendly team is here to help.
            </p>
            <a
              className="font-medium text-richBlack-200"
              href="mailto: info@studynotion.com"
            >
              info@studynotion.com
            </a>
          </div>
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-richBlack-5">
              <LuGlobe2 /> Visit us
            </h2>
            <p className="font-medium text-richBlack-200">
              Come and say hello at our office HQ.
            </p>
            <address className="font-medium text-richBlack-200">
              Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
              Bangalore-560016
            </address>
          </div>
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-richBlack-5">
              <BiPhone />
              Call us
            </h2>
            <p className="font-medium text-richBlack-200">
              Mon - Fri From 8am to 5pm
            </p>
            <a
              className="font-medium text-richBlack-200"
              href="tel:123-456-7890"
            >
              123-456-7890
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[800px] flex-shrink flex-grow rounded-xl border border-richBlack-600 p-12 text-center lg:mt-0 lg:w-11/12">
          <h1 className="text-4xl font-semibold text-richBlack-5">
            Got a Idea? We’ve got the skills. Let’s team up
          </h1>
          <p className="mt-3 text-richBlack-300">
            Tall us more about yourself and what you’re got in mind.
          </p>
          <ContactUsForm />
        </div>
      </div>
      {/*TODO: <ReviewsCarousel > from home page */}
      <Footer />
    </div>
  );
}

export default ContactUs;
