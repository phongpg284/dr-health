import { Image } from "react-bootstrap";
import "./avatar.scss"

const Avatar = ({ ...props }) => {
  return <Image className="avatar" {...props} rounded/>;
};

export default Avatar;
