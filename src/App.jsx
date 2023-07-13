import { Navbar, Footer, MainContent, Awning } from './components';

const App = () => {
	return (
		<div className="flex flex-col items-center bg-primary w-full overflow-x-hidden">
			<Awning />
			<Navbar />
			<MainContent />
			<Footer />
		</div>
	);
};

export default App;
