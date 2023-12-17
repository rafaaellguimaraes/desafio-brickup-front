import { createAction } from '@reduxjs/toolkit';
import { Task } from './types';

export const fetchTasks = createAction('FETCH_TASKS_REQUEST');
export const fetchTasksSuccess = createAction('FETCH_TASKS_SUCCESS');
export const fetchTasksFailure = createAction('FETCH_TASKS_FAILURE');

export const addTask = createAction<Task>('ADD_TASK');
export const addTaskSuccess = createAction<Task>('ADD_TASK_SUCCESS');
export const addTaskFailure = createAction('ADD_TASK_FAILURE');

export const deleteTask = createAction<number>('DELETE_TASK');
export const deleteTaskSuccess = createAction<number>('DELETE_TASK_SUCCESS');
export const deleteTaskFailure = createAction<number>('DELETE_TASK_FAILURE');

export const updateTask = createAction<Task>('UPDATE_TASK');
export const updateTaskSuccess = createAction<Task>('UPDATE_TASK_SUCCESS');
export const updateTaskFailure = createAction<number>('UPDATE_TASK_FAILURE');

export const completedTask = createAction<number>('COMPLETED_TASK');
export const completedTaskSuccess = createAction<number>('COMPLETED_TASK_SUCCESS');
export const completedTaskFailure = createAction<number>('COMPLETED_TASK_FAILURE');
