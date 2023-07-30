import { CommentsContextProvider } from "../context";

const CommentsWrapper = (Component) =>
  function HOC() {
    return (
      <CommentsContextProvider>
        <Component />
      </CommentsContextProvider>
    );
  };

export default CommentsWrapper;
