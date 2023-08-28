import { loading } from "../assets/";
import { loadingStyle } from "../styles";

const Loading = () => {
  return (
    <div className={loadingStyle.wrapper}>
      <img src={loading} alt="loading" className={loadingStyle.image} />
      <h1 className={loadingStyle.title}>loading...</h1>
    </div>
  );
};

export default Loading;
