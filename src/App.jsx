import { Navbar, Footer, MainContent, Awning } from "./components";
import { IsRegContextProvider, UserContextProvider } from "./context";

const App = () => {
	return (
		<div className="md:pt-56 pt-36 w-full flex flex-col items-center bg-main lg:bg-background bg-mobBackground">
			<UserContextProvider>
				<IsRegContextProvider>
					<Awning />
					<Navbar />
					<MainContent />
					<Footer />
				</IsRegContextProvider>
			</UserContextProvider>
		</div>
	);
};

export default App;
