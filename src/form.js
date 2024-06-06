import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {addTodo, handleEditSubmit} from "../redux/todoapp/action";
import { IoCheckbox } from "react-icons/io5";


const Form = ({editForm, editTodo, cancelUpdate}) => {
    const dispatch = useDispatch();
    const [todoValue, setTodoValue] = useState('')
    const handleSubmit =(e)=>{
        e.preventDefault();
        let date = new Date();
        let time = date.getTime()

        let todoObj={
            // id:'',
            id:time,
            todo:todoValue,
            complete:false
        }
        setTodoValue('')
        dispatch(addTodo(todoObj))
    }


    const [editValue, setEditValue] = useState('');
    useEffect(()=>{
        setEditValue(editTodo.todo)
    },[editTodo])



    const editSubmit =(e)=>{
        e.preventDefault();
        let editedObj = {
            id:editTodo.id,
            todo:editValue,
            complete: false
        }
        dispatch(handleEditSubmit(editedObj))
        cancelUpdate();
    }
    return (

        <div className='text-center mt-[20px]'>
            {
                editForm === false ? (
                    <form onSubmit={handleSubmit}>
                        <label className='font-semibold text-[25px] flex items-center gap-1'>
                            <span className='bg-blue-300 ml-[320px]'>
                                {<IoCheckbox/>}
                            </span>
                            ADD your toDo-items</label>
                        <div className='flex gap-9 ml-[100px] w-[80%]  mt-8 bg-gray-800 p-6'>
                            <input type='text' required className='w-[100%] border1 outline-none p-2 bg-black text-white '
                                   value={todoValue} onChange={(e) => setTodoValue(e.target.value)}

                            />
                            <button type='submit' className='bg-blue-800 text-white py-2 px-4'>
                                ADD
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={editSubmit}>
                        <label className='font-semibold text-[25px] flex items-center gap-1'>
                            <span className='bg-blue-300 ml-[320px]'>
                                {<IoCheckbox/>}
                            </span>
                            UPDATE your toDo-items</label>
                        <div className='flex gap-9 ml-[100px] w-[80%]  mt-8 bg-gray-800 p-6'>
                            <input type='text' required className='w-[100%] border1 outline-none p-2 bg-black text-white '
                                   value={editValue} onChange={(e) => setEditValue(e.target.value)}

                            />
                            <button type='submit' className='bg-blue-800 text-white py-2 px-4'>
                                Update
                            </button>
                        </div>
                        <button type='button' onClick={cancelUpdate} className='bg-blue-800  text-white py-2 px-4 mt-5'>
                            Back
                        </button>
                    </form>
                )
            }

        </div>
    )
}
export default Form
