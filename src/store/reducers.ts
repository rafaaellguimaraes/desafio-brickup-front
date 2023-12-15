import { createReducer } from '@reduxjs/toolkit';
import { fetchTasks, fetchTasksFailure, fetchTasksSuccess } from './actions';
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
		});
});