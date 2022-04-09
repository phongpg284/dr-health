import "./threshold.scss"
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd"

// icon

import { IconType } from "react-icons";
import { BiGitCommit, BiSend, BiStats, BiBlock, BiCheck } from "react-icons/bi"
import { ExclamationCircleOutlined } from "@ant-design/icons";

// other

import { GET_PATIENT, GET_PATIENT_DEVICE, UPDATE_THRESHOLD } from "./schema"

const { confirm } = Modal

interface ThresholdCardProps {
    id: string;
    type: string;
    unit: string;
    Icon: IconType;
    property: number;
    color: string[];
}

/*
* 0: SpO2
* 1: Blood press
* 2: Heart rate
* 3: Body temp
*/

export const ThresholdCard: React.FC<ThresholdCardProps> = ({ id, property, unit, Icon, type, color }) => {
    const [getPatient, { data: patient }] = useLazyQuery(GET_PATIENT);
    const [getDevice, { data: patientDevice }] = useLazyQuery(GET_PATIENT_DEVICE);

    const [updateThreshold] = useMutation(UPDATE_THRESHOLD)

    const [current, setCurrent] = useState([0, 0])
    const [threshold, setThreshold] = useState([0, 0, 0, 0])

    const changeButton = useRef<HTMLDivElement>(null)
    const actionButtons = useRef<HTMLDivElement>(null)
    const inputReplace_dias = useRef<HTMLDivElement>(null)
    const inputReplace_sis = useRef<HTMLDivElement>(null)
    const inputReplace = useRef<HTMLDivElement>(null)

    const thresholdInput = useRef<HTMLInputElement>(null)
    const diasThreshold = useRef<HTMLInputElement>(null)
    const diasThresholdMin = useRef<HTMLInputElement>(null)
    const diasThresholdMax = useRef<HTMLInputElement>(null)
    const sisThreshold = useRef<HTMLInputElement>(null)
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
        if (inputReplace_dias && inputReplace_dias.current && !inputReplace_dias.current.classList.contains("threshold_hidden")) {
            inputReplace_dias.current.classList.add("threshold_hidden")
        }
        if (inputReplace_sis && inputReplace_sis.current && !inputReplace_sis.current.classList.contains("threshold_hidden")) {
            inputReplace_sis.current.classList.add("threshold_hidden")
        }
        // Show input number
        if (thresholdInput && thresholdInput.current) {
            thresholdInput.current.classList.remove("threshold_hidden")
            thresholdInput.current.value = threshold[0].toString()
            thresholdInput.current.focus()
        }
        if (diasThreshold && diasThreshold.current) {
            diasThreshold.current.classList.remove("threshold_hidden")
            if (diasThresholdMin && diasThresholdMin.current) {
                diasThresholdMin.current.focus()
            }
        }
        if (sisThreshold && sisThreshold.current) {
            sisThreshold.current.classList.remove("threshold_hidden")
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
        if (inputReplace_dias && inputReplace_dias.current) {
            inputReplace_dias.current.classList.remove("threshold_hidden")
        }
        if (inputReplace_sis && inputReplace_sis.current) {
            inputReplace_sis.current.classList.remove("threshold_hidden")
        }
        // Hide input number
        if (thresholdInput && thresholdInput.current && !thresholdInput.current.classList.contains("threshold_hidden")) {
            thresholdInput.current.classList.add("threshold_hidden")
        }
        if (diasThreshold && diasThreshold.current && !diasThreshold.current.classList.contains("threshold_hidden")) {
            diasThreshold.current.classList.add("threshold_hidden")
        }
        if (sisThreshold && sisThreshold.current && !sisThreshold.current.classList.contains("threshold_hidden")) {
            sisThreshold.current.classList.add("threshold_hidden")
        }
    }
    function onApplyNumberButton() {
        switch (property) {
            case 0: {
                setThreshold([Number(thresholdInput.current?.value)])
                updateThreshold({
                    variables: {
                        value: Number(thresholdInput.current?.value),
                        property: 1,
                        id: patient.getPatient.deviceId,
                    }
                })
                break;
            }
            case 1: {
                setThreshold([
                    Number(diasThresholdMin.current?.value),
                    Number(diasThresholdMax.current?.value),
                    Number(sisThresholdMin.current?.value),
                    Number(sisThresholdMax.current?.value),
                ])
                updateThreshold({
                    variables: {
                        value: Number(diasThresholdMin.current?.value),
                        property: 4,
                        id: patient.getPatient.deviceId,
                    }
                })
                updateThreshold({
                    variables: {
                        value: Number(diasThresholdMax.current?.value),
                        property: 5,
                        id: patient.getPatient.deviceId,
                    }
                })
                updateThreshold({
                    variables: {
                        value: Number(sisThresholdMin.current?.value),
                        property: 6,
                        id: patient.getPatient.deviceId,
                    }
                })
                updateThreshold({
                    variables: {
                        value: Number(sisThresholdMax.current?.value),
                        property: 7,
                        id: patient.getPatient.deviceId,
                    }
                })
                break;
            }
            case 2: {
                setThreshold([Number(thresholdInput.current?.value)])
                updateThreshold({
                    variables: {
                        value: Number(thresholdInput.current?.value),
                        property: 2,
                        id: patient.getPatient.deviceId,
                    }
                })
                break;
            }
            case 3: {
                setThreshold([Number(thresholdInput.current?.value)])
                updateThreshold({
                    variables: {
                        value: Number(thresholdInput.current?.value),
                        property: 3,
                        id: patient.getPatient.deviceId,
                    }
                })
                break;
            }
        }

        onDenyChangeClick()
    }
    function showConfirm() {
        confirm({
            title: `Đồng ý thay đổi tham chiếu ${type}?`,
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

    const className = [
        "threshold_card_spo2",
        "threshold_card_blood",
        "threshold_card_heart",
        "threshold_card_temp",
    ]

    useEffect(() => {
        if (id) {
            getPatient({
                variables: {
                    id: id
                }
            })
        }

    }, [])

    useEffect(() => {
        if (patient) {
            getDevice({
                variables: {
                    id: patient.getPatient?.deviceId
                }
            })
        }
    }, [patient])

    useEffect(() => {
        if (patientDevice) {
            switch (property) {
                case 0: {
                    if (patientDevice.getDevice.SpO2?.[0]?.data)
                        setCurrent([patientDevice.getDevice.SpO2?.[0]?.data])
                    if (patientDevice.getDevice.SpO2Threshold)
                        setThreshold([patientDevice.getDevice.SpO2Threshold])
                    break;
                }
                case 1: {
                    if (
                        patientDevice.getDevice?.diastole?.[0]?.data &&
                        patientDevice.getDevice?.systolic?.[0]?.data
                    )
                        setCurrent([
                            patientDevice.getDevice.diastole[0]?.data,
                            patientDevice.getDevice.systolic[0]?.data
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
                    if (patientDevice.getDevice.heartRate?.[0]?.data)
                        setCurrent([patientDevice.getDevice.heartRate?.[0]?.data])
                    if (patientDevice.getDevice.heartRateThreshold)
                        setThreshold([patientDevice.getDevice.heartRateThreshold])
                    break;
                }
                case 3: {
                    if (patientDevice.getDevice.bodyTemp?.[0]?.data)
                        setCurrent([patientDevice.getDevice.bodyTemp?.[0]?.data])
                    if (patientDevice.getDevice.bodyTempThreshold)
                        setThreshold([patientDevice.getDevice.bodyTempThreshold])
                    break;
                }
            }
        }
    }, [patientDevice])

    return (<>
        <div className={"threshold_card" + " " + className[property]}>
            <div className="threshold_card_back" style={{ borderRadius: "20px", border: `5px ${color[0]} solid` }}></div>
            <div className="threshold_card_items">
                <div className="thresholdrow threshold_space" style={{ flexWrap: "nowrap" }}>
                    <div className="threshold_card_item" style={{ color: color[0] }}>
                        <Icon />&nbsp;{type}
                    </div>
                    <div className="threshold_card_item threshold_card_change_button" ref={changeButton} style={{ color: color[0] }} onClick={onNumberChangeClick}>
                        Thay đổi
                    </div>
                    <div className="thresholdrow threshold_card_action_button threshold_hidden" ref={actionButtons} style={{ color: color[0] }}>
                        <BiBlock onClick={onDenyChangeClick} />
                        <BiCheck style={{ fontSize: "32px" }} onClick={showConfirm} />
                    </div>
                </div>
                {!(property == 1) && (
                    <>
                        <div className="threshold_card_item threshold_title" style={{ marginTop: "10px" }}>
                            Hiện tại
                        </div>
                        <div className="thresholdrow threshold_space" style={{ fontSize: "40px" }}>
                            <BiSend style={{ color: color[0] }} />
                            <div className="threshold_card_item_box threshold_card_item_box_notblood" style={{ height: "120px", width: "120px", marginTop: "10px" }}>
                                <span className="threshold_card_item_box_title" style={{ color: color[1] }}><BiGitCommit /> Hiện tại</span>
                                <span className="threshold_card_item_box_content" >{current[0]}</span>
                                <span className="threshold_card_item_box_unit">{unit}</span>
                            </div>
                            <BiSend style={{ transform: "rotate(180deg)", color: color[0] }} />
                        </div>
                    </>
                )}
                {(property == 1) && (
                    <>
                        <div className="threshold_card_item threshold_title" style={{ marginTop: "10px" }}>
                            Tâm trương
                        </div>
                        <div className="threshold_card_item_box threshold_card_item_box_isblood" style={{ height: "100px", width: "100%", marginTop: "10px" }}>
                            <div className="thresholdcolumn" style={{ marginLeft: "30px" }}>
                                <span className="threshold_card_item_box_title" style={{ color: color[1] }}><BiGitCommit /> Hiện tại</span>
                                <span className="threshold_card_item_box_content">{current[0]}</span>
                                <span className="threshold_card_item_box_unit">{unit}</span>
                            </div>
                            <div className="thresholdcolumn" style={{ marginRight: "20px" }}>
                                <span className="threshold_card_item_box_title" style={{ color: color[2] }}><BiStats /> Vùng tham chiếu</span>
                                <span className="threshold_card_item_box_content" ref={inputReplace_dias}>{threshold[0]} - {threshold[1]}</span>
                                <span className="thresholdrow threshold_card_item_box_content threshold_hidden" ref={diasThreshold}>
                                    <input type="number" className="threshold_card_input_threshold" ref={diasThresholdMin} />
                                    <span>&nbsp;-&nbsp;</span>
                                    <input type="number" className="threshold_card_input_threshold" ref={diasThresholdMax} />
                                </span>
                                <span className="threshold_card_item_box_unit">{unit}</span>
                            </div>
                        </div>
                        <div className="threshold_card_item threshold_title" style={{ marginTop: "10px" }}>
                            Tâm thu
                        </div>
                        <div className="threshold_card_item_box threshold_card_item_box_isblood" style={{ height: "100px", width: "100%", marginTop: "10px" }}>
                            <div className="thresholdcolumn" style={{ marginLeft: "30px" }}>
                                <span className="threshold_card_item_box_title" style={{ color: color[1] }}><BiGitCommit /> Hiện tại</span>
                                <span className="threshold_card_item_box_content" style={{ color: (current[1] < threshold[2] || current[1] > threshold[3]) ? color[4] : "black" }}>{current[1]}</span>
                                <span className="threshold_card_item_box_unit">{unit}</span>
                            </div>
                            <div className="thresholdcolumn" style={{ marginRight: "20px" }}>
                                <span className="threshold_card_item_box_title" style={{ color: color[2] }}><BiStats /> Vùng tham chiếu</span>
                                <span className="threshold_card_item_box_content" ref={inputReplace_sis}>{threshold[2]} - {threshold[3]}</span>
                                <span className="thresholdrow threshold_card_item_box_content threshold_hidden" ref={sisThreshold}>
                                    <input type="number" className="threshold_card_input_threshold" ref={sisThresholdMin} />
                                    <span>&nbsp;-&nbsp;</span>
                                    <input type="number" className="threshold_card_input_threshold" ref={sisThresholdMax} />
                                </span>
                                <span className="threshold_card_item_box_unit">{unit}</span>
                            </div>
                        </div>
                    </>
                )}
                {!(property == 1) && (
                    <>
                        <div className="threshold_card_item threshold_title" style={{ marginTop: "10px" }}>
                            Tham chiếu
                        </div>
                        <div className="thresholdrow threshold_space" style={{ fontSize: "40px" }}>
                            <BiSend style={{ color: color[0] }} />
                            <div className="threshold_card_item_box threshold_card_item_box_notblood" style={{ height: "120px", width: "120px" }}>
                                <span className="threshold_card_item_box_title" style={{ color: color[2] }}><BiStats /> Tham chiếu</span>
                                <span className="threshold_card_item_box_content"ref={inputReplace}>{threshold[0]}</span>
                                <input className="threshold_card_input_threshold threshold_hidden" ref={thresholdInput} />
                                <span className="threshold_card_item_box_unit">{unit}</span>
                            </div>
                            <BiSend style={{ transform: "rotate(180deg)", color: color[0] }} />
                        </div>
                    </>
                )}
                {/* <div className="threshold_card_item threshold_title" style={{ marginTop: (property == 1) ? "10px" : "0" }}>
                    Kết luận
                </div>
                <div className="thresholdrow threshold_card_item_row" style={{ marginTop: "10px" }}>
                    <TextArea rows={2} className="threshold_card_item_input" />
                    <div className="threshold_card_item_input_enter" style={{ color: color[0] }}>Gửi</div>
                </div> */}
            </div>
        </div>
    </>)
}