import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { removeTodo, handleCheckbox } from '../redux/todoapp/action';

export const Todos = ({handleEditClick, editFormVisibility}) => {
    // dispatch function to dispatch an action
    const dispatch = useDispatch();

    // getting todos from the store
    const todos = useSelector((state)=>state.operationsReducer);
    return (
        <div className='mt-10'>
            {
                todos.map((todo)=>(

                    <div key={todo.id} className='w-[80%] m-auto mt-4 md:ml-[100px] ml-[55px]'>
                        <div className=' flex items-center justify-between '>
                            <div className='flex gap-1 items-center '>
                                {editFormVisibility === false && (
                                    <input type="checkbox" checked={todo.completed} className='w-5 h-5'
                                           onChange={() => dispatch(handleCheckbox(todo.id))}></input>
                                )}
                                <p className='text-[20px] font-semibold' style={todo.completed === true ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>
                                    {todo.todo}
                                </p>
                            </div>
                            <div className='flex gap-[20px]'>
                                {editFormVisibility === false && (
                                    <>
                                        <span onClick={() => handleEditClick(todo)} className='bg-blue-800 text-white py-2 px-4'>Edit</span>
                                        <span onClick={() => dispatch(removeTodo(todo.id))} className='bg-blue-800 text-white py-2 px-4'>Delete</span>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>

    )


}