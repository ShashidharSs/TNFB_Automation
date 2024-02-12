import React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { defaultStyles } from '../Styles/Styles'

const CustomeSelect = ({ value, uniqueValues, handleChange, name, show }) => {
    return (
        <FormControl variant="standard" sx={{ ...defaultStyles }}>
            <InputLabel id="demo-simple-select-label">{name}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={name}
                onChange={handleChange}
            >
                {show === true && <MenuItem value='all'>All</MenuItem>}
                {React.Children.toArray(uniqueValues).map(v => <MenuItem value={v}>{v.replace(/(\d+)/, ' $1')}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default CustomeSelect;
