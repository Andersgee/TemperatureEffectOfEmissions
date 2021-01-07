import React from "react";
import { Button, Box } from "@material-ui/core";
import { parseExcelFile } from "../js/parser";
import { withParseddata } from "../state/parseddata";

function UploadButton(props) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    parseExcelFile(file).then((data) => {
      data.filename = file.name;
      props.setParseddata(data);
      console.log("now setting parseddata, data: ", data);
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

export default withParseddata(UploadButton);
