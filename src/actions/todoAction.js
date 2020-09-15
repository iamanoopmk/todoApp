export const HANDLE_TODO_TASK = "HANDLE_TODO_TASK"
// export const RESET_STATE = "RESET_STATE"

export const handleTodoTask = (key, value)=>{
    return {
        type: "HANDLE_TODO_TASK",
        key: key,
        value: value
    }
}

// export const resetState = (value)=>{
//     console.log("action----",value)
//     return {
//         type: "RESET_STATE",
//         value: value
//     }
// }
