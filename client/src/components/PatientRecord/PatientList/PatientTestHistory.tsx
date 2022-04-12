import "./PatientTestHistory.scss"
import moment from 'moment';
import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_TEST } from './schema'
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
interface Props {
    patientId: string;
}

function PatientTestHistory({ patientId }: Props): ReactElement {
    const { data } = useQuery(GET_ALL_TEST, {
        variables: {
            id: patientId,
        },
        fetchPolicy: 'no-cache'
    });
    const testList = React.useMemo(() => {
        if (data) return data.getAllTests;
        return []
    }, [data])
    const [chosen, setChosen] = React.useState<number | null>(null);
    React.useEffect(() => {
        if (testList.length > 0) {
            setChosen(0)
        } else {
            setChosen(null)
        }
    }, [testList])


    const chosenTest = React.useMemo(() => {
        if (chosen === null) return null;
        return testList[chosen];
    }, [chosen, testList])

    if (!chosenTest) {
        return <div className="test_history">
            <h3 className="title">
                Lịch sử khám bệnh
            </h3>
            <div className="updateAt">
                Chưa có dữ liệu
            </div>
        </div>
    }

    return (
        <div className="test_history">
            <h3 className="title">
                Lịch sử khám bệnh
            </h3>

            <div className="updateAt">
                <InputGroup className="mb-3">
                    <InputGroup.Text>Cập nhật lúc</InputGroup.Text>
                    <DropdownButton
                        variant="light"
                        title={moment(new Date(chosenTest.updatedAt)).format("HH:mm - DD/MM/YYYY")}
                        id="input-group-dropdown-1"
                    >
                        {
                            testList.map((test: any, index: any) => (
                                index != chosen &&
                                <Dropdown.Item onClick={() => setChosen(index)}>
                                    {moment(new Date(test.updatedAt)).format("HH:mm - DD/MM/YYYY")}
                                </Dropdown.Item>
                            ))
                        }
                        <Dropdown.Divider />
                        <Dropdown.Item>Hãy chọn thời gian</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </div>

            <div className="test_list">
                {
                    chosenTest != null &&
                    <TestContent test={chosenTest} />
                }
            </div>

        </div>
    )
}

interface TestContent {
    test: any
}
function TestContent({ test }: TestContent) {
    const { questions, totalPoint } = test;

    const questionArr = React.useMemo(()=>{
        const arr = questions.concat([]);
        arr.sort((a:any, b:any) => {
            const aId = getOrder(a.id);
            const bId = getOrder(b.id);

            return aId - bId
        })
        return arr;
    },[questions])

    return (
        <div className="test_content">

            <div className="nameSpace">
                Nội dung khám
            </div>
            <div className="questions">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Khám</th>
                            <th scope="col">Kết quả</th>
                            <th scope="col">Điểm</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            questionArr.map((question: any, index: any) => (
                                <Question key={index} question={question} />
                            ))
                        }
                        <tr>
                            <th colSpan={3}>
                                Tổng điểm {totalPoint}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="totalPoint">

            </div>
        </div>
    )
}

function getOrder(id:string){
    const newId = id+"";
    newId.replaceAll("A",".1");
    newId.replaceAll("B",".2");
    newId.replaceAll("C",".3");
    return parseFloat(newId)
}

interface Question {
    question: any;
}
function Question({ question }: Question) {
    const { title, point, options } = question
    return (
        <tr className="question">
            <td className="questionTitle">
                <span className="id" style={{marginRight:5}}>
                    {question.id} :
                </span>
                {title}
            </td>
            <td className="option">
                {options[point]}
            </td>
            <td className="point">
                {point}
            </td>
        </tr>
    )

}

export default PatientTestHistory
