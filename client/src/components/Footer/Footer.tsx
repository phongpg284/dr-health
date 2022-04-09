import "./index.scss";

import { IoIosMail, IoMdSchool } from "react-icons/io";
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";
import { useContext } from "react";
import { FooterContext } from "App";
import FooterBackeground from "../../assets/footerbg.png"
import FooterTop from '../../assets/footer_top.svg'
import FooterBody from '../../assets/footer_body.svg'
import FooterMobile from '../../assets/footer_mobile.svg'
import logo from "../../assets/logo1.png";
import { isMobile } from 'react-device-detect'
import { AiFillFacebook } from "react-icons/ai";


export const Footer = () => {
    const footerRef = useContext(FooterContext);
    return (
        <div id="web_footer" className="footer" ref={footerRef} >
            {/* <img src={FooterTop} alt="" className="footer_top" /> */}
            <div className="footer_all" style={{ backgroundImage: `url(${isMobile ? FooterMobile : FooterBackeground})` }}>
                {/* <img src={FooterBody} alt="" className="footer_body" /> */}
                <div className="full_content">
                    <div className="banner_content">
                        <img className="banner_img" alt="logo" src={logo} />
                        <div className="banner_text">
                            <b className="web_name">
                                Hỗ trợ đột quỵ
                            </b>
                            <p className="web_des">Trang thông tin về bệnh đột quỵ</p>
                        </div>
                    </div>
                    <div className="footer_content">
                        <div className="footer_content_item">
                            <div className="footer_content_item_row">
                                <FaUserTie className="footer_icon" />
                                Nguyễn Hoàng Tuấn
                            </div>
                            <div className="footer_content_item_row">
                                <FaUserTie className="footer_icon" />
                                Phạm Kim Ngân
                            </div>

                            <div className="footer_content_item_row">
                                <FaUserTie className="footer_icon" />
                                Nguyễn Ngọc Minh Châu
                            </div>
                        </div>
                        <div className="footer_content_item">
                            <div className="footer_content_item_row">
                                <IoIosMail className="footer_icon" />
                                hotrodotquy@gmail.com
                            </div>
                            <div className="footer_content_item_row">
                                <FaPhoneAlt className="footer_icon" />
                                077.200.4099
                            </div>
                            <div className="footer_content_item_row">
                                <IoMdSchool className="footer_icon" />
                                THPT Châu Văn Liêm
                                58 Ngô Quyền, phường An Cư, quận Ninh Kiều, TP Cần Thơ
                            </div>
                            <div className="footer_content_item_row">
                                <AiFillFacebook className="footer_icon" />
                                <a  target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/H%E1%BB%97-Tr%E1%BB%A3-%C4%90%E1%BB%99t-Qu%E1%BB%B5-110765158146543/?gidzl=zUza7kNmNKhnyM4GvkzQJ_NoPXBuv5nDkAre5Vst0HYue6uH-BS5IkFvEnEcvGHDiQyv430ZBmrivFDGH0">
                                    Facebook
                                </a>
                            </div>
                        </div>
                        {/* <div className="footer_divider_item"></div>
                    <div className="footer_content_item">
                        <div className="footer_content_item_row">
                            <FaDoorOpen className="footer_icon" />
                        </div>
                        <div className="footer_content_item_row">
                            <IoIosSchool className="footer_icon" />
                        </div>
                        <div className="footer_content_item_row">
                            <FaPhoneAlt className="footer_icon" />
                        </div>
                    </div> */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
// LIÊN HỆ
// 1. Nguyễn Minh Tú, Giáo viên THPT Chuyên Chu Văn An,  Email: nguyenminhtuls@gmail.com, SĐT: 0915.156.288
// 2. Vũ Hoàng Thi, Lớp 10B, THPT Chuyên Chu Văn An, SĐT: 0869.802.981
// 3. Phạm Gia Khánh, Lớp 10D1, THPT Chuyên Chu Văn An, SĐT: 0912.107.153
