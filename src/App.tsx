import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {


    const removeTask = (id: string, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj});
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false};
        const tasks = tasksObj[todolistId];
        const newTasks = [...tasks, newTask];
        tasksObj[todolistId] = newTasks
        setTasks(tasksObj);
    }
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(t => t.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTasks({...tasksObj})
        }
    }
    const changeTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }
    const removeTodolist = (todolistId: string) => {
        const filteredTasks = todolists.filter(t => t.id !== todolistId);
        setTodolists(filteredTasks)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }


    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to Moovies", filter: "all"}
    ])


    const [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "XXL", isDone: false},
            {id: v1(), title: "JS", isDone: true},
        ],
    });
    const addTodolist = (title: string) => {
        const todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([...todolists, todolist])
        setTasks({...tasksObj, [todolist.id]: []})
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }

                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeStatus={changeStatus}
                                     changeTitle={changeTitle}
                                     filter={tl.filter}
                                     removeTodolist={removeTodolist}
                                     changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }


        </div>
    );
}



