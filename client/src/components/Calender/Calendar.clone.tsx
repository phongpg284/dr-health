//icon

import { IoCalendarSharp } from 'react-icons/io5';
import { FaUserInjured } from 'react-icons/fa';
import { VscDebugStepBack } from 'react-icons/vsc';
import { Image, DropdownButton, Dropdown } from 'react-bootstrap';

//image

import sidebar_icon from "../../assets/sidebar_icon.png";

//other

import dayjs from "dayjs"
import React, { useRef, useState, useEffect } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { Input } from 'antd';
import { backAll, calendarItemChoose, handleBackStep_0, handleBackStep_1, handleBackStep_2, handleSetCalendarStep_0, handleSetCalendarStep_1, handleSetCalendarStep_2, handleSetCalendarStep_3 } from './handleEvent';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useAppSelector, useAppDispatch } from 'app/store';
import { updateMedicineSet, updateMessage } from 'app/medicineSlice';
import CalendarList from './Items/CalendarList'
import SetSteps from './Items/SetSteps';
import CheckBox from './Items/Checkbox';
import { MedicineCard } from './Items/MedicineCard';
import "./antdcumstom.scss"
import "./calendar.scss"

import { CREATE_MEDICINE, GET_MEDICINES, GET_PATIENTS_OF_DOCTOR, SAVE_MEDICINE_SCHEDULE } from './schema';

const { TextArea } = Input;


const SidebarItem = (props: any) => {
    const back = useRef(null)
    const icon = useRef(null)
    const content = useRef(null)

    return <>
        <div className={"calendar_sidebar_item" + " " + props?.firstItem} onClick={function () { calendarItemChoose(back, icon, content) }}>
            <div className={"calendar_sidebar_item_back" + " " + props?.firstChooseBack} ref={back}></div>
            <Image className={"calendar_sidebar_icon" + " " + props?.firstChooseIcon} src={sidebar_icon} ref={icon} />
            <div className={"calendar_sidebar_item_content" + " " + props?.firstChooseContent} ref={content}>Bệnh nhân 1</div>
        </div>
    </>
}


const medicineChecked: CheckboxValueType[] =
    []


