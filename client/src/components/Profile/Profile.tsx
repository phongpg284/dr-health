// import "./profile.scss";
import "./index.scss"
import { useLazyQuery, useQuery } from "@apollo/client"
import { useAppSelector } from "../../app/store";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";

import { GET_ALLPATIENT_PROFILE, GET_DOCTOR_PROFILE, GET_PATIENT_PROFILE } from "./schema";
import { getBMI, getDiagnostic } from "helpers/diagnostic";
import CalendarList from '../Calender/Items/CalendarList';


//icon

import { BiInfoCircle, BiSpa, BiStar } from "react-icons/bi"
import { FaUserInjured, FaUserNurse } from "react-icons/fa"
import { IoMdArrowDroprightCircle } from "react-icons/io"
import { GoArrowRight } from "react-icons/go"

//image

import background from "../../assets/profile_background.png";
import background2 from "../../assets/back_2.png";
import doctorimg from "../../assets/doctor.png";
import doctorsimg from "../../assets/doctors.png";
import defaultAvatar from "../../assets/default-avatar.png";
import defaultAvatarPatient from 'assets/default-avatar-patient.png'
import { MdDriveFileRenameOutline, MdOutlineCalculate, MdOutlineHealthAndSafety, MdOutlineLastPage, MdOutlineMonitorWeight, MdOutlinePersonalInjury } from "react-icons/md";
import { BsCalendarCheck, BsClipboardData, BsFillTelephoneFill, BsStar, BsTelephone } from "react-icons/bs";
import { VscSymbolNamespace } from "react-icons/vsc";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineColumnHeight } from "react-icons/ai";

import MedicineSchedule from './MedicineSchedule'


export default function Profile() {

    const history = useHistory();
    const userAccountInfo = useAppSelector((state) => state.account);
    const [getDoctorProfile, { data: doctorProfile }] = useLazyQuery(GET_DOCTOR_PROFILE);
    const [getDoctorOfPatientProfile, { data: doctorOfPatientProfile }] = useLazyQuery(GET_DOCTOR_PROFILE);
    const [getPatientProfile, { data: patientProfile }] = useLazyQuery(GET_PATIENT_PROFILE);
    const [getAllPatientProfile, { data: patientsProfile }] = useLazyQuery(GET_ALLPATIENT_PROFILE);

    useEffect(() => {
        if (userAccountInfo.role && userAccountInfo.id) {
            if (userAccountInfo.role == "doctor") {
                getDoctorProfile({
                    variables: {
                        id: userAccountInfo.id
                    }
                })
                getAllPatientProfile({
                    variables: {
                        id: userAccountInfo.id
                    }
                })
            }
            if (userAccountInfo.role == "patient") {
                getPatientProfile({
                    variables: {
                        id: userAccountInfo.id
                    }
                })
            }
        }
    }, [userAccountInfo.role]);

    const medicineSchedule = React.useMemo(() => {
        if (patientProfile) {
            return patientProfile.getPatient.medicineSchedule
        }
    }, [patientProfile])


    return (
        <div className="profile_all">
            <div className="profile_carry">
                <UserCard />

                <div id="medicineCalendar" className="calendarContainer">
                    <MedicineSchedule medicineSchedule={medicineSchedule}/>
                </div>

            </div >
        </div >
    )
}



