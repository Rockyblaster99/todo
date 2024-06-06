import {useState} from 'react';
import { Form } from "./components/Form";
import { Todos } from "./components/Todos";
import {useDispatch, useSelector} from 'react-redux';
import {deleteAll} from './redux/todoapp/action';

function App() {
    // dispatch function to dispatch an action
    const dispatch = useDispatch();

    // getting todos state for conditional rendering
    const todos = useSelector((state)=>state.operationsReducer);

    // update form visibility state
    const [editFormVisibility, setEditFormVisibility]=useState(false);

    // editTodo state
    const [editTodo, setEditTodo]=useState('');

    // this function will trigger when someone clicks the edit icon
    const handleEditClick=(todo)=>{
        setEditFormVisibility(true);
        setEditTodo(todo);
    }

    // back button click
    const cancelUpdate=()=>{
        setEditFormVisibility(false);
    }

    return (
        <div className="">

            <h1 className="text-center md:text-[25px] text-[18px] ml-[25px] sm:ml-[0px]   font-bold">TODO-APP USING REACT-REDUX</h1>
            <Form editFormVisibility={editFormVisibility} editTodo={editTodo}
                  cancelUpdate={cancelUpdate}/>
            <Todos handleEditClick={handleEditClick} editFormVisibility={editFormVisibility}/>
            {todos.length > 1 && (
                <button className='mt-10 md:ml-[700px] sm:ml-[320px] ml-[200px] bg-blue-800 text-white py-2 px-4'
                        onClick={()=>dispatch(deleteAll())}>DELETE ALL</button>
            )}
        </div>
    );
}

export default App;