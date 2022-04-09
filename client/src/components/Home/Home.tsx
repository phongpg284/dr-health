import "./home.scss";
import React, { useRef, useState, useEffect } from "react";
import { Slider } from "./Slider";
import mainPic from "../../assets/main-picture.svg";
import Header from "components/Header";

import ImageHomeVideo from '../../assets/image_home_video.svg'
import AbstractVideo from '../../assets/abstract-video.svg'
import AbstractOneLine from '../../assets/abstract-one-line.svg';
import AbstractBackground from '../../assets/abstract-two-line.svg'
import Abstract11 from '../../assets/abstract11.svg'
import Abstract11Vertical from '../../assets/abstract11_vertical.svg'


import { RiLoginCircleFill, RiEyeCloseLine } from 'react-icons/ri'
import { ImEyePlus } from 'react-icons/im'
import { AiOutlineLogin, AiOutlineHeart, AiFillPlayCircle, AiFillStar, AiOutlineUser, AiOutlineLeft, AiOutlineRight, AiFillLeftCircle, AiFillRightCircle, AiFillEye } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { IoIosSend, IoMdToday } from 'react-icons/io'
import { FaAudible, FaEnvira, FaHandHoldingHeart } from 'react-icons/fa'

import { motion } from 'framer-motion'
import { Modal } from 'react-bootstrap'
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsCalendar2MonthFill } from "react-icons/bs";
import { MdGppGood, MdOutlineTouchApp } from "react-icons/md";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

import { isMobile } from 'react-device-detect';
import { ImUserTie } from "react-icons/im";
import QuestionAndAnswer from "./QuestionAndAnswer";
import { useAppDispatch, useAppSelector } from "../../app/store";
import * as GreetingBot from '../../app/GreetingBot';
import FocusInformation from './FocusInformation';



export const Home = () => {
    const data = useAppSelector((state) => state.greetingBot.data);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(GreetingBot.setGreetingName(GreetingBot.GreetingNameType.HomePage))
    }, [])

    const videoRef = useRef(null);
    const contactRef = useRef(null);
    const slideRef = useRef(null);

    const handleClickVideo = () => {
        (videoRef?.current as any).scrollIntoView({ behavior: "smooth" });
    };
    const handleClickContact = () => {
        (contactRef?.current as any).scrollIntoView({ behavior: "smooth" });
    };
    const handleClickSlide = () => {
        (slideRef?.current as any).scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div className="home_wrapper">

            <Header />
            <div className="home-content">


                <div style={{ backgroundImage: `url(${AbstractBackground})` }} className="home_main">
                    {/* <img src={AbstractBackground} className="bg" alt="" /> */}

                    <div className="content1">
                        <div className="home_main_slogan">
                            <div className="home_main_slogan_line">
                                THEO DÕI SỨC KHỎE<br />
                                DỰ BÁO DẤU HIỆU VÀ HỖ TRỢ <br />
                                PHỤC HỒI CHỨC NĂNG CHO<br />
                                BỆNH NHÂN ĐỘT QUỴ</div>
                            <div className="home_main_description">
                                Website đồng hành hỗ trợ phòng chống đột quỵ<br />
                                STROKE FREE<br />
                                Không lo đột quỵ

                            </div>
                            <div className="btn_space">
                                <a href="#focus" className="main_home_btn1">
                                    <span>
                                        Tiêu điểm của chúng tôi
                                    </span>
                                </a>

                                <a href="#strength" className="main_home_btn2">
                                    <span>
                                        Tính năng của hệ thống
                                    </span>
                                </a>

                                <a href="#achievements" className="main_home_btn3">
                                    <span>
                                        Trải nghiệm người dùng
                                    </span>
                                </a>


                            </div>
                        </div>
                        {
                            !isMobile && <div className="home_main_pic">
                                <img src={mainPic} alt="" />
                            </div>
                        }

                    </div>

                </div>

                <FocusInformation />


                <Strength />

                <Achievements />


                <CustomerFeedBacks />



                <Slider />

                <HomeVideo />

                <QuestionAndAnswer />

                <ViewsAndComments />

            </div>
            <div ref={contactRef}></div>
        </div>
    );
};

