// import "./threshold.scss"
import "./antdcumstom.scss"
// import { useLazyQuery, useMutation } from "@apollo/client"
// import { useAppDispatch, useAppSelector } from "../../app/store";
// import { GET_PATIENT_DEVICE, GET_PATIENT, UPDATE_THRESHOLD } from "./schema";
// import React, { useEffect, useRef, useState } from "react";

// // antd

// import { Modal } from "antd"

// // icon

// import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { BiBlock, BiCheck } from 'react-icons/bi';

// const { confirm } = Modal

// interface DeviceType {
//     name: string;
// }
// interface ThresholdProps {
//     id: string;
// }
// interface ThresholdCardProps {
//     unit: string;
//     type: string;
//     current: number;
//     max: number;
// }
// interface ResultCardProps {
//     type: string;
// }

// export const Threshold: React.FC<ThresholdProps> = ({ id }) => {
//     const [getPatient, { data: patient }] = useLazyQuery(GET_PATIENT);
//     const [getDevice, { data: patientDevice }] = useLazyQuery(GET_PATIENT_DEVICE);
//     const [threshold, setThreshold] = useState([0, 0, 0, 0])
//     const [updateThreshold] = useMutation(UPDATE_THRESHOLD)

//     useEffect(() => {
//         if (id) {
//             getPatient({
//                 variables: {
//                     id: id
//                 }
//             })
//         }

//     }, [])

//     useEffect(() => {
//         if (patient) {
//             getDevice({
//                 variables: {
//                     id: patient.getPatient.deviceId
//                 }
//             })
//         }
//     }, [patient])

//     useEffect(() => {
//         if (patientDevice) {
//             setThreshold([
//                 patientDevice.getDevice.SpO2Threshold,
//                 patientDevice.getDevice.heartRateThreshold,
//                 patientDevice.getDevice.bodyTempThreshold,
//                 patientDevice.getDevice.bloodPressThreshold
//             ])
//         }
//     }, [patientDevice])

//     const ThresholdCard: React.FC<ThresholdCardProps> = ({ unit, type, current, max }) => {
//         const inputNumberMin = useRef<HTMLInputElement>(null)
//         const inputNumberMax = useRef<HTMLInputElement>(null)

//         const onSetNumberButton = useRef<HTMLDivElement>(null)
//         const onDenyNumberButton = useRef<HTMLDivElement>(null)
//         const onAcceptNumberButton = useRef<HTMLDivElement>(null)

//         const [currentType, setCurrentType] = useState("")
//         useEffect(() => {
//             switch (type) {
//                 case "SpO2": {
//                     setCurrentType("SpO2")
//                     break;
//                 }
//                 case "Heart Rate": {
//                     setCurrentType("Nhịp tim")
//                     break;
//                 }
//                 case "Body Temp": {
//                     setCurrentType("Nhiệt độ")
//                     break;
//                 }
//                 case "Blood Press": {
//                     setCurrentType("Huyết áp")
//                     break;
//                 }
//                 default: {
//                     break;
//                 }
//             }
//         }, [])
//         function hideEdit() {
//             if (inputNumberMin && inputNumberMin.current
//                 && inputNumberMax && inputNumberMax.current) {
//                 inputNumberMin.current.classList.remove("thresholdcard_number_change_toggle")
//                 inputNumberMax.current.classList.remove("thresholdcard_number_change_toggle")
//             }
//             if (onSetNumberButton && onSetNumberButton.current) {
//                 onSetNumberButton.current.classList.remove("threshold_hidden")
//             }
//             if (onAcceptNumberButton && onAcceptNumberButton.current && !onAcceptNumberButton.current.classList.contains("threshold_hidden")) {
//                 onAcceptNumberButton.current.classList.add("threshold_hidden")
//             }
//             if (onDenyNumberButton && onDenyNumberButton.current && !onDenyNumberButton.current.classList.contains("threshold_hidden")) {
//                 onDenyNumberButton.current.classList.add("threshold_hidden")
//             }
//         }
//         function onNumberChange() {
//             if (inputNumberMin && inputNumberMin.current && !inputNumberMin.current.classList.contains("thresholdcard_number_change_toggle")
//                 && inputNumberMax && inputNumberMax.current && !inputNumberMax.current.classList.contains("thresholdcard_number_change_toggle")) {
//                 inputNumberMin.current.classList.add("thresholdcard_number_change_toggle")
//                 inputNumberMax.current.classList.add("thresholdcard_number_change_toggle")
//                 inputNumberMin.current.focus()
//             }
//             if (onSetNumberButton && onSetNumberButton.current && !onSetNumberButton.current.classList.contains("thresholdcard_number_change_toggle")) {
//                 onSetNumberButton.current.classList.add("threshold_hidden")
//             }
//             if (onAcceptNumberButton && onAcceptNumberButton.current) {
//                 onAcceptNumberButton.current.classList.remove("threshold_hidden")
//             }
//             if (onDenyNumberButton && onDenyNumberButton.current) {
//                 onDenyNumberButton.current.classList.remove("threshold_hidden")
//             }

