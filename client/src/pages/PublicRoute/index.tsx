import { Route } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";

const PublicRoute = ({ component: Component, exclude, ...rest }: any) => {
  console.log(Component);
  return (
    <>
      {!exclude?.includes("header") && <Header />}
      <Component {...rest} />
      {!exclude?.includes("footer") && <Footer />}
    </>
  );
};

export default PublicRoute;
