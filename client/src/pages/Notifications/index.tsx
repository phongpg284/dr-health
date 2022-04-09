import "./index.css";
import Notifications from "components/Notifications";
import { useAppSelector } from "app/store";
import { GET_ACCOUNT_NOTIFICATIONS, NOTIFICATIONS_SUBSCRIPTION } from "components/NotificationIcon/schema";
import { useLazyQuery, useSubscription } from "@apollo/client";
import Header from "components/Header";
import { Empty } from "antd";
import { useEffect, useState } from "react";

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

  const [notificationsList, setNotificationsList] = useState<any>([]);
  const [fetchData, { data }] = useLazyQuery(GET_ACCOUNT_NOTIFICATIONS, {
    variables: {
      inputs: { id, role },
    },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const { data: newNotification } = useSubscription(
    NOTIFICATIONS_SUBSCRIPTION,
    {
      variables: { id },
    }
  );

  

  useEffect(() => {
    if (newNotification?.newNotification) {
      setNotificationsList((data: INotification[]) => [
        ...data,
        newNotification.newNotification,
      ]);
    }
  }, [newNotification]);

  useEffect(() => {
    if(data)
    setNotificationsList(data.getAccountNotifications);
  },[data]);

  return (
    <div>
      <Header />
      <div className="notifications-page">
        {notificationsList && (
          <Notifications data={notificationsList} />
        )}
        {!notificationsList && (
        <div className="notifications-empty">
          <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="No notifications" />
        </div>
      )}
      </div>
    </div>
  );
};

export default NotificationsPage;
