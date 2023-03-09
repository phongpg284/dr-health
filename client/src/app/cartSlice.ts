import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import products from "temp/products.json"

export type ItemCart = typeof products[number]["products"][number];

export interface Cart {
    itemSelected: ItemCart[];
    payMethod: PayMethod;
}

export enum PayMethod {
    cod = 1, pickup = 2
}

const initialState: Cart = {
    itemSelected: [],
    payMethod: PayMethod.cod
}

export const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        updateItemCartSet: (state, action: PayloadAction<{itemSelected: ItemCart[]}>) => {
            (state.itemSelected = action.payload.itemSelected)
        },
        updatePayCartSet: (state, action: PayloadAction<{payMethod: PayMethod}>) => {
            (state.payMethod = action.payload.payMethod)
        },
    },
});

export const { updateItemCartSet, updatePayCartSet } = cartSlice.actions
export default cartSlice.reducer