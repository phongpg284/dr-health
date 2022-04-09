import { useEffect, useState } from "react";
import "./game.scss";

export const PreviewGame_1 = ({ images, question }: any) => {
    const [imageSrc, setImageSrc] = useState<any>([]);
    useEffect(() => {
        if (images) {
            const uploadTask = [];
            for (let i = 0; i < images.length; i++) {
                const newTask = new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(images[i]?.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
                uploadTask.push(newTask);
            }
            Promise.all(uploadTask).then((data) => setImageSrc(data));
        }
    }, [images]);
    return (
        <div className="gameprv_content">
            {/* <div className="gameprv_button gameprv_back" onClick={back}>
                Trở lại
            </div> */}
            <div className="minigameprv_column gameprv_noti" style={{ marginBottom: "10px" }}>
                <div className="gameprv_text">{question}</div>
            </div>
            <div className="minigameprv_row minigameprv_gameprv_1 mgprv_wrap mgprv_juround">
                {/* <BoxElement row_column={row_column} /> */}
                <div className="gameprv_1_item_22">{imageSrc?.[0] && <img src={imageSrc[0]} alt="image_preview_1" />}</div>
                <div className="gameprv_1_item_22">{imageSrc?.[1] && <img src={imageSrc[1]} alt="image_preview_1" />}</div>
                <div className="gameprv_1_item_22">{imageSrc?.[2] && <img src={imageSrc[2]} alt="image_preview_1" />}</div>
                <div className="gameprv_1_item_22">{imageSrc?.[3] && <img src={imageSrc[3]} alt="image_preview_1" />}</div>
            </div>
        </div>
    );
};
