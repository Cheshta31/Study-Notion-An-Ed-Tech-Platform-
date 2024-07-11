import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import TimeLineImage from "../assets/Images/timelineimage.png";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import Logo1 from "../assets/TimeLineLogo/logo1.svg";
import Logo2 from "../assets/TimeLineLogo/logo2.svg";
import Logo3 from "../assets/TimeLineLogo/logo3.svg";
import Logo4 from "../assets/TimeLineLogo/logo4.svg";
import Know_your_progress from "../assets/Images/know_your_progress.svg";
import Compare_with_others from "../assets/Images/compare_with_others.svg";
import Plan_your_lessons from "../assets/Images/plan_your_lessons.svg";
import Instructor from "../assets/Images/instructor.png";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewCarousel from "../components/common/ReviewCarousel";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/profileSlice";
import { getUserData } from "../services/operations/profileAPI";

function Home() {
  const dispatch = useDispatch();
  // Async initialization function to fetch user details
  const initializeUserDetails = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const userDetails = await getUserData(token);
      dispatch(setUser(userDetails));
    }
  };
  useEffect(() => {
    initializeUserDetails();
  }, []);
  return (
    <div className="font-inter">
      {/* section 1 */}
      <section className="bg-richBlack-900">
        <div className="mx-auto w-11/12 max-w-maxContent py-8">
          <Link
            to="/signup"
            className="col-span-2 flex w-fit items-center justify-center gap-2 rounded-full bg-richBlack-800 p-2 px-4 text-center text-richBlack-200 shadow-buttonShadow md:mx-auto"
          >
            <p>Become an Instructor</p> <FaArrowRight />
          </Link>
          <h1 className="mt-9 text-3xl font-semibold text-richBlack-5 md:text-center">
            Empower Your Future With <HighlightText text={"Coding Skills"} />
          </h1>
          <p className="mt-4 font-medium leading-6 text-richBlack-300 md:text-center">
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access
            to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-6">
            <CTAButton linkTo={"/signup"} active={true}>
              Learn More
            </CTAButton>
            <CTAButton linkTo={"/login"} active={false}>
              Book a Demo
            </CTAButton>
          </div>

          <div className="mx-auto mt-9 w-fit shadow-glowingShadow ">
            <video
              muted
              loop
              autoPlay
              className="shadow-[8px_8px_0px_0px] shadow-pure-greys-5 md:shadow-[16px_16px_0px_0px] md:shadow-pure-greys-5 lg:h-[30rem]"
            >
              <source src="https://res.cloudinary.com/dwkufeilh/video/upload/v1689779621/Codehelp/production_id_4841404_540p_ps1u8m.mp4" />
            </video>
          </div>

          <div className="mt-16 grid justify-items-stretch gap-16 md:grid-cols-2 lg:gap-32">
            {/* unlock your coding potential */}
            <div className="flex-1">
              <h2 className="col-span-2 text-3xl font-semibold text-richBlack-5">
                Unlock your <HighlightText text={"coding potential"} /> with our online courses.
              </h2>
              <p className="col-span-2 mb-8 mt-3 font-medium leading-6 text-richBlack-300">
                Our courses are designed and taught by industry experts who have years of experience in coding and are
                passionate about sharing their knowledge with you.
              </p>
              <CTAButton className={"mr-3"} active={true}>
                Try it yourself <FaArrowRight />
              </CTAButton>
              <CTAButton active={false}>Book a Demo</CTAButton>
            </div>
            <div>
              <CodeBlock />
            </div>
            {/* start coding in seconds */}
            <div className="flex-1 md:order-2">
              <h2 className="col-span-2 text-3xl font-semibold text-richBlack-5">
                Start <HighlightText text={"coding in seconds"} />
              </h2>
              <p className="col-span-2 mb-8 mt-3 font-medium leading-6 text-richBlack-300">
                Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your
                very first lesson.
              </p>
              <CTAButton className={"mr-3"} active={true}>
                Continue Lesson <FaArrowRight />
              </CTAButton>
              <CTAButton active={false}>Learn More</CTAButton>
            </div>
            <div>
              <CodeBlock />
            </div>
          </div>
        </div>
      </section>

      {/* section 2 unlock the power of code */}
      <section className="relative z-0 bg-richBlack-900">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="pt-8 md:text-center">
            <h2 className="text-3xl font-semibold text-richBlack-5">
              Unlock the <HighlightText text={"Power of Code"} />
            </h2>
            <p className="mt-4 leading-6 text-richBlack-300">Learn to build anything you can imagine</p>
          </div>
          <ExploreMore />
          <div className="mt-[3.7rem] flex flex-wrap gap-x-2 pb-32 lg:justify-center">
            <CTAButton active={true}>
              Explore Full Catalog <FaArrowRight />
            </CTAButton>
            <CTAButton active={false}>Learn More</CTAButton>
          </div>
        </div>

        {/*for textured background*/}
        <div className="absolute bottom-0 left-0 right-0 -z-20 h-80 bg-pure-greys-5"></div>
        <div className="absolute bottom-0 left-0 right-0 -z-10  h-80 bg-bgHome"></div>
      </section>

      {/* section 3 (get the skills you need) */}
      <section className="bg-pure-greys-5 pt-8">
        <div className="mx-auto w-11/12 max-w-maxContent grid-cols-2 place-items-start lg:grid">
          <h2 className="row-span-2 text-3xl font-semibold text-richBlack-900">
            Get the skills you need for a <HighlightText text={"job that is in demand."} />
          </h2>
          <p className="mb-9 mt-3 text-richBlack-700">
            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more
            than professional skills.
          </p>
          <CTAButton active={true} bold={true}>
            Learn More
          </CTAButton>
        </div>

        <div className="mx-auto mt-12 w-11/12 max-w-maxContent items-center justify-between gap-20 lg:flex">
          <div className="flex gap-x-6">
            <div className="relative z-10 space-y-10">
              <img src={Logo1} className="z-30 aspect-square w-[52px] rounded-full bg-white p-4 shadow-md" />
              <img src={Logo2} className="z-30 w-[52px] rounded-full bg-white p-4 shadow-md" />
              <img src={Logo3} className="z-30 w-[52px] rounded-full bg-white p-4 shadow-md" />
              <img src={Logo4} className="z-30 w-[52px] rounded-full bg-white p-4 shadow-md" />
              <div className="absolute bottom-0 right-1/2 top-0 -z-10 border border-dashed border-l-richBlack-300 border-r-transparent"></div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-richBlack-800">Leadership</h3>
                <p className="text-sm text-richBlack-700">Fully committed to the success company</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-richBlack-800">Responsibility</h3>
                <p className="text-sm text-richBlack-700">Students will always be our top priority</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-richBlack-800">Flexibility</h3>
                <p className="text-sm text-richBlack-700">The ability to switch is an important skills</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-richBlack-800">Solve the problem</h3>
                <p className="text-sm text-richBlack-700">Code your way to a solution</p>
              </div>
            </div>
          </div>
          <div className="relative mt-12 h-full lg:mt-0 lg:flex">
            <img
              className="h-[34rem] object-cover object-right-bottom shadow-glowingShadow"
              src={TimeLineImage}
              alt=""
            />
            {/* green box */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-20 bg-caribbeangreen-700 p-10 lg:max-w-min lg:flex-row">
              <div className="flex items-center gap-6 text-sm text-caribbeangreen-300">
                <span className="text-4xl font-bold text-white">50</span>YEARS OF EXPERIENCES
              </div>
              <div className="flex items-center gap-6 text-sm text-caribbeangreen-300">
                <span className="text-4xl font-bold text-white">250</span>TYPES OF COURSES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 your swiss knife */}
      <section className="bg-pure-greys-5">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center py-16">
          <h2 className="text-3xl font-semibold text-richBlack-900">
            Your swiss knife for <HighlightText text={"learning any language"} />
          </h2>
          <p className="mt-3 text-center text-richBlack-700">
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress
            tracking, custom schedule and more.
          </p>
          {/* card images */}
          <div className="mt-14 flex flex-col items-center lg:mb-14 lg:flex-row">
            <img
              className="relative -bottom-12 w-[19rem] lg:-right-24 lg:bottom-0"
              src={Know_your_progress}
              alt="know you lessons"
            />
            <img className="w-[21.3rem]" src={Compare_with_others} alt="compare with others" />
            <img
              className="relative -top-20 w-[21.3rem] lg:-left-28 lg:top-0"
              src={Plan_your_lessons}
              alt="plan your lessons"
            />
          </div>

          <CTAButton active={true} bold={true}>
            Learn More
          </CTAButton>
        </div>
      </section>

      {/* section 5 become an instructor */}
      <section className="bg-richBlack-900 py-8">
        <div className="mx-auto w-11/12 max-w-maxContent flex-row-reverse items-center gap-24 md:flex">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-richBlack-5">
              Become an <HighlightText text={"instructor"} />
            </h2>
            <p className="mt-3 text-richBlack-300">
              Instructors from around the world teach millions of students on StudyNotion. We provide the tools and
              skills to teach what you love.
            </p>
            <CTAButton className="hidden md:inline-flex" active={true}>
              Start Teaching Today
            </CTAButton>
          </div>
          <img
            className="mb-14 mt-8 flex-1 object-cover md:h-[545px] md:shadow-[-16px_-16px_0px_0px] md:shadow-pure-greys-5"
            src={Instructor}
            alt="Instructor"
          />
          <CTAButton className="md:hidden" active={true}>
            Start Teaching Today
          </CTAButton>
        </div>
      </section>

      {/* section 6 reviews from other learners */}
      <section className="bg-richBlack-900 py-6">
        <div className="mx-auto w-11/12 max-w-maxContent p-20">
          <h2 className="text-3xl font-semibold text-richBlack-5">Reviews from other learners</h2>
          {/* review cards */}
          <ReviewCarousel />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
