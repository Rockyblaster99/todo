import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addTodo, handleEditSubmit } from '../redux/todoapp/action';

export const Form = ({editFormVisibility, editTodo, cancelUpdate}) => {

    // dispatch function to dispatch an action
    const dispatch = useDispatch();

    // todo value state for normal add todo form
    const [todoValue, setTodoValue]=useState('');

    // state for if someone changes the (to edit) value in update form
    const [editValue, setEditValue]=useState('');

    // useEffect is to show the (to edit) value in update form
    useEffect(()=>{
        setEditValue(editTodo.todo);
    },[editTodo])

    // normal add todo submit
    const handleSubmit=(e)=>{
        e.preventDefault();
        let date = new Date();
        let time = date.getTime();
        let todoObj={
            id: time,
            todo: todoValue,
            completed: false
        }
        setTodoValue('');
        dispatch(addTodo(todoObj))
    }

    // update form submit
    const editSubmit = (e) =>{
        e.preventDefault();
        let editedObj={
            id: editTodo.id,
            todo: editValue,
            completed: false
        }
        dispatch(handleEditSubmit(editedObj))
        cancelUpdate()

    }

    return (
        <>
            <div className=' mt-[20px]'>


            {editFormVisibility===false?(
                <form  onSubmit={handleSubmit}>
                    <label className='font-semibold text-[25px] md:ml-[640px] sm:ml-[260px] ml-[150px] flex items-center gap-1'>Add your todo-items</label>
                    <div className='flex gap-9 md:ml-[100px] md:w-[80%] w-[90%] ml-[25px]  mt-8 bg-gray-800 p-6'>
                        <input type="text" className='w-[100%] border1 outline-none p-2 bg-black text-white ' required
                               value={todoValue} onChange={(e)=>setTodoValue(e.target.value)}/>
                        <button type="submit" className='bg-blue-800 text-white py-2 px-4'>ADD</button>
                    </div>
                </form>
            ):(
                <form  onSubmit={editSubmit}>
                    <label className='font-semibold text-[25px] md:ml-[640px] sm:ml-[250px] ml-[150px] flex items-center gap-1'>Update your todo-items</label>
                    <div className='flex gap-9 md:ml-[100px] md:w-[80%] w-[90%] ml-[25px]  mt-8 bg-gray-800 p-6'>
                        <input type="text" className='w-[100%] border1 outline-none p-2 bg-black text-white' required
                               value={editValue||""} onChange={(e)=>setEditValue(e.target.value)}/>
                        <button type="submit" className='bg-blue-800 text-white py-2 px-4'>UPDATE</button>
                    </div>
                    <button type="button" className='bg-blue-800 text-white py-2 px-4 mt-5 md:ml-[715px] ml-[220px] sm:ml-[365px]'
                            onClick={cancelUpdate}>BACK</button>
                </form>
            )}
            </div>
        </>
    )
}