export default function Calendar() {
    const account = useAppSelector((state) => state.account)
    const { data: patientData } = useQuery(GET_PATIENTS_OF_DOCTOR, {
        variables: {
            id: account.id
        }
    });
    const [patientList, setPatientList] = useState([]);
    const [patientChoose, setPatientChoose] = useState<any>();
    useEffect(() => {
        if (patientData) {
            setPatientList(patientData.getPatientsOfDoctor);
            setPatientChoose(patientData.getPatientsOfDoctor[0])
        }
    }, [patientData]);

    //Phase 1

    const [state, setState] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const [currentStep, setStep] = useState(-1)

    const [medicineList, setMedicineList] = useState<any[]>([]);
    const { data: medicineData } = useQuery(GET_MEDICINES);
    const [createMedicine] = useMutation(CREATE_MEDICINE);

    useEffect(() => {
        if (medicineData)
            setMedicineList(medicineData?.getMedicines.map((medicine: any) => medicine.name));
    }, [medicineData])

    //Phase 2

    const medicineSet = useAppSelector((state) => state.medicineSet);
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(
            updateMedicineSet({
                medicine: [],
                message: ""
            })
        )
    }, [])

    //Phase 3 
    const [saveSchedule] = useMutation(SAVE_MEDICINE_SCHEDULE);

    //
    function onTextChange(value: any) {
        dispatch(
            updateMessage({
                medicine: [],
                message: value.currentTarget.innerHTML
            })
        )
    }
    function inputPushValue(e: any) {
        if (e.key == "Enter") {
            if (e.currentTarget.value)
                handleAddNewMedicine()
            setState(state + 1)
        }
    }

    function handleAddNewMedicine() {
        createMedicine({
            variables: {
                inputs: { name: inputValue }
            }
        }).then(() => {
            setMedicineList(state => [...state, inputValue])
            setInputValue("")
        })
    }

    function handleSubmitSchedule() {
        const medicineSchedule = medicineSet.medicine.map((medicine) => {
            return {
                name: medicine.name,
                note: medicine.comment,
                scheduleDateRange: [medicine.dates[0], medicine.dates[1]],
                scheduleHours: medicine.hours
            }
        })

        const inputs = {
            _id: patientChoose?._id,
            medicineSchedule: medicineSchedule
        }
        saveSchedule({
            variables: {
                inputs: inputs
            }
        })
        setStep(-1)
    }
    const SetDone = () => <>
        <span style={{ font: "20px sf-pro-display,sans-serif", color: "red" }}>•*• Chú ý  •*• <br /> <div suppressContentEditableWarning={true} contentEditable="true" className="calendar_rounded" style={{ border: "1px solid #e8e8e8" }}></div>{medicineSet.message == "" ? "#none" : medicineSet.message}</span><br /><br />
        <div>{medicineSet.medicine && medicineSet.medicine.map((item, index) => {
            return <React.Fragment key={index}>
                <div className="calendar_set_done_item">{`• Sử dụng ${item.name} ${medicineSet.medicine[index].times} lần/ngày vào lúc:${medicineSet.medicine[index].hours.map(hour => dayjs(hour).format(" H:mm"))} `}</div><br />
                <div className="calendar_set_done_item">- Trong thời gian: từ {`${dayjs(new Date(medicineSet.medicine[index].dates[0])).format('DD/MM/YYYY')}`} đến {`${dayjs(new Date(medicineSet.medicine[index].dates[1])).format("DD/MM/YYYY")}`} </div><br />
                <div>{medicineSet.medicine[index].comment == "" ? "" : `- Chú ý: ${medicineSet.medicine[index].comment}`}</div>
                <br />
            </React.Fragment>
        })}</div>
    </>

    const SetPatientName = () => {
        const dropController: React.RefObject<HTMLInputElement> = useRef(null)
        const buttonController: React.RefObject<HTMLInputElement> = useRef(null)
        useEffect(() => {
            document.addEventListener('click', handleClickOutside);
        }, [])
        function handleClickOutside(event: any) {
            if (dropController.current && !dropController.current.contains(event.target) &&
                buttonController.current && !buttonController.current.contains(event.target) &&
                document.querySelector(".calendar_patient_carry")?.classList.contains("calendar_patient_carry_toggle")) {
                document.querySelector(".calendar_patient_carry")?.classList.remove("calendar_patient_carry_toggle")
            }
        }
        return (<>
            <div className="calendar_patient_logo" ref={buttonController} onClick={function () {
                document.querySelector(".calendar_patient_carry")?.classList.toggle("calendar_patient_carry_toggle")
                if (document.querySelector(".calendar_patient_carry")?.classList.contains("calendar_waitoff")) {
                    document.querySelector(".calendar_patient_carry")?.classList.remove("calendar_waitoff")
                } else {
                    setTimeout(() => {
                        document.querySelector(".calendar_patient_carry")?.classList.add("calendar_waitoff")
                    }, 300);
                }
            }}>
                <FaUserInjured />
            </div>
            <div className="calendar_patient_carry" ref={dropController}>
                <DropdownButton  id="dropdown-basic-button" title="" className="calendar_dropdown">
                    {patientList && patientList.map((patient: any) => (
                        <Dropdown.Item key={patient._id} onClick={function () { setPatientChoose(patient) }}>{patient.fullName}</Dropdown.Item>
                    ))}
                </DropdownButton>
                <div className="calendar_patient_name"><span>{patientChoose?.fullName}</span></div>
            </div>
            <div className="calendar_patient_name_outside">Bệnh nhân {patientChoose?.fullName}</div>
        </>)
    }

    return <div className="calendar_all">
        <div className="calendar_body calendar_shadow_rounded">

            <div className="calendar_content">
                <SetPatientName />
                <div className="calendar_content_carry">
                    <div className="calendar_spacer"></div>
                    {/* <CalendarList className="calendar_box_shadow calendar_thecalendar" /> */}

                    {/* Button by Step */}

                    <div className="calendar_content_button">
                        <div className="calendar_patients_info calendar_shadow_rounded" onClick={function () {
                            backAll(currentStep, function () { setStep(currentStep - 1) });
                        }}>
                            <VscDebugStepBack style={{ fontSize: "25px", margin: "0 10px 0 -20px" }} />
                            <div className="calendar_content_button_text">Trở lại</div>
                        </div>
                        <div className="calendar_setcalendar" >

                            {/* Button 1 */}

                            <div className={"calendar_setcalendar_item calendar_step1 calendarrow calendar_shadow_rounded" + " " + (currentStep == -1 ? "calendar_z" : "")}
                                onClick={function () {
                                    handleSetCalendarStep_0(function () { setStep(0) })
                                }}
                            >
                                <IoCalendarSharp style={{ fontSize: "25px", margin: "0 10px 0 -10px" }} />
                                <div className="calendar_content_button_text">Đặt lịch</div>
                            </div>

                            {/* Button 2 */}

                            <div className={"calendar_setcalendar_item calendar_step2 calendarrow calendar_rounded" + " " + (currentStep == 0 ? "calendar_z" : "")}
                                onClick={function () {
                                    handleSetCalendarStep_1(function () { setStep(1) });
                                    setState(state + 1)
                                }}
                            >
                                <IoCalendarSharp style={{ fontSize: "25px", margin: "0 10px 0 -10px" }} />
                                <div className="calendar_content_button_text">Tiếp</div>
                            </div>

                            {/* Button 3 */}

                            <div className={"calendar_setcalendar_item calendar_step2 calendarrow calendar_rounded" + " " + (currentStep == 1 ? "calendar_z" : "")}
                                onClick={function () {
                                    handleSetCalendarStep_2(function () { setStep(2) }); console.log(medicineSet.message);
                                }}
                            >
                                <IoCalendarSharp style={{ fontSize: "25px", margin: "0 10px 0 -10px" }} />
                                <div className="calendar_content_button_text">Tiếp</div>
                            </div>

                            {/* Button Done */}

                            <div className={"calendar_setcalendar_item calendar_step2 calendarrow calendar_rounded" + " " + (currentStep == 2 ? "calendar_z" : "")}
                                onClick={function () { handleSetCalendarStep_3(handleSubmitSchedule) }}
                            >
                                <IoCalendarSharp style={{ fontSize: "25px", margin: "0 10px 0 -10px" }} />
                                <div className="calendar_content_button_text">Done</div>
                            </div>

                        </div>
                    </div>
                    <div className="calendar_set_detail">
                        <div className="calendar_set_content">

                            {/* Phase by step */}

                            {/* Phase 1 */}

                            <div className="calendar_set_content_phase_1" style={{ marginLeft: `-${currentStep > -1 ? (100 * currentStep) : 0}%` }}>
                                <div className="calendar_set_medicine">
                                    <div className="calendar_set_medicine_tittle calendar_set_medicine_item" style={{ marginBottom: "10px", fontSize: "16px" }}>• Enter để thêm nhóm thuốc</div>
                                    <InputGroup className="mb-3 calendar_set_medicine_input calendar_set_medicine_item">
                                        <FormControl
                                            placeholder="Nhập tên thuốc"
                                            aria-label="Nhập tên thuốc"
                                            aria-describedby="basic-addon2"
                                            onKeyDown={inputPushValue}
                                            onChange={function (e) { setInputValue(e.currentTarget.value) }}
                                        />
                                        <Button variant="outline-secondary" id="button-addon2"
                                            onClick={function () {
                                                handleAddNewMedicine()
                                                setState(state + 1)
                                            }}>
                                            Thêm
                                        </Button>
                                    </InputGroup>
                                    <TextArea rows={10} placeholder="Ghi chú ý" className="calendar_set_medicine_note_input calendar_set_medicine_item" onBlur={onTextChange} />
                                </div>
                                {/* <CheckBox
                                    options={medicineList}
                                    defaultCheckedList={medicineChecked}
                                    className="calendar_medicine_type_checkbox calendar_set_medicine_item"
                                    checkbox_className="calendar_set_item"
                                    group_className="calendar_medicine_type_group calendar_set_medicine_item"
                                /> */}
                            </div>

                            {/* Phase 2 */}

                            <div className="calendar_set_content_phase_2" >
                                <div className="calendar_shadow_rounded" style={{ fontSize: "20px", padding: "10px 20px", marginBottom: "10px", backgroundColor: "#3fcece", color: "white" }}>Chọn ngày và số lần uống mỗi ngày</div>
                                {medicineSet.medicine && medicineSet.medicine.map((item, i) => <MedicineCard name={item.name} index={i} key={i} medicine={item} />)}
                            </div>

                            {/* Phase 3 */}

                            <div className="calendar_set_content_phase_3 calendar_shadow_rounded calendar_set_done_item" >
                                <div className="calendar_set_done calendar_set_done_item">
                                    <SetDone />
                                </div>
                            </div>

                            {/* End Phase*/}

                        </div>
                        <div className="calendar_set_step calendar_set_item">
                            <SetSteps current={currentStep} steps={["Chọn thuốc", "Đặt lịch", "Xác thực"]}
                                backFunc={
                                    [function () { handleBackStep_0(function () { setStep(0); }) },
                                function () { handleBackStep_1(function () { setStep(1); }) },
                                function () { handleBackStep_2(function () { setStep(2); }) },
                                ]
                            }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
}



