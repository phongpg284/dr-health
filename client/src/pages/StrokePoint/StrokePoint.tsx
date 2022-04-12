import React from 'react';
import './StrokePoint.scss'
import BG from '../../assets/abstract12.svg'

import { useAppDispatch, useAppSelector } from 'app/store'
import * as GreetingBot from 'app/GreetingBot';


import { GET_QUESTIONS, GET_PATIENTS_OF_DOCTOR, UPLOAD_TEST } from './schema';
import { useMutation, useQuery } from '@apollo/client';

import { toast } from 'react-toastify'

function StrokePoint() {
    const dispatch = useAppDispatch();
    const [uploadTest] = useMutation(UPLOAD_TEST);

    const [patient, setPatient] = React.useState<string | null>(null);
    function onPatientInformationChange(value: string | null) {
        setPatient(value);
    }
    const [points, setPoints] = React.useState<DataPoint[]>([]);
    function onChangePoints(points: DataPoint[]) {
        setPoints(points);
    }

    function handleSubmit() {
        toast.promise(
            submit,
            {
                pending: 'Đang gửi dữ liệu',
                success: 'Gửi dữ liệu thành công',
                error: 'Có lỗi xảy ra'
            }
        )
    }
    async function submit() {

        const newPoints = points.concat([]);
        for (const i in defaultQuestions) {
            const index = newPoints.findIndex((point) => point.id === defaultQuestions[i].id);
            if (index >= 0) {
                newPoints.splice(index, 1);
            }
        }
        const inputs = { patientId: patient, questions: newPoints };

        await uploadTest({
            variables: {
                inputs
            }
        })
    }


    React.useEffect(() => {
        dispatch(GreetingBot.setGreetingName(GreetingBot.GreetingNameType.StrokePoint))
    }, [])

    return (
        <div className="stroke_point">
            <img src={BG} alt="bg" className="sp_bg" />
            <div className="page_header">
                <h1 className="title">Thang điểm đột quỵ của viện sức khỏe Quốc gia Hoa Kỳ</h1>
                <h2 className="des">
                    National Institutes of Health (NIH) Stroke Scale - (NIHSS)
                </h2>
            </div>
            <PatientInformation onChange={onPatientInformationChange} />
            <StrokeTable onChangePoints={onChangePoints} />
            <button onClick={handleSubmit} className="submitButton">Gửi thông tin</button>
        </div>
    )
}

interface PatientInformation {
    onChange: (value: string | null) => void
}
function PatientInformation({ onChange }: PatientInformation) {
    const account = useAppSelector((state) => state.account)
    const { data: patientData } = useQuery(GET_PATIENTS_OF_DOCTOR, {
        variables: {
            id: account.id
        }
    });
    const listPatient = React.useMemo(() => {
        if (patientData) {
            return patientData.getPatientsOfDoctor;
        } else {
            return [];
        }
    }, [patientData])

    const [patient, setPatient] = React.useState<string | null>(null);

    React.useEffect(() => {
        onChange(patient)
    }, [patient, listPatient])

    return (
        <div className="patientInformation">
            <div className="patientGroup">
                <span className="patientLabel">
                    Bệnh nhân
                </span>
                <select
                    onChange={(e) => {
                        setPatient(e.target.value)
                    }} className="patientInput">
                    <option value="">Chọn bệnh nhân</option>
                    {listPatient.map((patient: any) => (
                        <option key={patient.id} value={patient._id}>{patient.fullName}</option>
                    ))}
                </select>
            </div>

        </div>
    )
}

export default StrokePoint

type StrokeTableItem = {
    question: string,
    answers: string[],
    points: number[]
}

