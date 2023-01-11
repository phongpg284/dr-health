import "./firstaid2.scss";
import React from "react";
import { Image } from "react-bootstrap";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";

// image

import back_2 from "../../assets/itemBack_2.png";
import back_1 from "../../assets/itemBack.png";

//icon

const FirstAid2 = () => {
  const slide = React.useRef<CarouselRef>(null);

  return (
    <>
      <div className="aid_immediate_all">
        <Image src={back_1} className="aid_immediate_img_1"></Image>
        <Image src={back_2} className="aid_immediate_img_2"></Image>
        <div className="aid_immediate_carry">
          <div className="aid_immediate_title">Video hỗ trợ sơ cứu</div>
          <div className="aid_immediate_video_slide_container">
            <Carousel className="aid_immediate_video_slide_wrapper" ref={slide}>
              <div>
                <div className="aid_immediate_video_slide_item">
                  <iframe
                    className="aid_immediate_video_frame"
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/SKs8EKh_3SQ"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </div>
            </Carousel>
            {/* <div className="aid_immediate_button aid_immediate_button_left">
                            <img src={back_arrow} className="aid_immediate_icon" onClick={slide.current?.prev} />
                        </div>
                        <div className="aid_immediate_button aid_immediate_button_right">
                            <img src={back_arrow} className="aid_immediate_icon" style={{ transform: "scaleX(-1)" }} onClick={slide.current?.next} />
                        </div>
                        <div className="aid_immediate_control"></div> */}
          </div>
          {/* <div className="aid_immediate_control">
                    <div className="aid_immediate_button"><IoPlaySkipBack className="aid_immediate_icon" onClick={function () { slide.current?.prev; }} /></div>
                    <div className="aid_immediate_button"><IoPlaySkipBack className="aid_immediate_icon" style={{ transform: "scaleX(-1)" }} onClick={slide.current?.next} /></div>
                </div> */}
        </div>
      </div>
    </>
  );
};

export default FirstAid2;
