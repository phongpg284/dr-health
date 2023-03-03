import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import products from "temp/products.json"

export type ItemCart = typeof products[number]["products"][number];

export interface Cart {
    itemSelected: ItemCart[];
}

const initialState: Cart = {
    itemSelected: []
}

export const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        updateItemCartSet: (state, action: PayloadAction<Cart>) => {
            (state.itemSelected = action.payload.itemSelected)
        },
    },
});

export const { updateItemCartSet } = cartSlice.actions
export default cartSlice.reducer