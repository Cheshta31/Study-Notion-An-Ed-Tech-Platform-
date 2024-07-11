import React from "react";
import AboutUs1 from "../assets/Images/aboutus1.webp";
import AboutUs2 from "../assets/Images/aboutus2.webp";
import AboutUs3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/foundingStory.png";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewCarousel from "../components/common/ReviewCarousel";

function About() {
  return (
    <div className="bg-richBlack-900">
      {/* section 1 */}
      <section className="bg-AboutBackground">
        <div className="mx-auto grid w-11/12 max-w-maxContent grid-cols-3 justify-items-center gap-x-2 py-[5.6rem] text-center md:gap-x-6">
          <h1 className="font-md col-span-3 text-center text-richBlack-200">
            About Us
          </h1>
          <header className="col-span-3 mt-12 max-w-[50rem] text-3xl font-semibold text-richBlack-5 md:text-4xl">
            Driving Innovation in Online Education for a{" "}
            <span className="bg-gradient-to-t from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
              Brighter Future
            </span>
          </header>
          <p className="col-span-3 mb-[3.2rem] mt-4 max-w-[50rem] font-medium text-richBlack-300">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
          <img width={311} src={AboutUs1} />
          <img width={311} src={AboutUs2} />
          <img width={311} src={AboutUs3} />
          <h2 className="col-span-3 mt-[5.6rem] text-2xl font-semibold text-richBlack-100 md:text-4xl">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform{" "}
            <span className="bg-gradient-to-t from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
              combines technology
            </span>
            ,{" "}
            <span className="bg-gradient-to-t from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
              expertise
            </span>
            , and community to create an{" "}
            <span className="bg-gradient-to-t from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent">
              unparalleled educational experience.
            </span>
          </h2>
        </div>
      </section>
      {/* section 2 */}
      <section className="border-t border-t-richBlack-600">
        <div className="mx-auto grid w-11/12 max-w-maxContent justify-items-center gap-x-20 gap-y-20 py-[5.6rem] md:grid-cols-2 md:gap-20 md:gap-y-44">
          <div>
            <h3 className="mb-6 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              Our Fonding Story
            </h3>
            <p className="font-medium text-richBlack-300">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="mt-4 font-medium text-richBlack-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <img src={FoundingStory} alt="" />
          <div>
            <h3 className="mb-6 bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              Our Vision
            </h3>
            <p className="font-medium text-richBlack-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div>
            <h3 className="mb-6 bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-3xl font-semibold text-transparent md:text-4xl">
              Our Mission
            </h3>
            <p className="font-medium text-richBlack-300">
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>
      {/* section 3 */}
      <section className="bg-richBlack-800">
        <Stats />
      </section>
      {/* section 4 */}
      <section>
        <LearningGrid />
        <ContactFormSection />
      </section>
      {/* Reviews form */}
      <section>
        <ReviewCarousel />
      </section>
      <Footer />
    </div>
  );
}

export default About;
