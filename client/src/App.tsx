import "./App.css";
import { Spin } from "antd";
import { createContext, useEffect, useRef, useState, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./app/store";
import PrivateRoute from "pages/PrivateRoute";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import { Home } from "components/Home";
import * as GreetingBotStore from "./app/GreetingBot";
import io from "socket.io-client";
import PublicRoute from "pages/PublicRoute";
import Product from "pages/Product";
import Booking from "pages/Booking";
import DidBook from "pages/DidBook/DidBook";

const News = lazy(() => import("pages/News"));
const Addition = lazy(() => import("pages/Addition"));
const HospitalMap = lazy(() => import("pages/HospitalMap"));
const NotificationsPage = lazy(() => import("pages/Notifications"));
const PatientCardsList = lazy(() => import("components/PatientRecord/PatientCardsList"));
const PatientRecord = lazy(() => import("components/PatientRecord/PatientRecord"));
const PatientList = lazy(() => import("components/PatientRecord/PatientList"));
const DoctorRecord = lazy(() => import("components/DoctorRecord"));
const CalendarPage = lazy(() => import("pages/Calendar/CalendarPage"));
const ProfilePage = lazy(() => import("pages/Profile/ProfilePage"));
const ThresholdPage = lazy(() => import("pages/Threshold/ThresholdPage"));
const FirstAid = lazy(() => import("pages/FirstAid"));
// const FirstAid2 = lazy(() => import("pages/FirstAid2"));
const StrokePoint = lazy(() => import("pages/StrokePoint"));
const UploadBlood = lazy(() => import("pages/UploadBlood"));
const ProjectionPhoto = lazy(() => import("pages/ProjectionPhoto"));
const CartPage = lazy(() => import("pages/Cart/CartPage"));

export const FooterContext = createContext<any>(null);
export const SocketContext = createContext<any>(null);

function App() {
  const dispatch = useAppDispatch();
  const footerRef = useRef<any>();

  const [hasRunEffect, setRunEffect] = useState(false);
  useEffect(() => {
    setRunEffect(true);
    dispatch(GreetingBotStore.reset());
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<Spin />}>
        <FooterContext.Provider value={footerRef}>{hasRunEffect && <MyRouter />}</FooterContext.Provider>
      </Suspense>
    </div>
  );
}

const socket = io("localhost:4000");
function MyRouter(): JSX.Element {
  const { role } = useAppSelector((state) => state.account);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connect");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnect");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/news" element={<PublicRoute component={News} />} />
          <Route path="/ho-tro" element={<PublicRoute component={Addition} />} />
          <Route path="/co-so-dieu-tri" element={<PublicRoute component={HospitalMap} />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<PublicRoute component={Home} />} />

          <Route path="/phuc-hoi" element={<PublicRoute component={FirstAid} />} />
          <Route path="/product" element={<PublicRoute component={Product} />} />
          {/* <Main exact path="/so-cuu" component={FirstAid2} /> */}

          {role === "doctor" && <Route path="/didbook" element={<PrivateRoute component={DidBook} />} />}
          {role === "patient" && <Route path="/booking" element={<PrivateRoute component={Booking} />} />}
          <Route path="/cart" element={<PrivateRoute component={CartPage} />} />
          <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
          <Route path="/calendar" element={<PrivateRoute component={CalendarPage} />} />
          <Route path="/notifications" element={<PrivateRoute component={NotificationsPage} />} />
          <Route path="/threshold/:id" element={<PrivateRoute component={ThresholdPage} />} />
          {role === "doctor" && (
            <>
              <Route path="/patients" element={<PrivateRoute component={PatientCardsList} />} />
              <Route path="/patients/:id" element={<PrivateRoute component={PatientList} />} />
              <Route path="/record" element={<PrivateRoute component={DoctorRecord} />} />
              <Route path="/upload/stroke-point" element={<PrivateRoute component={StrokePoint} />} />
              <Route path="/upload/blood" element={<PrivateRoute component={UploadBlood} />} />
              <Route path="/upload/projection-photo" element={<PrivateRoute component={ProjectionPhoto} />} />
            </>
          )}
          {role === "patient" && <Route path="/record" element={<PrivateRoute component={PatientRecord} />} />}
          {!role && <Route path="/record" element={<PrivateRoute component={PatientRecord} />} />}
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
