import { QueryClient, QueryClientProvider } from "react-query";
import { Navbar, Footer, MainContent, Awning } from "./components";
import { BlogContextProvider, UserContextProvider, appStyle } from "./context";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className={appStyle.container}>
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
