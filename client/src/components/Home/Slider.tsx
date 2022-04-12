import { Carousel } from "antd";
import React from "react"


import Patient1 from '../../assets/patient1.jpg'
import Patient2 from '../../assets/patient2.jpg'
import Patient3 from '../../assets/patient3.jpg'
import AbstractBack from '../../assets/abstract-green-yellow.png'
import AbstractVideo from '../../assets/abstract-video.svg'
//icon

import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai"
import { CarouselRef } from "antd/lib/carousel";


export const Slider = () => {
    const ref = React.useRef<CarouselRef>(null);

    function nextSlide() {
        ref.current?.next();
    }
    function prevSlide() {
        ref.current?.prev();
    }

    return (
        <div className="home_slide" style={{ backgroundImage: `url()` }}>
            <img src={AbstractBack} className="bg" alt="" />
            <h1 className="title_slider">Bản tin mỗi ngày</h1>
            <p className="des_slider">
                Cập nhật tin tức mới nhất các thông tin của Bộ Y tế. Người dùng có thêm kiến thức về nhận biết, phòng ngừa và điều trị các bệnh.
            </p>
            <div className="carousel_container">
                <svg width="0" height="0">
                    <linearGradient id="purple-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#ff0070" offset="0%" />
                        <stop stopColor="#0075ff" offset="100%" />
                    </linearGradient>
                </svg>
                <button onClick={nextSlide} className="icon_container right">
                    <AiFillRightCircle />
                </button>
                <button onClick={prevSlide} className="icon_container left">
                    <AiFillLeftCircle />
                </button>
                <div className="graborder">
                    <div className="carousel_wrapper">

                        <Carousel ref={ref} className="home_slide_carry" autoplay>
                            <ItemContainer title="Đột quỵ là gì?" image={Patient1}>
                                <p>
                                    -<b> Đột quỵ (tai biến mạch máu não) </b> là tình trạng não bộ bị tổn thương nghiêm
                                    trọng, xảy ra khi dòng máu cung cấp cho não bị gián đoạn hoặc có một mạch máu trong não bị vỡ. Khi đó, lượng oxy và dinh dưỡng nuôi các tế bào
                                    não bị giảm đáng kể. Trong vòng vài phút, các tế bào não bắt đầu chết dần và gây ra nhiều biến chứng nguy hiểm đến tính mạng người bệnh.
                                </p>
                                <p>
                                    - Do đó, người bị đột quỵ cần được cấp cứu ngay lập tức, thời gian kéo dài càng lâu, số lượng tế bào não chết càng nhiều sẽ ảnh hưởng lớn tới
                                    khả năng vận động và tư duy của cơ thể, thậm chí là tử vong. Hầu hết những người sống sót sau cơn đột quỵ đều có sức khỏe suy yếu hoặc mắc các
                                    di chứng như: tê liệt hoặc cử động yếu một phần cơ thể, mất ngôn ngữ, rối loạn cảm xúc, thị giác suy giảm...
                                </p>
                            </ItemContainer>



                            <ItemContainer
                                image={Patient2}
                                title="Các loại đột quỵ chính" >
                                <p>
                                    - <b>Đột quỵ do thiếu máu cục bộ:</b> Chiếm khoảng 85% tổng số các ca bị đột quỵ hiện
                                    nay. Đây là tình trạng đột quỵ do các cục máu đông làm tắc nghẽn động mạch, cản trở quá trình máu lưu thông lên não.
                                </p>
                                <p>
                                    - <b>Đột quỵ do xuất huyết:</b> Đột quỵ do xuất huyết là tình trạng mạch máu đến não bị
                                    vỡ khiến máu chảy ồ ạt gây xuất huyết não. Nguyên nhân khiến mạch máu vỡ là do thành động mạch mỏng yếu hoặc xuất hiện các vết nứt, rò rỉ.
                                </p>
                                <p>
                                    - <b>Thiếu máu não thoáng qua (TIA):</b> thường gọi là đột quỵ nhỏ bởi là những giai
                                    đoạn ngắn có triệu chứng của đột quỵ, kéo dài khoảng vài phút
                                </p>
                            </ItemContainer>


                            <ItemContainer
                                title="Sơ cứu tại nhà cho người có dấu hiệu đột quỵ"
                                image={Patient3}
                            > <div className="home_slide_item_content">
                                    <p> - Không để người bệnh té và gọi xe cấp cứu ngay lập tức.</p>
                                    <p>- Đặt bệnh nhân ở tư thế nằm nghiêng an toàn để bảo vệ đường thở và an toàn cho người bệnh.</p>
                                    <p>- Theo dõi chặt chẽ các dấu hiệu, phản ứng của bệnh nhân như suy giảm ý thức, nôn mửa…</p>
                                    <p>- Tuyệt đối không tự ý bấm huyệt, đánh gió, châm cứu.</p>
                                    <p>- Không cho bệnh nhân ăn uống vì có thể gây hít sặc chất nôn vào đường hô hấp, tắc đường thở, rất nguy hiểm.</p>
                                    <p>- Không tự ý dùng thuốc hạ huyết áp hay bất kỳ loại thuốc nào khác.</p>
                                </div>
                            </ItemContainer>

                        </Carousel>
                    </div>

                </div>

            </div>

        </div>
    );
};

function ItemContainer({ title, children, image }: { title: string, children: any, image: any }) {
    return (
        <div className="ItemContainer" >
            <svg width="0" height="0">
                <linearGradient id="purple-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="#ff0070" offset="0%" />
                    <stop stopColor="#0075ff" offset="100%" />
                </linearGradient>
            </svg>
            <h3 className="title">
                <img src={AbstractVideo} alt="" className="titlebg" />
                <span>
                    {title}
                </span>
            </h3>
            <div className="image_container">

                <div className="image_wrap">
                    <div className="beforeImage">

                    </div>
                    <img src={image} alt="image" />
                    <div className="afterImage">

                    </div>

                </div>
            </div>
            <div className="content">
                {children}
            </div>
            <div className="shadowbot"></div>

        </div>
    )
}
