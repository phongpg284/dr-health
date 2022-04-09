import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RelativeRoleState {
    role: boolean;
}

const initialState: Partial<RelativeRoleState> = {
    role: false,
};

export const relativeRoleSlice = createSlice({
    name: "relativeRole",
    initialState,
    reducers: {
        updateRelativeRole: (state, action: PayloadAction<RelativeRoleState>) => {
            state.role = action.payload.role;
        },
    },
});

export const { updateRelativeRole } = relativeRoleSlice.actions;
export default relativeRoleSlice.reducer;
