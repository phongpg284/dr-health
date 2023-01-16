import "./News.scss";
import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import { useAppDispatch } from "app/store";
import * as GreetingBot from "app/GreetingBot";
import Abstract14 from "assets/abstract14.png";
import News1 from "./News1";
import News2 from "./News2";
import News3 from "./News3";
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
        <Switch>
          <Route path="/news/nhan-biet-dot-quy" component={News1} />
          <Route path="/news/dieu-tri-dot-quy" component={News2} />
          <Route path="/news/phong-ngua-dot-quy" component={News3} />
          <Route path="/news/cap-cuu" component={News4} />
          <Route path="/news/tu-vong-do-dot-quy-o-nguoi-tre-tuoi-ngay-cang-gia-tang" component={News5} />
          <Route path="/news/quy-tac-befast" component={News6} />
        </Switch>
      </div>
    </div>
  );
}

export default News;
