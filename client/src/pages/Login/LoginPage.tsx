import { useAppSelector } from "app/store";
import { Navigate } from "react-router-dom";
import Login from "../../components/Login";
import "./index.scss";
const LoginPage = () => {
  const account = useAppSelector((state) => state.account);
  return (
    <>
      {!account.accessToken && <Login />}
      {account.accessToken && <Navigate to="/" />}
    </>
  );
};

export default LoginPage;
