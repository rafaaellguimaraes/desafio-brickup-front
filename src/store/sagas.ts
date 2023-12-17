import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
	addTask,
	addTaskFailure,
	addTaskSuccess,
	deleteTask,
	deleteTaskFailure,
	deleteTaskSuccess,
	fetchTasks,
	fetchTasksFailure,
	fetchTasksSuccess,
	updateTask,
	updateTaskFailure,
	updateTaskSuccess
} from './actions'

function* fetchTasksSaga(): Generator<any, void, any> {
	try {
		const response = yield call(axios.get, 'http://localhost:8080/api/tasks')
		yield put(fetchTasksSuccess(response.data))
	} catch (error) {
		yield put(fetchTasksFailure())
	}
}

function* addTaskSaga(action: ReturnType<typeof addTask>): Generator<any, void, any> {
	try {
		const newTask = action.payload;
		const response = yield call(axios.post, `http://localhost:8080/api/tasks`, newTask)
		yield put(addTaskSuccess(response.data))
	} catch (error) {
		yield put(addTaskFailure())
	}
}

function* updateTaskSaga(action: any): Generator<any, void, any> {
	try {
		const updatedTask = action.payload;
		yield call(axios.put, `http://localhost:8080/api/tasks/${updatedTask.id}`, updatedTask)
		yield put(updateTaskSuccess(updatedTask))
	} catch (error) {
		yield put(updateTaskFailure(error as number))
	}
}


function* deleteTaskSaga(action: any): Generator<any, void, any> {
	try {
		const taskIdToDelete = action.payload;
		yield call(axios.delete, `http://localhost:8080/api/tasks/${taskIdToDelete}`)
		yield put(deleteTaskSuccess(taskIdToDelete))
	} catch (error) {
		yield put(deleteTaskFailure(error as number))
	}
}

export default function* rootSaga() {
	yield takeLatest(fetchTasks.type, fetchTasksSaga);
	yield takeLatest(addTask.type, addTaskSaga);
	yield takeLatest(updateTask.type, updateTaskSaga);
	yield takeLatest(deleteTask.type, deleteTaskSaga);
}