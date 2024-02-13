import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import { executeSelectFormControlStyles, noRowsOverlayStackStyles, cellStyles } from '../Styles/Styles'

const Datagrid = ({ finalData, executeValues, handleExecuteChange, handleHeaderExecuteChange, uniqueExecute }) => {

    const renderHeaderSelect = () => (
        <FormControl variant="standard" style={{ minWidth: '90px' }}>
            <InputLabel id="execute-select-label" sx={{ color: 'black' }}>Execute</InputLabel>
            <Select
                labelId="execute-select-label"
                value={uniqueExecute}
                onChange={handleHeaderExecuteChange}
            >
                <MenuItem value={'Yes'}>Yes</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
            </Select>
        </FormControl>
    );

    const renderExecuteSelect = (row) => (
        <FormControl variant="standard" sx={executeSelectFormControlStyles}>
            <InputLabel id={`execute-select-label-${row.id}`}>{uniqueExecute ? uniqueExecute : row.execute.charAt(0).toUpperCase() + row.execute.slice(1)}</InputLabel>
            <Select
                labelId={`execute-select-label-${row.id}`}
                value={uniqueExecute.length ? uniqueExecute[row.id] : executeValues[row.id]}
                onChange={(e) => handleExecuteChange(row.id, e.target.value)}
            >
                <MenuItem value={'Yes'}>Yes</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
            </Select>
        </FormControl>
    );

    const renderCellWithRegex = (value) => (
        <Typography>{value?.replace(/(\d+)/, ' $1')}</Typography>
    );

    const noRowsOverlay = () => (
        <Stack sx={noRowsOverlayStackStyles}>
            {finalData?.length === 0 && 'No Records Found'}
        </Stack>
    );

    const columns = [
        { field: 'id', headerName: 'S.No', width: 60, ...cellStyles },
        { field: 'testname', headerName: 'Test Name', width: 260, ...cellStyles, align: 'left' },
        { field: 'testdescription', headerName: 'Test Description', width: 260, ...cellStyles, align: 'left' },
        {
            field: 'execute',
            headerName: renderHeaderSelect(),
            width: 110,
            ...cellStyles,
            renderCell: ({ row }) => renderExecuteSelect(row)
        },
        { field: 'priority', headerName: 'Priority', width: 120, ...cellStyles },
        { field: 'count', headerName: 'Count', width: 120, ...cellStyles },
        {
            field: 'product', headerName: 'Product', width: 120, ...cellStyles,
            renderCell: ({ row }) => renderCellWithRegex(row?.product)
        },
        {
            field: 'module', headerName: 'Module', width: 120, ...cellStyles,
            renderCell: ({ row }) => renderCellWithRegex(row?.module)
        }
    ];

    return (
        <DataGrid
            rows={finalData}
            getRowId={(row) => row.id}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            rowsPerPageOptions={[5, 10, 20]}
            disableExtendRowFullWidth={true}
            slots={{ noRowsOverlay }}
            disableColumnMenu={true}
            getRowHeight={() => "auto"}
        />
    );
}

export default Datagrid;
