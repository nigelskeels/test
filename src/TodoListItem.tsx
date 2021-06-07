import React from "react";
import "./TodoListItem.css";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

interface TodoListItemProps {
  todo: Todo;
  editItem: EditItem;
}


export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  editItem,
  children 
}) => {
  return (
    <>
        <Checkbox
           onChange={(e) => editItem(todo,e)}
           checked={todo.complete}
           color="primary"
           aria-label={"c"+todo.id}
        />
      <label className={todo.complete ? "complete" : undefined} >
          {/* {todocheckbox.id} */}
          {
            <TextField id={"c"+todo.id} error={todo.complete} type="text" onChange={(e) => editItem(todo,e)} value={todo.text} variant={todo.child!==undefined && todo.child.length==0? "outlined":"standard"  } />
          }
      </label>
      {children}
    </>
  );
};