//         }
//         function inputAccept() {

//             //Wait back-end, Change later

//             if (inputNumberMin && inputNumberMin.current) {
//                 inputNumberMin.current.classList.remove("thresholdcard_number_change_toggle")
//                 switch (type) {
//                     case "SpO2": {
//                         setThreshold([Number(inputNumberMin.current?.value), threshold[1], threshold[2], threshold[3]])
//                         updateThreshold({
//                             variables: {
//                                 value: Number(inputNumberMin.current?.value),
//                                 property: 1,
//                                 id: patient.getPatient.deviceId,
//                             }
//                         })

//                         break;
//                     }
//                     case "Heart Rate": {
//                         setThreshold([threshold[0], Number(inputNumberMin.current?.value), threshold[2], threshold[3]])
//                         updateThreshold({
//                             variables: {
//                                 value: Number(inputNumberMin.current?.value),
//                                 property: 2,
//                                 id: patient.getPatient.deviceId,
//                             }
//                         })
//                         break;
//                     }
//                     case "Body Temp": {
//                         setThreshold([threshold[0], threshold[1], Number(inputNumberMin.current?.value), threshold[3]])
//                         updateThreshold({
//                             variables: {
//                                 value: Number(inputNumberMin.current?.value),
//                                 property: 3,
//                                 id: patient.getPatient.deviceId,
//                             }
//                         })
//                         break;
//                     }
//                     case "Blood Press": {
//                         setThreshold([threshold[0], threshold[1], threshold[2], Number(inputNumberMin.current?.value)])
//                         updateThreshold({
//                             variables: {
//                                 value: Number(inputNumberMin.current?.value),
//                                 property: 4,
//                                 id: patient.getPatient.deviceId,
//                             }
//                         })
//                         break;
//                     }
//                     default: {
//                         break;
//                     }
//                 }
//             }
//         }
        // function showConfirm() {
        //     confirm({
        //         title: `Đồng ý thay đổi ngưỡng ${currentType} thành ${inputNumberMin.current?.value} | ${inputNumberMax.current?.value}?`,
        //         icon: <ExclamationCircleOutlined />,
        //         content: 'Thay đổi sẽ được gửi đến cho bệnh nhân!',
        //         onOk() {
        //             inputAccept()
        //         },
        //         onCancel() {
        //             if (inputNumberMin && inputNumberMin.current) {
        //                 inputNumberMin.current.classList.remove("thresholdcard_number_change_toggle")
        //             }
        //             if (inputNumberMax && inputNumberMax.current) {
        //                 inputNumberMax.current.classList.remove("thresholdcard_number_change_toggle")
        //             }
        //         },
        //     });
        // }
