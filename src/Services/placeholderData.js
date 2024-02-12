import { createSlice } from "@reduxjs/toolkit";

export const placeholderData = createSlice({
    name: 'placeholderData',
    initialState: {
        data: []
    },
    reducers: {
        addUserData: (state, action) => { 
            state.data.push(action.payload);
        }
    }
});

export const { addUserData } = placeholderData.actions;
export default placeholderData.reducer;
