import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useImages from "../hooks/useImages";
import Img from "gatsby-image";
import { Box } from "@material-ui/core";
//import { Link } from "@material-ui/core";
//import Link from "./Link";
import Link from "@material-ui/core/Link";

export default function AlertDialog() {
  const images = useImages();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Your Excel file should look like this"}</DialogTitle>
        <DialogContent>
          <Box width={500}>
            <Img fluid={images["examplefile"]} alt="examplefile" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Link href="/Emissions.xlsx" target="_blank" download>
            Download Example
          </Link>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
