import {
	Navbar,
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
} from './components';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
	return (
		<div className="flex flex-col items-center bg-primary w-full">
			<Navbar />
			<Routes>
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
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default App;
