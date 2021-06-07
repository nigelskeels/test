type Todo = {
  id:number;
  text: string;
  complete: boolean;
  child: Array<Array>;
};

type CopyBuffer = {
  id:number;
  text: string;
  complete: boolean;
  child: Array<Array>;
};


type EditItem = (selectedTodo: Todo, textval: e) => void;

type DeleteItem  = () => void;

type MoveItem  = () => void;

type PasteItem  = () => void;

type AddItem = (newTodo: string) => void;