function UserCard() {
    const history = useHistory();
    const userAccountInfo = useAppSelector((state) => state.account);
    const [getDoctorProfile, { data: doctorProfile }] = useLazyQuery(GET_DOCTOR_PROFILE);
    const [getDoctorOfPatientProfile, { data: doctorOfPatientProfile }] = useLazyQuery(GET_DOCTOR_PROFILE);
    const [getPatientProfile, { data: patientProfile }] = useLazyQuery(GET_PATIENT_PROFILE);
    const [getAllPatientProfile, { data: patientsProfile }] = useLazyQuery(GET_ALLPATIENT_PROFILE);

    useEffect(() => {
        if (userAccountInfo.role && userAccountInfo.id) {
            if (userAccountInfo.role == "doctor") {
                getDoctorProfile({
                    variables: {
                        id: userAccountInfo.id
                    }
                })
                getAllPatientProfile({
                    variables: {
                        id: userAccountInfo.id
                    }
                })
            }
            if (userAccountInfo.role == "patient") {
                getPatientProfile({
                    variables: {
                        id: userAccountInfo.id
                    }
                })
            }
        }
    }, [userAccountInfo.role]);

    useEffect(() => {
        if (patientProfile && patientProfile.getPatient) {
            getDoctorOfPatientProfile({
                variables: {
                    id: patientProfile.getPatient.doctorId
                }
            })
        }
    }, [patientProfile])
    return (
        <div className="userCard">
            <Image
                className="userAvatar"
                src={doctorProfile ? defaultAvatar : defaultAvatarPatient} />
            <div className="userInfo">
                <div className="userInfoRow">
                    <div className="label">
                        <VscSymbolNamespace />
                    </div>
                    <div className="data">
                        {doctorProfile &&
                            doctorProfile.getDoctor.fullName &&
                            (` ${doctorProfile.getDoctor.fullName} (Bác sĩ)`)}
                        {patientProfile &&
                            patientProfile.getPatient.fullName &&
                            (` ${patientProfile.getPatient.fullName} (Bệnh nhân)`)}
                    </div>
                </div>

                <div className="userInfoRow">
                    <div className="label">
                        <BsTelephone />
                    </div>
                    <div className="data">
                        {doctorProfile && doctorProfile.getDoctor.phone && (` ${doctorProfile.getDoctor.phone}`)}
                        {patientProfile && patientProfile.getPatient.phone && (` ${patientProfile.getPatient.phone}`)}
                    </div>
                </div>
                <div className="userInfoRow">
                    <div className="label">
                        <IoMailOutline />
                    </div>
                    <div className="data">
                        {doctorProfile && doctorProfile.getDoctor.email && (` ${doctorProfile.getDoctor.email}`)}
                        {patientProfile && patientProfile.getPatient.email && (` ${patientProfile.getPatient.email}`)}
                    </div>
                </div>

                <div className="userInfoRow">
                    <div className="label">
                        <MdOutlineLastPage />
                    </div>
                    <div className="data">
                        {doctorProfile && doctorProfile.getDoctor.age && doctorProfile.getDoctor.age}
                        {patientProfile && patientProfile.getPatient.age && patientProfile.getPatient.age}
                        &nbsp; tuổi
                    </div>
                </div>

                {doctorProfile && doctorProfile.getDoctor.education && (
                    <div className="userInfoRow">
                        <div className="label">
                            <BsStar />
                        </div>
                        <div className="data">
                            {doctorProfile.getDoctor.education}
                        </div>
                    </div>
                )}
                {patientProfile && patientProfile.getPatient.height && (
                    <div className="userInfoRow">
                        <div className="label">
                            <AiOutlineColumnHeight />
                        </div>

                        <div className="data">
                            {(`Cao ${patientProfile.getPatient.height} m`)}
                        </div>
                    </div>
                )}
                {patientProfile && patientProfile.getPatient.weight && (
                    <div className="userInfoRow">
                        <div className="label">
                            <MdOutlineMonitorWeight />
                        </div>
                        <div className="data">
                            {(`Nặng ${patientProfile.getPatient.weight} kg`)}
                        </div>
                    </div>
                )}
                {patientProfile && patientProfile.getPatient.weight && patientProfile.getPatient.height && (
                    <div className="userInfoRow">
                        <div className="label">
                            <MdOutlineCalculate />
                        </div>
                        <div className="data">
                            {(` ${getBMI(patientProfile.getPatient.height, patientProfile.getPatient.weight).toFixed(2)} (BMI)`)}
                        </div>
                    </div>
                )}
                {patientProfile && patientProfile.getPatient.weight && patientProfile.getPatient.height && (
                    <div className="userInfoRow">
                        <div className="label">
                            <MdOutlineHealthAndSafety />
                        </div>
                        <div className="data">
                            {` ${getDiagnostic(getBMI(patientProfile.getPatient.height, patientProfile.getPatient.weight))}`}
                        </div>
                    </div>
                )}

            </div>

            <div className="buttonProfileSpace">

                <Link
                    onClick={()=>{document.getElementById("medicineCalendar")?.scrollIntoView()}}
                    className="buttonProfile"
                    to="#medicineCalendar">

                    <BsCalendarCheck className="btnProfileIcon" />
                    <span>
                        Xem Lịch
                    </span>
                </Link>
                {doctorProfile &&
                    (<Link
                        className="buttonProfile"
                        to="/patients">
                        <MdOutlinePersonalInjury className="btnProfileIcon" />
                        <span>
                            Bệnh nhân
                        </span>
                    </Link>)}
                {patientProfile &&
                    <Link
                        className="buttonProfile"
                        to="/doctor">
                        <FaUserNurse className="btnProfileIcon" />
                        <span>
                            Bác sĩ
                        </span>
                    </Link>
                }

                <Link
                    className="buttonProfile"
                    to="/record">
                    <BsClipboardData className="btnProfileIcon" />
                    <span>
                        {patientProfile ? "Hồ sơ bệnh nhân" : "Hồ sơ bác sĩ"}
                    </span>
                </Link>

            </div>
        </div>

    )
}