const everyDayView = 500;
const viewToday = Math.floor((new Date().getHours() / 24) * everyDayView);
const viewThisMonth = Math.floor(new Date().getDate() * everyDayView) + viewToday;
const allViews = Math.floor(
    ((new Date().getTime() - new Date("2021-05-01").getTime()) / (1000 * 60 * 60 * 24))
    * everyDayView + viewToday);

function ViewsAndComments() {

    const [updateView, setUpdateView] = React.useState(0);
    React.useEffect(() => {
        increase();
    }, [updateView])
    function increase() {
        setTimeout(() => {
            setUpdateView(updateView + 1);
        }, 15000)
    }
    return (
        <div className="viewAndComments">
            <div className="view">
                <div className="viewContent">
                    <div className="viewItem">
                        <div className="viewIcon">
                            <IoMdToday />
                        </div>
                        <div className="viewText">
                            Hôm nay
                        </div>
                        <div className="viewNumber">
                            {viewToday + updateView}
                        </div>
                    </div>
                    <div className="viewItem">
                        <div className="viewIcon">
                            <BsCalendar2MonthFill />
                        </div>
                        <div className="viewText">
                            Tháng này
                        </div>
                        <div className="viewNumber">
                            {viewThisMonth + updateView}
                        </div>
                    </div>
                    <div className="viewItem">
                        <div className="viewIcon">
                            <AiFillEye />
                        </div>
                        <div className="viewText">
                            Tất cả
                        </div>
                        <div className="viewNumber">
                            {allViews + updateView}
                        </div>
                    </div>
                </div>

            </div>
            <Comments />
        </div>
    )
}


function Comments() {
    const [value, setValue] = React.useState("")
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setValue("")
    }
    return (
        <form onSubmit={onSubmit} className="comments">
            <div className="cmt_title">
                Đóng góp ý kiến
            </div>
            <div className="cmt_des">
                Ý kiến của bạn sẽ giúp chúng tôi hoàn thiện hơn
            </div>
            <div className="formContent">
                <textarea className="input" value={value} onChange={(e) => { setValue(e.target.value) }}>

                </textarea>
                <div className="btn_space">
                    <button>
                        Gửi
                    </button>
                </div>
            </div>

        </form>
    )
}



