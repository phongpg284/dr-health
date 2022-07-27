import "./index.css";
import Notifications from "components/Notifications";
import { useAppSelector } from "app/store";
import Header from "components/Header";
import { Empty } from "antd";
import { useEffect, useState } from "react";
import usePromise from "utils/usePromise";

interface INotification {
  _id: string;
  title: string;
  content: string;
  accountId: string;
  role: string;
  seen: boolean;
  createdAt: string;
}

const NotificationsPage = () => {
  const { id, role } = useAppSelector((state) => state.account);

  const [notificationsList] = usePromise(`/user/notifications/${id}`);
  console.log(notificationsList);

  return (
    <div>
      <div className="notifications-page">
        {notificationsList && <Notifications data={notificationsList} />}
        {!notificationsList ||
          (notificationsList.length === 0 && (
            <div className="notifications-empty">
              <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="Không có thông báo" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
