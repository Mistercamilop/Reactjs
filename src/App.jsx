import React , {Fragment , useState, useRef , useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import {TodoList} from './components/TodoList'


export function App(){
     const [todos , seTodos] = useState([  {id: 1 , task:"Tarea 1" , completed:false }])

     const todoTaskRef = useRef();

     useEffect(() => { 
         const storedTodos = JSON.parse(localStorage.getItem("todoApp.todos"))
         console.log("todoApp.todos")
         if(storedTodos){
             seTodos(storedTodos);
         }
     }, []);

     useEffect(() =>{
        localStorage.setItem("todoApp.todos" , JSON.stringify(todos)) 
     } , [todos])

     const toggleTodo = (id) =>{
        const newTodos  = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed; 
        seTodos(newTodos);
     }
     const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value
        if(task === '')return;
        seTodos((prevTodos) => {
            return [...prevTodos, {id:uuidv4(), task , completed: false}]
        })
        todoTaskRef.current.value = null;
     }
     
     const handleCleanAll = () =>{
        const newTodos = todos.filter((todo) => !todo.completed)
        seTodos(newTodos);
     }
    return ( 
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder="Nueva tarea"/>
            <button onClick={handleTodoAdd}>+</button>
            <button onClick={handleCleanAll}>Del</button>
            <div>
                 Te quedan {todos.filter((todos) => !todos.completed).length
                 } tareas por terminar 
            </div>
        </Fragment>
    
        )
        
}





