import "./index.scss";
import dayjs from "dayjs";
import { Empty } from "antd";
import { HiOutlineClipboardCheck, HiOutlineClipboardCopy } from "react-icons/hi";
import { useApi } from "utils/api";
interface INotificationDropdownProps {
  data: INotification[];
}

interface INotification {
  id: string;
  title: string;
  content: string;
  status: string;
  type: "appointment" | "default";
  createdAt: string;
  mapUrl?: string;
  appointment?: {
    id: number;
    duration: number;
    link: string;
  };
}

const Notifications: React.FC<INotificationDropdownProps> = ({ data }) => {
  const api = useApi();
  const handleClickNotification = (id: string, url: string | undefined) => () => {
    api.patch(`/notification/${id}`, {
      status: "seen",
    });
    if (url) window.open(url);
    // history.push(`/notifications/${params}`);
  };
  const ShowNotification: React.FC<INotificationDropdownProps> = ({ data }) => (
    <>
      {data &&
        data.map((notification) => (
          <div key={notification.id} className="notifications_item" onClick={handleClickNotification(notification.id, notification.mapUrl)}>
            <div className="head">
              <div className="iconWrapper">
                {notification.status !== "seen" && (
                  <div className="notifications_item_icon_back notifications_item_icon_unseen">
                    <HiOutlineClipboardCopy className="notifications_item_icon" />
                  </div>
                )}
                {notification.status === "seen" && (
                  <div className="notifications_item_icon_back notifications_item_icon_seen">
                    <HiOutlineClipboardCheck className="notifications_item_icon" />
                  </div>
                )}
              </div>
              <div className="notifications_item_title">{notification.title.charAt(0).toUpperCase() + notification.title.slice(1)}</div>
            </div>

            <div className="contentWrapper">
              <div className="notifications_item_content">{notification.content.charAt(0).toUpperCase() + notification.content.slice(1)}</div>
              {notification?.mapUrl && (
                <div className="notifications_item_map">
                  <b>Địa chỉ: </b>
                  {notification.mapUrl}
                </div>
              )}
              {notification?.appointment?.link && (
                <div className="notifications_item_map">
                  <b>Tham gia cuộc họp tại: </b>
                  <a style={{ color: "#3a88fc", textDecoration: "underline" }}>{notification.appointment.link}</a>
                </div>
              )}
              <div className="notifications_item_create_time">{dayjs(new Date(notification.createdAt)).fromNow()}</div>
            </div>
          </div>
        ))}
    </>
  );
  const NewNotification = () => {
    const newData = data.filter((notification) => {
      const timeAgoInfo = dayjs(new Date(notification.createdAt)).fromNow().split(" ");
      return ((timeAgoInfo[1] == "minutes" || timeAgoInfo[1] == "minute") && (parseInt(timeAgoInfo[0]) < 5 || timeAgoInfo[0] == "a")) || timeAgoInfo[1] == "few";
    });
    return <ShowNotification data={newData.reverse()} />;
  };
  const OldNotification = () => {
    const oldData = data.filter((notification) => {
      const timeAgoInfo = dayjs(new Date(notification.createdAt)).fromNow().split(" ");
      return !(((timeAgoInfo[1] == "minutes" || timeAgoInfo[1] == "minute") && (parseInt(timeAgoInfo[0]) < 5 || timeAgoInfo[0] == "a")) || timeAgoInfo[1] == "few");
    });
    return <ShowNotification data={oldData.reverse()} />;
  };

  return (
    <div className="notifications">
      <div className="notifications_box">
        {data && <NewNotification />}
        {data && <OldNotification />}
      </div>
      {!data && (
        <div className="notifications_item_empty_display">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
};

export default Notifications;
