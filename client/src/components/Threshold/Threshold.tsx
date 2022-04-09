import "./threshold.scss";
import { ThresholdCard } from "./ThresholdCard";

// icon

import { BiAdjust, BiHeart} from "react-icons/bi";
import { FaTemperatureLow } from "react-icons/fa";

interface ThresholdProps {
    data: any;
}

/*
 * 0: SpO2
 * 1: Blood press
 * 2: Heart rate
 * 3: Body temp
 */

export const Threshold: React.FC<ThresholdProps> = ({ data }) => {
    return (
        <div className="threshold_page_wrapper">
            <div className="threshold_page_title">Ngưỡng chỉ số bệnh nhân {data?.fullName}</div>
            <div className="threshold_all">
                <ThresholdCard id={data._id} type={"Huyết áp"} unit="bpm" property={1} Icon={FaTemperatureLow} color={["red", "purple", "firebrick", "#4edd56", "#e74f4f"]} />
                <ThresholdCard id={data._id} type={"SpO2"} unit="%" property={0} Icon={BiAdjust} color={["#3678f3", "purple", "firebrick", "#4edd56", "#e74f4f"]} />
                <ThresholdCard id={data._id} type={"Nhịp tim"} unit="bpm" property={2} Icon={BiHeart} color={["orange", "purple", "firebrick", "#4edd56", "#e74f4f"]} />
                <ThresholdCard id={data._id} type={"Nhiệt độ"} unit="°C" property={3} Icon={FaTemperatureLow} color={["#0dcdab", "purple", "firebrick", "#4edd56", "#e74f4f"]} />
            </div>
        </div>
    );
};
