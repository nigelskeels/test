import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

interface AddTodoFormProps {
  addItem: AddItem;
  deleteItem: DeleteItem;
  pasteItem: PasteItem;
  moveItem: MoveItem;
  copyBuffer:CopyBuffer;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ addItem,deleteItem,moveItem,pasteItem,copyBuffer }) => {
  
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addItem(newTodo);
    setNewTodo("");
  };

  const handleDelete = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteItem();
  };

  const handleMove = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    moveItem();
  };

  const handlePaste = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    pasteItem();
  };
  
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <>
    <form>
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <TextField id="addtextfield" data-testid="textfield" fullWidth type="text" onChange={handleChange} value={newTodo} variant="outlined" placeholder="Enter Category of Item name here and press Add" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button id="additembutton" data-testid="additembutton" fullWidth aria-label="additembutton" title="additembutton" variant="contained" size="small" color="primary" type="submit" onClick={handleSubmit} disabled={newTodo.length>0?false:true} >
              Add Item
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button id="movebutton" fullWidth aria-label="movebutton" variant="contained" size="small" color="primary" type="submit" onClick={handleMove}>
              Move Item
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button id="pastebutton" fullWidth title="pastebutton" variant="contained" size="small" color="primary" type="submit" onClick={handlePaste} disabled={copyBuffer.id!==undefined?false:true}>
            Paste Item
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
            <Button id="deletebutton" fullWidth title="deletebutton" variant="contained" size="small" color="primary" type="submit" onClick={handleDelete}>
              Delete Item
            </Button>
        </Grid>
                
      </Grid>
      {/* <input type="text" value={newTodo} onChange={handleChange} /> */}

      
    
      
      
      
    </form>
    </>

  );
};