{/* <div className="profile_column profile_body_detail">
<div className="profile_row" style={{ flexWrap: "nowrap", marginTop: "60px" }}>
    <div className="profile_imageback" style={{ position: "relative", width: `${patientProfile ? "1000px" : ""}` }}>
        {
            patientProfile && (
                <>
                    <Image src={doctorsimg} className="profile_imginfo"></Image>
                    <div className="profileimg_text" style={{ position: "absolute", right: "40px" }}>
                        <div className="profile_row profile_body_text pr_alstart" style={{ fontSize: "22px", fontWeight: "bold", color: "#ec197a" }}>
                            <BiStar />&nbsp;
                            Thông tin chi tiết
                        </div>
                        <div className="profile_body_text" style={{ transform: "translateX(20px)" }}>
                            Xem toàn bộ thông tin tại đây
                        </div>
                        <div className="profile_body_text" style={{ userSelect: "none", cursor: "pointer", transform: "translateX(20px)", marginTop: "20px" }} onClick={() => history.push("/record")}>
                            Hồ sơ bệnh án
                            <IoMdArrowDroprightCircle style={{ marginLeft: "5px", marginBottom: "3px" }} />
                        </div>
                    </div>
                </>

            )
        }
    </div>
    <div className="profile_body_item profile_column pr_alstart pr_justart" style={{ width: "100%" }}>
        <div>
            <div className="profile_row profile_body_text pr_alstart" style={{ fontSize: "22px", fontWeight: "bold", color: "#1964ec" }}>
                <BiStar />&nbsp;
                Thông tin chi tiết
            </div>
            <div className="profile_body_text">
                {doctorProfile ? <GoArrowRight /> : "•"} Họ và Tên:
                {doctorProfile && doctorProfile.getDoctor.fullName && (` ${doctorProfile.getDoctor.fullName}`)}
                {patientProfile && patientProfile.getPatient.fullName && (` ${patientProfile.getPatient.fullName}`)}
            </div>
            <div className="profile_body_text">
                {doctorProfile ? <GoArrowRight /> : "•"} Điện thoại:
                {doctorProfile && doctorProfile.getDoctor.phone && (` ${doctorProfile.getDoctor.phone}`)}
                {patientProfile && patientProfile.getPatient.phone && (` ${patientProfile.getPatient.phone}`)}
            </div>
            <div className="profile_body_text">
                • Email:
                {doctorProfile && doctorProfile.getDoctor.email && (` ${doctorProfile.getDoctor.email}`)}
                {patientProfile && patientProfile.getPatient.email && (` ${patientProfile.getPatient.email}`)}
            </div>
            <div className="profile_body_text">
                • Vai trò:
                {doctorProfile && (` Bác sĩ`)}
                {patientProfile && (` Bệnh nhân`)}
            </div>
            <div className="profile_body_text">
                • Tuổi:
                {doctorProfile && doctorProfile.getDoctor.age && (` ${doctorProfile.getDoctor.age}`)}
                {patientProfile && patientProfile.getPatient.age && (` ${patientProfile.getPatient.age}`)}
            </div>
            {doctorProfile && doctorProfile.getDoctor.education && (
                <div className="profile_body_text">
                    • Học vấn:{(` ${doctorProfile.getDoctor.education}`)}
                </div>
            )}
            {patientProfile && patientProfile.getPatient.height && (
                <div className="profile_body_text">
                    • Chiều cao:{(` ${patientProfile.getPatient.height} m`)}
                </div>
            )}
            {patientProfile && patientProfile.getPatient.weight && (
                <div className="profile_body_text">
                    • Cân nặng:{(` ${patientProfile.getPatient.weight} kg`)}
                </div>
            )}
            {patientProfile && patientProfile.getPatient.weight && patientProfile.getPatient.height && (
                <div className="profile_body_text">
                    • Chỉ số BMI:{(` ${getBMI(patientProfile.getPatient.height, patientProfile.getPatient.weight).toFixed(2)}`)}
                </div>
            )}
            {patientProfile && patientProfile.getPatient.weight && patientProfile.getPatient.height && (
                <div className="profile_body_text">
                    • Tình trạng sức khoẻ:{` ${getDiagnostic(getBMI(patientProfile.getPatient.height, patientProfile.getPatient.weight))}`}
                </div>
            )}
        </div>
    </div>
</div>
{patientProfile && patientProfile.getPatient.pathologicalDescription && (
    <div className="profile_row" style={{ flexWrap: "nowrap", marginTop: "60px" }}>
        <div className="profile_body_item profile_pathological pr_alstart pr_justart profile_column" style={{ width: "100%" }}>
            <a href="/record" className="profile_row profile_body_text" style={{ fontSize: "22px", fontWeight: "bold", color: "#12cb0f" }}>
                <BiSpa />&nbsp;
                Tiền sử bệnh
            </a>
            <div className="profile_body_text">
                • {` ${patientProfile.getPatient.pathologicalDescription}`}
            </div>
        </div>
        <div className="profile_imageback" style={{ position: "relative", width: "100%" }}>
            <Image src={doctorimg} className="profile_imginfo2"></Image>
            <div className="profileimg_text" style={{ position: "absolute", left: "10px", top: "20px" }}>
                <div className="profile_row profile_body_text pr_alstart" style={{ fontSize: "22px", fontWeight: "bold", color: "#ec197a" }}>
                    <BiSpa />&nbsp;
                    Tiền sử bệnh
                </div>
                <div className="profile_body_text" style={{ transform: "translateX(20px)" }}>
                    Xem tiền sử bệnh tại đây
                </div>
                <div className="profile_body_text" style={{ userSelect: "none", cursor: "pointer", transform: "translateX(20px)", marginTop: "20px" }} onClick={() => history.push("/record")}>
                    Khai báo thông tin
                    <IoMdArrowDroprightCircle style={{ marginLeft: "5px", marginBottom: "3px" }} />
                </div>
            </div>
        </div>
    </div>
)}
</div> */}