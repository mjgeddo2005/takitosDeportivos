import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        categories: [],
        products: [],
        categorySelected: "",
        productSelected: {}
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload
        }
    }
})

export const { setCategorySelected } = shopSlice.actions

export default shopSlice.reducer