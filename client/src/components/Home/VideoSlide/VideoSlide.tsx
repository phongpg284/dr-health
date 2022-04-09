import "./index.scss";
import { Carousel } from "antd";

const VideoSlide = () => {
    return (
        <div className="home_video_slide_container">
            <Carousel className="home_video_slide_wrapper" autoplay>
                <div className="home_video_slide_item">
                    <iframe
                        width="85%"
                        height="600px"
                        src="https://www.youtube.com/embed/ODOhH86h3LE"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
                <div className="home_video_slide_item">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/e8b0QdRvNS8"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>{" "}
                </div>
                <div className="home_video_slide_item">
                    <iframe
                        width="85%"
                        height="600px"
                        src="https://www.youtube.com/embed/ODOhH86h3LE"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
            </Carousel>
        </div>
    );
};

export default VideoSlide;
