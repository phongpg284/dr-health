import "./App.css";
import { createContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "./app/store";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Main from "pages/Main";
import FirstAid from "pages/FirstAid";
import { Home } from "components/Home";
import NotificationsPage from "pages/Notifications";
import ThresholdPage from "pages/Threshold/ThresholdPage";
import PatientList from "components/PatientRecord/PatientList";
import PatientRecord from "components/PatientRecord/PatientRecord";
import Minigame from "components/Minigame";
import PrivateRoute from "pages/PrivateRoute";
import DoctorRecord from "components/DoctorRecord";
import PatientCardsList from "components/PatientRecord/PatientCardsList";
import AddMinigame from "pages/AddMinigame";
import FirstAid2 from "pages/FirstAid2";
import StrokePoint from "pages/StrokePoint";
import UploadBlood from "pages/UploadBlood";
import News from "pages/News";
import { useAppDispatch } from "./app/store";
import * as GreetingBotStore from "./app/GreetingBot";
import Addition from "./pages/Addition";
import HospitalMap from "pages/HospitalMap";

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
            <FooterContext.Provider value={footerRef}>{hasRunEffect && <MyRouter />}</FooterContext.Provider>
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
                <Main exact path="/so-cuu" component={FirstAid2} />

                <PrivateRoute exact path="/minigame" component={Minigame} />
                {role === "patient" && <PrivateRoute exact path="/add-games" component={AddMinigame} />}
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute exact path="/calendar" component={CalendarPage} />
                <Route exact path="/notifications" component={NotificationsPage} />
                <PrivateRoute exact path="/threshold/:id" component={ThresholdPage} />
                {role === "doctor" && (
                    <>
                        <PrivateRoute exact path="/patients" component={PatientCardsList} />
                        <PrivateRoute exact path="/patients/:id" component={PatientList} />
                        <PrivateRoute exact path="/record" component={DoctorRecord} />
                        <PrivateRoute exact path="/stroke_point" component={StrokePoint} />
                        <PrivateRoute exact path="/upload/blood" component={UploadBlood} />
                        <PrivateRoute exact path="/projection_photo" component={StrokePoint} />
                    </>
                )}
                {role === "patient" && <PrivateRoute exact path="/record" component={PatientRecord} />}
                {!role && <PrivateRoute exact path="/record" component={PatientRecord} />}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
