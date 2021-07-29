import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<null | string>(null);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        } else setError("Warning")
    }
    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChange}
                   onKeyPress={onKeyPress}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>X</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}