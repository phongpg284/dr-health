import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/store'
import { updateMedicineSet } from 'app/medicineSlice';
import { AiOutlineClose } from 'react-icons/ai';

interface Medicine {
    name: CheckboxValueType;
    dates: string[];
    hours: string[];
    times: number;
    comment: string;
    quantity:number;
}
interface MedicineSet {
    medicine: Medicine[];
    message: string;
}

interface CheckBoxProps {
    options: string[]
}
export default function CheckBox(props: CheckBoxProps) {
    const { options } = props;
    const medicineSet = useAppSelector((state) => state.medicineSet);
    const [checkedList, setCheckedList] = React.useState<CheckboxValueType[]>([]);
    const dispatch = useAppDispatch()

    function toggleList(value: string) {
        if (checkedList.includes(value)) {
            setCheckedList(checkedList.filter(item => item !== value))
        } else {
            setCheckedList([...checkedList, value])
        }
    }

    React.useEffect(() => {
        const medicines: MedicineSet = {
            medicine: [],
            message: "",
        }
        checkedList.forEach((item) => {
            const medicineItem = medicineSet.medicine.find((m) => m.name === item)
            if (!medicineItem) {
                medicines.medicine.push({
                    name: item,
                    dates: [],
                    hours: [],
                    times: 1,
                    comment: "",
                    quantity:1,
                })
            }else{
                medicines.medicine.push(medicineItem)
            }
        })

        dispatch(
            updateMedicineSet({
                medicine: medicines.medicine,
                message: "",
            })
        )
    }, [checkedList])


    const [search, setSearch] = React.useState("");
    function onChangeSearch(e: any) {
        setSearch(e.target.value);
    }

    return (
        <div className="medicineChecker">
            <div className="searchSpace">
                <input value={search} onChange={onChangeSearch} type="search" placeholder="Tìm kiếm" className="searchBar" />
                {
                    search.length > 0 &&
                    <span onClick={() => setSearch("")} className="closeBtn">
                        <AiOutlineClose />
                    </span>
                }
            </div>
            <div className="checkGroup">
                {
                    options.map((option, index) => (
                        option.toLowerCase().includes(search.toLowerCase().trim()) &&
                        (<span key={option + index} className="medicineOption">
                            <input type="checkbox" name={option + index} checked={checkedList.includes(option)} onChange={() => toggleList(option)} />
                            <label onClick={() => toggleList(option)} htmlFor={option + index}>{option}</label>
                        </span>
                        )))
                }
            </div>
            <div className="confirm">
                <p className="text">
                    Đã chọn {checkedList.length}
                </p>
            </div>
        </div>
    );
}


// return (
//     <div className={props?.className}>
//         <CheckboxGroup options={props?.options} value={checkedList} onChange={onChange} className={props?.group_className} />
//     </div>
// );