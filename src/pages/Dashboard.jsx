import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FullScreenLoader from "../components/fullScreenLoader";
import { Tooltip, Typography, Card, Button, Box, Grid, CardActions, CardContent, TextField, InputAdornment } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomeSelect from '../components/customeSelect';
import Datagrid from "../components/dataGrid";
import { placeholderApi } from '../Services/placeholderApi';
import ClearIcon from '@mui/icons-material/Clear';
import { uniqValues } from '../components/util';
import { gridHeader, headerIcons, datagridBox, TextFieldStyle } from '../Styles/Styles';
import SearchIcon from '@mui/icons-material/Search';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getExcelData, setGetExcelData] = useState([]);
  const [showProduct, setShowProduct] = useState('');
  const [showModule, setShowModule] = useState('');
  const [finalData, setFinalData] = useState([]);
  const [executeValues, setExecuteValues] = useState({});
  const [uniqueExecute, setUniqueExecute] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const uniqueProductValues = uniqValues(getExcelData, 'product');
  const uniqueModuleValues = uniqValues(finalData, 'module');

  useEffect(() => {
    const excelDataQuery = async () => {
      setLoading(true)
      try {
        const response = await placeholderApi.getExcelDataQuery();
        const sheet1Json = response?.data;
        const rowsData = sheet1Json?.slice(1)?.map((row) => ({
          id: row[0] || 0,
          testname: row[1] || '',
          testdescription: row[2] || '',
          execute: row[3].charAt(0).toUpperCase() + row[3].slice(1) || "No",
          priority: row[4] || '',
          count: row[5] || '',
          product: row[6].charAt(0).toUpperCase() + row[6].slice(1) || '',
          module: row[7].charAt(0).toUpperCase() + row[7].slice(1) || ''
        }));
        setGetExcelData(rowsData);
        setFinalData(rowsData);
      } catch (error) {
        setError(`Error fetching data: ${error?.message}`);
      } finally {
        setLoading(false);
      }
    };
    excelDataQuery()
  }, []);

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setShowProduct(selectedProduct);
    setShowModule('');

    if (selectedProduct === 'all') {
      setFinalData(getExcelData);
    } else {
      const filteredProducts = getExcelData?.filter(row =>
        row.product.includes(selectedProduct)
      );
      setFinalData(filteredProducts);
    }
  };

  const handleModuleChange = (e) => {
    const selectedModule = e.target.value;
    setShowModule(selectedModule);

    if (selectedModule) {
      const filteredModules = finalData?.filter(row =>
        row.module.includes(selectedModule) && row.product === showProduct
      );
      setFinalData(filteredModules);
    }
  };

  const handleHeaderExecuteChange = (e) => {
    const value = e.target.value;
    setUniqueExecute(value);
    if (value) {
      const updatedExecuteValues = {};
      finalData.forEach(row => {
        updatedExecuteValues[row.id] = value;
      });
      setExecuteValues(updatedExecuteValues);
    }
  };

  const handleExecuteChange = (rowIndex, value) => {
    if (uniqueExecute.length) {
      setUniqueExecute('');
    }
    setExecuteValues(prevState => ({
      ...prevState,
      [rowIndex]: value
    }));
  };

  const handleUpdateExcelMutation = async () => {
    setLoading(true);
    try {
      const response = await placeholderApi.updateExcelDataMutation({
        executeValues: executeValues
      });
      if (response.status === 200) {
        toast.success("Excel file updated successfully", {
          autoClose: 900,
        });
      }
    } catch (error) {
      toast.error(error.message ? "Failed to update Excel file" : null, {
        autoClose: 900,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleClickClear = () => {
    setShowModule('')
    setShowProduct('')
    setFinalData(getExcelData)
  }

  const applyGlobalSearch = (data, searchText) => {
    return data.filter(row => {
      return (
        row.id.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        row.testname.toLowerCase().includes(searchText.toLowerCase()) ||
        row.testdescription.toLowerCase().includes(searchText.toLowerCase()) ||
        row.execute.toLowerCase().includes(searchText.toLowerCase()) ||
        row.priority.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        row.count.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        row.product.replace(/(\d+)/, ' $1').toLowerCase().includes(searchText.toLowerCase()) ||
        row.module.replace(/(\d+)/, ' $1').toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  const handleGlobalSearch = (e) => {
    const value = e.target.value;
    setGlobalSearch(value);
    const filteredData = applyGlobalSearch(getExcelData, value);
    setFinalData(filteredData);
  };

  const clearGlobalSearchClick = () => {
    setGlobalSearch('')
    setFinalData(getExcelData)
  }

  return (
    <Grid container spacing={2}>
      {loading && <FullScreenLoader />}
      {error ? (
        <Typography sx={{ mt: 10, ml: 10 }}>{error}</Typography>
      ) : (
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ ...gridHeader }}>
              Test Cases Data
            </Typography>
            <Grid container justifyContent="space-between" spacing={2}>
              <Grid item>
                <TextField
                  variant="standard"
                  type="text"
                  label="Global Search"
                  value={globalSearch}
                  onChange={handleGlobalSearch}
                  sx={{ ...TextFieldStyle }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {globalSearch?.length ? (
                          <Tooltip title="Clear" placement="top" sx={{ cursor: 'pointer' }}>
                            <ClearIcon onClick={clearGlobalSearchClick} />
                          </Tooltip>
                        ) : (
                          <Tooltip title="global Search for below Table data" placement="top" sx={{ cursor: 'pointer' }}>
                            <SearchIcon />
                          </Tooltip>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                {showProduct ? (
                  <Tooltip title="Clear" placement="top">
                    <ClearIcon sx={{ ...headerIcons }} onClick={handleClickClear} />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Filter the Products and Modules"
                    placement="top"
                  >
                    <FilterListIcon sx={{ ...headerIcons }} />
                  </Tooltip>
                )}
                <CustomeSelect
                  name="Select Product"
                  value={showProduct}
                  uniqueValues={uniqueProductValues}
                  handleChange={handleProductChange}
                  show={true}
                />
                <CustomeSelect
                  name="Select Module"
                  value={showModule}
                  uniqueValues={uniqueModuleValues}
                  handleChange={handleModuleChange}
                />
              </Grid>
            </Grid>
            {getExcelData.length > 0 && (
              <Box sx={{ ...datagridBox }}>
                <Datagrid
                  finalData={finalData}
                  executeValues={executeValues}
                  handleExecuteChange={handleExecuteChange}
                  loading={loading}
                  handleHeaderExecuteChange={handleHeaderExecuteChange}
                  uniqueExecute={uniqueExecute}
                />
              </Box>
            )}
            {getExcelData.length === 0 && (
              <>
                <CardContent>
                  <Typography gutterBottom>
                    This feature allows users to clone a repository from
                    <b>`GitHub`</b>
                    to their local machine and fetch any updates made to the repository.
                    <br />
                    By utilizing Git commands like
                    <b>`git clone`</b>
                    and
                    <b>`git fetch`</b>,
                    users can maintain an up-to-date local copy of the repository, enabling collaboration and seamless integration of changes.
                    <br />
                    Click the
                    <b>`Clone and Fetch`</b>
                    button below to initiate the process.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid item xs={12} sm={6} md={2}>
                    <Tooltip title="Clone and Fetch files from Github" placement="top">
                      <Button
                        variant="contained"
                        onClick={handleUpdateExcelMutation}
                        fullWidth
                      >
                        Clone and Fetch
                      </Button>
                    </Tooltip>
                  </Grid>
                </CardActions>
              </>
            )}
            {getExcelData.length > 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                  <Tooltip title="upload excel to local machine" placement="top">
                    <Button
                      variant="contained"
                      onClick={handleUpdateExcelMutation}
                      fullWidth
                    >
                      Update Excel
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Tooltip title="Execute Batch files" placement="top">
                    <Button
                      variant="contained"
                      onClick={handleUpdateExcelMutation}
                      fullWidth
                    >
                      Execute Batch job
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            )}
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default Dashboard;
