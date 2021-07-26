import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {compileFunction} from "vm";

export type FilterValuesType = "all" | "active" | "completed"

export function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ]);

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        const newTasks = [...tasks,newTask ];
        setTasks(newTasks);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const [filter, setFilter] = useState<FilterValuesType>("all")
    let taskForTodolist = tasks;
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}



