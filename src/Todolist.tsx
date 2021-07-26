import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <input value={newTaskTitle}
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                />
                <button onClick={addTask}>X</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }
                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}