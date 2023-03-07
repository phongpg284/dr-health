import "./index.scss"
import { ContentWrapper, Wrapper } from "./styled"
import patientMeet from "temp/patientMeet.json"
import defaultAvatarPatient from "../../assets/default-avatar-patient.png";
import { Image } from "antd";
import { Link } from "react-router-dom";

export default function DidBook(props) {

    return (
        <Wrapper>
            <ContentWrapper>
                <div className="didbook_title">Lịch gặp bệnh nhân</div>
                <div className="didbook_list">
                    {patientMeet.map((item, index) => (
                        <div key={index} className="item">
                            <img className="avatar" src={defaultAvatarPatient} />
                            <div className="content">
                                <div className="name">{item.fullName}</div>
                                <div className="address">Địa chỉ: {item.address}</div>
                                <div className="time">Thời gian gặp: {item.time}</div>
                            </div>
                            <div className="content">
                                <Link to="/upload/stroke-point" className="detail">Chi tiết</Link>
                                <div className="message">Nhắn tin</div>
                            </div>
                        </div>
                    ))}
                </div>
            </ContentWrapper>
        </Wrapper>
    )
}