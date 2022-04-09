import { AiOutlineSound } from "react-icons/ai"
import "./game.scss"

export const PreviewGame_2 = ({ options, question }: any) => {
    return (
        <div className="gameprv_content">
            {/* <div className="gameprv_button gameprv_back" onClick={back}>
                Trở lại
            </div> */}
            <div className="minigameprv_column gameprv_noti" style={{ marginBottom: "10px" }}>
                <div className="minigameprv_row" style={{ width: "100%" }}>
                    <div className="gameprv_text">{question}</div>&nbsp;&nbsp;&nbsp;
                    <div className="gameprv_title gameprv_button" style={{ padding: "10px 20px" }}><AiOutlineSound /></div>
                </div>
            </div>
            <div className="minigameprv_row minigameprv_gameprv_2 mgprv_wrap mgprv_juround">
                {/* <BoxElement numberE={numberE} /> */}
                <div className="gameprv_2_item">A.{options?.[0]}</div>
                <div className="gameprv_2_item">B.{options?.[1]}</div>
                <div className="gameprv_2_item">C.{options?.[2]}</div>
                <div className="gameprv_2_item">D.{options?.[3]}</div>
            </div>
        </div>
    )
}