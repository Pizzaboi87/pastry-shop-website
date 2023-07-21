import { Navbar, Footer, MainContent, Awning } from "./components";
import { IsRegContextProvider, UserContextProvider } from "./context";

const App = () => {
  return (
    <div className="w-full flex flex-col items-center bg-main lg:bg-background bg-mobBackground overflow-x-hidden">
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
