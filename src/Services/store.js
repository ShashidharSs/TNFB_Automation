import { configureStore } from "@reduxjs/toolkit";
import { placeholderData } from '../Services/placeholderData';

export const store = configureStore({
    reducer: {
        placeholder: placeholderData.reducer 
    },
});
