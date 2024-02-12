export const uniqValues = (getExcelData, value) => 
[...new Set(getExcelData?.filter(item => item?.[value]).map(item => item?.[value]))].sort();