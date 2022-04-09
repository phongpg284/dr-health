import "./index.scss";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useAppSelector } from "app/store";
import { Button, Input, Select, Upload } from "antd";
import { PlusOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

import { PreviewGame_1 } from "./PreviewGame_1";
import { PreviewGame_2 } from "./PreviewGame_2";
import { PreviewGame_3 } from "./PreviewGame_3";
import { CREATE_GAME } from "./schema";

const { Option } = Select;

const AddMiniGame = () => {
    const { id } = useAppSelector((state) => state.account);
    const [type, setType] = useState(1);
    const [answer, setAnswer] = useState(0);
    const [fileList, setFileList] = useState<any>();
    const [option0, setOption0] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [question, setQuestion] = useState("");

    const onChangeOptionInput = (e: any, key: number) => {
        if (key === 0) setOption0(e.target.value);
        else if (key === 1) setOption1(e.target.value);
        else if (key === 2) setOption2(e.target.value);
        else setOption3(e.target.value);
    };

    const onChangeQuestionInput = (e: any) => {
        setQuestion(e.target.value);
    };

    const [createGame] = useMutation(CREATE_GAME);

    const handleChangeType = (value: number) => {
        setType(value);
    };
    const handleChangeAnswer = (value: number) => {
        setAnswer(value);
    };

    const onFileChange = (data: any) => {
        setFileList(data.fileList);
    };

    const handleSubmitGame = () => {
        const uploadTask = [];
        for (let i = 0; i < fileList.length; i++) {
            const newTask = new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(fileList[i]?.originFileObj);
                reader.onload = () => resolve(reader.result);
            }).then((url: any) => {
                if (url)
                    return fetch(url, { method: "GET", mode: "same-origin" })
                        .then((r) => r.blob())
                        .then((data) => {
                            const newFile = new File([data], "image_" + i + ".jpg", {
                                type: "image/jpg",
                            });
                            return newFile;
                        });
            });

            uploadTask.push(newTask);
        }
        Promise.all(uploadTask)
            .then((files) => {
                if (type === 1)
                    createGame({
                        variables: {
                            inputs: {
                                patientId: id,
                                type: type,
                                answer: answer,
                                img: files,
                                question: question,
                            },
                        },
                    });
                if (type === 3)
                    createGame({
                        variables: {
                            inputs: {
                                patientId: id,
                                type: type,
                                options: [option0, option1, option2, option3],
                                answer: answer,
                                img: files,
                                question: question,
                            },
                        },
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <div className="add_game_container">
            <div className="add_game_preview">
                {type === 1 && <PreviewGame_1 images={fileList} question={question} />}
                {type === 2 && <PreviewGame_2 options={[option0, option1, option2, option3]} question={question} />}
                {type === 3 && <PreviewGame_3 image={fileList?.[0]} options={[option0, option1, option2, option3]} question={question} />}
            </div>
            <div className="add_game_control">
                <div className="add_game_control_type">
                    <div className="add_game_control_type_title">Chọn kiểu trò chơi</div>
                    <Select defaultValue={1} onChange={handleChangeType}>
                        <Option value={1} key="1">
                            Kiểu chọn đáp án ảnh
                        </Option>
                        <Option value={3} key="3">
                            Kiểu 1 ảnh - 4 đáp án
                        </Option>
                        <Option value={2} key="2">
                            Kiểu ghi âm - 4 đáp án
                        </Option>
                    </Select>
                </div>
                <div className="add_game_control_question">
                    <div className="add_game_control_question_title">Câu hỏi</div>
                    <div className="add_game_control_options_item">
                        <Input onChange={onChangeQuestionInput} placeholder="Điền câu hỏi" />
                    </div>
                </div>
                <div className="add_game_control_add_image">
                    <div className="add_game_control_add_image_title">Thêm ảnh</div>
                    <ImgCrop rotate>
                        <Upload maxCount={type === 1 ? 4 : 1} listType="picture-card" fileList={fileList} onChange={onFileChange} onPreview={onPreview} beforeUpload={() => false}>
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                            </div>
                        </Upload>
                    </ImgCrop>
                </div>

                {(type === 2 || type === 3) && (
                    <div className="add_game_control_options">
                        <div className="add_game_control_options_title">Điền phương án</div>
                        <div className="add_game_control_options_item">
                            <Input onChange={(e) => onChangeOptionInput(e, 0)} placeholder="Phương án A" />
                        </div>
                        <div className="add_game_control_options_item">
                            <Input onChange={(e) => onChangeOptionInput(e, 1)} placeholder="Phương án B" />
                        </div>
                        <div className="add_game_control_options_item">
                            <Input onChange={(e) => onChangeOptionInput(e, 2)} placeholder="Phương án C" />
                        </div>
                        <div className="add_game_control_options_item">
                            <Input onChange={(e) => onChangeOptionInput(e, 3)} placeholder="Phương án D" />
                        </div>
                    </div>
                )}
                <div className="add_game_control_answer">
                    <div className="add_game_control_answer_title">Chọn đáp án</div>
                    <Select defaultValue={0} onChange={handleChangeAnswer}>
                        <Option value={0} key="0">
                            A
                        </Option>
                        <Option value={1} key="1">
                            B
                        </Option>
                        <Option value={2} key="2">
                            C
                        </Option>
                        <Option value={3} key="3">
                            D
                        </Option>
                    </Select>
                </div>
                <div className="add_game_control_submit">
                    <Button onClick={handleSubmitGame}>Tạo trò chơi</Button>
                </div>
            </div>
        </div>
    );
};

export default AddMiniGame;
