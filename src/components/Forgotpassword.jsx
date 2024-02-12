import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { defaultContainerStyles, defaultBoxStyles, defaultFormStyles } from '../Styles/Styles'

const ForgotPassword = ({ containerStyles, boxStyles, formStyles, textFieldStyles, buttonStyles }) => {

  return (
    <Box className="py-5" sx={{ ...defaultContainerStyles, ...containerStyles }}>
      <Box my={5} mx="auto" sx={{ ...defaultBoxStyles, ...boxStyles }}>
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" paragraph>
          Please enter your registered email to receive a password reset link.
        </Typography>
        <form style={formStyles}>
          <TextField
            id="email"
            type="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            sx={{ ...defaultFormStyles, ...textFieldStyles }}
          />
          <Button variant="contained" fullWidth type="submit" style={buttonStyles}>
            Send Link
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
