// import "./profile.scss";
import "./index.scss";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

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
import usePromise from "utils/usePromise";
import { useApi } from "utils/api";

export default function Profile() {
  const user = useAppSelector((state) => state.account);
  const [patientData] = usePromise(`/user/role/${user.id}`);

  const medicineSchedule = React.useMemo(() => {
    if (user.role === "patient") {
      return patientData?.medicineSchedule;
    }
  }, [user]);

  return (
    <div className="profile_all">
      <div className="profile_carry">
        <UserCard />

        <div id="medicineCalendar" className="calendarContainer">
          <MedicineSchedule patientAccountId={+user.id!} />
        </div>
      </div>
    </div>
  );
}

function UserCard() {
  const user = useAppSelector((state) => state.account);
  const api = useApi();
  const [data, setData] = useState<any>({});
  const isPatient = user?.role === "patient";
  const isDoctor = user?.role === "doctor";

  useEffect(() => {
    if (user.role && user.id) {
      api.get(`/user/${user.id}`).then((res) => setData(res.data));
    }
  }, [user.role]);
  return (
    <div className="userCard">
      <Image className="userAvatar" src={isDoctor ? defaultAvatar : defaultAvatarPatient} />
      <div className="userInfo">
        <div className="userInfoRow">
          <div className="label">
            <VscSymbolNamespace />
          </div>
          <div className="data">
            {isDoctor && data.fullName && ` ${data.fullName} (Bác sĩ)`}
            {isPatient && data.fullName && ` ${data.fullName} (Bệnh nhân)`}
          </div>
        </div>

        <div className="userInfoRow">
          <div className="label">
            <BsTelephone />
          </div>
          <div className="data">{data.phone && ` ${data.phone}`}</div>
        </div>
        <div className="userInfoRow">
          <div className="label">
            <IoMailOutline />
          </div>
          <div className="data">{data.email && ` ${data.email}`}</div>
        </div>

        <div className="userInfoRow">
          <div className="label">
            <MdOutlineLastPage />
          </div>
          <div className="data">{data.age && `${data.age} tuổi`}</div>
        </div>

        {isDoctor && data.education && (
          <div className="userInfoRow">
            <div className="label">
              <BsStar />
            </div>
            <div className="data">{data.education}</div>
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
        {isDoctor && (
          <Link className="buttonProfile" to="/patients">
            <MdOutlinePersonalInjury className="btnProfileIcon" />
            <span>Bệnh nhân</span>
          </Link>
        )}
        {isPatient && (
          <Link className="buttonProfile" to="/doctor">
            <FaUserNurse className="btnProfileIcon" />
            <span>Bác sĩ</span>
          </Link>
        )}

        <Link className="buttonProfile" to="/record">
          <BsClipboardData className="btnProfileIcon" />
          <span>{isPatient ? "Hồ sơ bệnh nhân" : "Hồ sơ bác sĩ"}</span>
        </Link>
      </div>
    </div>
  );
}
