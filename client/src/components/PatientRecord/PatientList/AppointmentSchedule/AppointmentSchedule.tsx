import "./index.scss";
import dayjs from "dayjs";
import usePromise from "utils/usePromise";
import { useState } from "react";
import { DatePicker, Form, Modal, Select, Input, message } from "antd";
import { useApi } from "utils/api";
import { useAppSelector } from "app/store";
const { Option } = Select;

const AppointmentSchedule = ({ id }: any) => {
  const api = useApi();
  const account = useAppSelector((state) => state.account);
  const [schedules] = usePromise<Record<string, unknown>[]>(`/user/schedules/${id}`);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [form] = Form.useForm();
  const onDurationChange = (value: string) => {
    form.setFieldsValue({ duration: +value });
  };

  const handleClickAddMeeting = () => {
    setShowAddMeeting(true);
  };
  const handleClickCancelAddMeeting = () => {
    setShowAddMeeting(false);
  };
  const confirmAddMeeting = () => {
    const values = form.getFieldsValue();
    const meetingLinkRandom = Math.random().toString(36).slice(2, 5) + "-" + Math.random().toString(36).slice(2, 5) + "-" + Math.random().toString(36).slice(2, 5);
    const inputs = {
      patientId: id,
      doctorId: account.roleId,
      name: values.name,
      link: `https://video.dr-health.com.vn/${meetingLinkRandom}`,
      duration: +(values?.duration ?? 15),
      time: values?.date?.toDate(),
    };
    api
      .post("/appointment", inputs)
      .then(() => message.success("Tạo lịch hẹn thành công"))
      .catch(() => message.error("Tạo lịch hẹn không thành công"))
      .finally(() => {
        setShowAddMeeting(false);
        form.resetFields();
      });
  };
  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Lịch hẹn meeting</h1>
      <div className="schedule-list">
        {account.role === "doctor" && (
          <button className="button-62" onClick={handleClickAddMeeting}>
            Đặt lịch hẹn
          </button>
        )}
        <Modal title="Đặt lịch hẹn" visible={showAddMeeting} onOk={confirmAddMeeting} onCancel={handleClickCancelAddMeeting}>
          <Form form={form} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} autoComplete="off">
            <Form.Item label="Tiêu đề" name="name" rules={[{ required: true, message: "Hãy chọn tiêu đề!" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Thời gian" name="date" rules={[{ required: true, message: "Hãy chọn thời gian!" }]}>
              <DatePicker showTime />
            </Form.Item>

            <Form.Item label="Thời lượng" name="duration" rules={[{ required: true, message: "Hãy chọn thời lượng!" }]}>
              <Select style={{ width: 120 }} onChange={onDurationChange}>
                <Option value="15">15 phút</Option>
                <Option value="30">30 phút</Option>
                <Option value="60">60 phút</Option>
              </Select>
            </Form.Item>

            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <AntdButton type="primary" htmlType="submit">
                Submit
              </AntdButton>
            </Form.Item> */}
          </Form>
        </Modal>
        {schedules &&
          schedules
            .filter((s) => s.type === "appointment")
            .map((schedule: any) => (
              <div className="schedule-item" key={schedule.name}>
                <div className="schedule-item-li">
                  Lịch hẹn với bác sĩ <span className="schedule-item-value"></span>
                </div>
                <div className="schedule-item-li">
                  Thời gian: <span className="schedule-item-value">{dayjs(new Date(schedule?.time)).format("DD/MM/YYYY HH:mm")}</span>
                </div>
                <div className="schedule-item-li">
                  Link meeting:
                  <a href={schedule?.appointment?.link} target="_blank" rel="noreferrer">
                    {schedule?.appointment?.link}
                  </a>
                </div>
                <div className="schedule-item-li">
                  Ghi chú: <span className="schedule-item-value">{schedule?.note}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AppointmentSchedule;
