import "./index.scss";
import dayjs from "dayjs";
import { message } from "antd";
import Select from "react-select";
import { ReactElement, useEffect, useState } from "react";
import { useAppSelector } from "app/store";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputDate from "components/InputDate";
import SubmitButton from "components/SubmitButton";
import { useApi } from "utils/api";
import { validationDefault } from "./validate";

export const InfoTable = ({ data }: any) => {
  return <PatientInfoTable data={data} />;
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
      dob: dayjs(data.dob).format('DD/MM/YYYY'),
      address: {
        location: data.address.location || "",
        ward: data.address.ward || "",
        wardCode: data.address.wardCode || null,
        district: data.address.district || "",
        districtCode: data.address.districtCode || null,
        province: data.address.province || "",
        provinceCode: data.address.provinceCode || null,
      }
    },
    // validationSchema: Yup.object().shape(validationDefault),
    onSubmit: (values) => {
      api
        .post(`/user/${account.id}`, values)
        .then(() => message.success("Cập nhật hồ sơ thành công"))
        .catch(() => message.error("Cập nhật lỗi"));
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
    console.log(formik.values);
    if (formik.values.address.provinceCode)
      fetch(`https://provinces.open-api.vn/api/p/${formik.values.address.provinceCode}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts));
  }, [formik.values.address.provinceCode]);

  useEffect(() => {
    if (formik.values.address.districtCode)
      fetch(`https://provinces.open-api.vn/api/d/${formik.values.address.districtCode}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards));
  }, [formik.values.address.districtCode]);


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
          <input className="input-text" name="address.location" value={formik.values.address.location} onChange={formik.handleChange} placeholder="Address" />
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
            defaultValue={{
              name: data.address?.province,
              code: data.address?.provinceCode,
            }}
            onChange={(value) => {
              console.log(value)
              formik.setFieldValue("address.province", value?.name)
              formik.setFieldValue("address.provinceCode", value?.code)
            }}
          />
        </div>
        <div className="column">
          <div className="label">Quận/Huyện</div>
          <Select
            placeholder="District..."
            getOptionLabel={(e: any) => e.name}
            getOptionValue={(e: any) => e.code}
            isClearable
            defaultValue={{
              name: data.address?.district ?? '',
              code: data.address?.districtCode ?? null,
            }}
            options={districts}
            name="district"
            onChange={(value) => {
              formik.setFieldValue("address.district", value?.name)
              formik.setFieldValue("address.districtCode", value?.code)
            }}          />
        </div>
        <div className="column">
          <div className="label">Phường/Xã</div>
          <Select
            placeholder="Ward..."
            getOptionLabel={(e: any) => e.name}
            getOptionValue={(e: any) => e.code}
            defaultValue={{
              name: data.address?.ward,
              code: data.address?.wardCode,
            }}
            isClearable
            options={wards}
            name="ward"
            onChange={(value) => {
              formik.setFieldValue("address.ward", value?.name)
              formik.setFieldValue("address.wardCode", value?.code)
            }}          />
        </div>
      </div>
      <SubmitButton type="submit">Lưu thay đổi</SubmitButton>
    </form>
  );
}
