import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import News1 from "./News1";
import News2 from "./News2";
import News3 from "./News3";
import "./News.scss";
import { useAppDispatch } from "app/store";
import * as GreetingBot from "app/GreetingBot";
import Abstract14 from "assets/abstract14.png";
import News4 from "./News4";
import News5 from "./News5";
import News6 from "./News6";

function News(): ReactElement {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(GreetingBot.setGreetingName(GreetingBot.GreetingNameType.News));
  }, []);

  return (
    <div>
      <div className="news_content">
        <img src={Abstract14} alt="" className="newsBackground" />
        <Routes>
          <Route path="/nhan-biet-dot-quy" element={News1} />
          <Route path="/dieu-tri-dot-quy" element={News2} />
          <Route path="/phong-ngua-dot-quy" element={News3} />
          <Route path="/cap-cuu" element={News4} />
          <Route path="/tu-vong-do-dot-quy-o-nguoi-tre-tuoi-ngay-cang-gia-tang" element={News5} />
          <Route path="/quy-tac-befast" element={News6} />
        </Routes>
      </div>
    </div>
  );
}

export default News;
