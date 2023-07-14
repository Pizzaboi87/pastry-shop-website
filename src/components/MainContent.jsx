import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from ".";
import {
  Home,
  Recipes,
  Courses,
  Occassions,
  OurStory,
  Blog,
  Shop,
  NotFound,
  SignIn,
  SignUp,
  CoursePage,
} from "../pages";

const MainContent = () => {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeInPage");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOutPage");
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage} flex flex-col items-center w-full overflow-x-hidden`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOutPage") {
          setTransistionStage("fadeInPage");
          setDisplayLocation(location);
        }
      }}
    >
      <ScrollToTop />
      <Routes location={displayLocation}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/occassions" element={<Occassions />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="*" element={<NotFound />} />
        courses
      </Routes>
    </div>
  );
};

export default MainContent;
