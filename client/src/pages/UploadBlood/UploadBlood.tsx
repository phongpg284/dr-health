import React from "react";
import "./StrokePoint.scss";
import BG from "../../assets/abstract12.svg";

import { useAppDispatch, useAppSelector } from "app/store";
import * as GreetingBot from "app/GreetingBot";

import { toast } from "react-toastify";
import { InputNumber } from "antd";
import usePromise from "utils/usePromise";

function UploadBlood() {
  const dispatch = useAppDispatch();
  // const [createPatientBlood] = useMutation(CREATE_PATIENT_BLOOD);

  const [patient, setPatient] = React.useState<string | null>(null);
  function onPatientInformationChange(value: string | null) {
    setPatient(value);
  }
  const [points, setPoints] = React.useState<DataPoint[]>([]);
  function onChangePoints(points: DataPoint[]) {
    setPoints(points);
  }

  function handleSubmit() {
    toast.promise(submit, {
      pending: "Đang gửi dữ liệu",
      success: "Gửi dữ liệu thành công",
      error: "Có lỗi xảy ra",
    });
  }
  async function submit() {
    const newPoints = points.concat([]);
    const inputs = { patientId: patient, questions: newPoints };
    console.log(inputs);
    // await createPatientBlood({
    //     variables: {
    //         inputs,
    //     },
    // });
  }

  React.useEffect(() => {
    dispatch(GreetingBot.setGreetingName(GreetingBot.GreetingNameType.StrokePoint));
  }, []);

  return (
    <div className="stroke_point">
      <img src={BG} alt="bg" className="sp_bg" />
      <div className="page_header">
        <h1 className="title">Cập nhật thông số máu của bệnh nhân</h1>
        {/* <h2 className="des">
                    National Institutes of Health (NIH) Stroke Scale - (NIHSS)
                </h2> */}
      </div>
      <PatientInformation onChange={onPatientInformationChange} />
      {patient && <BloodCriteria onChangePoints={onChangePoints} />}
      <button onClick={handleSubmit} className="submitButton">
        Gửi thông tin
      </button>
    </div>
  );
}

