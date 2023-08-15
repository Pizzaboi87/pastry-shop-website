import { QueryClient, QueryClientProvider } from "react-query";
import { Navbar, Footer, MainContent, Awning } from "./components";
import { BlogContextProvider, UserContextProvider } from "./context";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="md:pt-56 pt-36 w-full flex flex-col items-center bg-main lg:bg-background bg-mobBackground">
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Awning />
          <Navbar />
          <BlogContextProvider>
            <MainContent />
          </BlogContextProvider>
          <Footer />
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
