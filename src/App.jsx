import { Navbar, Footer, MainContent, Awning } from "./components";
import {
  BlogContextProvider,
  IsRegContextProvider,
  UserContextProvider,
} from "./context";

const App = () => {
  return (
    <div className="w-full flex flex-col items-center bg-main lg:bg-background bg-mobBackground">
      <UserContextProvider>
        <IsRegContextProvider>
          <Awning />
          <Navbar />
          <BlogContextProvider>
            <MainContent />
          </BlogContextProvider>
          <Footer />
        </IsRegContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
