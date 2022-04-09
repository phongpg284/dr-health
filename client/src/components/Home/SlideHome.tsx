import { useState } from "react";
import {
  LeftOutlined as IconArrowLeft,
  RightOutlined as IconArrowRight,
} from "@ant-design/icons";
import dauhieusinhton from "../../assets/dauhieusinhton.png";
import mach2 from "../../assets/mach2.png";
import nhiptho from "../../assets/nhiptho.png";
import nhiptim from "../../assets/nhiptim.png";
import "./index.scss";
import { useInterval } from "./useInterval";

const SlideHome = () => {
  const totalSlide = 8;

  const [numberShowSlide, setNumberSlideShow] = useState<number>(0);
  const style = {
    marginLeft: `-${numberShowSlide * 100}%`,
  };

  useInterval(() => {
    if (numberShowSlide === totalSlide - 1) return setNumberSlideShow(0);
    else return setNumberSlideShow(numberShowSlide + 1);
  }, 8000);

  const handlePrev = () => {
    if (numberShowSlide > 0) {
      setNumberSlideShow(numberShowSlide - 1);
    } else {
      setNumberSlideShow(totalSlide - 1);
    }
  };

  const handleNext = () => {
    if (numberShowSlide < totalSlide - 1) {
      setNumberSlideShow(numberShowSlide + 1);
    } else {
      setNumberSlideShow(0);
    }
  };
  const SetSlidesShow = () => {
    const slideShow = [];
    for (let i = 0; i < totalSlide; i++) {
      slideShow.push(
        <li
          onClick={() => setNumberSlideShow(i)}
          style={{ opacity: numberShowSlide === i ? 1 : 0.4 }}
        />
      );
    }
    return <>{slideShow}</>;
  };
  return (
    <div className="slide" style={style}>
      <div className="slide-item">
        <div className="slide-title">Dấu hiệu sinh tồn</div>
        <div className="slide-content">
          <div style={{marginRight: "10px"}}>
            <br/>
            <br/>
            <li style={{fontSize: "1.3rem"}}>
              Dấu hiệu sinh tồn (dấu hiệu sống) bao gồm: nhiệt độ, mạch, huyết
              áp, nhịp thở, nồng độ oxy trong máu là những dấu hiệu chỉ rõ sự
              hoạt động của các cơ quan, phản ánh chức năng sinh lý của cơ thể.
            </li>
          </div>
          <div style={{flex: "1.2 1"}}>
            <div>
              <img alt="" src={dauhieusinhton} />
            </div>
          </div>
        </div>
            <li style={{fontSize:"1.3rem", color: "rgb(70, 70, 70)", textAlign:"left", marginTop:"10px"}}>
              Nếu các giá trị này thay đổi vượt ra khỏi ngưỡng bình thường sẽ
              làm cho các chức năng khác trong cơ thể con người mất cân bằng và
              sinh bệnh, có thể dẫn đến tử vong. Theo dõi dấu hiệu sinh tồn giúp
              phát hiện những bất thường của người bệnh.
            </li>
      </div>

      <div className="slide-item">
        <div className="slide-title">Mạch</div>
        <div className="slide-content">
          <div>
            <li>
              Mạch là nhịp đập của động mạch, thường bắt ở cổ tay. Nhịp tim là
              nghe ở tim hoặc biểu hiện trên điện tâm đồ. Mạch bình thường, mạch
              nhanh, mạch chậm ở các đối tượng người lớn và trẻ em thể hiện ở
              bảng sau:
            </li>
          </div>
          <div>
            <div>
              <img
                alt=""
                src={
                  "https://suckhoenguoicaotuoi.edu.vn/wp-content/uploads/2018/01/m%E1%BA%A1ch.jpg"
                }
                />
            </div>
          </div>
        </div>
                <li style={{fontSize:"1.2rem", color: "rgb(70,70,70", marginBottom:"15px", textAlign: "left"}}>
                  Mạch là “con số biết nói” cùng với huyết áp báo hiệu tình trạng
                  sức khỏe con người, vì thế nên tìm hiểu những yếu tố có ảnh hưởng
                  đến mạch để có những biện pháp bảo vệ mạch hiệu quả nhất, không để
                  những thông số mạch ảnh hưởng đến sức khỏe.
                </li>
        <div className="slide-footer-image">
          <table className="slide-table">
            <tr>
              <th>Đối tượng</th>
              <th>Mạch chậm</th>
              <th>Bình thường</th>
              <th>Mạch nhanh</th>
            </tr>
            <tr>
              <td>Người lớn</td>
              <td>{`< 60 lần/phút`}</td>
              <td>{`60 - 80 lần/phút`}</td>
              <td>{`> 80 lần/phút`}</td>
            </tr>
            <tr>
              <td>Trẻ em</td>
              <td>{`< 80 lần/phút`}</td>
              <td>{`80 - 100 lần/phút`}</td>
              <td>{`> 100 lần/phút`}</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="slide-item">
        <div className="slide-title">Nhịp thở</div>
        <div className="slide-content">
          <div style={{flex: "1 1"}}>
            <li>Thở là hoạt động quan trọng để duy trì sự sống.</li>
            <li>
              Tần số thở (nhịp thở) là giá trị đo về số lần thở trong một phút.
              Tần số thở được điều hòa và kiểm soát bởi trung tâm hô hấp
            </li>
            <li>
              Tần số thở (nhịp thở) là giá trị đo về số lần thở trong một phút.
              Tần số thở được điều hòa và kiểm soát bởi trung tâm hô hấp.
            </li>
            <li>
              Nhịp thở bình thường sẽ có các đặc điểm: quá trình hô hấp đều đặn,
              êm dịu, không khí qua mùi từ từ và sâu.
            </li>
          </div>
          {/* <div>
            <div>
              <img alt="" src={nhiptho} />
            </div>
          </div> */}
        </div>
        <div style={{ fontSize: "1rem", color: "rgb(70, 70, 70)", marginBottom: "7px" }}>
          Nhịp thở bình thường, nhịp thở chậm và nhịp thở nhanh ở các đối tượng
          người lớn và trẻ em thể hiện ở bảng sau:
        </div>
        <div className="slide-footer-image">
          <table className="slide-table">
            <tr>
              <th>Đối tượng</th>
              <th>Nhịp thở chậm</th>
              <th>Bình thường</th>
              <th>Nhịp thở nhanh</th>
            </tr>
            <tr>
              <td>Người lớn</td>
              <td>{`< 10 lần/phút`}</td>
              <td>{`14 - 20 lần/phút`}</td>
              <td>{`> 25 lần/phút`}</td>
            </tr>
            <tr>
              <td>Trẻ em</td>
              <td>{`< 15 lần/phút`}</td>
              <td>{`20 - 30 lần/phút`}</td>
              <td>{`> 35 lần/phút`}</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="slide-item">
        <div className="slide-title">Nhiệt độ</div>
        <div className="slide-content">
          <div>
            <li>
              Con người có khả năng duy trì thân nhiệt nhờ vào sự cân bằng quá
              trình sinh nhiệt và thải nhiệt. Khi xảy ra rối loạn cân bằng này,
              thân nhiệt tăng quá cao sẽ ảnh hưởng các quá trình chuyển hóa
              trong cơ thể, rối loạn hoạt động sống và đôi khi còn nguy hiểm đến
              tính mạng.
            </li>
          </div>
          <div style={{ flex: "1.6 1" }}>
            <div>
              <img
                alt=""
                src={
                  "https://vinmec-prod.s3.amazonaws.com/images/20190716_091457_661707_823_1489551659.max-1800x1800.jpg"
                }
              />
            </div>
          </div>
        </div>
        <div
          style={{
            color: "rgb(70, 70, 70)",
            fontSize: "1rem",
            marginBottom: "7px",
            marginTop: "10px",
          }}
        >
          Tăng thân nhiệt được định nghĩa là khi nhiệt độ cơ thể đo thấy cao hơn
          bình thường.
        </div>
        <div className="slide-footer-image">
          <table className="slide-table">
            <tr>
              <th>Thấp (hạ nhiệt độ)</th>
              <th>Bình thường</th>
              <th colSpan={2}>Tăng thân nhiệt (sốt)</th>
            </tr>
            <tr>
              <td rowSpan={4}>
                {`35`}&#8451; {`< T`}&#176;{` < 360`}&#8451;
              </td>
              <td rowSpan={4}>
                {`BT: 37`}&#8451; <br />
                {`36`}&#176;{`1C -  37`}&#176;{`4C`}
              </td>
              <td>
                {`37`}&#176;{`5C -  38`}&#176;{`C`}
              </td>
              <td>Sốt nhẹ</td>
            </tr>
            <tr>
              <td>
                {`38`}&#176;{`1C -  39`}&#176;{`C`}
              </td>
              <td>Sốt vừa</td>
            </tr>
            <tr>
              <td>
                {`39`}&#176;{`1C -  40`}&#176;{`C`}
              </td>
              <td>Sốt cao</td>
            </tr>

            <tr>
              <td>
                {`> 40`}&#176;{`C`}
              </td>
              <td>Sốt rất cao</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="slide-item">
        <div className="slide-title">Huyết áp</div>
        <div className="slide-content">
          <div>
            <li style={{ fontSize: "1.1rem" }}>
              Huyết áp (HA) là áp lực của máu trên thành động mạch. Trong thời
              kỳ tâm thu, huyết áp trong động mạch lên cao nhất gọi là huyết áp
              tối đa (huyết áp tâm thu). Trong thời kỳ tâm trương, huyết áp
              trong động mạch xuống thấp nhất gọi là huyết áp tối thiểu (huyết
              áp tâm trương).
            </li>
          </div>
          <div>
            <div>
              <img
                alt=""
                src={
                  "data:image/jpeg;base64,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"
                }
              />
            </div>
          </div>
        </div>
        <div className="slide-footer-image" style={{ marginTop: "20px" }}>
          <table className="slide-table">
            <tr>
              <th>Chỉ số</th>
              <th>Huyết áp thấp (mmHg)</th>
              <th>Huyết áp bình thường (mmHg)</th>
              <th>Huyết áp cao (mmHg)</th>
            </tr>
            <tr>
              <td>Huyết áp tâm thu (HATĐ)</td>
              <td>{`< 90`}</td>
              <td>{`90 - <140`}</td>
              <td>&#8805;{` 140`}</td>
            </tr>
            <tr>
              <td>Huyết áp tâm trương (HATT)</td>
              <td>{`< 60`}</td>
              <td>{`60 - <90`}</td>
              <td>&#8805;{` 90`}</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="slide-item">
        <div className="slide-title">Nồng độ oxy trong máu (SpO2)</div>
        <div className="slide-content">
          <div>
            <div style={{ fontSize: "1.2rem", textIndent: "30px" }}>
              Nồng độ oxy trong máu là lượng oxy lưu thông trong máu. Chỉ số
              SpO2 được xem là một trong những dấu hiệu sinh tồn của cơ thể. Vì
              vậy, cần theo dõi chỉ số SpO2 thường xuyên để kịp thời can thiệp
              nếu xảy ra tình trạng nguy hiểm.
            </div>
            <br />
            <div style={{ fontSize: "1.2rem", textIndent: "30px" }}>
              Một người khỏe mạnh bình thường khi thở ở không khí trên mực nước
              biển sẽ có độ bão hòa oxy động mạch là 95% - 100%.
            </div>
            <li style={{ fontSize: "1rem" }}>
              Nếu lượng oxy trong máu hòa tan ở khoảng 97% - 99%: oxy trong máu
              tốt.
            </li>
            <li style={{ fontSize: "1rem" }}>
              Nếu lượng oxy trong máu hòa tan ở khoảng 94% - 96%: oxy trong máu
              trung bình – cần cho thở thêm oxy.
            </li>
            <li style={{ fontSize: "1rem" }}>
              Nếu lượng oxy trong máu hòa tan ở khoảng 90% - 93%: oxy trong máu
              thấp – nên có y tá hoặc bác sĩ theo dõi hoặc đến bệnh viện gần
              nhất.
            </li>
            <li style={{ fontSize: "1rem" }}>
              Nếu SpO2 dưới 92% không thở oxy hoặc dưới 95% có thở oxy: đây là
              các dấu hiệu suy hô hấp rất nặng.
            </li>
            <li style={{ fontSize: "1rem" }}>
              Độ bão hòa oxy thấp hơn 90% là một cấp cứu trên lâm sàng
            </li>
          </div>
          {/* <div>
            <div>
              <img
                src="https://vinmec-prod.s3.amazonaws.com/images/20190726_042831_924808_holter-huyet-ap.max-1800x1800.png"
                alt=""
              />
              <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cach-do-huyet-ap-theo-huong-dan-cua-bo-y-te/">
                https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cach-do-huyet-ap-theo-huong-dan-cua-bo-y-te/
              </a>
            </div>
          </div> */}
        </div>
      </div>

      <div className="slide-item">
        <div className="slide-title">Nhịp tim</div>
        <div className="slide-content">
          <div>
            <br/>
            <li style={{fontSize:"1.3rem"}}>
              Nhịp tim được đo bằng số lần tim co bóp hoặc đập mỗi phút. Nhịp
              tim của mỗi người là khác nhau và có thể thay đổi do nhiều yếu tố,
              bao gồm hoạt động thể chất, bệnh lý, căng thẳng về mặt cảm xúc.
            </li>
          </div>
          <div style={{flex: "1.3 1"}}>
            <div>
              <img alt="" src={nhiptim} />
            </div>
          </div>
        </div>
            <li style={{fontSize:"1.3rem", color: "rgb(70,70,70"}}>
              Nhịp tim lúc nghỉ bình thường đối với người trưởng thành là từ 60
              đến 100 nhịp/phút (bpm). Nhịp nhanh là nhịp lớn hơn 100 nhịp/phút
              và nhịp chậm là dưới 60 nhịp/phút.
            </li>
      </div>

      <div className="slide-item">
        <div className="slide-title">Chỉ số BMI</div>
        <div
          className="slide-content"
          style={{ justifyContent: "space-around" }}
        >
          <div style={{ textAlign: "center" }}>
            <li>
              Chỉ số BMI còn được gọi là chỉ số khối lượng cơ thể (Body Mass
              Index). Dựa vào chỉ số BMI của một người có thể biết được người đó
              béo, gầy hay có cân nặng lý tưởng. Công thức tính chỉ số BMI:
            </li>
            <div
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              BMI = Cân nặng/[(Chiều cao)x(Chiều cao)] (chiều cao tính bằng m và
              cân nặng tính bằng kg).
            </div>
            <br />
            <div style={{ fontSize: "1rem" }}>
              Bảng phân loại mức độ gầy - béo của một người dựa vào chỉ số BMI
              của Hiệp hội đái đường các nước châu Á (IDI & WPRO) được áp dụng
              cho người châu Á:
            </div>
          </div>
          {/* <div>
            <div>
              <img
                alt=""
                src={
                  "https://vinmec-prod.s3.amazonaws.com/images/20190517_020153_627617_Chi-so-BMI.max-800x800.jpg"
                }
              />
            </div>
          </div> */}
        </div>
        <div className="slide-footer-image">
          <table
            className="slide-table"
            style={{ width: "70%", margin: "0 auto", marginBottom: "50px" }}
          >
            <tr>
              <th>Phân loại</th>
              <th>BMI (kg/m2) – IDI & WPRO</th>
            </tr>
            <tr>
              <td>Bình thường</td>
              <td>{`18,5 - 22,9`}</td>
            </tr>
            <tr>
              <td>Thừa cân</td>
              <td>&#8805;{` 23`}</td>
            </tr>
            <tr>
              <td>Tiền béo phì</td>
              <td>{`23 - 24,9`}</td>
            </tr>
            <tr>
              <td>Béo phì độ I</td>
              <td>{`25 - 29,9`}</td>
            </tr>
            <tr>
              <td>Béo phì độ II</td>
              <td>&#8805;{` 30`}</td>
            </tr>
          </table>
        </div>
      </div>
      <ul className="slide-button-controll">
        <SetSlidesShow />
      </ul>
      <div className="slide-arrow-controll">
        <IconArrowLeft
          className="slide-arrow-controll-left"
          onClick={handlePrev}
        />
        <IconArrowRight
          className="slide-arrow-controll-right"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default SlideHome;