//         return (<div className="thresholdcard thresholdrow">
//             <div className="thresholdcard_type"><span>{currentType}</span></div>
//             <div className="thresholdcard_back thresholdrow">
//                 <div className="thresholdrow">
//                     <div className="thresholdcard_title">Giá trị</div>
//                     <div className={"thresholdcard_number " + (current > max ? "thresholdcard_number_overthresh" : "")}>{current}</div>
//                     <strong>{unit}</strong>
//                 </div>
//                 <div className="thresholdcard_divider"></div>
//                 <div className="thresholdrow">
//                     <div className="thresholdcard_title">Ngưỡng</div>
//                     <div className="thresholdcard_number" style={{ width: "90px" }}>{`${max}`} | {`${max}`}
//                         <input className="thresholdcard_number_change" ref={inputNumberMin} style={{ left: "8px" }} />
//                         <input className="thresholdcard_number_change" ref={inputNumberMax} style={{ right: "8px" }} />
//                     </div>
//                     <strong>{unit}</strong>
//                 </div>
//                 <div className="thresholdcard_number_add" onClick={onNumberChange} ref={onSetNumberButton}>Đổi</div>
//                 <div className="thresholdcard_number_add threshold_hidden" onClick={hideEdit} ref={onDenyNumberButton} style={{ fontSize: "20px" }}><BiBlock /></div>
//                 <div className="thresholdcard_number_add threshold_hidden" onClick={showConfirm} ref={onAcceptNumberButton} style={{ fontSize: "20px" }}><BiCheck /></div>
//             </div>
//         </div>)
//     }
//     const ResultCard: React.FC<ResultCardProps> = ({ type }) => {
//         const [currentType, setCurrentType] = useState("")

//         const commentInput = useRef<HTMLInputElement>(null)

//         function commentValue() {
//             const value = commentInput.current?.value

//             //Set api comment here

//         }

//         useEffect(() => {
//             switch (type) {
//                 case "SpO2:": {
//                     setCurrentType("SpO2")
//                     break;
//                 }
//                 case "Heart Rate:": {
//                     setCurrentType("Nhịp tim")
//                     break;
//                 }
//                 case "Body Temp:": {
//                     setCurrentType("Nhiệt độ")
//                     break;
//                 }
//                 case "Blood Press:": {
//                     setCurrentType("Huyết áp")
//                     break;
//                 }
//                 default: {
//                     break;
//                 }
//             }
//         }, [])
//         return (<div className="thresholdcard thresholdrow thresholdresult">
//             <div className="thresholdcard_back thresholdrow thresholdresult_back" >
//                 <span>{currentType}</span>
//                 <input type="text" className="thresholdresult_text" placeholder="Kết luận ...   " ref={commentInput} />
//             </div>
//         </div>)
//     }

//     return (<>
//         <div className="threshold_all">
//             <div className="threshold_yesno">

//             </div>
//             <div className="threshold_body">
//                 <div className="threshold_outover threshold_box_shadow">
//                     <div className="threshold_outover_title">Thông tin chỉ số bệnh nhân</div>
//                     <div className="threshold_outover_name">{patient && (patient.getPatient.firstName + patient.getPatient.lastName)}</div>
//                     <ThresholdCard unit="cm/s" type="SpO2" current={patientDevice && patientDevice.getDevice.SpO2[0].data} max={threshold[0]} />
//                     <ThresholdCard unit="cm/s" type="Heart Rate" current={patientDevice && patientDevice.getDevice.heartRate[0].data} max={threshold[1]} />
//                     <ThresholdCard unit="cm/s" type="Body Temp" current={patientDevice && patientDevice.getDevice.bodyTemp[0].data} max={threshold[2]} />
//                     <ThresholdCard unit="cm/s" type="Blood Press" current={patientDevice && patientDevice.getDevice.bloodPress[0].data} max={threshold[3]} />
//                     <div className="threshold_outover_comment">
//                         <span>Kết luận ban đầu: bệnh nhân bị phọt máu ở mạch máu x trên xương a</span>
//                     </div>
//                 </div>
//                 <div className="threshold_meaning threshold_box_shadow">
//                     <div className="threshold_outover_title threshold_meaning_tittle">Thông tin kết luận chỉ số</div>
//                     <ResultCard type="SpO2:" />
//                     <ResultCard type="Heart Rate:" />
//                     <ResultCard type="Body Temp:" />
//                     <ResultCard type="Blood Press:" />
//                 </div>
//             </div>
//         </div>
//     </>)
// }