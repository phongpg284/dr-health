import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

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

const initialState: MedicineSet = {
    medicine: [],
    message: ""
}
export const medicineSlice = createSlice({
    name: "medicine",
    initialState,
    reducers: {
        updateMedicineSet: (state, action: PayloadAction<MedicineSet>) => {
            (state.medicine = action.payload.medicine)
        },
        updateMessage: (state, action: PayloadAction<MedicineSet>) => {
            (state.message = action.payload.message)
        },
    },
});

export const { updateMedicineSet, updateMessage } = medicineSlice.actions
export default medicineSlice.reducer