import { createSlice } from "@reduxjs/toolkit";

const TasksSlice = createSlice(
    {
        name:"tasks",
        initialState: {data:""},
        reducers: {
            updateTasks(state, action) {
                state.data = action.payload
            }
        }
    }
)

export default TasksSlice
export const tasksActions = TasksSlice.actions