function HomeVideo() {
    function AnimateDiv(delay: number) {
        return (<motion.div
            initial={{ width: "0%", height: "0%", opacity: 1, }}
            animate={{ width: "200%", height: "200%", opacity: 0 }}
            transition={{ type: "tween", duration: 5, repeat: Infinity, repeatType: "loop", delay: delay, repeatDelay: 0 }}
            className="wave" />)
    }
    const ArrayDiv = React.useMemo(() => {
        const arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(AnimateDiv(i * 0.5))
        }
        return arr
    }, [])

    const [show, setShow] = React.useState(false);
    function toggle() {
        setShow(!show)
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const ref = React.useRef<CarouselRef>(null);

    function next() {
        ref.current?.next();
    }
    function prev() {
        ref.current?.prev();
    }

    return (
        <div style={{ backgroundImage: `url(${AbstractVideo})` }} className="home_video">
            {/* <div className="image_container">
                <img src={ImageHomeVideo} alt="" />
            </div> */}

            <div
                className="content_container">
                <h1
                    className="title">

                    Video hướng dẫn
                </h1>
                <p className="des">
                    Cung cấp các video hướng dẫn cách xử lý, sơ cứu và chăm sóc người đột quỵ. Cung cấp các bài tập thể dục phòng đột quỵ và các bài tập vật lý trị liệu phục hồi chức năng cho bệnh nhân đột quỵ
                </p>

                <div className="video_carousel_container">
                    <div className="carousel-button-group">
                        <button onClick={() => prev()}>
                            <span>
                                <AiFillLeftCircle />
                            </span>
                        </button>
                        <button onClick={() => next()} >
                            <span>
                                <AiFillRightCircle />
                            </span>
                        </button>
                    </div>
                    <div className="background">

                    </div>
                    <Carousel infinite className="CarouselMultiple" ref={ref} slidesToShow={isMobile ? 1 : 3} >

                        <IFrameItem
                            src={`https://www.youtube.com/embed/SKs8EKh_3SQ`}
                            title="Kỹ năng sơ cứu người bị đột quỵ" />
                        <IFrameItem
                            src={`https://www.youtube.com/embed/DhQEnCmI110`}
                            title="XÂY DỰNG CHẾ ĐỘ DINH DƯỠNG HỢP LÝ CHO NGƯỜI ĐỘT QUỴ" />
                        <IFrameItem
                            src={`https://www.youtube.com/embed/4zNBswPDa_M`}
                            title="Tập vật lý trị liệu cho người bệnh đột quỵ" />
                        <IFrameItem
                            src={`https://www.youtube.com/embed/T2H8lLHaF5o`}
                            title="Vật lý trị liệu, phục hồi chức năng cho bệnh nhân đột quỵ" />
                        <IFrameItem
                            src={`https://www.youtube.com/embed/O8ACLEyuRc4`}
                            title="8 BƯỚC SƠ CỨU KHẨN CẤP NGƯỜI BỊ ĐỘT QUỴ, VÀI PHÚT NGẮN NGỦI GIÚP BẠN CỨU SỐNG CẢ MẠNG NGƯỜI" />
                        <IFrameItem
                            src={`https://www.youtube.com/embed/Mdy19UxHWR4`}
                            title="(VTC14)_ Nhận biết và sơ cứu đột quỵ" />
                    </Carousel>

                </div>

            </div>
        </div>
    )
}

function IFrameItem({ src, title }: { src: string, title: string }) {
    return (
        <div className="iframe_item">
            <iframe className="iframe_youtube" src={src} />
            <div className="i_title">
                <span>
                    {title}
                </span>
            </div>
        </div>
    )
}

function ModalVideo({ show, setShow }: { show: boolean, setShow: any }) {
    function onHide() {
        setShow(false);
    }
    return (
        <Modal dialogClassName="modal_home" centered show={show} onHide={onHide} fullscreen={"xxl-down"}>
            <Modal.Header closeButton>
                <Modal.Title>Video giới thiệu</Modal.Title>
            </Modal.Header>
            <Modal.Body className="home_video_body">
                <iframe className="iframe_youtube"
                    src="https://www.youtube.com/embed/SKs8EKh_3SQ">
                </iframe>
            </Modal.Body>
        </Modal>
    )
}

function Achievements() {

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        window.addEventListener("scroll", checkVisible);
        return () => {
            window.removeEventListener("scroll", checkVisible);
        }
    }, [])

    const [visible, setVisible] = React.useState(false);
    const [pos, setPos] = React.useState(0);


    function checkVisible() {
        if (!ref || !ref.current) return;

        const scrollY = window.scrollY;
        const height = window.innerHeight;
        const midScreen = scrollY + (height);


        const positionY = ref.current?.offsetTop || 0;
        if (midScreen >= positionY) {
            setVisible(true)
        }
    }

    return (
        <div ref={ref} id="achievements" className="rate_website">
            {isMobile ?
                <motion.img
                    initial={{ x: "-300%" }}
                    animate={{ x: visible ? "0%" : "-50%" }}


                    transition={{ type: "tween", duration: 1.5 }}

                    src={Abstract11Vertical} alt="" className="bg" /> :
                <motion.img
                    initial={{ x: "-100%", y: "-0%" }}
                    animate={{ x: visible ? "0%" : "-100%", y: "-25%" }}
                    transition={{ type: "tween", duration: 1.5 }}

                    src={Abstract11} alt="" className="bg" />

            }


            <svg width="0" height="0">
                <linearGradient id="purple-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="#ff0070" offset="0%" />
                    <stop stopColor="#0075ff" offset="100%" />
                </linearGradient>
            </svg>
            <AchievementsItem
                icon={
                    <AiOutlineLogin
                        className="rate_item_icon"
                        style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />
                }
                number={455}
                des="Người đã đăng ký" />

            <AchievementsItem
                icon={
                    <RiEyeCloseLine
                        className="rate_item_icon"
                        style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />
                }
                number={602}
                des="Lượt truy cập mỗi ngày" />
            <AchievementsItem
                icon={
                    <MdOutlineTouchApp
                        className="rate_item_icon"
                        style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />
                }
                number={1050}
                des="Lượt tương tác" />
            <AchievementsItem
                icon={
                    <BiLike
                        className="rate_item_icon"
                        style={{
                            fill: "url(#purple-gradient)",
                            stroke: "url(#purple-gradient)"
                        }} />
                }
                number={665}
                des="Người cảm thấy hài lòng" />
        </div>
    )
}

