import { Navbar, Footer, MainContent, Awning } from "./components";

const App = () => {
	return (
		<div className="w-[100vw] flex flex-col items-center bg-main bg-background overflow-x-hidden">
			<Awning />
			<Navbar />
			<MainContent />
			<Footer />
		</div>
	);
};

export default App;
