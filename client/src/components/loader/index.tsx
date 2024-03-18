import { ThreeDots } from "react-loader-spinner";
import "./styles.css";

const Loader = () => {
  return (
    <ThreeDots
      visible={true}
      height="100"
      width="100"
      color="#45b1ff"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperClass="loader"
    />
  );
};

export default Loader;
