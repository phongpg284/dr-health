import React from 'react';
import { Carousel } from "antd";

import Img1 from 'assets/experiment/e1.jpg';
import Img2 from 'assets/experiment/e2.jpg';
import Img3 from 'assets/experiment/e3.jpg';
import Img4 from 'assets/experiment/e4.jpg';
import Img5 from 'assets/experiment/e5.jpg';
import Img6 from 'assets/experiment/e6.jpg';
import {isMobile} from 'react-device-detect';

function Experiment() {
    return <div className="experiment">
        <Carousel className="carousel" autoplay={true} autoplaySpeed={3000} slidesToShow={isMobile ? 2 :3}>

            <Item src={Img1}/>
            <Item src={Img2}/>
            <Item src={Img3}/>
            <Item src={Img4}/>
            <Item src={Img5}/>
            <Item src={Img6}/>

        </Carousel>
    </div>;
}

function Item({src}:{src:string}){
    return (
        <div className="item">
             <img src={src} alt="img_item" className="img_item" />
        </div>
    )
}

export default Experiment;
