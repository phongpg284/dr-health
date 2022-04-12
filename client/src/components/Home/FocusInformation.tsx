import * as React from 'react';

import { Carousel } from "antd";

import Image1 from 'assets/focusInformation1.jpg';
import Image2 from 'assets/focusInformation2.jpg';
import Image3 from 'assets/focusInformation3.jpg';
import Image4 from 'assets/focusInformation4.jpg';

import Background from 'assets/abstract15.svg'

import { motion } from 'framer-motion'

export default function FocusInformation() {
    const arr = new Array(4).fill(true);
    return (
        <div className="focus">
            <h1 id="focus">Tiêu điểm các bệnh 24h</h1>
            <p className="describe">
                Hãy liên hệ ngay lập tức với chúng tôi
            </p>
            <a className="hotline" href="tel:0816 056 426">
                <span>
                0816 056 426
                </span>
                {
                    arr.map((value, index) => (
                        <motion.div
                            initial={{ width: "100%", height: "100%", opacity: 1 }}
                            animate={{ width: "200%", height: "200%", opacity: 0 }}
                            transition={{
                                duration: 2,
                                type: "tween",
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: index * 0.5,
                            }}
                            key={index}
                            className="ring"
                        />
                    ))
                }
            </a>
            <img src={Background} className="background" />
            <Slider />
        </div>
    );
}

function Slider() {

    return (
        <div className="slider">
            <Carousel autoplay autoplaySpeed={10000}>
                <SliderItem img={Image1} />
                <SliderItem img={Image2} />
                <SliderItem img={Image3} />
                <SliderItem img={Image4} />

            </Carousel>
        </div>
    )
}

function SliderItem({ img }: { img: string }) {
    return (
        <div className="sliderItem">
            <div className="sliderItemImage">
                <img className="imgItem" src={img} />
            </div>
        </div>
    )
}
