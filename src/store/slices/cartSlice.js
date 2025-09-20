import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const { product } = action.payload;
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += product.quantity || 1;
            } else {
                state.items.push(product);
            }
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item && item.quantity > 1) item.quantity -= 1;
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
