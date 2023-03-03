import "./index.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Badge, Empty } from "antd";
import { useAppSelector } from "app/store";

import AbstractSimple from "../../assets/abstract-simple.svg";

import { HiOutlineClipboardCheck, HiOutlineClipboardCopy } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useApi } from "utils/api";
import usePromise from "utils/usePromise";

dayjs.extend(relativeTime);

interface NotificationDropdownProps {
  data: Notification[];
  onHide: () => void;
}

interface Notification {
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

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ data, onHide }) => {
  const account = useAppSelector((state) => state.account);
  const api = useApi();

  const handleClickNotification = (id: string, url: string) => () => {
    api.patch(`/notification/${id}`, {
      status: "seen",
    });
    if (url) window.open(url);
  };

  const ShowNotification: React.FC<NotificationDropdownProps> = ({ data }) => (
    <>
      {data &&
        data.map((notification: any) => (
          <div key={notification.id} className="notifications_item" onClick={handleClickNotification(notification._id, notification?.mapUrl)}>
            <div className="content_container">
              <div className="head">
                {!notification.seen && (
                  <div className="notifications_item_icon_back notifications_item_icon_unseen">
                    <HiOutlineClipboardCopy className="notifications_item_icon" />
                  </div>
                )}
                {notification.seen && (
                  <div className="notifications_item_icon_back notifications_item_icon_seen">
                    <HiOutlineClipboardCheck className="notifications_item_icon" />
                  </div>
                )}
                <div className="notifications_item_title">
                  {notification.title.charAt(0).toUpperCase() + notification.title.slice(1)}
                  {!notification.seen && <span className="unseenDot"></span>}
                  <span className="notifications_item_create_time">{dayjs(new Date(notification.createdAt)).fromNow()}</span>
                </div>
              </div>

              <div className="textContent">
                <div className="notifications_item_content">{notification.content.charAt(0).toUpperCase() + notification.content.slice(1)}</div>
                <div className="notifications_item_map">
                  {notification?.mapUrl && (
                    <>
                      <span style={{ color: "black", fontWeight: "bold" }}>Địa chỉ: </span>
                      <a href={notification.mapUrl}>{notification.mapUrl}</a>
                    </>
                  )}
                  {notification?.appointment?.link && (
                    <div className="notifications_item_map">
                      <div>Tham gia cuộc họp tại: </div>
                      <a style={{ color: "#3a88fc", textDecoration: "underline" }}>{notification.appointment.link}</a>
                    </div>
                  )}
                </div>
              </div>
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
    return <ShowNotification onHide={onHide} data={newData.reverse()} />;
  };
  const OldNotification = () => {
    const oldData = data.filter((notification) => {
      const timeAgoInfo = dayjs(new Date(notification.createdAt)).fromNow().split(" ");
      return !(((timeAgoInfo[1] == "minutes" || timeAgoInfo[1] == "minute") && (parseInt(timeAgoInfo[0]) < 5 || timeAgoInfo[0] == "a")) || timeAgoInfo[1] == "few");
    });
    return <ShowNotification onHide={onHide} data={oldData.reverse()} />;
  };

  const handleSeeAllNotification = () => {
    api.patch(`/notification/seenAllNotifications/${account?.id}`);
  };

  return (
    <>
      <div className="notifications_dropdown_box">
        <img src={AbstractSimple} className="bg" />
        <div className="notifications_dropdown_header">
          <div className="notifications_dropdown_title">Thông báo</div>
          <div onClick={onHide} className="close_btn">
            <IoMdClose />
          </div>
        </div>
        <div className="d-flex ms-2">
          <div className="fw-bold align-self-center ms-1" style={{ fontSize: "18px" }}>
            Mới
          </div>
          <div className="notifications_dropdown_see_all ms-auto">
            <Link to="/notifications" onClick={handleSeeAllNotification}>
              Xem tất cả
            </Link>
          </div>
        </div>
      </div>
      <div className="notifications_noti_box">
        {data && <NewNotification />}
        {/* <Divider /> */}
        {data && <OldNotification />}
      </div>
      {!data && (
        <div className="notifications_item_empty_display">
          <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="No notifications" />
        </div>
      )}
    </>
  );
};

interface NotificationListProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: Notification[];
}

const NotificationList = ({ show, setShow, data }: NotificationListProps) => {
  const onHide = () => {
    setShow(false);
  };
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal_noti">
      <div className="notifications_dropdown">
        <NotificationDropdown onHide={onHide} data={data} />
      </div>
    </Modal>
  );
};

const NotificationIcon = ({ children }: any) => {
  const { id } = useAppSelector((state) => state.account);
  const [show, setShow] = useState(false);
  const [unseen, setUnseen] = useState<number>(0);
  const [notifications] = usePromise(`/user/notifications/${id}`);

  useEffect(() => {
    setUnseen(notifications?.filter((notification: any) => notification.status !== "seen").length);
  }, [notifications]);

  const toggle = () => setShow(!show);

  return (
    <>
      <div onClick={toggle} className="notifications_icon_bagde">
        <Badge count={unseen} size="small" offset={[4, 0]} className="header_notifications">
          {children}
        </Badge>
      </div>
      <NotificationList show={show} setShow={setShow} data={notifications} />
    </>
  );
};

export default NotificationIcon;
