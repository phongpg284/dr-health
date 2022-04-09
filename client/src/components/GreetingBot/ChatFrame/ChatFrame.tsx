import React, { ReactElement } from 'react'
import { Modal } from 'react-bootstrap'
import { BsChevronRight } from 'react-icons/bs'
import { FaAngleDoubleRight, FaRobot, FaUserNurse } from 'react-icons/fa'
import { IoIosSend } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import './chat_frame.scss'
import { v4 } from 'uuid';
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";


import getAnswer from './ChatBot'
import Dotquy1 from 'assets/SliderChatFrame/dotquy1.jpg'
import Dotquy2 from 'assets/SliderChatFrame/dotquy2.jpg'
import Dotquy3 from 'assets/SliderChatFrame/dotquy3.jpg'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'



interface Props {
    show: boolean;
    onClose: () => void;
}

export interface Message {
    content: string | React.ReactElement;
    isSender: boolean;
    id: string,
    hint?: string[],
    isSystem?: boolean;
}



const defaultMessage = {
    content:
        <div>
            Xin chào bạn, mình là Trợ lý ảo Phòng chống bệnh đột quỵ - Hướng tới một xã hội khỏe mạnh, không lo đột quỵ trong bối cảnh đại dịch COVID-19
            <span style={{ marginLeft: 5, fontSize: "1.5em", lineHeight: 0 }}>
                <FaUserNurse />
            </span>
        </div>
    ,
    isSender: false,
    id: v4()
}

function SliderChatFrame({ onHint }: { onHint: any }) {
    const ref = React.useRef<CarouselRef>(null);

    function next() {
        ref.current?.next();
    }
    function previous() {
        ref.current?.prev();
    }

    return (
        <div className="SliderChatFrame">
            <div className="btnContainer">
                <button onClick={previous}>
                    <AiOutlineLeft />
                </button>
                <button onClick={next}>
                    <AiOutlineRight />
                </button>
            </div>
            <Carousel ref={ref} dots={false}>
                <SliderItem
                    img={Dotquy1}
                    hint={["Đột quỵ là gì", "Dấu hiệu đột quỵ"]}
                    onHint={onHint}
                />
                <SliderItem
                    img={Dotquy2}
                    hint={["Phòng chống đột quỵ", "Điều trị đột quỵ"]}
                    onHint={onHint}
                />
                 <SliderItem
                    img={Dotquy3}
                    hint={["Đột quỵ thiếu máu cục bộ", "Đột quỵ xuất huyết não"]}
                    onHint={onHint}
                />
            </Carousel>
        </div>
    )
}
interface SliderItem {
    img: string,
    hint: string[],
    onHint: any,
}

function SliderItem(props: SliderItem) {
    const { img, hint, onHint } = props
    return (
        <div className="SliderItem">
            <div className="img">
                <img src={img} alt="" />
            </div>
            <div className="hintList">
                {
                    hint.map((hint, index) => (
                        <div onClick={() => onHint(hint)} className="hint" key={index}>
                            {hint}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}



const defaultBanner = (onHint: any) => ({
    content:
        <SliderChatFrame onHint={onHint} />,
    isSystem: true,
    isSender: false,
    id: v4()
})

function ChatFrame({ show, onClose }: Props): ReactElement {


    const [listMessage, setListMessage] = React.useState<Message[]>([defaultMessage, defaultBanner(onHint)])
    function addMessage(message: Message): void {
        setListMessage([message, ...listMessage])
    }
    function onSend(value: string) {
        addMessage({ content: value, isSender: true, id: v4() })


    }
    React.useEffect(() => {
        if (listMessage.length > 0 && listMessage[0].isSender) {
            if (typeof listMessage[0].content === "string") {
                const answer = getAnswer(listMessage[0].content)
                setTimeout(() => {
                    addMessage(answer)
                }, 500)
            }

        }
    }, [listMessage])

    function onHint(value: string) {
        addMessage({ content: value, isSender: true, id: v4() })
    }


    return (
        <Modal
            className="chatFrame"
            centered
            show={show}
            onHide={onClose}
        >
            <Modal.Header className="header">

                <div className="title">
                    <span className="headIcon">
                        <FaRobot />
                    </span>
                    <Modal.Title>Đặt câu hỏi</Modal.Title>
                </div>

                <div className="closeBtn" onClick={onClose}>
                    <IoCloseOutline />
                </div>
            </Modal.Header>
            <div className="chat_frame">
                <div className="messages">
                    {
                        listMessage.map((message, index) => (
                            <Message onHint={onHint} message={message} key={message.id} />
                        ))
                    }
                </div>
                <InputSpace onSend={onSend} />
            </div>
        </Modal>
    )
}

function Message({ message, onHint }: { message: Message, onHint: any }) {

    const { isSender, content, hint, isSystem } = message
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        setTimeout(()=>{
            ref.current?.scrollIntoView({ behavior: "smooth" })
        },100)
    },[])

    if (isSystem) return (
        <div ref={ref} className="systemMessage">
            {content}
        </div>
    )
    return (
        <div ref={ref} className={`message ${isSender && "sender"}`}>
            <div className="box">
                <div className="content">
                    {content}
                </div>
                {
                    hint && hint.length > 0 &&
                    <div className="hintList">
                        <div className="hintDes">
                            Tìm hiểu thêm
                        </div>
                        {
                            hint.map((hint, index) => (
                                <div onClick={() => onHint(hint)} className="hint" key={index}>
                                    {hint}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>

        </div>
    )
}

function InputSpace({ onSend }: { onSend: (value: string) => void }) {
    const [value, setValue] = React.useState("")
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSend(value)
        setValue("")
    }
    return (
        <div className="inputSpace">
            <form onSubmit={onSubmit} className="formSpace">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder="Nhập tin nhắn..." />
                <button>
                    <IoIosSend />
                </button>
            </form>
        </div>
    )
}

export default ChatFrame
