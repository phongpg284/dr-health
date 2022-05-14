import "./index.scss";
import dayjs from "dayjs";
import { Empty } from "antd";
import { useMutation } from "@apollo/client";
import { HiOutlineClipboardCheck, HiOutlineClipboardCopy } from "react-icons/hi";
import { UPDATE_NOTIFICATION } from "components/NotificationIcon/schema";
interface INotificationDropdownProps {
    data: INotification[];
}

interface INotification {
    _id: string;
    title: string;
    content: string;
    accountId: string;
    role: string;
    seen: boolean;
    createdAt: string;
}

const Notifications: React.FC<INotificationDropdownProps> = ({ data }) => {
    const [seenNotification] = useMutation(UPDATE_NOTIFICATION);

    const handleClickNotification = (id: string, url: string) => (e: any) => {
        seenNotification({
            variables: {
                inputs: {
                    _id: id,
                    seen: true,
                },
            },
        });
        if (url)
        window.open(url);
        // history.push(`/notifications/${params}`);
    };
    const ShowNotification: React.FC<INotificationDropdownProps> = ({ data }) => (
        <>
            {data &&
                data.map((notification: any) => (
                    <div key={notification._id} className="notifications_item" onClick={handleClickNotification(notification._id, notification.mapUrl)}>
                        <div className="head">
                            <div className="iconWrapper">
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
                            </div>
                            <div className="notifications_item_title">{notification.title.charAt(0).toUpperCase() + notification.title.slice(1)}</div>
                        </div>

                        <div className="contentWrapper">
                            <div className="notifications_item_content">{notification.content.charAt(0).toUpperCase() + notification.content.slice(1)}</div>
                            <div className="notifications_item_map">
                                <b>Địa chỉ: </b>
                                {notification.mapUrl}
                            </div>
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
