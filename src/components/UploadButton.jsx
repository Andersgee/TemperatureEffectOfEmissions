import React from "react";
import { Button, Box } from "@material-ui/core";
import { parseExcelFile } from "../js/parser";
import { withData } from "../state/data";

function UploadButton(props) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    parseExcelFile(file).then((data) => {
      data.filename = file.name;
      props.setData(data);
    });
  };

  return (
    <Box display="flex" justifyContent="center">
      <input
        accept=".xls,.xlsx"
        hidden
        id="upload-file-button"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="upload-file-button">
        <Button variant="contained" color="primary" component="span">
          Upload File
        </Button>
      </label>
    </Box>
  );
}

export default withData(UploadButton);
