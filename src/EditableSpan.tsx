import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")
    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const OnChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input value={title} onChange={OnChangeTitleHandler} onBlur={activeViewMode} autoFocus/>
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
}