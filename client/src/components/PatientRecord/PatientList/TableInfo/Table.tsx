import "./index.scss";
import { ReactElement, useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import useInput from "../useInput";
import { MdModeEditOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import usePromise from "utils/usePromise";

export const InfoTable = ({ data }: any) => {
    return <PatientInfoTable data={data} />;
};

function PatientInfoTable({ data }: { data: any }): ReactElement {
    const [fullName, editFullName, onChangeFullName, onConfirmFullName, onCancelFullName] = useInput("fullName", data.fullName, data._id);
    const [phone, editPhone, onChangePhone, onConfirmPhone, onCancelPhone] = useInput("phone", data.phone, data._id);
    const [relativePhone, editRelativePhone, onChangeRelativePhone, onConfirmRelativePhone, onCancelRelativePhone] = useInput("relativePhone", data.relativePhone, data._id);
    const [address, editAddress, onChangeAddress, onConfirmAddress, onCancelAddress] = useInput("address", data.address, data._id);
    const [email, editEmail, onChangeEmail, onConfirmEmail, onCancelEmail] = useInput("email", data.email, data._id);
    const [gender, editGender, onChangeGender, onConfirmGender, onCancelGender] = useInput("gender", data.gender, data._id);
    const [age, editAge, onChangeAge, onConfirmAge, onCancelAge] = useInput("age", data.age, data._id);
    const [bloodType, editBloodType, onChangeBloodType, onConfirmBloodType, onCancelBloodType] = useInput("bloodType", data.bloodType, data._id);
    const [birth, editBirth, onChangeBirth, onConfirmBirth, onCancelBirth] = useInput("birth", data.birth, data._id);
    const [street, editStreet, onChangeStreet, onConfirmStreet, onCancelStreet] = useInput("street", data.street, data._id);
    const [ward, editWard, onChangeWard, onConfirmWard, onCancelWard] = useInput("ward", data.ward, data._id);
    const [district, editDistrict, onChangeDistrict, onConfirmDistrict, onCancelDistrict] = useInput("district", data.district, data._id);
    const [province, editProvince, onChangeProvince, onConfirmProvince, onCancelProvince] = useInput("province", data.province, data._id);

    const [ethnic, editEthnic, onChangeEthnic, onConfirmEthnic, onCancelEthnic] = useInput("ethnic", data.ethnic, data._id);
    const [nationalId, editNationalId, onChangeNationalId, onConfirmNationalId, onCancelNationalId] = useInput("nationalId", data.nationalId, data._id);
    const [nationality, editNationality, onChangeNationality, onConfirmNationality, onCancelNationality] = useInput("nationality", data.nationality, data._id);
    const [job, editJob, onChangeJob, onConfirmJob, onCancelJob] = useInput("job", data.job, data._id);
    const [pathologicalDescription, editPathologicalDescription, onChangePathologicalDescription, onConfirmPathologicalDescription, onCancelPathologicalDescription] = useInput(
        "pathologicalDescription",
        data.pathologicalDescription,
        data._id
    );

    const [deviceData] = usePromise(`/device/${data.deviceId}`);
    const [isDeviceConnect, setIsDeviceConnect] = useState(false);

    useEffect(() => {
        if (deviceData.isConnect) setIsDeviceConnect(deviceData?.isConnect);
    }, [deviceData]);

    return (
        <div className="patient-info-table">
            <table className="table table-default ">
                <tbody>
                    <DataRow
                        label="Họ và tên"
                        isEdit={editFullName}
                        value={fullName || data.fullName}
                        onChange={onChangeFullName}
                        onConfirm={onConfirmFullName}
                        onCancel={onCancelFullName}
                    />
                    <DataRow label="Số điện thoại" isEdit={editPhone} value={phone || data.phone} onChange={onChangePhone} onConfirm={onConfirmPhone} onCancel={onCancelPhone} />
                    <DataRow
                        label="Số điện thoại người thân"
                        isEdit={editRelativePhone}
                        value={relativePhone || data.relativePhone}
                        onChange={onChangeRelativePhone}
                        onConfirm={onConfirmRelativePhone}
                        onCancel={onCancelRelativePhone}
                    />
                    <DataRow
                        label="Địa chỉ nhà"
                        isEdit={editAddress}
                        value={address || data.address}
                        onChange={onChangeAddress}
                        onConfirm={onConfirmAddress}
                        onCancel={onCancelAddress}
                    />
                    <DataRow label="Tên đường" isEdit={editStreet} value={street || data.street} onChange={onChangeStreet} onConfirm={onConfirmStreet} onCancel={onCancelStreet} />
                    <DataRow label="Phường/Xã" isEdit={editWard} value={ward || data.ward} onChange={onChangeWard} onConfirm={onConfirmWard} onCancel={onCancelWard} />

                    <DataRow
                        label="Quận/Huyện"
                        isEdit={editDistrict}
                        value={district || data.district}
                        onChange={onChangeDistrict}
                        onConfirm={onConfirmDistrict}
                        onCancel={onCancelDistrict}
                    />

                    <DataRow
                        label="Tỉnh/Thành phố"
                        isEdit={editProvince}
                        value={province || data.province}
                        onChange={onChangeProvince}
                        onConfirm={onConfirmProvince}
                        onCancel={onCancelProvince}
                    />
                    <DataRow label="Email" isEdit={editEmail} value={email || data.email} onChange={onChangeEmail} onConfirm={onConfirmEmail} onCancel={onCancelEmail} />
                    <DataRow label="Giới tính" isEdit={editGender} value={gender || data.gender} onChange={onChangeGender} onConfirm={onConfirmGender} onCancel={onCancelGender} />
                    <DataRow label="Tuổi" type="number" isEdit={editAge} value={age || data.age} onChange={onChangeAge} onConfirm={onConfirmAge} onCancel={onCancelAge} />
                    <DataRow
                        label="Nhóm máu"
                        isEdit={editBloodType}
                        value={bloodType || data.bloodType}
                        onChange={onChangeBloodType}
                        onConfirm={onConfirmBloodType}
                        onCancel={onCancelBloodType}
                    />
                    <DataRow
                        label="Ngày sinh"
                        type="date"
                        isEdit={editBirth}
                        value={birth || data.birth}
                        onChange={onChangeBirth}
                        onConfirm={onConfirmBirth}
                        onCancel={onCancelBirth}
                    />
                    <DataRow label="Dân tộc" value={ethnic || data.ethnic} isEdit={editEthnic} onChange={onChangeEthnic} onConfirm={onConfirmEthnic} onCancel={onCancelEthnic} />
                    <DataRow
                        label="CMND/CCCD"
                        value={nationalId || data.nationalId}
                        isEdit={editNationalId}
                        onChange={onChangeNationalId}
                        onConfirm={onConfirmNationalId}
                        onCancel={onCancelNationalId}
                    />
                    <DataRow
                        label="Quốc tịch"
                        value={nationality || data.nationality}
                        isEdit={editNationality}
                        onChange={onChangeNationality}
                        onConfirm={onConfirmNationality}
                        onCancel={onCancelNationality}
                    />
                    <DataRow label="Nghề nghiệp" value={job || data.job} isEdit={editJob} onChange={onChangeJob} onConfirm={onConfirmJob} onCancel={onCancelJob} />
                    <DataRow
                        label="Bệnh nền"
                        value={pathologicalDescription || data.pathologicalDescription}
                        isEdit={editPathologicalDescription}
                        onChange={onChangePathologicalDescription}
                        onConfirm={onConfirmPathologicalDescription}
                        onCancel={onCancelPathologicalDescription}
                    />

                    <DataRow label="Tình trạng thiết bị" value={isDeviceConnect ? "Đang kết nối" : "Không kết nối"} />
                </tbody>
            </table>
        </div>
    );
}

interface DataRowProps {
    label: string;
    value: any;
    isEdit?: boolean;
    onConfirm?: any;
    onCancel?: any;
    type?: string;
    onChange?: any;
}

function DataRow(props: DataRowProps) {
    const { label, value, isEdit, onConfirm, onCancel, type, onChange } = props;

    return (
        <tr className={isEdit ? "editable" : ""}>
            <td>
                <div className="labelSpace">
                    <span>{label}</span>
                </div>
            </td>
            <td>
                <div className="dataSpace">
                    {type === "date" &&
                        (isEdit ? <DatePicker className="input" onChange={onChange} format={"DD/MM/YYYY"} /> : <div className="data">{dayjs(value).format("DD/MM/YYYY")}</div>)}

                    {type !== "date" && (!isEdit ? <div className="data">{value}</div> : <input className="input" type={type || "text"} value={value} onChange={onChange} />)}
                </div>
            </td>
            <td>
                {isEdit !== undefined && (
                    <div className="btnSpace">
                        {!isEdit ? (
                            <button className="editBtn edit" onClick={onConfirm}>
                                <span>
                                    <MdModeEditOutline />
                                </span>
                            </button>
                        ) : (
                            <>
                                {" "}
                                <button className="editBtn confirm" onClick={onConfirm}>
                                    <span>
                                        <AiOutlineCheck />
                                    </span>
                                </button>
                                <button className="editBtn cancel" onClick={onCancel}>
                                    <span>
                                        <VscChromeClose />
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </td>
        </tr>
    );
}
