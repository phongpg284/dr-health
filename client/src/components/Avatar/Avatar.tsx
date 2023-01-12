import "./avatar.scss";
import { Image } from "react-bootstrap";

const Avatar = ({ ...props }) => {
  return <Image className="avatar" {...props} rounded />;
};

export default Avatar;
