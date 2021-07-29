import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
type TodolistType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: TodolistType) {

    const onAllClick = () => props.changeFilter("all", props.id)
    const onActiveClick = () => props.changeFilter("active", props.id)
    const onCompletedClick = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    return (
        <div>
            <h2><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeTodolist}>X
                </button>
            </h2>
            <AddItemForm  addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTitle(t.id, newTitle, props.id)
                        }

                        return <li key={t.id}>
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClick}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClick}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClick}>Completed
                </button>
            </div>
        </div>
    )
}

