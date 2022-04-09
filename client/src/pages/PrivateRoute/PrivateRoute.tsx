import { Footer } from "components/Footer";
import Header from "components/Header";
import { Redirect, Route } from "react-router";
import { useAppSelector } from "../../app/store";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const account = useAppSelector((state) => state.account);
    return (
        <Route
            {...rest}
            render={({ ...props }) =>
                account.accessToken ? (
                    <>
                        <div
                            className="bg_wrapper"
                            // style={{ backgroundImage: "linear-gradient(to top right, #f1fcfd, #5ECFFF)", minHeight: "calc(100vh - 160px)", paddingBottom: "40px" }}
                        >
                            <Header />
                            <Component {...props} />
                        </div>
                        <Footer />
                    </>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
