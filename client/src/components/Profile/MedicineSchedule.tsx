import React, { ReactElement } from "react";
import { Calendar } from "antd";
import { Modal } from "react-bootstrap";
import "./medicineSchedule.scss";
import moment from "moment";
import usePromise from "utils/usePromise";
import { getScheduleOfDate } from "utils/schedule";

interface Props {
  patientAccountId: number;
}

function MedicineSchedule(props: Props): ReactElement {
  const { patientAccountId } = props;
  const [medicineSchedule] = usePromise<Record<string, unknown>[]>(`/user/schedules/${patientAccountId}`);

  function getClearDate(date: Date) {
    const clearDate = new Date(date);
    clearDate.setHours(0, 0, 0, 0);
    return clearDate;
  }

  function dateCellRender(value: moment.Moment) {
    if (!medicineSchedule) return;
    const date = new Date(value.toISOString());
    const schedules = getScheduleOfDate(date, medicineSchedule);
    let selected = false;
    if (selectDate) {
      const dateSelected = new Date(selectDate.toISOString());
      if (getClearDate(dateSelected).getTime() === getClearDate(date).getTime()) {
        selected = true;
      }
    }

    return <MedicineScheduleItem unselect={unselect} selected={selected} schedule={schedules} />;
  }

  const [selectDate, setSelectDate] = React.useState<moment.Moment | null>(null);
  function onSelect(value: moment.Moment) {
    setSelectDate(value);
  }
  function unselect() {
    setTimeout(() => {
      setSelectDate(null);
    }, 100);
  }

  return (
    <div className="customSchedule">
      <Calendar value={selectDate || undefined} onSelect={onSelect} dateCellRender={dateCellRender} />
    </div>
  );
}

function MedicineScheduleItem({ schedule, selected, unselect }: { unselect: any; selected: boolean; schedule: any }) {
  const scheduleSet = new Set<string>();
  schedule.forEach((s: any) => {
    if (s?.type === "medicine_prescription") scheduleSet.add(s?.medicinePrescription?.medicine);
  });
  return (
    <div className="medicineScheduleItem">
      <Modal show={selected} onHide={unselect} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Lịch ngày {new Date(schedule?.[0]?.time).getDate()}/ {new Date(schedule?.[0]?.time).getMonth() + 1}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="medicineScheduleItemBody">
            <ul className="dateCellData p-2">
              {schedule?.map((sche: any) => (
                <li key={sche.id}>
                  {sche.type === "medicine_prescription" && (
                    <>
                      <div>
                        <b>Thuốc {sche?.medicinePrescription?.medicine}</b>
                      </div>
                      <div>
                        Giờ uống thuốc: &nbsp;
                        <span>{moment(new Date(sche?.time)).format("HH:mm")}</span>
                      </div>
                      {sche?.medicinePrescription?.note != "" && sche?.medicinePrescription?.note != null && (
                        <div>
                          Ghi chú: <i> {sche?.medicinePrescription?.note}</i>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
      <ul className="dateCellData">
        {Array.from(scheduleSet).map((sche: any, i: number) => (
          <li key={i}>{sche}</li>
        ))}
      </ul>
    </div>
  );
}

export default MedicineSchedule;
