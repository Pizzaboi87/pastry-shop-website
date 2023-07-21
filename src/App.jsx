import { Navbar, Footer, MainContent, Awning } from "./components";
import { IsRegContextProvider } from "./context";

const App = () => {
  return (
    <div className="w-full flex flex-col items-center bg-main bg-background overflow-x-hidden">
      <IsRegContextProvider>
        <Awning />
        <Navbar />
        <MainContent />
        <Footer />
      </IsRegContextProvider>
    </div>
  );
};

export default App;
