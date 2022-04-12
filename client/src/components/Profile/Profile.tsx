// import "./profile.scss";
import "./index.scss";
import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useAppSelector } from "../../app/store";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import { GET_DOCTOR_PROFILE, GET_PATIENT_PROFILE } from "./schema";
import { getBMI, getDiagnostic } from "helpers/diagnostic";

//icon

import { FaUserNurse } from "react-icons/fa";
import { MdOutlineCalculate, MdOutlineHealthAndSafety, MdOutlineLastPage, MdOutlineMonitorWeight, MdOutlinePersonalInjury } from "react-icons/md";
import { BsCalendarCheck, BsClipboardData, BsStar, BsTelephone } from "react-icons/bs";
import { VscSymbolNamespace } from "react-icons/vsc";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineColumnHeight } from "react-icons/ai";

//image

import defaultAvatar from "../../assets/default-avatar.png";
import defaultAvatarPatient from "assets/default-avatar-patient.png";

import MedicineSchedule from "./MedicineSchedule";

export default function Profile() {
    const userAccountInfo = useAppSelector((state) => state.account);
    const [getPatientProfile, { data: patientProfile }] = useLazyQuery(GET_PATIENT_PROFILE);

    useEffect(() => {
        if (userAccountInfo?.role == "patient" && userAccountInfo.id) {
            getPatientProfile({
                variables: {
                    id: userAccountInfo.id,
                },
            });
        }
    }, [userAccountInfo.role]);

    const medicineSchedule = React.useMemo(() => {
        if (patientProfile) {
            return patientProfile.getPatient.medicineSchedule;
        }
    }, [patientProfile]);

    return (
        <div className="profile_all">
            <div className="profile_carry">
                <UserCard />

                <div id="medicineCalendar" className="calendarContainer">
                    <MedicineSchedule medicineSchedule={medicineSchedule} />
                </div>
            </div>
        </div>
    );
}

function UserCard() {
    const userAccountInfo = useAppSelector((state) => state.account);
    const [getDoctorProfile, { data: doctorProfile }] = useLazyQuery(GET_DOCTOR_PROFILE);
    const [getPatientProfile, { data: patientProfile }] = useLazyQuery(GET_PATIENT_PROFILE);

    useEffect(() => {
        if (userAccountInfo.role && userAccountInfo.id) {
            if (userAccountInfo.role == "doctor") {
                getDoctorProfile({
                    variables: {
                        id: userAccountInfo.id,
                    },
                });
            }
            if (userAccountInfo.role == "patient") {
                getPatientProfile({
                    variables: {
                        id: userAccountInfo.id,
                    },
                });
            }
        }
    }, [userAccountInfo.role]);

    return (
        <div className="userCard">
            <Image className="userAvatar" src={doctorProfile ? defaultAvatar : defaultAvatarPatient} />
            <div className="userInfo">
                <div className="userInfoRow">
                    <div className="label">
                        <VscSymbolNamespace />
                    </div>
                    <div className="data">
                        {doctorProfile && doctorProfile.getDoctor.fullName && ` ${doctorProfile.getDoctor.fullName} (Bác sĩ)`}
                        {patientProfile && patientProfile.getPatient.fullName && ` ${patientProfile.getPatient.fullName} (Bệnh nhân)`}
                    </div>
                </div>

                <div className="userInfoRow">
                    <div className="label">
                        <BsTelephone />
                    </div>
                    <div className="data">
                        {doctorProfile && doctorProfile.getDoctor.phone && ` ${doctorProfile.getDoctor.phone}`}
                        {patientProfile && patientProfile.getPatient.phone && ` ${patientProfile.getPatient.phone}`}
                    </div>
                </div>
                <div className="userInfoRow">
                    <div className="label">
                        <IoMailOutline />
                    </div>
                    <div className="data">
                        {doctorProfile && doctorProfile.getDoctor.email && ` ${doctorProfile.getDoctor.email}`}
                        {patientProfile && patientProfile.getPatient.email && ` ${patientProfile.getPatient.email}`}
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
                        <div className="data">{doctorProfile.getDoctor.education}</div>
                    </div>
                )}
                {patientProfile && patientProfile.getPatient.height && (
                    <div className="userInfoRow">
                        <div className="label">
                            <AiOutlineColumnHeight />
                        </div>

                        <div className="data">{`Cao ${patientProfile.getPatient.height} m`}</div>
                    </div>
                )}
                {patientProfile && patientProfile.getPatient.weight && (
                    <div className="userInfoRow">
                        <div className="label">
                            <MdOutlineMonitorWeight />
                        </div>
                        <div className="data">{`Nặng ${patientProfile.getPatient.weight} kg`}</div>
                    </div>
                )}
                {patientProfile && patientProfile.getPatient.weight && patientProfile.getPatient.height && (
                    <div className="userInfoRow">
                        <div className="label">
                            <MdOutlineCalculate />
                        </div>
                        <div className="data">{` ${getBMI(patientProfile.getPatient.height, patientProfile.getPatient.weight).toFixed(2)} (BMI)`}</div>
                    </div>
                )}
                {patientProfile && patientProfile.getPatient.weight && patientProfile.getPatient.height && (
                    <div className="userInfoRow">
                        <div className="label">
                            <MdOutlineHealthAndSafety />
                        </div>
                        <div className="data">{` ${getDiagnostic(getBMI(patientProfile.getPatient.height, patientProfile.getPatient.weight))}`}</div>
                    </div>
                )}
            </div>

            <div className="buttonProfileSpace">
                <Link
                    onClick={() => {
                        document.getElementById("medicineCalendar")?.scrollIntoView();
                    }}
                    className="buttonProfile"
                    to="#medicineCalendar"
                >
                    <BsCalendarCheck className="btnProfileIcon" />
                    <span>Xem Lịch</span>
                </Link>
                {doctorProfile && (
                    <Link className="buttonProfile" to="/patients">
                        <MdOutlinePersonalInjury className="btnProfileIcon" />
                        <span>Bệnh nhân</span>
                    </Link>
                )}
                {patientProfile && (
                    <Link className="buttonProfile" to="/doctor">
                        <FaUserNurse className="btnProfileIcon" />
                        <span>Bác sĩ</span>
                    </Link>
                )}

                <Link className="buttonProfile" to="/record">
                    <BsClipboardData className="btnProfileIcon" />
                    <span>{patientProfile ? "Hồ sơ bệnh nhân" : "Hồ sơ bác sĩ"}</span>
                </Link>
            </div>
        </div>
    );
}
