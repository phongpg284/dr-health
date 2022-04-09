import { Col } from "react-bootstrap";
import {
  FcCalendar as IconCalendar,
  FcOnlineSupport as IconInfo,
  FcDataRecovery as IconIndex,
} from "react-icons/fc";
import { Link } from "react-router-dom";
import "./index.scss";
interface IServices {
  role?: null | undefined | string;
  colResponsive?: string | null | undefined;
}


const Services: React.FC<IServices> = ({ role, colResponsive }) => {
  return (
    <Col
      className={role ? "content-home-in" : "content-home-out"}
      xs={12}
      sm={colResponsive ? +colResponsive : 12}
    >
      <Link to={role ? "/profile" : "/login"}>
        <IconInfo className="content-home-icon" />
        <div>Thông tin cá nhân</div>
      </Link>
      {
        role ? role === "patient" ? <Link to='/record'>
        <IconIndex className="content-home-icon" />
        <div>Lịch uống thuốc</div>
      </Link> : <Link to="/calendar">
        <IconIndex className="content-home-icon" />
        <div>Hẹn lịch thuốc</div>
      </Link>:  <Link to="/login">
        <IconIndex className="content-home-icon" />
        <div>Lịch uống thuốc</div>
      </Link>
      }
      {/* <Link to={role ? "/record" : "/login"}>
        <IconCalendar className="content-home-icon" />
        {role === "doctor" && 
          (<div>Hẹn lịch thuốc</div>)
        }
        {role === "patient" && 
          (<div>Lịch uống thuốc</div>)
        }
      </Link> */}
      {
        role ? role === "patient" ? <Link to='/record'>
        <IconIndex className="content-home-icon" />
        <div>Chỉ số bệnh án</div>
      </Link> : <Link to="/patients">
        <IconIndex className="content-home-icon" />
        <div>Chỉ số bệnh án</div>
      </Link>:  <Link to="/login">
        <IconIndex className="content-home-icon" />
        <div>Chỉ số bệnh án</div>
      </Link>
      }
    </Col>
  );
};

export default Services;
