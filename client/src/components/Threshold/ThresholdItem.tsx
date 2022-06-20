import "./threshold.scss"
import { Input } from 'antd';
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd"

//other

import { IconType } from "react-icons/lib";

//icon

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { BiCheckCircle, BiGitCommit, BiMinus, BiPyramid, BiSend, BiShapePolygon, BiStats, BiSticker } from "react-icons/bi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";


interface ThresholdItemProps {
    id: string;
    type: string;
    Icon: IconType;
    property: number;
    color: string[];
    unit: string;
}

const { TextArea } = Input;

const { confirm } = Modal

export const ThresholdItem: React.FC<ThresholdItemProps> = ({ id, type, property, color, Icon, unit }) => {
    // const [getPatient, { data: patient }] = useLazyQuery(GET_PATIENT);
    // const [getDevice, { data: patientDevice }] = useLazyQuery(GET_PATIENT_DEVICE);
    const patient:any = {};
    const patientDevice:any = {};

    // const [updateThreshold] = useMutation(UPDATE_THRESHOLD)

    const [current, setCurrent] = useState([0, 0])
    const [threshold, setThreshold] = useState([0, 0, 0, 0])

    const changeButton = useRef<HTMLDivElement>(null)
    const actionButtons = useRef<HTMLDivElement>(null)
    const inputReplace_dias_min = useRef<HTMLDivElement>(null)
    const inputReplace_dias_max = useRef<HTMLDivElement>(null)
    const inputReplace_sis_min = useRef<HTMLDivElement>(null)
    const inputReplace_sis_max = useRef<HTMLDivElement>(null)
    const inputReplace = useRef<HTMLDivElement>(null)

    const thresholdInput = useRef<HTMLInputElement>(null)
    const diasThresholdMin = useRef<HTMLInputElement>(null)
    const diasThresholdMax = useRef<HTMLInputElement>(null)
    const sisThresholdMin = useRef<HTMLInputElement>(null)
    const sisThresholdMax = useRef<HTMLInputElement>(null)

    function onNumberChangeClick() {
        // Hide "Thay đổi" / Show actions button
        if (changeButton && changeButton.current && !changeButton.current.classList.contains("threshold_hidden")) {
            changeButton.current.classList.add("threshold_hidden")
        }
        if (actionButtons && actionButtons.current) {
            actionButtons.current.classList.remove("threshold_hidden")
        }
        // Hide current number
        if (inputReplace && inputReplace.current && !inputReplace.current.classList.contains("threshold_hidden")) {
            inputReplace.current.classList.add("threshold_hidden")
        }
        if (inputReplace_dias_min && inputReplace_dias_min.current && !inputReplace_dias_min.current.classList.contains("threshold_hidden")) {
            inputReplace_dias_min.current.classList.add("threshold_hidden")
        }
        if (inputReplace_sis_min && inputReplace_sis_min.current && !inputReplace_sis_min.current.classList.contains("threshold_hidden")) {
            inputReplace_sis_min.current.classList.add("threshold_hidden")
        }
        if (inputReplace_dias_max && inputReplace_dias_max.current && !inputReplace_dias_max.current.classList.contains("threshold_hidden")) {
            inputReplace_dias_max.current.classList.add("threshold_hidden")
        }
        if (inputReplace_sis_max && inputReplace_sis_max.current && !inputReplace_sis_max.current.classList.contains("threshold_hidden")) {
            inputReplace_sis_max.current.classList.add("threshold_hidden")
        }
        // Show input number
        if (thresholdInput && thresholdInput.current) {
            thresholdInput.current.classList.remove("threshold_hidden")
            thresholdInput.current.value = threshold[0].toString()
            thresholdInput.current.focus()
        }
        if (diasThresholdMin && diasThresholdMin.current) {
            diasThresholdMin.current.classList.remove("threshold_hidden")
            diasThresholdMin.current.focus()
        }
        if (diasThresholdMax && diasThresholdMax.current) {
            diasThresholdMax.current.classList.remove("threshold_hidden")
        }
        if (sisThresholdMin && sisThresholdMin.current) {
            sisThresholdMin.current.classList.remove("threshold_hidden")
            sisThresholdMin.current.focus()
        }
        if (sisThresholdMax && sisThresholdMax.current) {
            sisThresholdMax.current.classList.remove("threshold_hidden")
        }
        // Set default value
        if (diasThresholdMin && diasThresholdMin.current) {
            diasThresholdMin.current.value = threshold[0].toString()
        }
        if (diasThresholdMax && diasThresholdMax.current) {
            diasThresholdMax.current.value = threshold[1].toString()
        }
        if (sisThresholdMin && sisThresholdMin.current) {
            sisThresholdMin.current.value = threshold[2].toString()
        }
        if (sisThresholdMax && sisThresholdMax.current) {
            sisThresholdMax.current.value = threshold[3].toString()
        }
    }
    function onDenyChangeClick() {
        // Show "Thay đổi" / Hidden actions button
        if (changeButton && changeButton.current) {
            changeButton.current.classList.remove("threshold_hidden")
        }
        if (actionButtons && actionButtons.current && !actionButtons.current.classList.contains("threshold_hidden")) {
            actionButtons.current.classList.add("threshold_hidden")
        }
        // Show current number
        if (inputReplace && inputReplace.current) {
            inputReplace.current.classList.remove("threshold_hidden")
        }
        if (inputReplace_dias_min && inputReplace_dias_min.current) {
            inputReplace_dias_min.current.classList.remove("threshold_hidden")
        }
        if (inputReplace_dias_max && inputReplace_dias_max.current) {
            inputReplace_dias_max.current.classList.remove("threshold_hidden")
        }
        if (inputReplace_sis_min && inputReplace_sis_min.current) {
            inputReplace_sis_min.current.classList.remove("threshold_hidden")
        }
        if (inputReplace_sis_max && inputReplace_sis_max.current) {
            inputReplace_sis_max.current.classList.remove("threshold_hidden")
        }
        // Hide input number
        if (thresholdInput && thresholdInput.current && !thresholdInput.current.classList.contains("threshold_hidden")) {
            thresholdInput.current.classList.add("threshold_hidden")
        }
        if (diasThresholdMin && diasThresholdMin.current && !diasThresholdMin.current.classList.contains("threshold_hidden")) {
            diasThresholdMin.current.classList.add("threshold_hidden")
        }
        if (diasThresholdMax && diasThresholdMax.current && !diasThresholdMax.current.classList.contains("threshold_hidden")) {
            diasThresholdMax.current.classList.add("threshold_hidden")
        }
        if (sisThresholdMin && sisThresholdMin.current && !sisThresholdMin.current.classList.contains("threshold_hidden")) {
            sisThresholdMin.current.classList.add("threshold_hidden")
        }
        if (sisThresholdMax && sisThresholdMax.current && !sisThresholdMax.current.classList.contains("threshold_hidden")) {
            sisThresholdMax.current.classList.add("threshold_hidden")
        }
    }
    function onApplyNumberButton() {
        switch (property) {
            case 0: {
                setThreshold([Number(thresholdInput.current?.value)])
                // updateThreshold({
                //     variables: {
                //         value: Number(thresholdInput.current?.value),
                //         property: 1,
                //         id: patient.getPatient.deviceId,
                //     }
                // })
                break;
            }
            case 1: {
                setThreshold([
                    Number(diasThresholdMin.current?.value),
                    Number(diasThresholdMax.current?.value),
                    Number(sisThresholdMin.current?.value),
                    Number(sisThresholdMax.current?.value),
                ])
                // updateThreshold({
                //     variables: {
                //         value: Number(diasThresholdMin.current?.value),
                //         property: 6,
                //         id: patient.getPatient.deviceId,
                //     }
                // })
                // updateThreshold({
                //     variables: {
                //         value: Number(diasThresholdMax.current?.value),
                //         property: 5,
                //         id: patient.getPatient.deviceId,
                //     }
                // })
                // updateThreshold({
                //     variables: {
                //         value: Number(sisThresholdMin.current?.value),
                //         property: 8,
                //         id: patient.getPatient.deviceId,
                //     }
                // })
                // updateThreshold({
                //     variables: {
                //         value: Number(sisThresholdMax.current?.value),
                //         property: 7,
                //         id: patient.getPatient.deviceId,
                //     }
                // })
                break;
            }
            case 2: {
                setThreshold([Number(thresholdInput.current?.value)])
                // updateThreshold({
                //     variables: {
                //         value: Number(thresholdInput.current?.value),
                //         property: 2,
                //         id: patient.getPatient.deviceId,
                //     }
                // })
                break;
            }
            case 3: {
                setThreshold([Number(thresholdInput.current?.value)])
                // updateThreshold({
                //     variables: {
                //         value: Number(thresholdInput.current?.value),
                //         property: 3,
                //         id: patient.getPatient.deviceId,
                //     }
                // })
                break;
            }
        }

        onDenyChangeClick()
    }
    function showConfirm() {
        confirm({
            title: `Đồng ý thay đổi ngưỡng ${type}?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Thay đổi sẽ được gửi đến cho bệnh nhân!',
            onOk() {
                onApplyNumberButton()
            },
            onCancel() {
                onDenyChangeClick()
            },
        });
    }
    useEffect(() => {
        if (id) {
            // getPatient({
            //     variables: {
            //         id: id
            //     }
            // })
        }
    }, [])

    useEffect(() => {
        if (patient) {
            // getDevice({
            //     variables: {
            //         id: patient.getPatient.deviceId
            //     }
            // })
        }
    }, [patient])

    useEffect(() => {
        if (patientDevice) {
            switch (property) {
                case 0: {
                    if (patientDevice.getDevice.SpO2[0]?.data)
                        setCurrent([patientDevice.getDevice.SpO2[0]?.data])
                    if (patientDevice.getDevice.SpO2Threshold)
                        setThreshold([patientDevice.getDevice.SpO2Threshold])
                    break;
                }
                case 1: {
                    if (
                        patientDevice.getDevice.diastole[0].data &&
                        patientDevice.getDevice.systolic[0].data
                    )
                        setCurrent([
                            patientDevice.getDevice.diastole[0].data,
                            patientDevice.getDevice.systolic[0].data
                        ])
                    if (
                        patientDevice.getDevice.diasLowThreshold &&
                        patientDevice.getDevice.diasHighThreshold &&
                        patientDevice.getDevice.sysLowThreshold &&
                        patientDevice.getDevice.sysHighThreshold
                    )
                        setThreshold([
                            patientDevice.getDevice.diasLowThreshold,
                            patientDevice.getDevice.diasHighThreshold,
                            patientDevice.getDevice.sysLowThreshold,
                            patientDevice.getDevice.sysHighThreshold,
                        ])
                    break;
                }
                case 2: {
                    if (patientDevice.getDevice.heartRate[0]?.data)
                        setCurrent([patientDevice.getDevice.heartRate[0]?.data])
                    if (patientDevice.getDevice.heartRateThreshold)
                        setThreshold([patientDevice.getDevice.heartRateThreshold])
                    break;
                }
                case 3: {
                    if (patientDevice.getDevice.bodyTemp[0]?.data)
                        setCurrent([patientDevice.getDevice.bodyTemp[0]?.data])
                    if (patientDevice.getDevice.bodyTempThreshold)
                        setThreshold([patientDevice.getDevice.bodyTempThreshold])
                    break;
                }
            }
        }
    }, [patientDevice])
    console.log(patient);


    return (<>
        <div className="threshold_item th_justart" style={{ marginTop: property != 0 && property != 3 ? "0px" : "60px" }}>
            <div className="threshold_block_1 threshold_column th_shadow" style={{ height: "90px", border: `3px solid ${color[0]}` }}>
                <div className="threshold_cirleType" style={{ backgroundColor: color[0] }}><Icon /></div>
                <div className="threshold_row th_juround" style={{ width: "50%", marginTop: "5px" }}>
                    <div className="threshold_name" style={{ color: color[0], marginRight: "10px" }}><BiSend /></div>
                    <div className="threshold_name" style={{ color: color[0] }}>{type}</div>
                </div>
            </div>
            {property != 1 && (<div className="threshold_row th_jubet" style={{ width: "100%" }}>
                <div className="threshold_block_2 threshold_column th_shadow th_justart th_alstart" style={{ height: "160px", marginTop: "10px", border: `3px solid ${color[2]}` }}>
                    <div className="threshold_title" style={{ marginLeft: "20px", marginTop: "10px" }}><BiGitCommit style={{ color: color[1] }} /> Hiện tại</div>
                    <div className="threshold_row" style={{ width: "100%", marginTop: "10px" }}>
                        <div className="threshold_content threshold_cirle" style={{ border: `4px solid ${color[2]}` }}>
                            <div className="threshold_content_num" style={{ marginTop: "10px" }}>{current[0]}</div>
                            <div className="threshold_content_min">{unit}</div>
                        </div>
                    </div>
                </div>
                <div className="threshold_block_2 threshold_column th_shadow th_justart th_alstart" style={{ height: "160px", marginTop: "10px", border: `3px solid ${color[2]}` }}>
                    <div className="threshold_title" style={{ marginLeft: "20px", marginTop: "10px" }}><BiStats style={{ color: color[1] }} /> Ngưỡng</div>
                    <div className="threshold_row" style={{ width: "100%", marginTop: "10px" }}>
                        <div className="threshold_content threshold_cirle" style={{ border: `4px solid ${color[2]}` }}>
                            <input className="threshold_content_num threshold_content_input threshold_hidden" style={{ marginTop: "10px" }} ref={thresholdInput} />
                            <div className="threshold_content_num" style={{ marginTop: "10px" }} ref={inputReplace}>{threshold[0]}</div>
                            <div className="threshold_content_min">{unit}</div>
                        </div>
                    </div>
                </div>
            </div>)}
            {property == 1 && (<>
                <div className="threshold_block_1 threshold_column th_shadow th_justart th_alstart" style={{ height: "110px", marginTop: "10px", border: `3px solid ${color[2]}` }}>
                    <div className="threshold_title" style={{ marginLeft: "20px", marginTop: "10px" }}><BiPyramid style={{ color: color[1] }} /> Tâm trương</div>
                    <div className="threshold_row" style={{ width: "100%", marginTop: "10px" }}>
                        <div className="threshold_content threshold_row th_jubet" style={{ width: "80%" }}>
                            <div className="threshold_column">
                                <div className="threshold_content_num">{current[0]}</div>
                                <div className="threshold_content_min">{unit}</div>
                            </div>
                            <div className="threshold_row">
                                <div className="threshold_column">
                                    <input className="threshold_content_num threshold_content_input threshold_hidden" ref={diasThresholdMin} />
                                    <div className="threshold_content_num" ref={inputReplace_dias_min}>{threshold[0]}</div>
                                    <div className="threshold_content_min">{unit}</div>
                                </div>
                                &nbsp;
                                <BiMinus />
                                &nbsp;
                                <div className="threshold_column">
                                    <input className="threshold_content_num threshold_content_input threshold_hidden" ref={diasThresholdMax} />
                                    <div className="threshold_content_num" ref={inputReplace_dias_max}>{threshold[1]}</div>
                                    <div className="threshold_content_min">{unit}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="threshold_block_1 threshold_column th_shadow th_justart th_alstart" style={{ height: "110px", marginTop: "10px", border: `3px solid ${color[2]}` }}>
                    <div className="threshold_title" style={{ marginLeft: "20px", marginTop: "10px" }}><BiSticker style={{ color: color[1] }} /> Tâm thu</div>
                    <div className="threshold_row" style={{ width: "100%", marginTop: "10px" }}>
                        <div className="threshold_content threshold_row th_jubet" style={{ width: "80%" }}>
                            <div className="threshold_column">
                                <div className="threshold_content_num">{current[1]}</div>
                                <div className="threshold_content_min">{unit}</div>
                            </div>
                            <div className="threshold_row">
                                <div className="threshold_column">
                                    <input className="threshold_content_num threshold_content_input threshold_hidden" ref={sisThresholdMin} />
                                    <div className="threshold_content_num" ref={inputReplace_sis_min}>{threshold[2]}</div>
                                    <div className="threshold_content_min">{unit}</div>
                                </div>
                                &nbsp;
                                <BiMinus />
                                &nbsp;
                                <div className="threshold_column">
                                    <input className="threshold_content_num threshold_content_input threshold_hidden" ref={sisThresholdMax} />
                                    <div className="threshold_content_num" ref={inputReplace_sis_max}>{threshold[3]}</div>
                                    <div className="threshold_content_min">{unit}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
            <div className="threshold_row th_jubet threshold_hidden threshold_button_actions" style={{ width: "100%" }} ref={actionButtons}>
                <div className="threshold_block_2 threshold_row th_shadow threshold_change" style={{ height: "50px", marginTop: "10px", color: color[0], border: `2px solid ${color[0]}` }}
                    onClick={onDenyChangeClick}
                >
                    <ImCancelCircle />&nbsp;<span style={{ fontSize: "17px" }}>Huỷ</span>
                </div>
                <div className="threshold_block_2 threshold_row th_shadow threshold_change threshold_button_actions" style={{ height: "50px", marginTop: "10px", color: color[0], border: `2px solid ${color[0]}` }}
                    onClick={showConfirm}
                >
                    <BiCheckCircle />&nbsp;<span style={{ fontSize: "17px" }}>Lưu</span>
                </div>
            </div>
            <div className="threshold_block_1 threshold_column th_shadow threshold_button threshold_change" style={{ height: "50px", marginTop: "10px", color: color[0], border: `2px solid ${color[0]}`, width: "100%" }} ref={changeButton}
                onClick={onNumberChangeClick}
            >
                Thay đổi
            </div>
            <div className="threshold_block_1 threshold_column th_shadow th_justart th_alstart" style={{ height: "130px", marginTop: "10px", border: `2px solid ${color[0]}` }}>
                <div className="threshold_title" style={{ marginLeft: "20px", marginTop: "10px", color: color[0] }}>Kết luận</div>
                <div className="threshold_row th_juround" style={{ width: "100%", marginTop: "10px" }}>
                    <TextArea className="threshold_textarea" rows={2} style={{ border: `2px solid ${color[0]}` }} />
                    <div className="threshold_button" style={{ color: color[0], border: `2px solid ${color[0]}` }}>Gửi</div>
                </div>
            </div>
        </div>
    </>)
}