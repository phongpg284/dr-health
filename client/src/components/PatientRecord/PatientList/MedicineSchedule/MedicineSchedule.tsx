import "./index.scss";
import dayjs from "dayjs";

const MedicineSchedule = ({ medicineSchedule }: any) => {
  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Lịch uống thuốc</h1>
      <div className="schedule-list">
        {medicineSchedule &&
          medicineSchedule.map((schedule: any) => (
            <div className="schedule-item" key={schedule.name}>
              <div className="schedule-item-li">
                Tên thuốc:{" "}
                <span className="schedule-item-value">{schedule.name}</span>
              </div>
              <div className="schedule-item-li">
                Thời gian sử dụng: {" "}
                <span className="schedule-item-value">
                  {dayjs(new Date(schedule.scheduleDateRange[0])).format(
                    "DD/MM/YYYY"
                  )}
                </span>{" - "}
                <span className="schedule-item-value">
                  {dayjs(new Date(schedule.scheduleDateRange[1])).format(
                    "DD/MM/YYYY"
                  )}
                </span>
              </div>
              <div className="schedule-item-li">
                Thời gian sử dụng:{" "}
                {schedule.scheduleHours &&
                  schedule.scheduleHours.map((hour: any) => (
                    <span className="schedule-item-value" key={hour}>
                      {dayjs(new Date(hour)).format("hh:mm a")}{" "}
                    </span>
                  ))}
              </div>
              <div className="schedule-item-li">
                Ghi chú:{" "}
                <span className="schedule-item-value">{schedule?.note}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MedicineSchedule;
