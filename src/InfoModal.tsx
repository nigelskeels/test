import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  fab: {
    position:'Absolute',
    bottom:'10px',
    right:'10px'
  },
}));

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const classes = useStyles();


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Fab id="helpfab" data-testid="helpfab" className={classes.fab} color="primary" aria-label="help" onClick={handleClickOpen('paper')}>
            <HelpOutlineIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle data-testid="dialoguetitle" id="scroll-dialog-title">Nigel Skeels App for Borrowaboat</DialogTitle>
        
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >

            
           <Typography variant="h5" gutterBottom>Add Item</Typography>
             <ul>
              <li>Enter a Category or Item</li>
              <li>Select where you want to add it by selecting a checkbox</li>
              <li>Press the Add Item Button</li>
            </ul>
            <hr/>
            <Typography variant="h5" gutterBottom>Edit Iem</Typography>
            <ul>
              <li>Edit a Category or Item</li>
              <li>Click on the text to edit</li>
            </ul>
            <hr/>
            <Typography variant="h5" gutterBottom>Move Item</Typography>
            <ul>
              <li>Move a Category or Item</li>
              <li>Select checkbox of item to move</li>
              <li>Press the move item Button</li>
              <li>Select checkbox of place you want to move the item to</li>
              <li>Press the Paste item Button</li>
            </ul>
            <hr/>
            <Typography variant="h5" gutterBottom>Delete Item</Typography>
            <ul>
              <li>Delete a Category or Item</li>
              <li>Select checkbox of the Category or Item to delete</li>
              <li>Press the Delete Button</li>
            </ul>

           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
       
  
          <Button onClick={handleClose} color="primary" id="dialoguemodalcloser">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}