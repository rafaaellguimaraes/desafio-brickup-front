import { createReducer } from '@reduxjs/toolkit';
import { addTaskSuccess, completedTaskSuccess, deleteTaskSuccess, fetchTasks, fetchTasksFailure, fetchTasksSuccess, updateTaskSuccess } from './actions';
import { RootState, Task } from './types';

const initialState: RootState = {
	tasks: [],
};

export const rootReducer = createReducer(initialState, builder => {
	builder
		.addCase(fetchTasks, state => {
			state.tasks = [];
		})
		.addCase(fetchTasksSuccess, (state, action) => {
			state.tasks = action.payload as unknown as Task[];
		})
		.addCase(fetchTasksFailure, state => {
			state.tasks = [];
		})
		.addCase(addTaskSuccess, (state, action) => {
			const newTask = action.payload as unknown as Task;
			state.tasks = [...state.tasks, newTask];
		})
		.addCase(updateTaskSuccess, (state, action) => {
			const updatedTask = action.payload as Task;
			state.tasks = state.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
		})
		.addCase(deleteTaskSuccess, (state, action) => {
			const taskIdToDelete = action.payload;
			state.tasks = state.tasks.filter(task => task.id !== taskIdToDelete);
		})
		.addCase(completedTaskSuccess, (state, action) => {
			const completedTaskId = action.payload;
			state.tasks = state.tasks.map(task => task.id === completedTaskId ? {...task, completed: true} : task);
		});
	});