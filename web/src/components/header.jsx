
export const Header = (props) => {
  return (
    <header id="header">
      <div
        style={{ backgroundImage: `url(../img/abstract-two-line.svg)` }}
        className="home_main"
      >
        {/* <img src={AbstractBackground} className="bg" alt="" /> */}

        <div className="content1">
          <div className="home_main_slogan">
            <div className="home_main_slogan_line">Dr. Health</div>
            <div className="home_main_description">
              Lắng nghe cơ thể bạn,
              <br />
              săn sóc sức khỏe cả gia đình
              <br />
            </div>
            <div className="btn_space">
              <a href="https://app.dr-health.com.vn" className="main_home_btn1">
                <span>Tìm hiểu ngay</span>
              </a>

              {/* <a href="#strength" className="main_home_btn2">
                <span>Tính năng của hệ thống</span>
              </a>

              <a href="#achievements" className="main_home_btn3">
                <span>Trải nghiệm người dùng</span>
              </a> */}
            </div>
          </div>
          {true && (
            <div className="home_main_pic">
              <img alt="" />
            </div>
          )}
        </div>
      </div>

      {/* <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="https://app.dr-health.com.vn/"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Tìm hiểu
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intro-img" /> */}
    </header>
  );
};