const strokeTable: StrokeTableItem[] = [
    {
        question: 'ý thức',
        answers: [
            "Tỉnh táo (hoàn toàn tỉnh táo, đáp ứng ngay khi gọi, hợp tác tốt)",
            "Lơ mơ (ngủ gà, tỉnh khi gọi hoặc lay, đáp ứng chính xác)",
            "Sững sờ (chỉ thức tỉnh khi kích thích mạnh, đáp ứng kém chính xác)",
            "Hôn mê (không đáp ứng với kích thích)"
        ],
        points: [0, 1, 2, 3]
    },
    {
        question: 'Hỏi tháng và tuổi bệnh nhân (2 câu hỏi)',
        answers: [
            "Trả lời chính xác cả 2 câu",
            "Trả lời chính xác 1 câu",
            "Trả lời sai cả 2 câu",
        ],
        points: [0, 1, 2]
    },
    {
        question: 'Yêu cầu  mở/nhắm mắt + nắm chặt tay (2 yêu cầu)',
        answers: [
            "Làm theo đúng cả 2 yêu cầu",
            "Làm theo đúng 1 yêu cầu",
            "Làm sai cả 2 yêu cầu",
        ],
        points: [0, 1, 2]
    },
    {
        question: 'Nhìn phối hợp',
        answers: [
            "Nhìn phối hợp",
            "Liệt vận nhãn một phần của 1 hay 2 mắt",
            "Xoay mắt đầu sang một bên hoặc liệt đờ vận nhãn (nghiệm pháp mắt - đầu)",
        ],
        points: [0, 1, 2]
    },
    {
        question: 'Thị trường',
        answers: [
            "Bình thường",
            "Bán manh một phần",
            "Bán manh hoàn toàn",
            "Bán manh 2 bên",
        ],
        points: [0, 1, 2, 3]
    },
    {
        question: 'Liệt mặt',
        answers: [
            "Không liệt",
            "Liệt nhẹ (chỉ mất cân đối khi cười và nói, vận động chủ động vẫn bình thường)",
            "Liệt một phần (liệt rõ rệt, nhưng vẫn còn cử động phần nào)",
            "Liệt hoàn toàn (hoàn toàn không có chút cử động nào của nửa mặt)",
        ],
        points: [0, 1, 2, 3]
    },
    {
        question: 'Vận động tay trái: (duỗi thẳng tay 90 độ nếu ngồi, hoặc 45 độ nếu nằm, trong 10 giây)',
        answers: [
            "Không lệch (giữ được hơn 10 giây)",
            "Lệch (giữ được, nhưng lệch thấp xuống trước 10 giây)",
            "Không chống được trọng lực (lệch nhanh, nhưng có cố giữ lại)",
            "Rơi tự do (tay rơi hoàn toàn, cố nhưng không cưỡng lại được)",
            "Không cử động",
        ],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: 'Vận động tay phải: (duỗi thẳng tay 90 độ nếu ngồi, hoặc 45 độ nếu nằm, trong 10 giây)',
        answers: [
            "Không lệch (giữ được hơn 10 giây)",
            "Lệch (giữ được, nhưng lệch thấp xuống trước 10 giây)",
            "Không chống được trọng lực (lệch nhanh, nhưng có cố giữ lại)",
            "Rơi tự do (tay rơi hoàn toàn, cố nhưng không cưỡng lại được)",
            "Không cử động",
        ],
        points: [0, 1, 2, 3, 4]
    },

    {
        question: 'Vận động chân trái (nằm ngửa, giơ chân tạo góc 30 độ trong 5 giây)',
        answers: [
            "Không lệch (giữ được 30 độ hơn 5 giây)",
            "Lệch (lệch xuống ở tư thế trung gian khi gần hết 5 giây)",
            "Không chống được trọng lực (rơi xuống giường trước 5 giây)",
            "Rơi tự do",
            "Không cử động",
        ],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: 'Vận động chân phải (nằm ngửa, giơ chân tạo góc 30 độ trong 5 giây)',
        answers: [
            "Không lệch (giữ được 30 độ hơn 5 giây)",
            "Lệch (lệch xuống ở tư thế trung gian khi gần hết 5 giây)",
            "Không chống được trọng lực (rơi xuống giường trước 5 giây)",
            "Rơi tự do",
            "Không cử động",
        ],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: 'Mất điều hòa vận động (nghiệm pháp ngón trỏ mũi và gót gối)',
        answers: [
            "Không có mất điều hòa",
            "Có nhưng chỉ ở tay hoặc chỉ ở chân",
            "Có ở cả tay lẫn chân",
        ],
        points: [0, 1, 2]
    },
    {
        question: 'Cảm giác',
        answers: [
            "Bình thường (không mất cảm giác)",
            "Giảm một phần",
            "Giảm nặng",
        ],
        points: [0, 1, 2]
    },
    {
        question: 'Chứng lãng quên nửa người (neglect/agnosia)',
        answers: [
            "Không quên nửa người",
            "Quên thị giác hoặc xúc giác hoặc thính giác",
            "Quên ít nhất là 2 giác quan nói trên",
        ],
        points: [0, 1, 2]
    },
    {
        question: 'Loạn vận ngôn',
        answers: [
            "Nói bình thường",
            "Nhẹ /Trung bình (nói nhịu nói lắp vài từ, hiểu được nhưng có khó khăn)",
            "Nói lắp/nhịu không thể hiểu được (nhưng không loạn ngôn ngữ - dysphasia)"
        ],
        points: [0, 1, 2]
    },
    {
        question: 'Ngôn ngữ',
        answers: [
            "Bình thường",
            "Mất ngôn ngữ nhẹ /trung bình",
            "Mất ngôn ngữ nặng (đầy đủ biểu hiện thể Broca hay Wernicke, hay biến thể)",
            "Câm lặng hoặc mất ngôn ngữ toàn bộ"
        ],
        points: [0, 1, 2, 3]
    },

]

