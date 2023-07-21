import { Navbar, Footer, MainContent, Awning } from "./components";
import { IsRegContextProvider } from "./context";

const App = () => {
  return (
    <div className="w-full flex flex-col items-center bg-main lg:bg-background bg-mobBackground overflow-x-hidden">
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
