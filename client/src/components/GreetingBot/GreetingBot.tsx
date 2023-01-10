import React, { ReactElement } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store";
import "./greeting_bot.scss";
import * as GreetingBotStore from "../../app/GreetingBot";
import { motion } from "framer-motion";
import { AiFillEye } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { RiChat4Fill, RiQuestionAnswerFill } from "react-icons/ri";
import { GiSpeaker } from "react-icons/gi";

import { MdLoop } from "react-icons/md";
import Robot from "./Robot";
import { isMobile } from "react-device-detect";
import ChatFrame from "./ChatFrame";
// const sound = require("sound-play");

function GreetingBot(): ReactElement {
  const bot = useAppSelector((state) => state.greetingBot);
  const dispatch = useAppDispatch();
  const { data, greetingName, setting } = bot;
  const { enableBot, enableChat, enableSound, enableLoop } = setting;

  const currentData = React.useMemo(() => {
    if (greetingName) {
      return data.find((item) => item.name === greetingName);
    }
    return null;
  }, [data, greetingName]);

  const mp3 = React.useMemo(() => {
    if (currentData) {
      return currentData.mp3;
    }
    return null;
  }, [currentData]);

  const [showMenu, setShowMenu] = React.useState(false);
  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  const botContainerRef = React.useRef<HTMLDivElement>(null);

  function handleClickOutMenu(event: any) {
    if (botContainerRef.current && !botContainerRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutMenu);
    return () => {
      document.removeEventListener("click", handleClickOutMenu);
    };
  }, [showMenu]);

  const [firstSoundEnable, setFirstSoundEnable] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setFirstSoundEnable(false);
    }, 7000);
  }, [firstSoundEnable]);

  function toggleBot() {
    if (enableBot) {
      setShowMenu(false);
    }
    dispatch(GreetingBotStore.toggleBot());
  }
  function toggleChat() {
    dispatch(GreetingBotStore.toggleChat());
  }
  function toggleSound() {
    setFirstSoundEnable(false);
    dispatch(GreetingBotStore.toggleSound());
  }
  function toggleLoop() {
    dispatch(GreetingBotStore.toggleLoop());
  }

  const [isDrag, setIsDrag] = React.useState(false);

  function checkDrag(event: any) {
    if (botContainerRef.current && botContainerRef.current.contains(event.target)) {
      setIsDrag(true);
    } else {
      setIsDrag(false);
    }
  }

  const checkerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: window.screen.availWidth, y: window.screen.availHeight });
  const [isLeft, setIsLeft] = React.useState(false);

  const [popup, setPopup] = React.useState(false);
  function openPopup() {
    setTimeout(() => {
      setPopup(true);
    }, 3000);
  }
  React.useEffect(() => {
    openPopup();
  }, []);
  React.useEffect(() => {
    if (popup) {
      onMouseUp();
    }
  }, [popup]);
  function onMouseUp() {
    setIsDrag(false);
    if (!wrapperRef || !wrapperRef.current || !checkerRef || !checkerRef.current) return;
    const botWidth = wrapperRef.current.offsetWidth;
    const botHeight = wrapperRef.current.offsetHeight;

    const checkerWidth = checkerRef.current.offsetWidth;
    const checkerHeight = checkerRef.current.offsetHeight;

    const windowWidth = checkerWidth;
    const windowHeight = checkerHeight;

    const midWidth = windowWidth / 2;

    let y = position.y;
    if (y > windowHeight - botHeight) {
      y = windowHeight - botHeight;
    } else if (y < 0) {
      y = 0;
    }

    let x = position.x;
    if (position.x > midWidth) {
      x = windowWidth - botWidth;
      setIsLeft(false);
    } else {
      x = 0;
      setIsLeft(true);
    }

    setPosition({ x, y });
  }

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  function onMouseMove(e: any) {
    if (!wrapperRef || !wrapperRef.current) return;
    const botWidth = wrapperRef.current.offsetWidth;
    const botHeight = wrapperRef.current.offsetHeight;

    if (e.type === "mousemove") {
      const x = e.clientX - botWidth / 2;
      const y = e.clientY - botHeight / 2;
      setPosition({ x, y });
    } else {
      const touch = e.touches[0];
      const x = touch.clientX - botWidth / 2;
      const y = touch.clientY - botHeight / 2;
      setPosition({ x, y });
    }
  }

  React.useEffect(() => {
    if (!isDrag) return;

    if (isMobile) {
      window.document.body.style.overflow = "hidden";
      // window.document.body.style.overscrollBehaviorY = "contain"
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove);
    return () => {
      if (isMobile) {
        window.document.body.style.overflow = "auto";
        // window.document.body.style.overscrollBehaviorY = "auto"
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove);
    };
  }, [isDrag]);

  React.useEffect(() => {
    window.addEventListener("mousedown", checkDrag);
    window.addEventListener("mouseup", onMouseUp);

    window.addEventListener("touchstart", checkDrag);
    window.addEventListener("touchend", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", checkDrag);
      window.removeEventListener("mouseup", onMouseUp);

      window.removeEventListener("touchstart", checkDrag);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [position]);

  const [messageAvailable, setMessageAvailable] = React.useState(true);

  React.useEffect(() => {
    setMessageAvailable(true);
    if (currentData) {
      setTimeout(() => {
        setMessageAvailable(false);
      }, 10000);
    }
  }, [currentData]);

  const [close, setClose] = React.useState(false);
  function closeBot() {
    setClose(true);
    if (enableBot) {
      toggleBot();
    }
  }

  const [showChatFrame, setShowChatFrame] = React.useState(false);

  function onCloseChatFrame() {
    setShowChatFrame(false);
  }
  function onShowChatFrame() {
    setShowChatFrame(true);
  }

  if (close) return <></>;

  return (
    <>
      <div ref={checkerRef} className="checker"></div>
      <motion.div ref={wrapperRef} initial={position} animate={position} transition={{ type: "tween", duration: isDrag ? 0.05 : 0.4 }} className="greeting_bot_container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={showMenu ? { opacity: 1 } : { opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          className={`menuWrapper ${isLeft ? "left" : "right"} ${!showMenu && "hide"}`}
        >
          <div className="menu">
            <div className="closeSpace">
              <div onClick={closeBot} className="closeBtn">
                <BsTrashFill />
              </div>
            </div>
            <div className="menu_item" onClick={toggleBot}>
              <div className="icon">
                <AiFillEye />
              </div>
              <div className="form-check form-switch">
                <input checked={enableBot} className="form-check-input" type="checkbox" />
              </div>
            </div>

            <div className="menu_item" onClick={toggleChat}>
              <div className="icon">
                <RiChat4Fill />
              </div>
              <div className="form-check form-switch">
                <input checked={enableChat} className="form-check-input" type="checkbox" />
              </div>
            </div>

            <div className="menu_item" onClick={toggleSound}>
              <div className="icon">
                <GiSpeaker />
              </div>
              <div className="form-check form-switch">
                <input checked={enableSound} className="form-check-input" type="checkbox" />
              </div>
            </div>

            <div className="menu_item" onClick={toggleLoop}>
              <div className="icon">
                <MdLoop />
              </div>
              <div className="form-check form-switch">
                <input checked={enableLoop} className="form-check-input" type="checkbox" />
              </div>
            </div>
            <div onClick={onShowChatFrame} className="question">
              <span className="text">Đặt câu hỏi ?</span>
            </div>
          </div>
        </motion.div>
        <ChatFrame show={showChatFrame} onClose={onCloseChatFrame} />

        <div className={`message_wrapper ${isLeft ? "left" : "right"}`}>
          {messageAvailable && enableBot && currentData != null && enableChat && (enableLoop || currentData?.repeat <= 1) && <div className="message">{currentData.text}</div>}
          {enableChat && enableBot && !showChatFrame && (
            <div onClick={onShowChatFrame} className="openChatFrame">
              <div className="icon">
                <RiQuestionAnswerFill />
              </div>
              <div className="text">Bấm vào đây để đặt câu hỏi</div>
            </div>
          )}
        </div>

        <div className="greeting_bot_wrapper">
          {currentData && enableBot && mp3 != null && enableSound && (enableLoop || currentData?.repeat <= 1) && <audio key={mp3} src={mp3} autoPlay></audio>}

          <div ref={botContainerRef} className="bot_container">
            <div className="firstSound">
              <motion.div
                onClick={() => {
                  !enableSound && toggleSound();
                }}
                initial={{ x: "-50%", y: 200, opacity: 0 }}
                animate={enableBot && firstSoundEnable ? { x: "-50%", y: 0, opacity: 1 } : { x: "-50%", y: 200, opacity: 0 }}
                transition={{ duration: 1, type: "tween" }}
                className="firstSoundBtn"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.3 }}
                  transition={{ duration: 0.5, type: "tweent", repeat: Infinity, repeatType: "reverse" }}
                  className="firstSoundWrapper"
                >
                  <GiSpeaker />
                </motion.div>
              </motion.div>
            </div>

            <div onClick={toggleMenu} className="bot_avatar_container">
              <Robot isActive={enableBot} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default GreetingBot;
