import { Navbar, Footer, MainContent } from './components';

const App = () => {
	return (
		<div className="flex flex-col items-center bg-primary w-full overflow-x-hidden">
			<Navbar />
			<MainContent />
			<Footer />
		</div>
	);
};

export default App;
