import "../../PatientRecord/index.scss";
import React, { useEffect, useState } from "react";
// import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { Menu, Dropdown, Button } from "antd";

import "./Chart.scss";

import { DownOutlined } from "@ant-design/icons";
import usePromise from "utils/usePromise";
import { GetMedicalStatsResponse } from "common/types";

const vnLegend = {
    spO2: "Chỉ số SpO2",
    bodyTemp: "Nhiệt độ",
    heartRate: "Nhịp tim",
    diastole: "Tâm trương",
    systolic: "Tâm thu",
};

const vnBloodPressLegend = {
    diastole: "Tâm trương",
    systolic: "Tâm thu",
};

const getUnit = (unit: string) => {
    if (unit === "spO2") return "%";
    if (unit === "bodyTemp") return "°C";
    if (unit === "heartRate") return "bpm";
    if (unit === "diastole") return "bpm";
    if (unit === "systolic") return "bpm";
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                {payload &&
                    payload.map((line: any) => (
                        <p key={line.name} style={{ color: line.stroke }} className="tooltip-line">{`${(vnLegend as any)[line.name]}: ${line.value} ${getUnit(line?.name)}`}</p>
                    ))}
            </div>
        );
    }

    return null;
};

const Chart = ({ id, thresholdStatus }: any) => {
    const [medicalStats, loaded] = usePromise<GetMedicalStatsResponse>(`/patient/medical_stats/${id}`);

    const [opacityState, setOpacityState] = useState({
        spO2: 0.2,
        bodyTemp: 0.2,
        heartRate: 0.2,
        diastole: 0.2,
        systolic: 0.2,
    });

    const handleMouseEnter = (e: any) => {
        const { dataKey } = e;

        setOpacityState({ ...opacityState, [dataKey]: 1 });
    };

    const handleMouseLeave = (e: any) => {
        const { dataKey } = e;

        setOpacityState({ ...opacityState, [dataKey]: 0.2 });
    };

    const renderDescriptionLegend = (value: any, entry: any) => {
        return <span>{(vnLegend as any)?.[value] || (vnBloodPressLegend as any)?.[value]}</span>;
    };


    return (
        <div className="patient-info-graph-wrapper">
            {/* <div className="graph_container">
                <div className="patient-info-graph">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={bloodPressGraphData} margin={{ top: 15, right: 30, left: 10, bottom: 5 }}>
                            <XAxis tick={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="top" align="left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} formatter={renderDescriptionLegend} />
                            <Line yAxisId="1" type="monotone" dataKey="systolic" stroke="#ff9900" strokeOpacity={opacityState.systolic} strokeWidth={3} />
                            <Line yAxisId="0" type="monotone" dataKey="diastole" stroke="#ff0000" strokeOpacity={opacityState.diastole} strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="graph_container">
                <div className="patient-info-graph">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={graphData} margin={{ top: 15, right: 30, left: 10, bottom: 5 }}>
                            <XAxis tick={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="top" align="left" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} formatter={renderDescriptionLegend} />
                            <Line yAxisId="0" type="monotone" dataKey="spO2" stroke="#3930e6" strokeOpacity={opacityState.spO2} strokeWidth={3} />
                            <Line yAxisId="1" type="monotone" dataKey="bodyTemp" stroke="#19ba19" strokeOpacity={opacityState.bodyTemp} strokeWidth={3} />
                            <Line yAxisId="2" type="monotone" dataKey="heartRate" stroke="#ff2600" strokeOpacity={opacityState.heartRate} strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>

                </div>
            </div>  */}

            {loaded && medicalStats && <ListChart deviceData={medicalStats} />}
        </div>
    );
};
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function ListChart({ deviceData }: { deviceData: any }) {
    const diastole = React.useMemo(() => {
        return deviceData?.diastole?.map((item: any) => item.data) ?? [];
    }, [deviceData]);
    const systolic = React.useMemo(() => {
        return deviceData?.systolic?.map((item: any) => item.data)?? [];
    }, [deviceData]);

    return (
        <div className="listChart">
            <ChartDiasAndSys diastole={diastole} systolic={systolic} />
            {/* <SingleLineChart arr={SpO2} title="SpO2" color="coral"/> */}
            <MultipleChart deviceData={deviceData} />
        </div>
    );
}