function AchievementsItem({ icon, number, des }: { icon: any, number: number, des: string }) {

    const [currentNumber, setCurrent] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const maxTime = 3000; // seconds

    useEffect(() => {
        window.addEventListener("scroll", checkVisible);
        return () => {
            window.removeEventListener("scroll", checkVisible);
        }
    }, [])
    function checkVisible() {

        if (!ref || !ref.current) return;

        const scrollY = window.scrollY;
        const positionY = ref.current.offsetTop;
        if (scrollY >= positionY && currentNumber == 0) {

            increase();
            window.removeEventListener("scroll", checkVisible);
        }
    }


    useEffect(() => {
        if (currentNumber > number || currentNumber == 0) return;
        increase()
    }, [currentNumber])

    function increase() {
        const time = maxTime / number;
        setTimeout(() => {
            if (currentNumber != number)
                setCurrent(currentNumber + 1);
        }, time)
    }



    return (
        <div className="rate_item" ref={ref}>
            <div className="rate_item_wrapper">
                <div className="icon_container">
                    {icon}
                </div>

                <div className="rate_content">
                    <div className="rate_item_text">

                        <span>
                            {currentNumber}
                        </span>
                    </div>
                    <div className="rate_item_des">
                        {des}
                    </div>
                </div>
            </div>

        </div>

    )
}


function Strength() {

    return (
        <div id="strength" className="strength" style={{ backgroundImage: `url(${AbstractOneLine})` }}>
            <svg width="0" height="0">
                <linearGradient id="purple-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="#ff0070" offset="0%" />
                    <stop stopColor="#0075ff" offset="100%" />
                </linearGradient>
            </svg>
            <div className="text">
                <h2 className="title">
                    Trải nghiệm và cảm nhận
                </h2>
                <h4 className="describe">
                    Website <Link to="hotrodotquy.vn">hotrodotquy.vn</Link> là phiên bản cập nhật mới nhất giúp người dùng trải nghiệm các ứng dụng tiện ích để theo dõi sức khỏe và hỗ trợ phòng chống đột quỵ.
                </h4>
            </div>
            <div className="features">

                <Feature
                    icon={<AiOutlineHeart style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />}
                    text="Thân thiện" />
                <Feature
                    icon={<IoIosSend style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />}
                    text="Chuyên nghiệp" />
                <Feature
                    icon={<FaAudible style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />}
                    text="Tốc độ" />
                <Feature
                    icon={<FaEnvira style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />}
                    text="Tương thích" />
                <Feature
                    icon={<MdGppGood style={{ fill: "url(#purple-gradient)", stroke: "url(#purple-gradient)" }} />}
                    text="Chất lượng" />
            </div>
        </div>
    )
}
function Feature({ icon, text }: { icon: any, text: string }) {
    return (
        <div className="feature">
            <div className="icon_container">
                <div className="dot_container">
                    <div className="dot1 dot"></div>
                    <div className="dot2 dot"></div>
                </div>
                <div className="icon_wrapper">
                    {icon}

                </div>
            </div>
            <div className="text">
                {text}
            </div>
        </div>
    )
}

