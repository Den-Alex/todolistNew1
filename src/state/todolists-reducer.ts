
type ActionType = {
    type: string
    [key: string]: any
}
export type TodolistType = {
    id: string
    title: string
    filter: string
}


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
           return  state.filter(tl => tl.id != action.id)
        }
        default:
            throw new Error('Warning');
    }
}