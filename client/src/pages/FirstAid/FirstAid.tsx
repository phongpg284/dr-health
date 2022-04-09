import React, { useState } from "react";
import Header from "components/Header";
import "./firstaid.scss";
import { Image } from "react-bootstrap";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";

// image

import back_2 from "../../assets/itemBack_2.png";
import back_1 from "../../assets/itemBack.png";
import back_arrow from "../../assets/back_arrow.png";

//icon

import { IoNutritionOutline} from "react-icons/io5";
import { GiLegArmor } from "react-icons/gi";

const FirstAid = () => {
    const slide = React.useRef<CarouselRef>(null);
    const slide2 = React.useRef<CarouselRef>(null);

    // const video_1 = React.useRef<HTMLIFrameElement>(null);
    const video_2 = React.useRef<HTMLIFrameElement>(null);
    const video_3 = React.useRef<HTMLIFrameElement>(null);
    const video_4 = React.useRef<HTMLIFrameElement>(null);
    const video_5 = React.useRef<HTMLIFrameElement>(null);

    const [tab, setSelectTab] = useState("nutri");
    const handleChangeTab = (key: string) => {
        setSelectTab(key);
    };

    const handleNextSlide1 = () => {
        slide?.current?.next();
    }
    const handleBackSlide1 = () => {
        slide?.current?.prev();
    }
    const handleNextSlide2 = () => {
        slide2?.current?.next();
    }
    const handleBackSlide2 = () => {
        slide2?.current?.prev();
    }

    return (
        <>
            <Header />
            <div className="aid_all">
                <Image src={back_1} className="aid_img_1"></Image>
                <Image src={back_2} className="aid_img_2"></Image>
                <div className="aid_carry">
                    <div className="home_switch">
                        <div className={tab === "nutri" ? "home_switch_back_1" : "home_switch_back_2"}></div>
                        <div className="home_row h_juround" style={{ position: "absolute", width: "100%" }}>
                            <div className={`home_switch_item ${tab==="nutri" ? "home_switch_item_toggle" : ""}`} onClick={() => handleChangeTab("nutri")}>
                                <IoNutritionOutline className="home_switch_icon" />
                                <span className="home_switch_text">&nbsp;&nbsp;Chế độ dinh dưỡng</span>
                            </div>
                            <div className={`home_switch_item ${tab==="restore" ? "home_switch_item_toggle" : ""}`} onClick={() => handleChangeTab("restore")}>
                                <GiLegArmor className="home_switch_icon" />
                                <span className="home_switch_text">&nbsp;&nbsp;Phục hồi chức năng</span>
                            </div>
                        </div>
                    </div>
                    <div className="aid_video_slide_container">
                        {tab === "nutri" && (
                            <>
                                <Carousel className="aid_video_slide_wrapper" ref={slide}>
                                    <div>
                                        <div className="aid_video_slide_item">
                                            <iframe
                                                className="aid_video_frame"
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/o1zBSaYmjdM"
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="aid_video_slide_item">
                                            <iframe
                                                ref={video_2}
                                                className="aid_video_frame"
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/6ANrTx9O4xs"
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>{" "}
                                        </div>
                                    </div>
                                </Carousel>
                                <div className="aid_button aid_button_left">
                                    <img src={back_arrow} className="aid_icon" onClick={handleBackSlide1} />
                                </div>
                                <div className="aid_button aid_button_right">
                                    <img src={back_arrow} className="aid_icon" style={{ transform: "scaleX(-1)" }} onClick={handleNextSlide1} />
                                </div>
                                <div className="aid_control"></div>
                            </>
                        )}
                        {tab === "restore" && (
                            <>
                                <Carousel className="aid_video_slide_wrapper" ref={slide2}>
                                    <div>
                                        <div className="aid_video_slide_item">
                                            <iframe
                                                className="aid_video_frame"
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/qmTg8oROZsA"
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="aid_video_slide_item">
                                            <iframe
                                                ref={video_2}
                                                className="aid_video_frame"
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/Tun80WKLpZE"
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>{" "}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="aid_video_slide_item">
                                            <iframe
                                                ref={video_3}
                                                className="aid_video_frame"
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/6mPCCeqCYrw"
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="aid_video_slide_item">
                                            <iframe
                                                ref={video_4}
                                                className="aid_video_frame"
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/QJ3aVx36xLs"
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="aid_video_slide_item">
                                            <iframe
                                                ref={video_5}
                                                className="aid_video_frame"
                                                width="100%"
                                                height="100%"
                                                src="https://www.youtube.com/embed/T9JEjuCZits"
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    </div>
                                </Carousel>
                                <div className="aid_button aid_button_left">
                                    <img src={back_arrow} className="aid_icon" onClick={handleBackSlide2} />
                                </div>
                                <div className="aid_button aid_button_right">
                                    <img src={back_arrow} className="aid_icon" style={{ transform: "scaleX(-1)" }} onClick={handleNextSlide2} />
                                </div>
                                <div className="aid_control"></div>
                            </>
                        )}
                    </div>

                    {/* <div className="aid_control">
                    <div className="aid_button"><IoPlaySkipBack className="aid_icon" onClick={function () { slide.current?.prev; }} /></div>
                    <div className="aid_button"><IoPlaySkipBack className="aid_icon" style={{ transform: "scaleX(-1)" }} onClick={slide.current?.next} /></div>
                </div> */}
                </div>
            </div>
        </>
    );
};

export default FirstAid;
