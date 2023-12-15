import { createAction } from '@reduxjs/toolkit';

export const fetchTasks = createAction('FETCH_TASKS_REQUEST');
export const fetchTasksSuccess = createAction('FETCH_TASKS_SUCCESS');
export const fetchTasksFailure = createAction('FETCH_TASKS_FAILURE');