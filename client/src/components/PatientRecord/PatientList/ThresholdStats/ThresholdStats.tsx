import "./index.scss";
import { GoPrimitiveDot } from "react-icons/go";
import { useHistory } from "react-router";
import { useAppSelector } from "app/store";
import { Tooltip } from "antd";

const ThresholdStats = ({ data, name, unit, status, icon, id, color }: any) => {
    const { role } = useAppSelector((state) => state.account);
    const history = useHistory();

    const handleClick = () => {
        if (role === "doctor") history.push(`/threshold/${id}`);
    };

    return (
        <Tooltip overlay={status ? "Nguy hiểm đang vượt quá ngưỡng" : "An toàn"}>
            <div className="wrapperContainer">
                <div className={`stats-wrapper`} onClick={handleClick}>
                    <div className="stats-content">
                        <div className="stats-content-icon">
                            <img src={icon} alt="heart" style={{ background: color }} />
                        </div>
                        <div className="stats-main">
                            {name === "Huyết áp cao" && (
                                <>
                                    <span className="stats-main-value" style={{ color: color }}>
                                        {data?.diasHighThreshold} {"/"} {data?.sysHighThreshold}
                                    </span>
                                    <span className="stats-main-unit" style={{ color: color }}>
                                        {unit}
                                    </span>
                                    <div className="stats-name">{name}</div>
                                </>
                            )}
                            {name === "Huyết áp thấp" && (
                                <>
                                    <span className="stats-main-value" style={{ color: color }}>
                                        {data?.diasLowThreshold} {"/"} {data?.sysLowThreshold}
                                    </span>
                                    <span className="stats-main-unit" style={{ color: color }}>
                                        {unit}
                                    </span>
                                    <div className="stats-name">{name}</div>
                                </>
                            )}
                            {name !== "Huyết áp cao" && name !== "Huyết áp thấp" && (
                                <>
                                    <span className="stats-main-value" style={{ color: color }}>
                                        {data}
                                    </span>
                                    <span className="stats-main-unit" style={{ color: color }}>
                                        {unit}
                                    </span>
                                    <div className="stats-name">{name}</div>
                                </>
                            )}
                        </div>
                        <div>
                            <GoPrimitiveDot className={`${status ? "stats-status-danger" : "stats-status-normal"}`} />
                        </div>
                    </div>
                    <div className="stats-description"></div>
                </div>
            </div>
        </Tooltip>
    );
};

export default ThresholdStats;
