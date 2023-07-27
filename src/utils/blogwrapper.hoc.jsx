import { BlogContextProvider } from "../context";

const BlogWrapper = (Component) =>
  function HOC() {
    return (
      <BlogContextProvider>
        <Component />
      </BlogContextProvider>
    );
  };

export default BlogWrapper;
