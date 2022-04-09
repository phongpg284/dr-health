import React, { ReactElement } from 'react'
import { Calendar } from 'antd';
import { Modal } from 'react-bootstrap'
import './medicineSchedule.scss'
import moment from 'moment'


interface Props {
    medicineSchedule: any;
}

function MedicineSchedule(props: Props): ReactElement {

    const { medicineSchedule } = props;



    function checkIsInSchedule(date: Date) {
        const arr = [];
        for (const i in medicineSchedule) {
            const schedule = medicineSchedule[i]
            const { scheduleDateRange } = schedule;
            const start = new Date(scheduleDateRange[0]);
            const startValue = getClearDate(start).getTime();
            const end = new Date(scheduleDateRange[1]);
            const endValue = getClearDate(end).getTime();
            const value = getClearDate(date).getTime();
            if (value >= startValue && value <= endValue) {
                arr.push(i)
            }

        }
        return arr;
    }

    function getClearDate(date: Date) {
        const clearDate = new Date(date);
        clearDate.setHours(0, 0, 0, 0);
        return clearDate;
    }


    function dateCellRender(value: moment.Moment) {
        if (!medicineSchedule) return;
        const date = new Date(value.toISOString());


        let selected = false;
        if (selectDate) {
            const dateSelected = new Date(selectDate.toISOString());
            if (getClearDate(dateSelected).getTime() === getClearDate(date).getTime()) {
                selected = true;
            }
        }


        const arr = checkIsInSchedule(date)
        if (arr.length !== 0) {
            const newSchedule = medicineSchedule.filter((sche: any, index: number) => {
                return arr.includes(index + "")
            })

            return (
                <MedicineScheduleItem unselect={unselect} selected={selected} schedule={newSchedule} />
            )
        }
    }

    const [selectDate, setSelectDate] = React.useState<moment.Moment | null>(null);
    function onSelect(value: moment.Moment) {
        setSelectDate(value);
    }
    function unselect() {
        setTimeout(() => {
            setSelectDate(null);
        }, 100)

    }


    return (
        <div className="customSchedule">
            <Calendar value={selectDate || undefined} onSelect={onSelect} dateCellRender={dateCellRender} />
        </div>
    )
}

function MedicineScheduleItem({ schedule, selected, unselect }: { unselect: any, selected: boolean, schedule: any }) {
  
    return (
        <div className="medicineScheduleItem">
            <Modal show={selected} onHide={unselect} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Lịch uống thuốc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="medicineScheduleItemBody">
                        <ul className="dateCellData p-2">
                            {
                                schedule.map((sche: any, i: number) => (
                                    <li key={i}>
                                        <div>
                                            <b>
                                                {sche.name}
                                            </b>

                                        </div>
                                        <div>
                                            Giờ uống thuốc: &nbsp;
                                            {sche.scheduleHours.map((date: any, i: number) => (
                                                <span key={i}>
                                                    {moment(new Date(date)).format("HH:mm")}
                                                    {
                                                        i < (sche.scheduleHours.length - 1) && ", "
                                                    }
                                                </span>

                                            ))}
                                        </div>
                                        {
                                            sche.note != "" && sche.note != null &&
                                            <div>
                                               <i> ({sche.note})</i>
                                            </div>
                                        }

                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
            <ul className="dateCellData">
                {
                    schedule.map((sche: any, i: number) => (
                        <li key={i}>{sche.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MedicineSchedule
