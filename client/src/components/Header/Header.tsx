import { useAppDispatch, useAppSelector } from "../../app/store";
import { updateToken } from "../../app/authSlice";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { ADD_DEVICE, GET_DEVICE_STATUS, GET_DOCTOR_PROFILE, GET_PATIENT_PROFILE, REMOVE_DEVICE } from "./schema";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
import "./header.scss";

//icon

import { BsFillCaretDownFill } from "react-icons/bs";
import { BiCalendarPlus } from "react-icons/bi";
import { FaPhoneAlt, FaUserAlt, FaUserInjured, FaPowerOff, FaBell, FaLaptopMedical } from "react-icons/fa";
import { GrClose, GrScorecard } from 'react-icons/gr'
//image

import AbstractMini from '../../assets/abstract-mini.svg'
import logo from "../../assets/logo1.png";
import logoSwitch from "../../assets/switch.png";
import defaultAvatar from "../../assets/default-avatar.png";
import defaultAvatarPatient from "../../assets/default-avatar-patient.png";
import arrowup from "../../assets/arrow-up.png";
import NotificationIcon from "components/NotificationIcon";
import { FooterContext } from "App";
import { IoGameControllerOutline, IoWatch } from "react-icons/io5";
import { updateRelativeRole } from "app/RelativeRoleSlice";
import { message, Modal, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { AiFillCaretDown, AiOutlineLogin, AiOutlineMenu, AiOutlineHome } from 'react-icons/ai'
import { HiSwitchHorizontal } from 'react-icons/hi'
import { motion } from "framer-motion";
import { isMobile } from 'react-device-detect';
import { IoMdClose } from "react-icons/io";
import LogoTruong from '../../assets/logo_truong.png'

export default function Header(props: any) {

    const MenuRef = React.useRef<HTMLDivElement>(null)

    const [closeMenu, setCloseMenu] = useState(true);
    function toggle() {
        setCloseMenu(!closeMenu);
    }
    function handleClickOutDropDown(event: any) {
        if (MenuRef.current && !MenuRef.current.contains(event.target)) {
            setCloseMenu(true);
        }
    }

    React.useEffect(() => {
        if (!closeMenu) {
            document.addEventListener("click", handleClickOutDropDown);
            return (() => {
                document.removeEventListener("click", handleClickOutDropDown);
            })
        }
    }, [closeMenu])


    const { accessToken, role } = useAppSelector((state) => state.account);

    const history = useHistory();
    const userAccountInfo = useAppSelector((state) => state.account);



    const [showUserDropDown, setShowUserDropDown] = useState(false);
    const toggleUserDropDown = () => setShowUserDropDown(!showUserDropDown);
    const openDropDown = () => {
        if (!showUserDropDown) setShowUserDropDown(true)
    }




    const footerRef = useContext(FooterContext);
    return (
        <div className="header_wrapper">
            <div className="wrapper_child">
                <div className="header_banner">
                    <div className="banner_content">
                        <img className="banner_img" alt="logo" src={logo} />
                        <div className="banner_text">
                            <b className="web_name">
                                Dr. Health
                            </b>
                            <p className="web_des">Trang thông tin và theo dõi tình trạng bệnh nhân</p>
                        </div>
                    </div>
                    {/* <div className="logo_content">
                        <img className="logo_img" alt="logo" src={LogoTruong} />
                    </div> */}
                </div>
                <div ref={MenuRef} className={`header_all `}>
                    {
                        isMobile &&
                        <div className="mobile_head">
                            <Link className="first_link" to="/">
                                <AiOutlineHome />
                            </Link>
                            <div onClick={toggle} className="menu_button">
                                <AiOutlineMenu />
                            </div>
                        </div>
                    }
                    <motion.div
                        initial={{ x: isMobile ? "-100%" : "0" }}
                        animate={{ x: isMobile && closeMenu ? "-100%" : '0' }}
                        transition={{ type: "tween", duration: 0.5 }}
                        className="header_topbar" >
                        <div className="header_navigate_bar">
                            {!isMobile && <Link className="header_navigate_bar_item first" to="/">
                                <span> Trang chủ</span>
                            </Link>}
                            <LinkDropDown title="Bản tin">
                                <Link className="drop_down_link" to="/news/nhan-biet-dot-quy">
                                    Nhận biết các bệnh
                                </Link>
                                <Link className="drop_down_link" to="/news/dieu-tri-dot-quy">
                                    Điều trị các bệnh
                                </Link>
                                <Link className="drop_down_link" to="/news/phong-ngua-dot-quy">
                                    Phòng ngừa các bệnh
                                </Link>
                                <Link className="drop_down_link" to="/news/cap-cuu">
                                    Cấp cứu
                                </Link>
                                <Link className="drop_down_link" to="/news/tu-vong-do-dot-quy-o-nguoi-tre-tuoi-ngay-cang-gia-tang">
                                    Bệnh ở người trẻ tuổi
                                </Link>
                                <Link className="drop_down_link" to="/news/quy-tac-befast">
                                    Quy tắc BEFAST
                                </Link>
                            </LinkDropDown>

                            <LinkDropDown title="Hỗ trợ bệnh nhân">
                                <Link className="drop_down_link" to="/ho-tro/che-do-dinh-duong">
                                    Chế độ dinh dưỡng
                                </Link>
                                <Link className="drop_down_link" to="/ho-tro/giai-phap-phong-ngua">
                                    Giải pháp phòng ngừa các bệnh hiệu quả
                                </Link>
                                <Link className="drop_down_link" to="/ho-tro/so-cuu">
                                    Sơ cứu bệnh nhân
                                </Link>
                                <Link className="drop_down_link" to="/ho-tro/vat-ly-tri-lieu">
                                    Bài tập vật lý trị liệu
                                </Link>
                            </LinkDropDown>
                            <Link className="header_navigate_bar_item" to="/co-so-dieu-tri">
                                <span>Cơ sở điều trị</span>
                            </Link>

                            {role == "doctor" &&
                                <Link className="header_navigate_bar_item" to="/stroke_point" >
                                    <span>Thang điểm đột quỵ</span>
                                </Link>
                            }

                        </div>
                        <div className="account_space">
                            {!userAccountInfo.accessToken && !userAccountInfo.id && (
                                <Link to="/login" className="login_btn last">
                                    <span>Đăng nhập</span>
                                    <span className="icon"><AiOutlineLogin /></span>
                                </Link>
                            )}

                            {userAccountInfo.accessToken && userAccountInfo.id && (
                                <div className="user_space">
                                    {/* {
                                        !isMobile && <NotificationIcon>
                                            <FaBell className="header_notifications_icon" />
                                        </NotificationIcon>
                                    } */}
                                    <NotificationIcon>
                                        <FaBell className="header_notifications_icon" />
                                    </NotificationIcon>
                                    <div className="avatar_container">


                                        {userAccountInfo.role === "doctor" && (
                                            <Image
                                                className="header_avatar header_imageremoveselect"
                                                src={defaultAvatar}
                                                onClick={openDropDown}

                                            />
                                        )}
                                        {userAccountInfo.role === "patient" && (
                                            <Image
                                                className="header_avatar header_imageremoveselect"
                                                src={defaultAvatarPatient}
                                                style={{ border: "solid 4px #319997", borderRadius: "50%" }}
                                                onClick={openDropDown}

                                            />
                                        )}
                                        <UserDropDown show={showUserDropDown} toggle={toggleUserDropDown} />
                                    </div>




                                </div>
                            )}
                            {
                                isMobile &&
                                <div className="close_btn_container">
                                    <div onClick={toggle} className="close_btn">
                                        <IoMdClose />
                                    </div>
                                </div>
                            }
                        </div>


                    </motion.div>

                </div>
            </div>

        </div>

    );
}

function LinkDropDown({ title, to, children }: { title: string, to?: string, children: any }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    function toggle() {
        setOpen(!open)
    }
    function close() {
        setOpen(false)
    }
    function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            close()
        }
    }
    useEffect(() => {

        if (open) {
            window.addEventListener("mouseup", handleClickOutside)
        }
        return () => {
            window.removeEventListener("mouseup", handleClickOutside)
        }
    }, [open])

    return (
        <div ref={ref} className="link_drop_down">
            <Link onClick={toggle} to={to || "#"} className="header_navigate_bar_item">
                {title}
                <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: open ? 180 : 0 }}
                    className="icon">
                    <AiFillCaretDown />
                </motion.span>
            </Link>
            <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }}
                className={`drop_down_box ${!open && "close"}`}>
                {children}
            </motion.div>
        </div>
    )
}


