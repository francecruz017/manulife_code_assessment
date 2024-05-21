import React, { useState } from 'react'
import { ToDo } from '../interfaces';

const Tasks = () => {

    const [hideCompleted, setHideCompleted] = useState<boolean>(false);

    const [todoList, setToDoList] = useState<ToDo[]>([]);

    const [newTask, setNewTask] = useState<string>('');


    const handleHideCompletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setHideCompleted(checked);
    }

    const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNewTask(value);
    }

    const handleNewTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if ('' !== newTask) {
            setToDoList((prev) => {
                return [
                    ...prev,
                    {
                        identifier: generateIdentifier(),
                        taskName: newTask,
                        isDone: false,
                    }
                ];
            });
        }
    }

    const generateIdentifier = () => {
        return (new Date()).getTime();
    }

    const handleTodoItemChange = (event: React.ChangeEvent<HTMLInputElement>, identifier: number, status: boolean) => {
        setToDoList((prev: ToDo[]) => {
            return prev.map(todo => {
                if (todo.identifier === identifier) {
                    todo.isDone = status;
                }
                return todo;
            });
        });
    }

    const RenderList = (todo: ToDo) => {
        return (
            <div>
                <input type='checkbox' checked={todo.isDone} onChange={ (event) => handleTodoItemChange(event, todo.identifier, !todo.isDone) } /> <label>{todo.taskName}</label>
            </div>
        );
    }


    return (
        <div>
            <h2>To do list</h2>

            <div>
                <input type='checkbox' name='hideCompleted' onChange={event => handleHideCompletedChange(event)} />
                <label>Hide Completed</label>
            </div>

            <div>
                {
                    todoList && todoList.map((todo: ToDo) => {
                        return true === hideCompleted ? (
                            false === todo.isDone && RenderList(todo)
                        ) : RenderList(todo)
                    })
                }
            </div>

            <div>
                <form onSubmit={handleNewTaskSubmit}>
                    <input type='text' name='taskName' onChange={handleTaskNameChange} />
                    <button>Add</button>
                </form>
            </div>
        </div>
    );
}

export default Tasks;
