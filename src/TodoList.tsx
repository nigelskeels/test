import React from "react";
import { TodoListItem } from "./TodoListItem";


interface TodoListProps {
  todos: Array<Todo>;
  editItem: EditItem;
}

// Recursive loop to display children

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  editItem,
}) => {
  return (
    <ul>
      {todos.map((todo,id) => (
        <TodoListItem
          
          key={id}
          todo={todo}
          editItem={editItem}
        >
          {/* {todo.id} */}
           {todo.child!==undefined &&           
                <ul>
                  <TodoList key={id} todos={todo.child} editItem={editItem} />
                </ul>
           } 
        </TodoListItem>
      ))}
    </ul>
  );
};