function ChartDiasAndSys({ diastole, systolic }: { diastole: any[]; systolic: any[] }) {
    const min = 0;
    const max = diastole.length - 1;

    const [range, setRange] = useState({
        min: 0,
        max: max,
    });

    React.useEffect(() => {
        if (diastole.length > 100) {
            setRange({
                min: max - 100,
                max: max,
            });
        }
    }, [diastole]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
    };

    const diastole1 = React.useMemo(() => {
        return diastole.slice(range.min, range.max);
    }, [diastole, range]);
    const systolic1 = React.useMemo(() => {
        return systolic.slice(range.min, range.max);
    }, [systolic, range]);

    const data = {
        labels: diastole1.map(() => ""),
        datasets: [
            {
                label: "Tâm thu",
                data: systolic1,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Tâm trương",
                data: diastole1,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <div className="myChartWrapper">
            <div className="chartContent">
                <Line options={options} data={data} height="80vh"/>
                <div className="rangeWrapper">
                    <InputRange
                        maxValue={max}
                        minValue={min}
                        value={range}
                        onChange={(value) => {
                            if (typeof value !== "number") {
                                setRange(value);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

function MultipleChart({ deviceData }: { deviceData: any }) {
    const arrType = ["SpO2", "Nhiệt độ", "Nhịp tim", "Gương mặt", "Cử chỉ tay", "Giọng nói"];
    const [type, setType] = useState(arrType[0]);

    const SpO2 = React.useMemo(() => {
        return deviceData?.SpO2?.map((item: any) => item.data) ?? [];
    }, [deviceData]);
    const bodyTemp = React.useMemo(() => {
        return deviceData?.bodyTemp?.map((item: any) => item.data) ?? [];
    }, [deviceData]);

    const heartRate = React.useMemo(() => {
        return deviceData?.heartRate?.map((item: any) => item.data) ?? [];
    }, [deviceData]);

    const face = React.useMemo(() => {
        return deviceData?.face?.map((item: any) => item.data) ?? [];
    }, [deviceData]);
    const armMovement = React.useMemo(() => {
        const arr = deviceData?.armMovement?.map((item: any) => item.data) ?? [];
        const finalArr = [];
        let positive = 0;
        let negative = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 1) {
                positive += 1;
            } else {
                negative += 1;
            }

            if ((i + 1) % 5 === 0) {
                finalArr.push({
                    positive,
                    negative,
                });
                positive = 0;
                negative = 0;
            }
        }
        return finalArr;
    }, [deviceData]);
    const voice = React.useMemo(() => {
        const arr = deviceData?.voice?.map((item: any) => item.data) ?? [];
        const finalArr = [];
        let positive = 0;
        let negative = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 1) {
                positive += 1;
            } else {
                negative += 1;
            }

            if ((i + 1) % 5 === 0) {
                finalArr.push({
                    positive,
                    negative,
                });
                positive = 0;
                negative = 0;
            }
        }
        return finalArr;
    }, [deviceData]);


    const MyMenu = (
        <Menu>
            {arrType.map((item: any) => {
                if (item !== type) {
                    return (
                        <Menu.Item>
                            <div onClick={() => setType(item)}>{item}</div>
                        </Menu.Item>
                    );
                }
            })}
        </Menu>
    );

    return (
        <div className="myChartWrapper">
            <div className="chartContent">
                <div className="dropDownSpace">
                    <Dropdown overlay={MyMenu} placement="bottomCenter" arrow>
                        <Button>
                            {type + " "} <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                {type === arrType[0] && <SingleLineChart arr={SpO2} title={type} color="darkblue" />}
                {type === arrType[1] && <SingleLineChart arr={bodyTemp} title={type} color="coral" />}
                {type === arrType[2] && <SingleLineChart arr={heartRate} title={type} color="brown" />}
                {type === arrType[3] && <FaceChart arr={face} />}
                {type === arrType[4] && <StackBarChart arr={armMovement} title={type}/>}
                {type === arrType[5] && <StackBarChart arr={voice} title={type}/>}
            </div>
        </div>
    );
}

function StackBarChart({ arr, title }: { arr: any[]; title: string }) {
    const min = 0;
    const max = arr.length - 1;

    const [range, setRange] = useState({
        min: 0,
        max: max,
    });

    React.useEffect(() => {
        if (arr.length > 100) {
            setRange({
                min: max - 100,
                max: max,
            });
        }
    }, [arr]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const arrSlice = React.useMemo(() => {
        return arr.slice(range.min, range.max);
    }, [arr, range]);

    const data = {
        labels: arrSlice.map(() => ""),
        datasets: [
            {
                label: "Đúng",
                backgroundColor: "lightskyblue",
                data: arrSlice.map((item: any) => item.positive),
            },
            {
                label: "Sai",
                backgroundColor: "lightpink",
                data: arrSlice.map((item: any) => -item.negative),
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} height="80vh"/>
            <div className="rangeWrapper">
                <InputRange
                    maxValue={max}
                    minValue={min}
                    value={range}
                    onChange={(value) => {
                        if (typeof value !== "number") {
                            setRange(value);
                        }
                    }}
                />
            </div>
        </div>
    );
}

function FaceChart({ arr }: { arr: any[] }) {
    const min = 0;
    const max = arr.length - 1;

    const [range, setRange] = useState({
        min: 0,
        max: max,
    });

    React.useEffect(() => {
        if (arr.length > 100) {
            setRange({
                min: max - 100,
                max: max,
            });
        }
    }, [arr]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
    };

    const arrSlice = React.useMemo(() => {
        return arr.slice(range.min, range.max);
    }, [arr, range]);

    const data = {
        labels: arrSlice.map(() => ""),
        datasets: [
            {
                label: "Gương mặt",
                data: arrSlice,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} height="80vh"/>
            <div className="rangeWrapper">
                <InputRange
                    maxValue={max}
                    minValue={min}
                    value={range}
                    onChange={(value) => {
                        if (typeof value !== "number") {
                            setRange(value);
                        }
                    }}
                />
            </div>
        </div>
    );
}

function SingleLineChart(props: { arr: any[]; title: string; color: string }) {
    const { arr, title, color } = props;

    const min = 0;
    const max = arr.length - 1;

    const [range, setRange] = useState({
        min: 0,
        max: max,
    });

    React.useEffect(() => {
        if (arr.length > 100) {
            setRange({
                min: max - 100,
                max: max,
            });
        }
    }, [arr]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
    };

    const arrSlice = React.useMemo(() => {
        return arr.slice(range.min, range.max);
    }, [arr, range]);

    const data = {
        labels: arrSlice.map(() => ""),
        datasets: [
            {
                label: title,
                data: arrSlice,
                backgroundColor: color,
                borderColor: color,
            },
        ],
    };

    return (
        <div>
            <Line options={options} data={data} height="80vh" />
            <div className="rangeWrapper">
                <InputRange
                    maxValue={max}
                    minValue={min}
                    value={range}
                    onChange={(value) => {
                        if (typeof value !== "number") {
                            setRange(value);
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Chart;
