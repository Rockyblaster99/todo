// operation.js
import { ADD_TODO, DELETE_ALL, REMOVE_TODO, UPDATE_CHECKBOX, UPDATE_TODO } from "../action";

// Get initial todos from local storage or use a default value
let initialTodos = JSON.parse(localStorage.getItem('todos'));
if (!initialTodos || initialTodos.length === 0) {
    initialTodos = [{ id: 1, todo: 'Buying', completed: false }];
}

export const operationsReducer = (state = initialTodos, action) => {
    switch (action.type) {
        case ADD_TODO:
            // Generate a new ID for the added todo
            const newTodoWithId = { ...action.payload, id: state.length + 1 };
            const newStateAfterAdd = [...state, newTodoWithId];
            localStorage.setItem('todos', JSON.stringify(newStateAfterAdd));
            return newStateAfterAdd;
        case DELETE_ALL:
            localStorage.removeItem('todos');
            return [];
        case REMOVE_TODO:
            const filteredTodos = state.filter((todo) => todo.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(filteredTodos));
            return filteredTodos;
        case UPDATE_TODO:
            const updatedArray = state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        todo: action.payload.todo,
                        completed: action.payload.completed
                    };
                }
                return item;
            });
            localStorage.setItem('todos', JSON.stringify(updatedArray));
            return updatedArray;
        case UPDATE_CHECKBOX:
            const updatedCheckboxArray = state.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed
                    };
                }
                return item;
            });
            localStorage.setItem('todos', JSON.stringify(updatedCheckboxArray));
            return updatedCheckboxArray;
        default:
            return state;
    }
}
