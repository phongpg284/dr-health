import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import "./game.scss";

export const PreviewGame_3 = ({ image, options, question }: any) => {
    const [imageSrc, setImageSrc] = useState<any>();
    useEffect(() => {
        if (image) {
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(image?.originFileObj);
                reader.onload = () => resolve(reader.result);
            }).then((data) => setImageSrc(data));
        }
    }, [image]);

    return (
        <div className="gameprv_content">
            {/* <div className="gameprv_button gameprv_back" onClick={back}>
                Trở lại
            </div> */}
            <div className="minigameprv_column gameprv_noti" style={{ marginBottom: "10px" }}>
                <div className="gameprv_text minigameprv_hidden">Trò chơi đang dừng</div>
            </div>
            <div className="minigameprv_image">{<Image className="minigameprv_imgsrc" src={imageSrc} />}</div>
            <div className="minigameprv_question">{question}</div>
            <div className="minigameprv_row minigameprv_gameprv_3 mgprv_wrap mgprv_juround">
                {/* <BoxElement numberE={numberE} /> */}
                <div>
                    <div className="gameprv_3_item">A.{options?.[0]}</div>
                    <div className="gameprv_3_item">B.{options?.[1]}</div>
                </div>
                <div>
                    <div className="gameprv_3_item">C.{options?.[2]}</div>
                    <div className="gameprv_3_item">D.{options?.[3]}</div>
                </div>
            </div>
        </div>
    );
};
