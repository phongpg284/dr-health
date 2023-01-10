import "./index.scss";
import dayjs from "dayjs";
import { useAppSelector } from "app/store";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Modal, message, Input } from "antd";
import usePromise from "utils/usePromise";

import { BiLinkExternal } from "react-icons/bi";
import Avatar from "../../../assets/default-avatar-patient.png";
import BG from "assets/abstract12.svg";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useApi } from "utils/api";
import { differenceInYears } from "utils/date";

const PatientCardsList = () => {
  const account = useAppSelector((state) => state.account);
  const [patientData] = usePromise(`/doctor/patients/${account.id}`);
  // const [createMeeting] = useMutation(CREATE_MEETING);

  const patientDataArray = React.useMemo(() => {
    if (!patientData) return [];
    let newArray = patientData.concat([]);
    newArray = newArray.map((item: any, index: number) => {
      return { ...item, index };
    });
    // newArray = newArray.concat(defaultList);

    return newArray;
  }, [patientData]);

  const handleClickVideoCall = (id: string) => {
    const meetingLink = `https://video.dr-health.com.vn/${id?.slice(0, 10) || "adss43ghj4h3"}`;
    const inputs = { patientId: id, meetingId: meetingLink };
    // createMeeting({
    //     variables: {
    //         inputs,
    //     },
    // });
    window.open(meetingLink);
  };

  const [showAddPatient, setShowAddPatient] = useState(false);
  const api = useApi();

  const confirmAddMeeting = () => {
    api
      .post(`/doctor/add_patient${account?.roleId}&${patientCode}`)
      .then(() => message.success("Thêm bệnh nhân thành công"))
      .catch(() => message.error("Thêm bệnh nhân không thành công"))
      .finally(() => {
        setShowAddPatient(false);
      });
  };
  const handleClickAddPatient = () => {
    setShowAddPatient(true);
  };
  const handleClickCancelAddMeeting = () => {
    setShowAddPatient(false);
  };
  const [patientCode, setPatientCode] = useState("");

  const handleChangePatientCode = (e: any) => {
    setPatientCode(e?.target?.value);
  };
  return (
    <div className="patient-card-list-wrapper">
      <img src={BG} className="doctorRecordBg" alt="" />
      {/* <Experiment/> */}
      <h1 className="patient-card-list-title">Quản lý bệnh nhân</h1>

      <button className="button-62" onClick={handleClickAddPatient}>
        Thêm bệnh nhân
      </button>
      <Modal title="Thêm bệnh nhân" visible={showAddPatient} onOk={confirmAddMeeting} onCancel={handleClickCancelAddMeeting}>
        <Input placeholder="Nhập mã bệnh nhân" onChange={handleChangePatientCode} />
      </Modal>
      <div className="patientList">
        {patientDataArray &&
          patientDataArray
            ?.sort((a: any, b: any) => a.email > b.email)
            .map((patient: any) => (
              <div className="profile-contentinfo-item-patient" key={patient.id}>
                <div className="profile-patient-in">
                  <div className="profile-patient-avatar">
                    <img src={Avatar} alt="patient-avatar" />
                  </div>
                  <div className="profile-patient-text-carry">
                    <div className="profile-patient-text">Mã bệnh nhân:{` ${patient?.code} `}</div>
                    <div className="profile-patient-text">Họ và tên:{` ${patient?.fullName} `}</div>
                    <div className="profile-patient-text">Tuổi:{`${patient?.dob ? differenceInYears(patient?.dob) : ""}`}</div>
                    <div className="profile-patient-text">Ngày sinh:{` ${patient?.dob ? dayjs(patient?.dob).format("DD/MM/YYYY") : ""}`}</div>
                    <div className="profile-patient-text">Giới tính:{` ${(patient?.gender === "male" ? "Nam" : patient?.gender === "female" ? "Nữ" : "") ?? ""}`}</div>
                  </div>
                </div>
                <div onClick={() => handleClickVideoCall(patient?._id)} className="profile-patient-video-call">
                  <Tooltip overlay={"Bắt đầu cuộc gọi"}>
                    <BsFillCameraVideoFill />
                  </Tooltip>
                </div>
                <Link to={`/patients/${patient.index}`} className="profile-patient-textdetail">
                  <Tooltip overlay={"Chi tiết"}>
                    <BiLinkExternal />
                  </Tooltip>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};
export default PatientCardsList;