const defaultQuestions = [
    {
        title: 'Hỏi tháng và tuổi bệnh nhân (2 câu hỏi)',
        options: [
            "Trả lời chính xác cả 2 câu",
            "Trả lời chính xác 1 câu",
            "Trả lời sai cả 2 câu",
        ],
        id: "1B",
        disabled: true,
    },
    {
        title: 'Liệt mặt',
        options: [
            "Không liệt",
            "Liệt nhẹ (chỉ mất cân đối khi cười và nói, vận động chủ động vẫn bình thường)",
            "Liệt một phần (liệt rõ rệt, nhưng vẫn còn cử động phần nào)",
            "Liệt hoàn toàn (hoàn toàn không có chút cử động nào của nửa mặt)",
        ],
        id: "4",
        disabled: true,
    },
    {
        title: 'Vận động tay trái: (duỗi thẳng tay 90 độ nếu ngồi, hoặc 45 độ nếu nằm, trong 10 giây)',
        options: [
            "Không lệch (giữ được hơn 10 giây)",
            "Lệch (giữ được, nhưng lệch thấp xuống trước 10 giây)",
            "Không chống được trọng lực (lệch nhanh, nhưng có cố giữ lại)",
            "Rơi tự do (tay rơi hoàn toàn, cố nhưng không cưỡng lại được)",
            "Không cử động",
        ],
        id: "5",
        disabled: true,
    },
]

interface DataPoint {
    id: string,
    point: number
}
interface StrokeTable {
    onChangePoints: (value: DataPoint[]) => void,
}
function StrokeTable({ onChangePoints }: StrokeTable) {

    const { data: questions } = useQuery(GET_QUESTIONS, {
        fetchPolicy: "network-only"
    });


    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }


    const allQuestion = React.useMemo(() => {
        if (!questions || !questions.clientGetQuestions) return;
        const arr = defaultQuestions.concat(questions.clientGetQuestions);


        return arr;
    }, [questions])

    const [resultPoint, setResultPoint] = React.useState<DataPoint[]>([]);

    React.useEffect(() => {
        if (!allQuestion || allQuestion.length == 0) return;
        const arr = allQuestion.map((item: any) => ({ id: item.id, point: 0 }))
        setResultPoint(arr)
    }, [allQuestion])


    function onChangeItem(value: number, id: string) {

        const newArr = [...resultPoint];
        const index = newArr.findIndex(item => item.id === id);
        if (index >= 0) {
            newArr[index].point = value;
        } else {
            newArr.push({ id, point: value })
        }
        setResultPoint(newArr);
    }

    React.useEffect(() => {
        onChangePoints(resultPoint)
    }, [resultPoint])

    const sum = React.useMemo(() => {
        if (!resultPoint || !resultPoint.length) return 0;
        return resultPoint.reduce((acc, item) => acc + item.point, 0)
    }, [resultPoint])

    return (
        <form onSubmit={onSubmit} className="stroke_table_container">
            <table className="stroke_table table table-bordered">
                <thead>
                    <tr>
                        <th>
                            Khám
                        </th>
                        <th>
                            Biểu hiện
                        </th>
                        <th>
                            Số điểm
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allQuestion?.map((item: any, index: any) => {
                            return (
                                <StrokeItem
                                    id={item.id}
                                    onChangeItem={onChangeItem}
                                    key={item.id}
                                    question={item.title}
                                    selected={resultPoint[index]?.point || 0}
                                    disabled={item.disabled}
                                    answers={item.options} />
                            )
                        })
                    }
                    <tr>
                        <td className="sum" colSpan={2}>
                            Tổng số điểm
                        </td>
                        <td className="sum_value">
                            {sum}
                        </td>
                    </tr>
                    <tr>
                        <td className="sum" colSpan={3}>
                            Đánh giá nguy cơ :   {
                                sum < 5 ? "Nhẹ" : sum < 24 ? "Trung bình" : "Nặng"
                            }
                        </td>

                    </tr>
                </tbody>

            </table>
        </form>

    )
}

interface StrokeItem {
    question: string,
    answers: string[],
    onChangeItem: (value: number, id: string) => void,
    id: string,
    selected: number,
    disabled: boolean,
}

function StrokeItem({ question, answers, onChangeItem, id, selected, disabled }: StrokeItem) {


    const [value, setValue] = React.useState(0);
    function onClickItem(index: number) {
        if (!disabled) {
            setValue(index)
        }
    }

    React.useEffect(() => {
        if (!disabled) {
            onChangeItem(value, id)
        }

    }, [value])


    return (
        <tr className="stroke_item">
            <td className="question_container">
                <span className="question">
                    <span className="id" style={{ marginRight: 5 }}>
                        {id} :
                    </span>
                    {question}
                </span>
            </td>
            <td>
                <div className="answers">
                    {answers.map((answer, index) => (
                        <div onClick={() => onClickItem(index)} className="answer" key={index}>
                            <input
                                className="radio"
                                checked={!disabled && selected === index}
                                id={answer + id} type="radio"
                                name={id} value={index} />
                            <label className="label" htmlFor={answer + question}>
                                {answer}
                            </label>
                        </div>

                    ))}
                </div>
            </td>

            <td className="value">
                <span>
                    {value}
                </span>
            </td>
        </tr>
    )
}