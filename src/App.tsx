import React, { useState } from "react";
import { initialItems } from "./initialTodos";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import Infomodal  from "./InfoModal";

// import { debug } from "console";


const App: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>(initialItems);
  const [copyBuffer, setcopyBuffer] = useState<object>(initialItems[0]); 
  const [currentselected, setcurrentselected] = useState<object>({
    id:1,
    text: "Home",
    complete: true,
    child:[]
  });
  let highestid = 1;
  let thecopy={}


  
  //deselect all and find matching indexes
  const editingrecursiveloop:any = (todos:object,previouslevel:any,selectedTodo:any,e:any,mode:any,newobj:object) =>{  
    
    let todostoret = todos.map((todo:any)=>{
          
          if(e!==undefined){
            todo.complete=false
          }
          if(selectedTodo!==undefined && todo.id===selectedTodo.id){
            
            if(mode==="edit" && e!==undefined){
              if(e.target.type=="checkbox"){
                todo.complete=e.target.checked
              }else{
                todo.complete=true
                todo.text=e.target.value
              }
            }
            if(mode==="new"){
              //add new
              todo.child.push(newobj)
            }
            if(mode==="paste"){
              if(todo.text!==newobj.text){
                todo.child.push(newobj)
              }
            }
            if(mode==="delete" && previouslevel!==undefined){
                 previouslevel.child.map((prevchild:object,index:number)=>{ prevchild==selectedTodo && previouslevel.child.splice(index, 1) })
            }
            if(mode==="move" && previouslevel!==undefined){
              thecopy = todo
              previouslevel.child.map((prevchild:object,index:number)=>{ prevchild==selectedTodo && previouslevel.child.splice(index, 1) })
            }
          }
          
          editingrecursiveloop(todo.child,todo,selectedTodo,e,mode,newobj)
          return todo
    })
    return {"todos":todostoret,"copy":thecopy}
  }


  const addItem: AddItem = newTodo => {
    findhighestid(todos)

    if(newTodo.trim() !== ""){
      let ret = editingrecursiveloop(todos,undefined,currentselected,undefined,"new",{ text: newTodo, complete: false, child:[], id:highestid+1 })
      
      if(currentselected===undefined){
        setTodos([...todos, { text: newTodo, complete: false, child:[], id:highestid+1 }]);
      }else{
        setTodos(ret.todos);
        setcurrentselected(currentselected)
      }
    }
  };


  const moveItem: MoveItem = () => {
    let ret = editingrecursiveloop(todos,undefined,currentselected,undefined,"move")
    setTodos(ret.todos);
    setcopyBuffer(ret.copy)
  };

  const pasteItem: PasteItem = () => {
    //set new id for copy
    let copyBufferclone = {...copyBuffer}
    let test = findhighestid(todos)
    copyBufferclone.id = test+1

    let ret = editingrecursiveloop(todos,undefined,currentselected,undefined,"paste",copyBufferclone)
    setTodos(ret.todos);
    setcopyBuffer({})
  };
  
  const editItem: EditItem = (selectedTodo,e) => {
    let ret = editingrecursiveloop(todos,undefined,selectedTodo,e,"edit")
    setTodos(ret.todos);
    setcurrentselected(selectedTodo)
  };
  
  const deleteItem: DeleteItem = () => {
    let ret = editingrecursiveloop(todos,undefined,currentselected,undefined,"delete")
    setTodos(ret.todos);
  };
  
  const findhighestid = (todos:any) =>{
    todos.map((todo:any)=>{
      if(todo.id>highestid){
        highestid=todo.id
      }
      findhighestid(todo.child)
    })
    return highestid
  }

  return (
    <React.Fragment>
      <Infomodal />
      <AddTodoForm addItem={addItem} deleteItem={deleteItem} moveItem={moveItem} pasteItem={pasteItem} copyBuffer={copyBuffer} />
      <TodoList todos={todos} editItem={editItem} />
    </React.Fragment>
  );
};

export default App;