interface PatientInformation {
  onChange: (value: string | null) => void;
}
function PatientInformation({ onChange }: PatientInformation) {
  const account = useAppSelector((state) => state.account);
  const [patientData] = usePromise(`/doctor/patients/${account.id}`);

  const listPatient = React.useMemo(() => {
    if (patientData) {
      return patientData;
    } else {
      return [];
    }
  }, [patientData]);

  const [patient, setPatient] = React.useState<string | null>(null);

  React.useEffect(() => {
    onChange(patient);
  }, [patient, listPatient]);

  return (
    <div className="patientInformation">
      <div className="patientGroup">
        <span className="patientLabel">Bệnh nhân</span>
        <select
          onChange={(e) => {
            setPatient(e.target.value);
          }}
          className="patientInput"
        >
          <option value="">Chọn bệnh nhân</option>
          {listPatient?.map((patient: any) => (
            <option key={patient.id} value={patient.id}>
              {patient.fullName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UploadBlood;

const defaultQuestions = [
  {
    title: "Số lượng hồng cầu (RBC)",
    unit: "T/L",
  },
  {
    title: "Lượng huyết sắc tố (Hb)",
    unit: "g/dL",
  },
  {
    title: "Thể tích khối hồng cầu (HCT)",
    unit: "%",
  },
  {
    title: "Thể tích trung bình hồng cầu (MCV)",
    unit: "fL",
  },
  {
    title: "Lượng huyết sắc tố trung bình hồng cầu (MCH)",
    unit: "pg",
  },
  {
    title: "Nồng độ huyết sắc tố trung bình hồng cầu (MCHC)",
    unit: "g/dL",
  },
  {
    title: "Độ phân bố kích thước hồng cầu",
    unit: "%",
  },
  {
    title: "Số lượng bạch cầu (WBC)",
    unit: "G/L",
  },
  {
    title: "Tỷ lệ phần trăm bạch cầu đoạn trung tính (GRAN %)",
    unit: "%",
  },
  {
    title: "Tỷ lệ phần trăm bạch cầu Lympho",
    unit: "%",
  },
  {
    title: "Tỷ lệ phần trăm bạch cầu Mono",
    unit: "%",
  },
  {
    title: "Tỷ lệ phần trăm bạch cầu đoạn ưa axit",
    unit: "%",
  },
  {
    title: "Tỷ lệ phần trăm bạch cầu đoạn ưa base",
    unit: "%",
  },
  {
    title: "Số lượng bạch cầu đoạn trung tính",
    unit: "G/L",
  },
  {
    title: "Số lượng bạch cầu lympho",
    unit: "G/L",
  },
  {
    title: "Số lượng bạch cầu Mono",
    unit: "G/L",
  },
  {
    title: "Số lượng bạch cầu đoạn ưa axit",
    unit: "G/L",
  },
  {
    title: "Số lượng bạch cầu đoạn ưa base",
    unit: "G/L",
  },
  {
    title: "Số lượng tiểu cầu",
    unit: "G/L",
  },
  {
    title: "Thể tích trung bình tiểu cầu (MPV)",
    unit: "fL",
  },
  {
    title: "Thể tích khối tiểu cầu (PCT)",
    unit: "%",
  },
  {
    title: "Độ phân bố kích thước tiểu cầu (PDW)",
    unit: "%",
  },
];

interface DataPoint {
  id: number;
  point: number;
}
interface StrokeTable {
  onChangePoints: (value: DataPoint[]) => void;
}
function BloodCriteria({ onChangePoints }: StrokeTable) {
  // const { data: questions } = useQuery(GET_QUESTIONS, {
  //     fetchPolicy: "network-only",
  // });

  const questions: any = [];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const allQuestion = React.useMemo(() => {
    const arr = defaultQuestions;

    return arr;
  }, [questions]);

  const [resultPoint, setResultPoint] = React.useState<DataPoint[]>([]);

  React.useEffect(() => {
    if (!allQuestion || allQuestion.length == 0) return;
    const arr = allQuestion.map((item: any, index: number) => ({ id: index, point: 0 }));
    setResultPoint(arr);
  }, [allQuestion]);

  function onChangeItem(value: number, id: number) {
    console.log(value, id);
    const newArr = [...resultPoint];
    const index = newArr.findIndex((item) => item.id === id);
    if (index >= 0) {
      newArr[index].point = value;
    } else {
      newArr.push({ id, point: value });
    }
    setResultPoint(newArr);
  }

  console.log(resultPoint);
  React.useEffect(() => {
    onChangePoints(resultPoint);
  }, [resultPoint]);

  const sum = React.useMemo(() => {
    if (!resultPoint || !resultPoint.length) return 0;
    return resultPoint.reduce((acc, item) => acc + item.point, 0);
  }, [resultPoint]);

  return (
    <form onSubmit={onSubmit} className="stroke_table_container">
      <table className="stroke_table table table-bordered">
        <thead>
          <tr>
            <th>Danh mục</th>
            <th>Giá trị</th>
            <th>Đơn vị</th>
          </tr>
        </thead>
        <tbody>
          {allQuestion?.map((item: any, index: any) => {
            return <BloodItem id={index + 1} onChangeItem={onChangeItem} key={item.id} question={item.title} />;
          })}
        </tbody>
      </table>
    </form>
  );
}

interface StrokeItem {
  question: string;
  id: number;
  onChangeItem: (value: number, id: number) => void;
}

function BloodItem({ question, onChangeItem, id }: StrokeItem) {
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
          <InputNumber onChange={(e) => onChangeItem(Number(e), id)} />
        </div>
      </td>
      <td>
        <div className="unit">{defaultQuestions?.[id - 1]?.unit}</div>
      </td>
    </tr>
  );
}
