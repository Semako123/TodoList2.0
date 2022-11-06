import { createSlice } from "@reduxjs/toolkit";

tasksSlice = createSlice(
    {
        name:"tasks",
        initialState: {},
        reducers: {
            updateTasks
        }
    }
)