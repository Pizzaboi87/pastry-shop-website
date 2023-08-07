import { Navbar, Footer, MainContent, Awning } from "./components";
import {
  AdminContextProvider,
  BlogContextProvider,
  CommentsContextProvider,
  CurrencyContextProvider,
  IsRegContextProvider,
  LanguageContextProvider,
  ThemeContextProvider,
  UserContextProvider,
} from "./context";

const App = () => {
  return (
    <div className="md:pt-56 pt-36 w-full flex flex-col items-center bg-main lg:bg-background bg-mobBackground">
      <ThemeContextProvider>
        <LanguageContextProvider>
          <AdminContextProvider>
            <UserContextProvider>
              <IsRegContextProvider>
                <Awning />
                <Navbar />
                <BlogContextProvider>
                  <CommentsContextProvider>
                    <CurrencyContextProvider>
                      <MainContent />
                    </CurrencyContextProvider>
                  </CommentsContextProvider>
                </BlogContextProvider>
                <Footer />
              </IsRegContextProvider>
            </UserContextProvider>
          </AdminContextProvider>
        </LanguageContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

export default App;
