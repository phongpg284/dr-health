import "./header.scss";
import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Input, message, Modal, Tooltip } from "antd";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";

//icon
import { BiCalendarPlus } from "react-icons/bi";
import { FaUserAlt, FaUserInjured, FaPowerOff, FaBell, FaLaptopMedical } from "react-icons/fa";
import { IoWatch } from "react-icons/io5";
import { HiSwitchHorizontal } from "react-icons/hi";
import { AiFillCaretDown, AiOutlineLogin, AiOutlineMenu, AiOutlineHome } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import AbstractMini from "../../assets/abstract-mini.svg";
import logo from "../../assets/logo1.png";
import defaultAvatar from "../../assets/default-avatar.png";
import defaultAvatarPatient from "../../assets/default-avatar-patient.png";

import NotificationIcon from "components/NotificationIcon";
import { updateToken } from "../../app/authSlice";
import { updateRelativeRole } from "app/RelativeRoleSlice";
import { useApi } from "utils/api";
import headers from "../../temp/header.json";

const Header = () => {
  const MenuRef = React.useRef<HTMLDivElement>(null);
  const [closeMenu, setCloseMenu] = useState(true);
  const { role, accessToken, id } = useAppSelector((state) => state.account);
  const [isShowingUserDropDown, setIsShowingUserDropDown] = useState(false);
  const isAuthenticated = accessToken && id;
  const toggle = () => {
    setCloseMenu(!closeMenu);
  };
  function handleClickOutDropDown(event: any) {
    if (MenuRef.current && !MenuRef.current.contains(event.target)) {
      setCloseMenu(true);
    }
  }

  useEffect(() => {
    if (!closeMenu) {
      document.addEventListener("click", handleClickOutDropDown);
      return () => {
        document.removeEventListener("click", handleClickOutDropDown);
      };
    }
  }, [closeMenu]);

  const toggleUserDropDown = () => setIsShowingUserDropDown(!isShowingUserDropDown);
  const openDropDown = () => {
    if (!isShowingUserDropDown) setIsShowingUserDropDown(true);
  };

  return (
    <div className="header_wrapper">
      <div className="wrapper_child">
        <div className="header_banner">
          <div className="banner_content">
            <img className="banner_img" alt="logo" src={logo} />
            <div className="banner_text">
              <b className="web_name">Dr. Health</b>
              <p className="web_des">Trang thông tin và theo dõi tình trạng bệnh nhân</p>
            </div>
          </div>
        </div>
        <div ref={MenuRef} className={`header_all `}>
          {isMobile && (
            <div className="mobile_head">
              <Link className="first_link" to="/">
                <AiOutlineHome />
              </Link>
              <div onClick={toggle} className="menu_button">
                <AiOutlineMenu />
              </div>
            </div>
          )}
          <motion.div
            initial={{ x: isMobile ? "-100%" : "0" }}
            animate={{ x: isMobile && closeMenu ? "-150%" : "0" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="header_topbar"
          >
            <div className="header_navigate_bar">
              {!isMobile && (
                <Link className="header_navigate_bar_item first" to="/">
                  <span> Trang chủ</span>
                </Link>
              )}
              {headers &&
                headers?.map((category) => (
                  <>
                    {(!category?.condition || (category.condition === "doctor_only" && role === "doctor")) && (
                      <>
                        {category?.items ? (
                          <LinkDropDown key={category.id} title={category.title}>
                            {category.items?.map((item) => (
                              <Link key={item.id} className="drop_down_link" to={category.href + item.href}>
                                {item.title}
                              </Link>
                            ))}
                          </LinkDropDown>
                        ) : (
                          <Link className="header_navigate_bar_item" to={category.href}>
                            <span>{category.title}</span>
                          </Link>
                        )}
                      </>
                    )}
                  </>
                ))}
            </div>
            <div className="account_space">
              {!isAuthenticated && (
                <Link to="/login" className="login_btn last">
                  <span>Đăng nhập</span>
                  <span className="icon">
                    <AiOutlineLogin />
                  </span>
                </Link>
              )}

              {isAuthenticated && (
                <div className="user_space">
                  <NotificationIcon>
                    <FaBell className="header_notifications_icon" />
                  </NotificationIcon>
                  <div className="avatar_container">
                    {role === "doctor" && <Image className="header_avatar header_imageremoveselect" src={defaultAvatar} onClick={openDropDown} />}
                    {role === "patient" && (
                      <Image
                        className="header_avatar header_imageremoveselect"
                        src={defaultAvatarPatient}
                        style={{ border: "solid 4px #319997", borderRadius: "50%" }}
                        onClick={openDropDown}
                      />
                    )}
                    <UserDropDown show={isShowingUserDropDown} toggle={toggleUserDropDown} />
                  </div>
                </div>
              )}
              {isMobile && (
                <div className="close_btn_container">
                  <div onClick={toggle} className="close_btn">
                    <IoMdClose />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

function LinkDropDown({ title, to, children }: { title: string; to?: string; children: any }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  function toggle() {
    setOpen(!open);
  }
  function close() {
    setOpen(false);
  }
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      close();
    }
  }
  useEffect(() => {
    if (open) {
      window.addEventListener("mouseup", handleClickOutside);
    }
    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className="link_drop_down">
      <Link onClick={toggle} to={to || "#"} className="header_navigate_bar_item">
        {title}
        <motion.span initial={{ rotate: 0 }} animate={{ rotate: open ? 180 : 0 }} className="icon">
          <AiFillCaretDown />
        </motion.span>
      </Link>
      <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: open ? 0 : 100, opacity: open ? 1 : 0 }} className={`drop_down_box ${!open && "close"}`}>
        {children}
      </motion.div>
    </div>
  );
}

function UserDropDown({ show, toggle }: { show: boolean; toggle: any }) {
  const user = useAppSelector((state) => state.account);
  const isPatient = user?.role === "patient";
  const isDoctor = user?.role === "doctor";
  const history = useHistory();

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

  const [data, setData] = useState<any>({});
  const api = useApi();
  const [isDeviceConnect, setIsDeviceConnect] = useState(false);

  useEffect(() => {
    if (user.role && user.id) {
      api.get(`/user/${user.id}`).then((res) => setData(res.data));
    }
  }, [user.role]);

  useEffect(() => {
    if (user?.role === "patient" && data?.device) {
      api.get(`/doctor/${user.id}`).then((res) => setData(setIsDeviceConnect(res?.data?.isConnect)));
    }
  }, [data]);

  const dispatch = useAppDispatch();

  const SigninTextName = () => {
    const nameSigninText = data.fullName;
    return <>{` ${nameSigninText}`}</>;
  };

  const RecordsButton = () => {
    let records = "";
    if (isDoctor) {
      records = "Ghi âm";
    }
    if (isPatient) {
      records = "Hồ sơ bệnh nhân";
    }
    return <div>{records}</div>;
  };
  const handleLogout = () => {
    localStorage.removeItem("state");
    dispatch(
      updateToken({
        accessToken: "",
        refreshToken: "",
        email: "",
        role: "",
        id: "",
        roleId: "",
      })
    );
    history.push("/");
    window.location.reload();
  };
  const Reflecter = () => {
    let reflecter = "";
    if (isDoctor) {
      reflecter = "Hồ sơ bệnh nhân";
    }
    if (isPatient) {
      reflecter = "Bác sĩ";
    }
    return <div>{reflecter}</div>;
  };
  const reflecterHref = () => {
    let reflecter = "";
    if (isDoctor) {
      reflecter = "/patients";
    }
    if (isPatient) {
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

  const [isDeviceStatusModalOpen, setIsDeviceStatusModalOpen] = useState(false);
  const [deviceCode, setDeviceCode] = useState("");

  const handleOkRemove = () => {
    api.post(`/device/remove_device/${data.device.id}`).then((res) => {
      const data = res?.data;
      if (data.status === "Success") {
        message.success(data[1]);
        setIsDeviceConnect(false);
      }
      if (data.status === "Error") {
        message.error(data[1]);
      }
    });
  };

  const handleOkAdd = () => {
    api.post(`/device/add_device${deviceCode}&${user?.roleId}`).then((res) => {
      const data = res?.data;
      if (data.status === "Success") {
        message.success(data?.message);
        setIsDeviceConnect(false);
      } else {
        message.error(data?.message);
      }
    });
  };

  function confirmRemove() {
    Modal.confirm({
      title: "Xác nhận gỡ thiết bị",
      icon: <ExclamationCircleOutlined />,
      content: "Vui lòng dừng sử dụng thiết bị trước khi xác nhận!",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: handleOkRemove,
    });
  }

  function confirmAdd() {
    Modal.confirm({
      title: "Xác nhận kết nối thiết bị",
      icon: <ExclamationCircleOutlined />,
      content: <DeviceCode />,
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

  const handleChangeDeviceCode = (e: any) => {
    setDeviceCode(e?.target?.value);
  };

  const DeviceCode = () => {
    return <Input placeholder="Nhập mã thiết bị" onChange={handleChangeDeviceCode} />;
  };

  return (
    <div className="user_dropdown_conatiner">
      <div ref={wrapperRef} className={`user_dropdown ${!show && "hide"}`}>
        <div className="dropdown_content">
          <div className="drop_header">
            <img src={AbstractMini} className="bg" />
            {user.role === "patient" && (
              <div className="drop_user">
                <div className="drop_role">
                  <Tooltip overlay="Đổi trạng thái bệnh nhân/người thân">
                    <HiSwitchHorizontal className="switchicon" onClick={handleSwitchRoleRelative} />
                  </Tooltip>
                  <span>{isRelative ? "Người thân bệnh nhân" : "Bệnh nhân"}</span>
                </div>

                <div className="name">
                  <SigninTextName />
                </div>
              </div>
            )}
            {user.role === "doctor" && (
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
              <Link to="/profile">Trang cá nhân</Link>
            </div>
            <div className="drop_item ">
              <FaBell className="header_pi_icon" />
              <Link to="/notifications">Thông báo</Link>
            </div>
            {isDoctor && (
              <div className="drop_item">
                <FaUserInjured className="header_pi_icon" />
                <Link to={reflecterHref()}>
                  <Reflecter />
                </Link>
              </div>
            )}
            {isPatient && (
              <div className="drop_item">
                <FaLaptopMedical className="header_pi_icon" />
                <Link to="/record">
                  <RecordsButton />
                </Link>
              </div>
            )}
            {isPatient && (
              <div onClick={handleClickDeviceStatus} className="drop_item">
                <IoWatch className="header_pi_icon" />
                {isDeviceConnect && <div className="text">Gỡ thiết bị</div>}
                {!isDeviceConnect && <div className="text">Kết nối thiết bị</div>}
              </div>
            )}

            {isDoctor && (
              <div className="drop_item">
                <BiCalendarPlus className="header_pi_icon" />
                <Link to="/calendar">Đặt lịch dùng thuốc</Link>
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
              <span className="text">Đăng xuất</span>
            </div>
            <Modal title="Xác nhận gỡ thiết bị" visible={isDeviceStatusModalOpen} onCancel={handleCancel}>
              <p>Some contents...</p>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