function CustomerFeedBacks() {
    const ref = React.useRef<CarouselRef>(null);

    function nextSlide() {
        ref.current?.next();
    }
    function prevSlide() {
        ref.current?.prev();
    }
    return (
        <div className="feed_back">
            <h1 className="title">Phản hồi từ người dùng</h1>
            <p className="des">
                Chia sẻ từ người dùng khi đến với Website
            </p>
            <div className="carousel">
                <div onClick={prevSlide} className="slideButton left">
                    <BsFillArrowLeftSquareFill />
                </div>
                <div onClick={nextSlide} className="slideButton right">
                    <BsFillArrowRightSquareFill />
                </div>
                <Carousel ref={ref} className="feed_back_slider" autoplay>
                    <FeedBackItem
                        star={5}
                        name="Thanh Liêm"
                        comment="Website cung cấp nhiều tinh tức bổ ích cập nhật các kiển thức về bệnh đột quỵ"
                    />
                    <FeedBackItem
                        star={4}
                        name="Quốc Bảo"
                        comment="Video hướng dẫn sơ cứu giúp mọi người có cách xử lý và sơ cứu người đột quỵ đúng cách trước khi chuyển đến cơ sơ điều trị"
                    />
                    <FeedBackItem
                        star={4}
                        name="Khánh Linh"
                        comment="Website giúp em biết cách phòng ngừa đột quỵ. Hiện nay tỉ lệ người trẻ bị đột quỵ rất cao"
                    />
                    <FeedBackItem
                        star={5}
                        name="Nhật Hạ"
                        comment="Diễn đàn chia sẻ nhiều kinh nghiệm trong việc chăm sóc sức khỏe cho người bệnh hậu đột quỵ"
                    />
                    <FeedBackItem
                        star={5}
                        name="Đình Khuê"
                        comment="Tìm rất nhanh địa chỉ và số điện thoại liên hệ các cơ sở điều tri đột quỵ gần nhất khi cần thiết"
                    />
                    <FeedBackItem
                        star={5}
                        name="Bác sĩ 1"
                        comment="Hệ thống giúp bác sĩ dễ dàng cập nhật các thông tin liên quan bệnh nhân và theo dõi quá trình điều trị bệnh nhân đột quỵ"
                    />
                    <FeedBackItem
                        star={5}
                        name="Bác sĩ 2"
                        comment="Hệ thống giúp bác sĩ đưa ra các đánh giá thang điểm đột quỵ cho bệnh nhân theo tiêu chuẩn của Bộ Y tế"
                    />
                    <FeedBackItem
                        star={4}
                        name="Bác sĩ 3"
                        comment="Hệ thống giúp bác sĩ đưa ra dự báo sớm cho bệnh nhân các dấu hiệu đột quỵ"
                    />
                    <FeedBackItem
                        star={5}
                        name="Người thân 1"
                        comment="Thông qua các mini game giúp bệnh nhân đột quỵ cải thiện trí nhớ và rèn luyện khả năng phản xạ"
                    />
                    <FeedBackItem
                        star={5}
                        name="Người thân 2"
                        comment="Người thân thuận lợi hơn trong việc quan sát và chăm sóc người nhà của mình"
                    />

                </Carousel>
            </div>
        </div>
    )
}

function FeedBackItem({ avatar, name, star, comment }: { avatar?: string, name: string, star: number, comment: string }) {

    return (
        <div className="fb_item">
            <div className="user">
                <div className="avatar_container">
                    {
                        avatar ?
                            <img src={avatar} alt="avatar" /> :
                            <AiOutlineUser className="avatar" />
                    }

                </div>
                <div className="name">
                    {name}
                </div>
            </div>
            <div className="fb_content">
                <StarFeedBack star={star} />
                <div className="comment">
                    {comment}
                </div>
            </div>

        </div>
    )
}

function StarFeedBack({ star }: { star: number }) {
    const stars = React.useMemo(() => {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push(i < star ? "star" : "star star_empty")
        }
        return arr;
    }, [star])
    return (
        <div className="star_container">
            {stars.map((item, index) => (
                <AiFillStar className={item} key={index + item} />
            ))
            }
        </div>
    )
}