import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    idSelected: string;
}

const initialState: Product = {
    idSelected: "0-0"
}

export const productSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        updateProductSet: (state, action: PayloadAction<Product>) => {
            (state.idSelected = action.payload.idSelected)
        },
    },
});

export const { updateProductSet } = productSlice.actions
export default productSlice.reducer