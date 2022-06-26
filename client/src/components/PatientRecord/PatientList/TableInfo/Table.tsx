import "./index.scss";
import { ReactElement, useEffect, useState } from "react";
import { DatePicker, message } from "antd";
import dayjs from "dayjs";

import useInput from "../useInput";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import usePromise from "utils/usePromise";
import { useFormik } from "formik";
import InputDate from "components/InputDate";
import Select from "react-select";
import FormItemLabel from "antd/lib/form/FormItemLabel";
import SubmitButton from "components/SubmitButton";
import { validationDefault } from "./validate";
import * as Yup from "yup";
import { useApi } from "utils/api";
import { useAppSelector } from "app/store";

export const InfoTable = ({ data }: any) => {
  return <PatientInfoTable data={data} />;
};

export const formatDob = (dob: any, type?: any) => {
  if (!dob) return "";

  if (type === "dashes") {
    if (dob.indexOf("/") === -1) return dob;
    const [mm, dd, yyyy] = dob.split("/");
    return `${yyyy}-${mm}-${dd}`;
  }

  if (dob.indexOf("/") >= 0) return dob;
  if (dob.indexOf("-") === -1) return dob;
  const [yyyy, mm, dd] = dob.split("-");
  console.log(yyyy, mm, dd);
  return `${mm}/${dd}/${yyyy}`;
};

function PatientInfoTable({ data }: { data: any }): ReactElement {
  const account = useAppSelector((state) => state.account);
  const api = useApi();
  const formik = useFormik({
    initialValues: {
      fullName: data.fullName || "",
      email: data.email || "",
      identity: data.identity || "",
      phone: data.phone || "",
      gender: data.gender || "",
      ethnic: data.ethnic || "",
      dob: formatDob(data.dob),
      street: data.street || "",
      ward: data.ward || "",
      district: data.district || "",
      province: data.province || "",
    },
    // validationSchema: Yup.object().shape(validationDefault),
    onSubmit: (values) => {
      console.log(values);
      api.post(`/user/${account.id}`, values).then(() => message.success("Cập nhật hồ sơ thành công"));
      console.log('hehe');
    },
  });

  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (formik.values.province)
      fetch(`https://provinces.open-api.vn/api/p/${formik.values.province}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts));
  }, [formik.values.province]);

  useEffect(() => {
    if (formik.values.district)
      fetch(`https://provinces.open-api.vn/api/d/${formik.values.district}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards));
  }, [formik.values.district]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="columns">
        <div className="column">
          <div className="label">Họ và tên</div>
          <input className="input-text" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} placeholder="Full name" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="label">Email</div>
          <input className="input-text" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email" />
        </div>
        <div className="column">
          <div className="label">Căn cước công dân</div>
          <input className="input-text" name="identity" value={formik.values.identity} onChange={formik.handleChange} placeholder="Identity number" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="label">Giới tính</div>
          <select className="input-text" name="gender" value={formik.values.gender} onChange={formik.handleChange} placeholder="Gender">
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
        <div className="column">
          <div className="label">Dân tộc</div>
          <input className="input-text" name="ethnic" value={formik.values.ethnic} onChange={formik.handleChange} placeholder="Ethnic" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="label">Ngày sinh</div>
          <InputDate default_value={formik.values.dob} event_handler={formik.handleChange} />
        </div>

        <div className="column">
          <div className="label">Số điện thoại</div>
          <input className="input-text" name="phone" value={formik.values.phone} onChange={formik.handleChange} placeholder="Phone number" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="label">Địa chỉ</div>
          <input className="input-text" name="street" value={formik.values.street} onChange={formik.handleChange} placeholder="Address" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="label">Tỉnh/Thành phố</div>
          <Select
            placeholder="Province..."
            getOptionLabel={(e: any) => e.name}
            getOptionValue={(e: any) => e.code}
            options={provinces}
            isClearable
            name="province"
            onChange={(value) => formik.setFieldValue("province", value.code)}
          />
        </div>
        <div className="column">
          <div className="label">Quận/Huyện</div>
          <Select
            placeholder="District..."
            getOptionLabel={(e: any) => e.name}
            getOptionValue={(e: any) => e.code}
            isClearable
            options={districts}
            name="district"
            onChange={(value) => formik.setFieldValue("district", value.code)}
          />
        </div>
        <div className="column">
          <div className="label">Phường/Xã</div>
          <Select
            placeholder="Ward..."
            getOptionLabel={(e: any) => e.name}
            getOptionValue={(e: any) => e.code}
            isClearable
            options={wards}
            name="ward"
            onChange={(value) => formik.setFieldValue("ward", value.code)}
          />
        </div>
      </div>
      <SubmitButton type="submit">Lưu thay đổi</SubmitButton>
    </form>
  );
}
