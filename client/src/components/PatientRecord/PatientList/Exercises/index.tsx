import { useQuery } from "@apollo/client";
import React from "react";
import dayjs from "dayjs";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

import "./index.scss";
import schema from "./schema";

function Exercises({ data, role }: any) {
    const result = useQuery(schema.getAllExercisesOfPatient, {
        variables: {
            id: data._id,
        },
    });
    const exercises = React.useMemo(() => {
        if (result && result.data) {
            return result.data.getAllExercisesOfPatient;
        }
        return null;
    }, [result]);

    return (
        <div className="Exercises">
            <h1 className="Exercises_title">Lịch sử bài tập</h1>
            <div className="Exercises_content">{exercises && exercises.map((item: any) => <ExerciseItem data={item} key={item.sessionId} />)}</div>
        </div>
    );
}

function ExerciseItem({ data }: any) {
    return (
        <div className="exerciseItem">
            <div className="header">
                <div className="title">ID: {data.sessionId}</div>
                <div className="time">
                    {dayjs(data.updatedAt).format("DD/MM/YYYY")}
                </div>
            </div>
            <table className="tableSteps">
                <tr>
                    <th>Bước</th>
                    <th>Thời gian</th>
                    <th>Kết quả</th>
                </tr>
                {data.step.map((item: any) => (
                    <StepItem key={item.id} data={item} />
                ))}
            </table>
        </div>
    );
}

function StepItem({ data }: any) {
    const fail = React.useMemo(() => {
        if (data.fail === "rightHand") {
            return "tay phải";
        }
        if (data.fail === "leftHand") {
            return "tay trái";
        }
        return "";
    }, [data]);
    return (
        <tr className="stepItem">
            <td>{data.id}</td>

            <td>{dayjs(data.createdAt).format("hh:mm:ss")}</td>
            <td>
                {fail === "" ? (
                    <div className="result correct">
                        <span>Đúng</span>
                        <BsCheck />
                    </div>
                ) : (
                    <div className="result incorrect">
                        <span>Sai {fail}</span>
                        <IoMdClose />
                    </div>
                )}
            </td>
        </tr>
    );
}

export default Exercises;