function UserDropDown({ show, toggle }: { show: boolean, toggle: any }) {
    const userAccountInfo = useAppSelector((state) => state.account);


    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!show) return;
        function handleClickOutside(event: any) {
            if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                toggle();
            }
        }
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [wrapperRef, show]);


    const [getDoctorProfile, { data: doctorProfile }] = useLazyQuery(GET_DOCTOR_PROFILE);
    const [getPatientProfile, { data: patientProfile }] = useLazyQuery(GET_PATIENT_PROFILE);
    const [getDeviceStatus, { data: deviceStatus }] = useLazyQuery(GET_DEVICE_STATUS);
    const [isDeviceConnect, setIsDeviceConnect] = useState(false);

    useEffect(() => {
        if (userAccountInfo.role && userAccountInfo.id) {
            if (userAccountInfo.role == "doctor") {
                getDoctorProfile({
                    variables: {
                        id: userAccountInfo.id,
                    },
                });
            }
            if (userAccountInfo.role == "patient") {
                getPatientProfile({
                    variables: {
                        id: userAccountInfo.id,
                    },
                });
            }
        }
    }, [userAccountInfo.role]);

    useEffect(() => {
        if (patientProfile && patientProfile?.getPatient?.deviceId) {
            getDeviceStatus({
                variables: {
                    id: patientProfile?.getPatient?.deviceId,
                },
            });
        }
    }, [patientProfile]);

    useEffect(() => {
        if (deviceStatus?.getDevice?.isConnect) {
            setIsDeviceConnect(deviceStatus.getDevice?.isConnect);
        }
    }, [deviceStatus]);

    const ContactUs = () => {
        if (patientProfile)
            return (
                <div
                    className="header_contact"
                    onClick={function () {
                        window.scrollTo(0, document.body.clientHeight);
                    }}
                >
                    <FaPhoneAlt className="header_contact_icon" />
                    Contact us
                </div>
            );
        return <></>;
    };

    const dispatch = useAppDispatch();

    const SigninTextName = () => {
        let nameSigninText = "";
        if (doctorProfile) {
            nameSigninText = doctorProfile.getDoctor.fullName;
        }
        if (patientProfile) {
            nameSigninText = patientProfile.getPatient.fullName;
        }
        return <>{` ${nameSigninText}`}</>;
    };

    const RecordsButton = () => {
        let records = "";
        if (doctorProfile) {
            records = "Ghi âm";
        }
        if (patientProfile) {
            records = "Hồ sơ bệnh nhân";
        }
        return <div>{records}</div>;
    };
    const handleLogout = () => {
        localStorage.removeItem("state");
        dispatch(
            updateToken({
                accessToken: "",
                email: "",
                role: "",
                id: "",
            })
        );
        window.location.reload();
    };
    const Reflecter = () => {
        let reflecter = "";
        if (doctorProfile) {
            reflecter = "Hồ sơ bệnh nhân";
        }
        if (patientProfile) {
            reflecter = "Bác sĩ";
        }
        return <div>{reflecter}</div>;
    };
    const reflecterHref = () => {
        let reflecter = "";
        if (doctorProfile) {
            reflecter = "/patients";
        }
        if (patientProfile) {
            reflecter = "/doctor";
        }
        return reflecter;
    };

    const isRelative = useAppSelector((state) => state.relativeRole).role;
    const handleSwitchRoleRelative = () => {
        dispatch(
            updateRelativeRole({
                role: !isRelative,
            })
        );
    };

    const [removeDevice, { data: removeStatus }] = useMutation(REMOVE_DEVICE);
    const [addDevice, { data: addStatus }] = useMutation(ADD_DEVICE);
    const [isDeviceStatusModalOpen, setIsDeviceStatusModalOpen] = useState(false);

    const handleOkRemove = () => {
        removeDevice({
            variables: {
                id: patientProfile?.getPatient?.deviceId,
                isConnect: false,
            },
        }).then((res) => {
            const data = res?.data?.removeDevice?.split(":");
            if (data[0] === "Success") {
                message.success(data[1]);
                setIsDeviceConnect(false);
            }
            if (data[0] === "Error") {
                message.error(data[1]);
            }
        });
    };

    const handleOkAdd = () => {
        addDevice({
            variables: {
                id: patientProfile?.getPatient?.deviceId,
                isConnect: false,
            },
        }).then((res) => {
            const data = res?.data?.addDevice?.split(":");
            if (data[0] === "Success") {
                message.success(data[1]);
                setIsDeviceConnect(true);
            }
            if (data[0] === "Error") {
                message.error(data[1]);
            }
        });
    };

    function confirmRemove() {
        Modal.confirm({
            title: "Xác nhận gỡ thiết bị vòng tay",
            icon: <ExclamationCircleOutlined />,
            content: "Vui lòng dừng sử dụng thiết bị trước khi xác nhận!",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: handleOkRemove,
        });
    }

    function confirmAdd() {
        Modal.confirm({
            title: "Xác nhận thêm thiết bị vòng tay",
            icon: <ExclamationCircleOutlined />,
            content: "Vui lòng bật thiết bị trước khi xác nhận!",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: handleOkAdd,
        });
    }

    const handleCancel = () => {
        setIsDeviceStatusModalOpen(false);
    };
    const handleClickDeviceStatus = () => {
        if (isDeviceConnect) confirmRemove();
        else confirmAdd();
    };
    return (
        <div className="user_dropdown_conatiner">
            <div ref={wrapperRef} className={`user_dropdown ${!show && "hide"}`}>
                <div className="dropdown_content">
                    <div className="drop_header">
                        <img src={AbstractMini} className="bg" />
                        {userAccountInfo.role === "patient" && (
                            <div className="drop_user">
                                <div className="drop_role">
                                    <Tooltip overlay="Đổi trạng thái bệnh nhân/người thân">
                                        <HiSwitchHorizontal className="switchicon" onClick={handleSwitchRoleRelative} />
                                    </Tooltip>
                                    <span>
                                        {isRelative ? "Người thân bệnh nhân" : "Bệnh nhân"}
                                    </span>
                                </div>

                                <div className="name">
                                    <SigninTextName />
                                </div>
                            </div>
                        )}
                        {userAccountInfo.role === "doctor" && (
                            <div className="drop_user" style={{ color: "black", width: "auto" }}>
                                <div className="drop_role">
                                    <span>Bác sĩ</span>
                                </div>

                                <div className="name">
                                    <SigninTextName />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="drop_list">
                        <div className="drop_item ">
                            <FaUserAlt className="header_pi_icon" />
                            <Link to="/profile">
                                Trang cá nhân
                            </Link>
                        </div>
                        <div className="drop_item ">
                            <FaBell className="header_pi_icon" />
                            <Link to="/notifications" >
                                Thông báo
                            </Link>
                        </div>
                        {doctorProfile && (
                            <div className="drop_item">
                                <FaUserInjured className="header_pi_icon" />
                                <Link to={reflecterHref()}>
                                    <Reflecter />
                                </Link>
                            </div>
                        )}
                        {patientProfile && (
                            <div className="drop_item">
                                <FaLaptopMedical className="header_pi_icon" />
                                <Link to="/record" >
                                    <RecordsButton />
                                </Link>
                            </div>
                        )}
                        {patientProfile && (
                            <div className="drop_item">
                                <IoGameControllerOutline className="header_pi_icon" />
                                {isRelative && (
                                    <Link to="/add-games" >
                                        <div>Thêm trò chơi</div>
                                    </Link>
                                )}
                                {!isRelative && (
                                    <Link to="/minigame" >
                                        <div>Trò chơi</div>
                                    </Link>
                                )}
                            </div>
                        )}
                        {patientProfile && (
                            <div onClick={handleClickDeviceStatus} className="drop_item">
                                <IoWatch className="header_pi_icon" />
                                {isDeviceConnect && <div className="text">Gỡ thiết bị</div>}
                                {!isDeviceConnect && <div className="text">Kết nối thiết bị</div>}
                            </div>
                        )}

                        {doctorProfile && (
                            <div className="drop_item">
                                <BiCalendarPlus className="header_pi_icon" />
                                <Link to="/calendar" >
                                    Đặt lịch dùng thuốc
                                </Link>
                            </div>
                        )}
                        {/* {doctorProfile && (
                            <div className="drop_item">
                                <GrScorecard className="header_pi_icon" />
                                <Link to="/stroke_point" >
                                    Điểm đột quỵ
                                </Link>
                            </div>
                        )} */}
                        {/* {patientProfile && (
                            <div className="header_pi_settings header_pi_item">
                                <GrBarChart className="header_pi_icon" />
                                <a href="/record" style={{ color: "#6c6464" }}>
                                    Chỉ số đo
                                </a>
                            </div>
                        )} */}
                        {/* <div className="header_pi_settings header_pi_item header_disable">
                            <HiCog className="header_pi_icon" />
                            Cài đặt
                        </div> */}

                        <div className="drop_item logout" onClick={handleLogout}>
                            <FaPowerOff className="header_pi_icon" />
                            <span className="text">
                                Đăng xuất
                            </span>
                        </div>
                        <Modal title="Xác nhận gỡ thiết bị" visible={isDeviceStatusModalOpen} onCancel={handleCancel}>
                            <p>Some contents...</p>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>

    )
}