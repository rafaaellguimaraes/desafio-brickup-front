import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchTasks, fetchTasksFailure, fetchTasksSuccess } from './actions'

function* fetchTasksSaga(): Generator<any, void, any> {
	try {
		const response = yield call(axios.get, 'http://localhost:8080/api/tasks')
		yield put(fetchTasksSuccess(response.data))
	} catch (error) {
		yield put(fetchTasksFailure())
	}
}

export default function* rootSaga() {
	yield takeLatest(fetchTasks.type, fetchTasksSaga)
}