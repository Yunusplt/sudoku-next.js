import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { examples } from "@/data/sudokuData";
import GridOnIcon from "@mui/icons-material/GridOn";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsOpenDialog, setSudokuValues } from "@/redux/sudokuSlice";
import {
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

const ExampleSelectorDialog = () => {
  //! redux
  const dispatch = useAppDispatch();
  const { isOpenDialog } = useAppSelector((state) => state.sudoku);

  //! functions
  const handleClose = () => {
    dispatch(setIsOpenDialog(false));
  };

  const handleOnClick = (example: number[][]) => {
    dispatch(setSudokuValues(example));
    handleClose();
  };

  return (
    <Dialog open={isOpenDialog} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        Wähle ein Sudoku-Beispiel zum Starten
      </DialogTitle>
      <DialogContent>
        <List component="nav">
          {examples.map((example, index) => (
            <ListItemButton
              key={`example-${index}`}
              onClick={() => handleOnClick(example.data)}
            >
              <ListItemIcon>
                <GridOnIcon />
              </ListItemIcon>
              <ListItemText primary={example.name} />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ExampleSelectorDialog;
