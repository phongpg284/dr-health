import React from 'react';
import { ImUserTie } from 'react-icons/im';
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import QNA_IMAGE from '../../assets/QNA.svg'

import { isMobile } from 'react-device-detect';
import Forum1 from '../../assets/forum_img/forum1.jpg';
import Forum2 from '../../assets/forum_img/forum2.jpg';
import Forum3 from '../../assets/forum_img/forum3.jpg';
import Forum4 from '../../assets/forum_img/forum4.jpg';
import Forum5 from '../../assets/forum_img/forum5.jpg';
import Forum6 from '../../assets/forum_img/forum6.jpg';
import Forum7 from '../../assets/forum_img/forum7.jpg';
import Forum8 from '../../assets/forum_img/forum8.jpg';
import Forum9 from '../../assets/forum_img/forum9.jpg';
import Forum10 from '../../assets/forum_img/forum10.jpg';
import Forum11 from '../../assets/forum_img/forum11.jpg';
import Forum12 from '../../assets/forum_img/forum12.jpg';
import Forum13 from '../../assets/forum_img/forum13.jpg';
import Forum14 from '../../assets/forum_img/forum14.jpg';
import Forum15 from '../../assets/forum_img/forum15.jpg';
import Forum16 from '../../assets/forum_img/forum16.jpg';
import Forum17 from '../../assets/forum_img/forum17.jpg';
import Forum18 from '../../assets/forum_img/forum18.jpg';
import Forum19 from '../../assets/forum_img/forum19.jpg';
import Forum20 from '../../assets/forum_img/forum20.jpg';
import Forum21 from '../../assets/forum_img/forum21.jpg';
import Forum22 from '../../assets/forum_img/forum22.jpg';
import { motion } from 'framer-motion';
import AvatarBS from '../../assets/bs_avatar.jpg'

const items = [
    Forum1,
    Forum2,
    Forum3,
    Forum4,
    Forum5,
    Forum6,
    Forum7,
    Forum8,
    Forum9,
    Forum10,
    Forum11,
    Forum12,
    Forum13,
    Forum14,
    Forum15,
    Forum16,
    Forum17,
    Forum18,
    Forum19,
    Forum20,
    Forum21,
    Forum22,

]

function QuestionAndAnswer() {
    function onSubmit(e: any) {
        e.preventDefault();
    }
    return (
        <div className="qna">
            <div className="forum">
                <h1 className="title">
                    Diễn đàn chia sẻ
                </h1>
                <div className="forum_content">
                    <Carousel className="carousel" autoplay={true} autoplaySpeed={1500}>
                        {
                            items.map((item, index) => {
                                return (
                                    <div className="forum_item" key={index}>
                                        <img className="img" src={item} alt="img_item" />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
            </div>

            <div className="qna_box">
                {!isMobile && <div className="qna_banner">
                    <motion.img
                        initial={{ y: 100 }}
                        animate={{ y: -100 }}
                        transition={{ duration: 1, type: "tween", repeat: Infinity, repeatType: "reverse" }}
                        src={QNA_IMAGE} alt="" className="banner" />
                </div>}
                <div className="qna_content">
                    <div className="title">
                        Hỏi đáp cùng chuyên gia
                    </div>
                    <div className="expert">
                        <div className="expert_avatar">
                            {/* <ImUserTie className="avatar" /> */}
                            <img src={AvatarBS} alt="" className="avatar" />
                        </div>
                        <div className="expert_info">
                            <div className="expert_name">
                            Bác sĩ

                            </div>
                            <div className="des">
                                Bác Sĩ điều trị 
                            </div>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} action="" className="form">
                        <input className="qna_input" type="text" placeholder="Tên *" />
                        <input className="qna_input" type="text" placeholder="SDT *" />
                        <textarea className="qna_input" placeholder="Câu hỏi" />
                        <div className="btn_space">
                            <button className="submit">
                                Gửi
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default QuestionAndAnswer;