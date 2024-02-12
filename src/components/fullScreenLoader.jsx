import React from "react";
import { CircularProgress } from "@mui/material";
import { overlayLoading } from '../Styles/Styles'

const FullScreenLoader = () => {
    return (
        <div style={overlayLoading}>
            <CircularProgress size={50} />
        </div>
    )
}

export default FullScreenLoader;
