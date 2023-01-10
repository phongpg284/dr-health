import { Route } from "react-router-dom";
import { Footer } from "components/Footer";
// import Header from "components/Header";

const Main = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {/* <Header /> */}
          <Component {...props} />
          <Footer />
        </>
      )}
    />
  );
};

export default Main;
