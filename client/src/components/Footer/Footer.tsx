import "./index.scss";

import { IoIosMail, IoMdSchool } from "react-icons/io";
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";
import { useContext } from "react";
import { FooterContext } from "App";
import logo from "../../assets/logo1.png";
import { AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  const footerRef = useContext(FooterContext);
  return (
    <div id="web_footer" className="footer" ref={footerRef}>
      <div
        className="footer_all"
        // style={{ backgroundImage: `url(${isMobile ? FooterMobile : FooterBackground})` }}
      >
        <div className="full_content">
          <div className="banner_content">
            <img className="banner_img" alt="logo" src={logo} />
            <div className="banner_text">
              <b className="web_name">Hust TeleHealth</b>
              <p className="web_des">Phần mềm giám sát sức khoẻ từ xa</p>
            </div>
          </div>
          <div className="footer_content">
            {/* <div className="footer_content_item">
              <div className="footer_content_item_row">
                <FaUserTie className="footer_icon" />
                Hoàng Tuấn Tài
              </div>
              <div className="footer_content_item_row">
                <FaUserTie className="footer_icon" />
                Ngô Thị Thu Hà
              </div>

              <div className="footer_content_item_row">
                <FaUserTie className="footer_icon" />
                Lê Vũ Quỳnh Trang
              </div>
              <div className="footer_content_item_row">
                <FaUserTie className="footer_icon" />
                Ngô Bá Hoàng Quân
              </div>
            </div>
            <div className="footer_content_item">
              <div className="footer_content_item_row">
                <IoIosMail className="footer_icon" />
                tuantaibk1999@gmail.com
              </div>
              <div className="footer_content_item_row">
                <FaPhoneAlt className="footer_icon" />
                0816056426
              </div>
              <div className="footer_content_item_row">
                <IoMdSchool className="footer_icon" />
                Trường Điện điện tử, Đại học Bách Khoa Hà Nội
              </div>
              <div className="footer_content_item_row">
                <AiFillFacebook className="footer_icon" />
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Dr-Health-112707468102537">
                  Facebook
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
