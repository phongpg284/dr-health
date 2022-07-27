import "./App.css";
import { Spin } from "antd";
import { createContext, useEffect, useRef, useState, Suspense, lazy } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./app/store";
import PrivateRoute from "pages/PrivateRoute";
import Main from "pages/Main";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import { Home } from "components/Home";
import * as GreetingBotStore from "./app/GreetingBot";

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

export const FooterContext = createContext<any>(null);

function App() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.account);
  const [isAuth, setIsAuth] = useState(true);
  const [route, setRoute] = useState("/");
  const footerRef = useRef<any>();

  const [hasRunEffect, setRunEffect] = useState(false);
  useEffect(() => {
    setRunEffect(true);
    dispatch(GreetingBotStore.reset());
  }, []);
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [window.location.pathname]);

  useEffect(() => {
    if (accessToken) setIsAuth(true);
    else setIsAuth(false);
  }, [accessToken]);

  return (
    <div className="App">
      <Suspense fallback={<Spin />}>
        <FooterContext.Provider value={footerRef}>{hasRunEffect && <MyRouter />}</FooterContext.Provider>
      </Suspense>
    </div>
  );
}

function MyRouter() {
  const { role } = useAppSelector((state) => state.account);
  const [isAuth, setIsAuth] = useState(true);
  const [route, setRoute] = useState("/");

  return (
    <BrowserRouter>
      {!isAuth && route !== "/" && <Redirect to="/login" />}

      <Switch>
        <Route path="/news" component={News} />
        <Route path="/ho-tro" component={Addition} />

        <Main path="/co-so-dieu-tri" component={HospitalMap} />

        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Main exact path="/" component={Home} />

        <Main exact path="/phuc-hoi" component={FirstAid} />
        {/* <Main exact path="/so-cuu" component={FirstAid2} /> */}

        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/calendar" component={CalendarPage} />
        <PrivateRoute exact path="/notifications" component={NotificationsPage} />
        <PrivateRoute exact path="/threshold/:id" component={ThresholdPage} />
        {role === "doctor" && (
          <>
            <PrivateRoute exact path="/patients" component={PatientCardsList} />
            <PrivateRoute exact path="/patients/:id" component={PatientList} />
            <PrivateRoute exact path="/record" component={DoctorRecord} />
            <PrivateRoute exact path="/stroke_point" component={StrokePoint} />
            <PrivateRoute exact path="/upload/blood" component={UploadBlood} />
            <PrivateRoute exact path="/projection_photo" component={ProjectionPhoto} />
          </>
        )}
        {role === "patient" && <PrivateRoute exact path="/record" component={PatientRecord} />}
        {!role && <PrivateRoute exact path="/record" component={PatientRecord} />}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
