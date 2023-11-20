import { QueryClient, QueryClientProvider } from "react-query";
import { Navbar, Footer, MainContent, Awning } from "./components";
import {
  BlogContextProvider,
  CartContextProvider,
  ProductContextProvider,
  UserContextProvider,
} from "./context";
import { appStyle } from "./styles";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className={appStyle.container}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Awning />
          <Navbar />
          <BlogContextProvider>
            <ProductContextProvider>
              <CartContextProvider>
                <MainContent />
              </CartContextProvider>
            </ProductContextProvider>
          </BlogContextProvider>
          <Footer />
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
