import { Navbar, Footer, MainContent, Awning } from "./components";
import {
  AdminContextProvider,
  BlogContextProvider,
  CommentsContextProvider,
  IsRegContextProvider,
  UserContextProvider,
} from "./context";

const App = () => {
  return (
    <div className="md:pt-56 pt-36 w-full flex flex-col items-center bg-main lg:bg-background bg-mobBackground">
      <AdminContextProvider>
        <UserContextProvider>
          <IsRegContextProvider>
            <Awning />
            <Navbar />
            <BlogContextProvider>
              <CommentsContextProvider>
                <MainContent />
              </CommentsContextProvider>
            </BlogContextProvider>
            <Footer />
          </IsRegContextProvider>
        </UserContextProvider>
      </AdminContextProvider>
    </div>
  );
};

export default App;
