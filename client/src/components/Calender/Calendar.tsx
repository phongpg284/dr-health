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
// import "./antdcumstom.scss"
// import "./calendar.scss"
import "./newCalendar.scss"


import PatientAvatar from 'assets/default-avatar-patient.png'

import { motion } from 'framer-motion'

import { CREATE_MEDICINE, GET_MEDICINES, GET_PATIENTS_OF_DOCTOR, SAVE_MEDICINE_SCHEDULE } from './schema';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import ScheduleCalendar from '../Profile/MedicineSchedule'

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
        if (medicineData) {
            const arr = medicineData?.getMedicines.map((medicine: any) => medicine.name);
            const set = new Set(arr);
            const newArr: any[] = [];
            set.forEach((item: any) => {
                if (item != "")
                    newArr.push(item);
            })
            setMedicineList(newArr);
        }
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
                scheduleHours: medicine.hours,
                quantity: medicine.quantity,
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

    function handleBack() {
        if (currentStep !== -1) {
            setStep(currentStep - 1)
        }
    }
    function handleNext() {
        if (currentStep < 2) {
            setStep(currentStep + 1)
        } else {
            handleSubmitSchedule()
        }
    }


    return <div className="calendar_all">
        <div className="calendar_body calendar_shadow_rounded">
            <div className="calendar_content">
                <div className="patientPicker">
                    <img src={PatientAvatar} alt="patient avatar" className="patientAvatar" />
                    <DropdownButton id="dropdown-basic-button" title={patientChoose?.fullName} className="calendar_dropdown" variant="secondary">
                        {patientList && patientList.map((patient: any) => (
                            <Dropdown.Item key={patient._id} onClick={function () { setPatientChoose(patient) }}>{patient.fullName}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>

                <div className="calendar_content_carry">

                    <div className="calendar_set_detail">

                        <div
                            className="calendar_set_content">
                            <StepDisplay current={currentStep} step={0} title="Chọn thuốc">
                                <div className="calendar_set_content_phase_1">
                                    <CheckBox
                                        options={medicineList}
                                    />
                                    <div className="calendar_set_medicine">
                                        <div className="addGroupBtn">
                                            <input
                                                placeholder="Thêm thuốc mới"
                                                onKeyDown={inputPushValue}
                                                type="text" value={inputValue}
                                                onChange={(e) => setInputValue(e.currentTarget.value)} />
                                            <button onClick={handleAddNewMedicine}>Thêm</button>
                                        </div>

                                        <TextArea rows={10} placeholder="Ghi chú ý" className="noteTextArea" onBlur={onTextChange} />
                                    </div>

                                </div>
                            </StepDisplay>


                            <StepDisplay current={currentStep} step={1} title="Chọn thời gian">
                                <div className="calendar_set_content_phase_2" >
                                    {medicineSet.medicine &&
                                        medicineSet.medicine.map((item, i) =>
                                            <MedicineCard name={item.name} index={i} key={i} medicine={item} />
                                        )}
                                </div>
                            </StepDisplay>


                            <StepDisplay current={currentStep} step={2} title="Xác nhận">

                                <div className="confirmList">
                                    {medicineSet.medicine && medicineSet.medicine.map((item, index) =>
                                        <div className="confirmItem" key={index}>
                                            <div>
                                                Thuốc {item.name}
                                            </div>
                                            <div>
                                                sử dụng {item.times} lần/ngày vào lúc: {medicineSet.medicine[index].hours.map(hour => dayjs(hour).format(" H:mm"))}
                                            </div>
                                            <div>
                                                Số lượng {item.quantity} viên
                                            </div>

                                            <div className="line2">
                                                Trong thời gian: từ &nbsp;
                                                <b>
                                                    {`${dayjs(new Date(medicineSet.medicine[index].dates[0])).format('DD/MM/YYYY')}`} đến {`${dayjs(new Date(medicineSet.medicine[index].dates[1])).format("DD/MM/YYYY")}`}
                                                </b>

                                            </div>

                                            <div className="line3">
                                                {medicineSet.medicine[index].comment == "" ?
                                                    "" :
                                                    `Chú ý: ${medicineSet.medicine[index].comment}`
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </StepDisplay>


                        </div>
                        <div className="navigateBtnSpace">
                            {
                                currentStep !== -1 &&
                                <button onClick={handleBack} className="navigateBtn">
                                    <span className="icon">
                                        <IoIosArrowBack />
                                    </span>
                                    <span className="text">
                                        Quay lại
                                    </span>
                                </button>
                            }
                            <button onClick={handleNext} className="navigateBtn">

                                <span className="text">
                                    {
                                        currentStep === -1 ? "Đặt lịch dùng thuốc" :
                                            currentStep === 2 ? "Hoàn thành" :
                                                "Tiếp tục"
                                    }
                                </span>
                                <span className="icon">
                                    <IoIosArrowForward />
                                </span>
                            </button>
                        </div>
                        {
                            currentStep != -1 &&
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
                        }
                    </div>
                </div>
                <motion.div
                    initial={{ height: 0 }}
                    animate={patientChoose && currentStep == -1 ? { height: "auto" } : { height: 0 }}
                    transition={{ type: "tween", duration: 0.5}}
                    className="medicineCalendar">
                    <ScheduleCalendar medicineSchedule={patientChoose?.medicineSchedule} />
                </motion.div>
            </div>
        </div>
    </div >
}

interface StepDisplayProps {
    current: number,
    step: number,
    children: any,
    title: string,
}

function StepDisplay(props: StepDisplayProps) {
    const { current, step, children, title } = props
    const isVisible = React.useMemo(() => {
        return current == step
    }, [props]);
    return (
        <motion.div
            initial={{ height: 0,left:"-100%" }}
            animate={isVisible ? { height: "auto",left:0 } : { height: 0,left:'-100%' }}
            transition={{ type: "tween", duration: 0.5, delay: isVisible ? 0.5 : 0 }}
            className="stepDisplay">
            <div className="stepTitle">
                {title}
            </div>
            <div className="stepContent">
                {children}
            </div>
        </motion.div>
    )
}


