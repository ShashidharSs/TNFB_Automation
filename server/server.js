const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const cors = require("cors");
const xlsx = require("xlsx"); // Import the xlsx library
const bodyParser = require("body-parser");
 
const app = express();
const PORT = 3001;
 
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON parsing
 
// Serve the 'public' folder
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
 
// Handle requests for the batch file with a location parameter
app.post("/run-batch-file/:location", (req, res) => {
  const batchFilePath = path.join(__dirname, "public", "clone.bat");
  const location =
    req.params.location || "D:UsersShashidhar.GuddadTNFBTNFB_Automation-master"; // Default location
 
  exec(`start cmd /K ${batchFilePath} ${location}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing batch file: ${error.message}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log(`Batch file executed successfully: ${stdout}`);
    res.status(200).send("Batch file executed successfully");
  });
});
 
// Handle requests for fetching Excel data
app.get("/excel-data", (req, res) => {
  const excelFilePath =
  "C:\\CloneData\\myEducationBoard\\src\\assets\\js\\NewTestData.xlsx";
 
  try {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    });
 
    res.status(200).json(sheetData);
  } catch (error) {
    console.error("Error reading Excel file:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Handle updating Excel file
app.post("/update-excel", (req, res) => {
  const { executeValues } = req.body;
  const excelFilePath = "C:/CloneData/myEducationBoard/src/assets/js/NewTestData.xlsx";

  try {
    const workbook = xlsx.readFile(excelFilePath);
    const runManagerSheetName = workbook.SheetNames[0];
    const runManagerSheetData = xlsx.utils.sheet_to_json(workbook.Sheets[runManagerSheetName], { header: 1 });

    // Update the executeValues in "RUNMANAGER" sheetData
    for (const id in executeValues) {
      if (executeValues.hasOwnProperty(id)) {
        const rowIndex = parseInt(id); 
        runManagerSheetData[rowIndex][3] = executeValues[id];
      }
    }

    const updatedWorkbook = xlsx.utils.book_new();
    const updatedRunManagerSheet = xlsx.utils.aoa_to_sheet(runManagerSheetData);
    xlsx.utils.book_append_sheet(updatedWorkbook, updatedRunManagerSheet, runManagerSheetName);

    // Append other sheets without modification
    for (let i = 1; i < workbook.SheetNames.length; i++) {
      const sheetName = workbook.SheetNames[i];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
      const updatedSheet = xlsx.utils.aoa_to_sheet(sheetData);
      xlsx.utils.book_append_sheet(updatedWorkbook, updatedSheet, sheetName);
    }

    // Write the updated data back to the Excel file
    xlsx.writeFile(updatedWorkbook, excelFilePath);

    res.status(200).send("Excel file updated successfully");
  } catch (error) {
    console.error("Error updating Excel file:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

 
app.post("/run-batch-file", (req, res) => {
  const batchFilePath = path.join(__dirname, "public", "testing.bat");
 
  exec(`start cmd /K ${batchFilePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing batch file: ${error.message}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log(`Batch file executed successfully: ${stdout}`);
    res.status(200).send("Batch file executed successfully");
  });
});

// Handle requests for committing and pushing changes
app.post("/commit-push", (req, res) => {
  const { executeValues } = req.body;
 
  // Assuming executeValues is an array of strings, you need to implement logic
  // to update the Excel file based on the executeValues.
 
  // Execute the pushAndCommit.bat file
  const pushAndCommitBatchFilePath = path.join(
    __dirname,
    "public",
    "pushAndCommit.bat"
  );
 
  exec(
    `start cmd /K ${pushAndCommitBatchFilePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing pushAndCommit.bat: ${error.message}`);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log(`pushAndCommit.bat executed successfully: ${stdout}`);
      res.status(200).send("Changes committed and pushed successfully");
    }
  );
});
 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});