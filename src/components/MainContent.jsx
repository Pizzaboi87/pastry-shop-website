import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ScrollToTop } from ".";
import {
	Authentication,
	Blog,
	BlogPostPage,
	CoursePage,
	Courses,
	Home,
	NotFound,
	OurStory,
	Recipes,
	Reviews,
	Shop,
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
			className={`${transitionStage} flex flex-col items-center w-full`}
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
				<Route path="/reviews" element={<Reviews />} />
				<Route path="/ourstory" element={<OurStory />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/blog/:id" element={<BlogPostPage />} />
				<Route path="/auth" element={<Authentication />} />
				<Route path="/shop" element={<Shop />} />
				<Route path="/courses/:id" element={<CoursePage />} />
				<Route path="*" element={<NotFound />} />
				courses
			</Routes>
		</div>
	);
};

export default MainContent;
