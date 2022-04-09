import "./index.scss"
import dayjs from "dayjs";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "app/store";
import { useEffect, useState } from "react";
import { DatePicker, Input, Table } from "antd";
import { GET_DOCTOR } from "./schema";
import useInputDoctor from "./useInputDoctor";
import BG from '../../assets/abstract12.svg'

export const DoctorRecord = () => {
  const account = useAppSelector(state => state.account);
  const [dataSource, setDataSource] = useState<any>();

  const { data: doctorData } = useQuery(GET_DOCTOR, {
    variables: {
      id: account.id
    },
    fetchPolicy: "network-only"
  });

  const [data, setData] = useState<any>();
  useEffect(() => {
    if (doctorData && doctorData.getDoctor)
      setData(doctorData.getDoctor)
  })

  const [fullName, editFullName, onChangeFullName, onConfirmFullName] = useInputDoctor("fullName", data?.fullName, account.id!);
  const [phone, editPhone, onChangePhone, onConfirmPhone] = useInputDoctor("phone", data?.phone, account.id!);
  const [email, editEmail, onChangeEmail, onConfirmEmail] = useInputDoctor("email", data?.email, account.id!);
  const [gender, editGender, onChangeGender, onConfirmGender] = useInputDoctor("gender", data?.gender, account.id!);
  const [age, editAge, onChangeAge, onConfirmAge] = useInputDoctor("age", data?.age, account.id!);
  const [birth, editBirth, onChangeBirth, onConfirmBirth] = useInputDoctor("birth", data?.birth, account.id!);
  const [jobPosition, editJobPosition, onChangeJobPosition, onConfirmJobPosition] = useInputDoctor("jobPosition", data?.jobPosition, account.id!);
  const [department, editDepartment, onChangeDepartment, onConfirmDepartment] = useInputDoctor("department", data?.department, account.id!);
  const [education, editEducation, onChangeEducation, onConfirmEducation] = useInputDoctor("education", data?.education, account.id!);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      // eslint-disable-next-line react/display-name
      render: (text: string) => (
        <div style={{ fontWeight: "bold" }}>{text}</div>
      ),
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
      width: "46%",
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any) => {
        if (record.name === "Họ và tên")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editFullName && <span>{text}</span>}
              {editFullName && (
                <Input
                  onChange={onChangeFullName}
                  style={{ width: "100px" }}
                  value={fullName}
                />
              )}
            </div>
          );
        if (record.name === "Số điện thoại")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editPhone && <span>{text}</span>}
              {editPhone && (
                <Input
                  onChange={onChangePhone}
                  style={{ width: "100px" }}
                  value={phone}
                />
              )}
            </div>
          );
        if (record.name === "Chức vụ")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editJobPosition && <span>{text}</span>}
              {editJobPosition && (
                <Input
                  onChange={onChangeJobPosition}
                  style={{ width: "100px" }}
                  value={jobPosition}
                />
              )}
            </div>
          );
        if (record.name === "Phòng-khoa")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editDepartment && <span>{text}</span>}
              {editDepartment && (
                <Input
                  onChange={onChangeDepartment}
                  value={department}
                />
              )}
            </div>
          );
        if (record.name === "Email")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editEmail && <span>{text}</span>}
              {editEmail && (
                <Input
                  onChange={onChangeEmail}
                  value={email}
                />
              )}
            </div>
          );
        if (record.name === "Giới tính")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editGender && <span>{text}</span>}
              {editGender && (
                <Input
                  onChange={onChangeGender}
                  value={gender}
                />
              )}
            </div>
          );
        if (record.name === "Tuổi")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editAge && <span>{text}</span>}
              {editAge && (
                <Input
                  onChange={onChangeAge}
                  value={age}
                />
              )}
            </div>
          );
        if (record.name === "Ngày sinh")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editBirth && <span>{dayjs(text).format("DD/MM/YYYY")}</span>}
              {editBirth && (
                <DatePicker onChange={onChangeBirth} format={"DD/MM/YYYY"} />
              )}
            </div>
          );
        if (record.name === "Học vấn")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editEducation && <span>{text}</span>}
              {editEducation && (
                <Input
                  onChange={onChangeEducation}
                  value={education}
                />
              )}
            </div>
          );
        return <span>{text}</span>;
      },
    },
    {
      key: "action",
      render: (text: any, record: any) => {
        if (record.name === "Họ và tên")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editFullName && (
                <a style={{ color: "blue" }} onClick={onConfirmFullName}>
                  Thay đổi
                </a>
              )}
              {editFullName && (
                <a style={{ color: "blue" }} onClick={onConfirmFullName}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Số điện thoại")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editPhone && (
                <a style={{ color: "blue" }} onClick={onConfirmPhone}>
                  Thay đổi
                </a>
              )}
              {editPhone && (
                <a style={{ color: "blue" }} onClick={onConfirmPhone}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Chức vụ")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editJobPosition && (
                <a style={{ color: "blue" }} onClick={onConfirmJobPosition}>
                  Thay đổi
                </a>
              )}
              {editJobPosition && (
                <a style={{ color: "blue" }} onClick={onConfirmJobPosition}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Phòng-khoa")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editDepartment && (
                <a style={{ color: "blue" }} onClick={onConfirmDepartment}>
                  Thay đổi
                </a>
              )}
              {editDepartment && (
                <a style={{ color: "blue" }} onClick={onConfirmDepartment}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Email")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editEmail && (
                <a style={{ color: "blue" }} onClick={onConfirmEmail}>
                  Thay đổi
                </a>
              )}
              {editEmail && (
                <a style={{ color: "blue" }} onClick={onConfirmEmail}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Giới tính")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editGender && (
                <a style={{ color: "blue" }} onClick={onConfirmGender}>
                  Thay đổi
                </a>
              )}
              {editGender && (
                <a style={{ color: "blue" }} onClick={onConfirmGender}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Tuổi")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editAge && (
                <a style={{ color: "blue" }} onClick={onConfirmAge}>
                  Thay đổi
                </a>
              )}
              {editAge && (
                <a style={{ color: "blue" }} onClick={onConfirmAge}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Học vấn")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editEducation && (
                <a style={{ color: "blue" }} onClick={onConfirmEducation}>
                  Thay đổi
                </a>
              )}
              {editEducation && (
                <a style={{ color: "blue" }} onClick={onConfirmEducation}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Ngày sinh")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editBirth && (
                <a style={{ color: "blue" }} onClick={onConfirmBirth}>
                  Thay đổi
                </a>
              )}
              {editBirth && (
                <a style={{ color: "blue" }} onClick={onConfirmBirth}>
                  Xác nhận
                </a>
              )}
            </div>
          );
      },
    }
  ];

  useEffect(() => {
    if (data) {
      setDataSource([
        {
          key: "1",
          name: "Họ và tên",
          value: fullName || data.fullName,
        },
        {
          key: "2",
          name: "Tuổi",
          value: age || data.age,
        },
        {
          key: "3",
          name: "Ngày sinh",
          value: birth || data.birth,
        },
        {
          key: "4",
          name: "Giới tính",
          value: gender || data.gender,
        },
        {
          key: "5",
          name: "Email",
          value: email || data.email,
        },
        {
          key: "6",
          name: "Số điện thoại",
          value: phone || data.phone,
        },
        {
          key: "7",
          name: "Học vấn",
          value: education || data.education,
        },

        {
          key: "8",
          name: "Chức vụ",
          value: jobPosition || data.jobPosition,
        },
        {
          key: "9",
          name: "Phòng-khoa",
          value: department || data.department,
        },
      ]);
    }
  }, [data, editPhone, editJobPosition, editDepartment, editAge, editEmail, editGender, editBirth, editEducation, editFullName]);
  return (
    <div className="doctor-record-wrapper">
      <img src={BG} className="doctorRecordBg" alt="" />
      <div className="doctorContainer">

        <div className="doctor-record-header-title">Thay đổi thông tin</div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>

    </div>
  )
};

export default DoctorRecord