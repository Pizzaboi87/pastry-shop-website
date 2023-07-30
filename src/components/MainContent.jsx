import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
	Admin,
	Authentication,
	Blog,
	BlogPostPage,
	BlogTagPage,
	CoursePage,
	Courses,
	Home,
	NotFound,
	OurStory,
	Recipes,
	Reviews,
	Shop,
} from "../pages/main-pages";
import {
	BlogAll,
	BlogCommentPage,
	BlogComments,
	BlogNew,
	BlogPostEdit,
	ShopAll,
	ShopNew,
	ShopOrders,
	UsersAll,
} from "../pages/admin-pages";
import {
	Favourites,
	MyAccount,
	MyCart,
	PreviousOrders,
	Settings,
} from "../pages/user-pages";

const MainContent = () => {
	const location = useLocation();

	return (
		<div className="flex flex-col items-center w-full">
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Navigate to="/home" />} />

					<Route path="admin" element={<Admin />}>
						<Route path="" element={<UsersAll />} />
						<Route path="blog/all" element={<BlogAll />} />
						<Route path="blog/all/:id" element={<BlogPostEdit />} />
						<Route path="blog/new-article" element={<BlogNew />} />
						<Route path="blog/comments" element={<BlogComments />} />
						<Route
							path="blog/comments/:commentID"
							element={<BlogCommentPage />}
						/>
						<Route path="shop/products" element={<ShopAll />} />
						<Route path="shop/new-product" element={<ShopNew />} />
						<Route path="shop/orders" element={<ShopOrders />} />
					</Route>

					<Route path="/myfavourites" element={<Favourites />} />
					<Route path="/myaccount" element={<MyAccount />} />
					<Route path="/mycart" element={<MyCart />} />
					<Route path="/myorders" element={<PreviousOrders />} />
					<Route path="/mysettings" element={<Settings />} />

					<Route path="/home" element={<Home />} />
					<Route path="/recipes" element={<Recipes />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/reviews" element={<Reviews />} />
					<Route path="/ourstory" element={<OurStory />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/category/:tag" element={<BlogTagPage />} />
					<Route path="/blog/post/:id" element={<BlogPostPage />} />
					<Route path="/auth" element={<Authentication />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/courses/:id" element={<CoursePage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AnimatePresence>
		</div>
	);
};

export default MainContent;
