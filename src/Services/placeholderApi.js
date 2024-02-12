import axios from "axios";

const serverUrl = "http://localhost:3001";

export const placeholderApi = {
    getExcelDataQuery: () => {
        return axios.get(`${serverUrl}/excel-data`);
    },
    updateExcelDataMutation: (data) => {
        return axios.post(`${serverUrl}/update-excel`, data);
    }
};


