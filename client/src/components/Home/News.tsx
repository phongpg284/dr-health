import { Carousel } from 'antd';
import slide from "../../assets/slide.jpg";

//icon 

import { BiSend, BiShieldQuarter } from 'react-icons/bi';
import { useAppDispatch } from 'app/store';



export const News = () => {

    function onChange(value: any) {
        //
    }

    return (
        <div className="home_slide">
            <Carousel afterChange={onChange} className="home_slide_carry">
                <div>
                    <div className="home_slide_item">
                        <div className="home_slide_item_column" style={{ width: "50%", minWidth: "450px" }}>
                            <div className="home_slide_item_title" style={{ color: '#03c6cf' }} ><BiSend />&nbsp;&nbsp;Phòng ngừa bệnh Hen suyễn</div>
                            <div className="home_slide_item_content">
                                Cần khẳng định rằng không có biện pháp nào giúp phòng tránh bệnh hen
                                suyễn. Tuy nhiên, người mắc bệnh hoàn toàn có thể dự phòng các cơn
                                hen phế quản bằng các cách sau:
                                <p> - Tiêm vắc xin phòng cúm</p>
                                <p>
                                    - Xác định và tránh tiếp xúc với các dị nguyên khởi phát cơn hen
                                </p>
                                <p>
                                    - Nhận diện các dấu hiệu báo trước của một cơn hen ho, thở dốc hay
                                    thở rít
                                </p>
                                <p>
                                    - Điều trị các cơn hen phế quản càng sớm càng tốt, giúp dự phòng
                                    các đợt cấp tiến triển nặng nề hơn
                                </p>
                                <p>
                                    - Tuân thủ việc điều trị. Không được tự ý ngưng sử dụng thuốc ngay
                                    khi thấy triệu chứng thuyên giảm
                                </p>
                                <p>- Cần gặp bác sĩ ngay khi có dấu hiệu của cơn hen nặng</p>
                            </div>
                        </div>
                        <div className="home_slide_item_column" style={{ width: "45%", minWidth: "450px", marginTop: "50px" }}>
                            <img alt="" src={slide} style={{ width: "100%" }} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="home_slide_item">
                        <div className="home_slide_item_column" style={{ width: "50%", minWidth: "450px" }}>
                            <div className="home_slide_item_title" style={{ color: '#03c6cf' }} ><BiSend />&nbsp;&nbsp;Phòng ngừa bệnh Hen suyễn</div>
                            <div className="home_slide_item_content">
                                Cần khẳng định rằng không có biện pháp nào giúp phòng tránh bệnh hen
                                suyễn. Tuy nhiên, người mắc bệnh hoàn toàn có thể dự phòng các cơn
                                hen phế quản bằng các cách sau:
                                <p> - Tiêm vắc xin phòng cúm</p>
                                <p>
                                    - Xác định và tránh tiếp xúc với các dị nguyên khởi phát cơn hen
                                </p>
                                <p>
                                    - Nhận diện các dấu hiệu báo trước của một cơn hen ho, thở dốc hay
                                    thở rít
                                </p>
                                <p>
                                    - Điều trị các cơn hen phế quản càng sớm càng tốt, giúp dự phòng
                                    các đợt cấp tiến triển nặng nề hơn
                                </p>
                                <p>
                                    - Tuân thủ việc điều trị. Không được tự ý ngưng sử dụng thuốc ngay
                                    khi thấy triệu chứng thuyên giảm
                                </p>
                                <p>- Cần gặp bác sĩ ngay khi có dấu hiệu của cơn hen nặng</p>
                            </div>
                        </div>
                        <div className="home_slide_item_column" style={{ width: "45%", minWidth: "450px", marginTop: "50px" }}>
                            <img alt="" src={slide} style={{ width: "100%" }} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="home_slide_item">
                        <div className="home_slide_item_column" style={{ width: "50%", minWidth: "450px" }}>
                            <div className="home_slide_item_title" style={{ color: '#03c6cf' }} ><BiSend />&nbsp;&nbsp;Phòng ngừa bệnh Hen suyễn</div>
                            <div className="home_slide_item_content">
                                Cần khẳng định rằng không có biện pháp nào giúp phòng tránh bệnh hen
                                suyễn. Tuy nhiên, người mắc bệnh hoàn toàn có thể dự phòng các cơn
                                hen phế quản bằng các cách sau:
                                <p> - Tiêm vắc xin phòng cúm</p>
                                <p>
                                    - Xác định và tránh tiếp xúc với các dị nguyên khởi phát cơn hen
                                </p>
                                <p>
                                    - Nhận diện các dấu hiệu báo trước của một cơn hen ho, thở dốc hay
                                    thở rít
                                </p>
                                <p>
                                    - Điều trị các cơn hen phế quản càng sớm càng tốt, giúp dự phòng
                                    các đợt cấp tiến triển nặng nề hơn
                                </p>
                                <p>
                                    - Tuân thủ việc điều trị. Không được tự ý ngưng sử dụng thuốc ngay
                                    khi thấy triệu chứng thuyên giảm
                                </p>
                                <p>- Cần gặp bác sĩ ngay khi có dấu hiệu của cơn hen nặng</p>
                            </div>
                        </div>
                        <div className="home_slide_item_column" style={{ width: "45%", minWidth: "450px", marginTop: "50px" }}>
                            <img alt="" src={slide} style={{ width: "100%" }} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="home_slide_item">
                        <div className="home_slide_item_column" style={{ width: "50%", minWidth: "450px" }}>
                            <div className="home_slide_item_title" style={{ color: '#03c6cf' }} ><BiSend />&nbsp;&nbsp;Phòng ngừa bệnh Hen suyễn</div>
                            <div className="home_slide_item_content">
                                Cần khẳng định rằng không có biện pháp nào giúp phòng tránh bệnh hen
                                suyễn. Tuy nhiên, người mắc bệnh hoàn toàn có thể dự phòng các cơn
                                hen phế quản bằng các cách sau:
                                <p> - Tiêm vắc xin phòng cúm</p>
                                <p>
                                    - Xác định và tránh tiếp xúc với các dị nguyên khởi phát cơn hen
                                </p>
                                <p>
                                    - Nhận diện các dấu hiệu báo trước của một cơn hen ho, thở dốc hay
                                    thở rít
                                </p>
                                <p>
                                    - Điều trị các cơn hen phế quản càng sớm càng tốt, giúp dự phòng
                                    các đợt cấp tiến triển nặng nề hơn
                                </p>
                                <p>
                                    - Tuân thủ việc điều trị. Không được tự ý ngưng sử dụng thuốc ngay
                                    khi thấy triệu chứng thuyên giảm
                                </p>
                                <p>- Cần gặp bác sĩ ngay khi có dấu hiệu của cơn hen nặng</p>
                            </div>
                        </div>
                        <div className="home_slide_item_column" style={{ width: "45%", minWidth: "450px", marginTop: "50px" }}>
                            <img alt="" src={slide} style={{ width: "100%" }} />
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}