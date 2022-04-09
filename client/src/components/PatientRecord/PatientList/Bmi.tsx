import style from "./table.module.scss";
import { useMutation } from "@apollo/client";
import { InputNumber } from "antd";
import { getBMI, getDiagnostic } from "helpers/diagnostic";
import { useEffect, useState } from "react";
import { UPDATE_PATIENT } from "./schema";
import { Table } from "antd";
const BmiStats = ({ data, role }: any) => {
  const [dataSource, setDataSource] = useState<any>();

  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [BMI, setBMI] = useState(0);
  const [healthStatus, setHealthStatus] = useState("Bình thường");
  useEffect(() => {
    setHeight(data.height);
    setWeight(data.weight);
  }, [data.height, data.weight]);

  useEffect(() => {
    setBMI(getBMI(height, weight));
  }, [height, weight]);

  useEffect(() => {
    setHealthStatus(getDiagnostic(BMI));
  }, [BMI]);

  const [editHeight, setEditHeight] = useState(false);
  const [editWeight, setEditWeight] = useState(false);

  const [updatePatient] = useMutation(UPDATE_PATIENT);
  const onChangeWeight = (value: any) => {
    setWeight(value);
  };

  const onChangeHeight = (value: any) => {
    setHeight(value);
  };

  const onConfirmWeight = () => {
    if (!editWeight) {
      setEditWeight(true);
    } else {
      setEditWeight(false);
      updatePatient({
        variables: {
          inputs: {
            _id: data._id,
            weight: weight,
          },
        },
      });
    }
  };

  const onConfirmHeight = () => {
    if (!editHeight) {
      setEditHeight(true);
    } else {
      setEditHeight(false);
      updatePatient({
        variables: {
          inputs: {
            _id: data._id,
            height: height,
          },
        },
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "55%",
      // eslint-disable-next-line react/display-name
      render: (text: string) => (
        <div style={{ fontWeight: "bold" }}>{text}</div>
      ),
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any) => {
        if (record.name === "Cân nặng")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editWeight && <span>{text}</span>}
              {editWeight && (
                <InputNumber
                  onChange={onChangeWeight}
                  style={{ width: "60px" }}
                  value={weight}
                />
              )}
              {!editWeight && (
                <a style={{ color: "blue" }} onClick={onConfirmWeight}>
                  Thay đổi
                </a>
              )}
              {editWeight && (
                <a style={{ color: "blue" }} onClick={onConfirmWeight}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        if (record.name === "Chiều cao")
          return (
            <div className="d-flex justify-content-between align-items-center">
              {!editHeight && <span>{text}</span>}
              {editHeight && (
                <InputNumber
                  onChange={onChangeHeight}
                  style={{ width: "60px" }}
                  value={height}
                />
              )}
              {!editHeight && (
                <a style={{ color: "blue" }} onClick={onConfirmHeight}>
                  Thay đổi
                </a>
              )}
              {editHeight && (
                <a style={{ color: "blue" }} onClick={onConfirmHeight}>
                  Xác nhận
                </a>
              )}
            </div>
          );
        return <span>{text}</span>;
      },
    },
  ];
  useEffect(() => {
    if (data) {
      setDataSource([
        {
          key: "8",
          name: "Cân nặng",
          dataIndex: "weight",
          value: weight,
        },
        {
          key: "9",
          name: "Chiều cao",
          value: height,
        },
        {
          key: "10",
          name: "Chỉ số BMI",
          value: BMI.toFixed(2),
        },
        {
          key: "12",
          name: "Tình trạng sức khỏe",
          value: healthStatus,
        },
      ]);
    }
  }, [data, BMI, healthStatus, editWeight, editHeight]);
  return <Table className={style.table_content} dataSource={dataSource} columns={columns} pagination={false} />;
};

export default BmiStats;
